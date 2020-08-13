let home = {lat: 31.905037, lng: 34.811840}

window.initMap = () => {
    window.map = new google.maps.Map(document.getElementById('map'), {
        center: home,
        zoom: 8,
        mapTypeControlOptions: {
            position: google.maps.ControlPosition.TOP_RIGHT
        },
    });

    let existingMarkers = [];
    let markerCluster = null;

    window.setContactPoints = contactPoints => {
        for (let existingMarker of existingMarkers) {
            existingMarker.setMap(null)
        }
        if (markerCluster) {
            markerCluster.setMap(null)
        }

        existingMarkers = contactPoints.map(point => {
            let marker = new google.maps.Marker({
                map: map,
                position: point.me.location,
                animation: google.maps.Animation.DROP,
            });
            marker.addListener('click', () => {
                console.log("Contact point clicked. data: ", point)
                let time = moment(new Date(point.me.timestamp));
                alert(
`Time: ${time.toLocaleString()} (${time.fromNow()})
Distance to patient: approximately ${point.distanceMeters} meters
GPS record time difference: ${point.diffSeconds} seconds`
                )
            });
            return marker
        })

        // markerCluster = new MarkerClusterer(map, existingMarkers,
        //     {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
    };
}
