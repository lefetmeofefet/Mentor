export default {
    isStudent: null,
    selectedSubject: null,
    subjects: [
        "Painting",
        "Knitting",
        "Wekekekeke",
        "Staring at walls",
        "Eating until fat",
        "Sculpturing",
        "Watering Plants",
        "Cooking",
        "Growing Weed",
        "Water Gymnastics"
    ],
    postings: {
        "Painting": ["Yehezkel Sabashkha", "David Gdalevich", "Inna Gdalevich"],
        "Wekekekeke": [],
        "Knitting": ["Inna Gdalevich", "Lirome Potov", "Old People"],
        "Staring at walls": ["Old People"],
        "Eating until fat": ["Shlomo"],
        "Sculpturing": ["Nobody"],
        "Watering Plants": ["David Gdalevich", "Inna Gdalevich"],
        "Cooking": ["Lirome Potov", "David Gdalevich", "Old People"],
        "Growing Weed": ["David Gdalevich"],
        "Water Gymnastics": ["Lirome Potov"]
    },
    mentors: {
        "Yehezkel Sabashkha": {
            age: 73,
            location: {lat: 31.900670, lng: 34.809244},
            street: "Herzl 73",
            phone: "00000000000"
        },
        "David Gdalevich": {
            age: 99,
            location: {lat: 31.904798, lng: 34.812993},
            street: "Pinsucker 8",
            phone: "05666666666"
        },
        "Inna Gdalevich": {
            age: 81,
            location: {lat: 31.896641, lng: 34.815285},
            street: "Yaakov 9",
            phone: "0523913732"
        },
        "Lirome Potov": {
            age: 69,
            location: {lat: 31.902525, lng: 34.810135},
            street: "Ben yehuda 11",
            phone: "05987654321"
        },
        "Nobody": {
            age: 666,
            location: {lat: 31.902686, lng: 34.816970},
            street: "noplace 0",
            phone: "dont care"
        },
        "Old People": {
            age: 1000,
            location: {lat: 31.905686, lng: 34.810970},
            street: "Good old place 1",
            phone: "0599999009"
        },
        "Shlomo": {
            age: 7,
            location: {lat: 31.904698, lng: 34.812893},
            street: "Pinscare 8",
            phone: "forgot"
        }
    }
}