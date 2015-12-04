DangerousPlaces = mongoose.model('DangerousPlaces', {
    official: Boolean,
    notificationAmount: Number,
    deadly: Boolean,
    coordinates: {
        type: [Number],
        index: '2d'
    },
    name: String
});

DangerTypes = mongoose.model('DangerTypes', {
    name: String
});

DisasterTypes = mongoose.model('DisasterTypes', {
    name: String
});

SafePlaces = mongoose.model('SafePlaces', {
    official: Boolean,
    numberOfPeople: Number,
    fillingProgression: Number,
    coordinates: {
        type: [Number],
        index: '2d'
    },
    name: String
});

HealthPlaces = mongoose.model('HealthPlace', {
    numberOfPeople: Number,
    fillingProgression: Number,
    coordinates: {
        type: [Number],
        index: '2d'
    },
    name: String
});

Notifications = mongoose.model('Notifications', {
    text: String,
    coordinates: {
        type: [Number],
        index: '2d'
    }
});

