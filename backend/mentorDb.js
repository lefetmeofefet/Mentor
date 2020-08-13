import _pgp from 'pg-promise'

let pgp = _pgp();

const DB_CONNECTION_DETAILS = {
    host: 'drona.db.elephantsql.com',
    database: 'kffucyfj',
    user: 'kffucyfj',
    password: 'vu4GUOqFrUsAiPVUGdtNhSWN6rf2yfYY',
    port: 5432,
    max: 4
};

const db = pgp(DB_CONNECTION_DETAILS)

function STPoint(x, y) {
    this.rawType = true; // no escaping, because we return pre-formatted SQL
    this.toPostgres = () => pgp.as.format("'( $1, $2 )'", [x, y]);
}

const MentorDb = new class {
    async getUserInfo(userIdentifier) {
        let userInfo = await db.oneOrNone({
            name: 'get-user-info',
            text: `
SELECT users.*,
       CASE
           WHEN viral_users.user_identifier IS NOT NULL
               THEN true
           ELSE false
           END is_viral
FROM users
         left join viral_users on users.user_identifier = viral_users.user_identifier
where users.user_identifier = $1
            `,
            values: [userIdentifier]
        });
        return userInfo && {
            userIdentifier: userInfo.user_identifier,
            nickname: userInfo.nickname,
            timelineUpUntil: userInfo.timeline_up_until,
            isViral: userInfo.is_viral
        }
    }

    async createTimeline(userInfo, timeline) {
        let userId = await this._createUser(userInfo)

        let bulkData = [];
        for (let timelineObject of timeline) {
            bulkData.push({
                user_id: userId,
                location: new STPoint(timelineObject.longitudeE7 / 10000000, timelineObject.latitudeE7 / 10000000),
                timestamp: new Date(parseInt(timelineObject.timestampMs)),
                metadata: {
                    timelineObject
                }
            });
        }
        const columns = ['user_id', 'location', 'timestamp', 'metadata'];

        const cs = new pgp.helpers.ColumnSet(columns, {table: 'locations'});
        const query = pgp.helpers.insert(bulkData, cs);

        await db.none(query);
    }

    async _createUser({userIdentifier, nickname, timelineUpUntil}) {
        const result = await db.oneOrNone({
            name: 'create-user',
            text: `
              INSERT INTO users (user_identifier, nickname, timeline_up_until)
              values ($1, $2, $3)
              ON CONFLICT
                DO NOTHING
                 RETURNING id
            `,
            values: [userIdentifier, nickname, new Date(parseInt(timelineUpUntil))]
        });

        if (result == null) {
            return (await db.one({
                name: 'get-user',
                text: `
                  SELECT * 
                  FROM users 
                  WHERE username = $1
                `,
                values: [userIdentifier]
            })).id;
        }
        return result.id
    }

    async getContactPoints(userIdentifier) {
        const contactPoints = await db.manyOrNone({
            name: 'get-contact-points',
            text: `
select *
from (
         select my_locations.location                                            as my_location,
                my_locations.timestamp                                           as my_timestamp,
                my_locations.metadata                                            as my_metadata,
                other_locations.location                                         as other_location,
                other_locations.timestamp                                        as other_timestamp,
                other_locations.metadata                                         as other_metadata,
                ((my_locations.location <@> other_locations.location) * 1609.34) as distance_meters,
                abs(extract(epoch from my_locations.timestamp) -
                    extract(epoch from other_locations.timestamp))               as diff_seconds,
                other_locations.viral_start_date                                 as viral_start_date
         from (
                  select locations.location,
                         locations.timestamp,
                         locations.metadata
                  from users
                           inner join locations on users.id = locations.user_id
                  where users.user_identifier = $1
              ) as my_locations
                  inner join
              (
                  select locations.location,
                         locations.timestamp,
                         locations.metadata,
                         viral_users.viral_start_date
                  from users
                           inner join viral_users on users.user_identifier = viral_users.user_identifier
                           inner join locations on users.id = locations.user_id
                  where users.user_identifier != $1
              ) as other_locations
              on true
     ) as t
where viral_start_date < my_timestamp
  and distance_meters < 100
  and diff_seconds < 60
            `,
            values: [userIdentifier]
        });
        return contactPoints.map(point => ({
            me: {
                location: {
                    lng: point.my_location.x,
                    lat: point.my_location.y
                },
                timestamp: point.my_timestamp,
                metadata: point.my_metadata
            },
            other: {
                location: {
                    lng: point.other_location.x,
                    lat: point.other_location.y
                },
                timestamp: point.other_timestamp,
                metadata: point.other_metadata
            },
            distanceMeters: point.distance_meters,
            diffSeconds: point.diff_seconds
        }))
    }

    async deleteUser(userIdentifier) {
        await db.none({
            name: 'delete-locations',
            text: `
DELETE 
FROM locations
     USING users 
WHERE locations.user_id = users.id AND
      users.user_identifier = $1
            `,
            values: [userIdentifier]
        });

        await db.none({
            name: 'delete-users',
            text: `
DELETE 
FROM users
WHERE users.user_identifier = $1
            `,
            values: [userIdentifier]
        });
    }
}

export {MentorDb}