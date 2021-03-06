app
    .get('/healthPlaces', function(req, res){
        HealthPlaces.find().exec(function(err, result){
            if(err) {
                res.status(500).json({})
            } else {
                res.status(200).json({
                    healthPlaces: result
                })
            }
        })
    })
    .get('/healthPlaces/:id', function(req, res){
        HealthPlaces.find({_id: req.params.id}).exec(function(err, result){
            if(err) {
                res.status(500).json({})
            } else {
                res.status(200).json({
                    healthPlace: result
                })
            }
        })
    })
    .post('/healthPlaces', function(req, res){
        var place = new HealthPlaces(req.body);
        place.save(function(err, result) {
            if(err) {
                res.status(500).json({})
            } else {
                res.status(201).json({
                    message: 'created'
                })
            }
        });
    })
    .put('/healthPlaces/:id', function(req, res){
        HealthPlaces.findOneAndUpdate({_id: req.params.id}, req.body, function(err, result) {
            if(err) {
                res.status(500).json({})
            } else {
                res.status(201).json({
                    message: 'updated'
                })
            }
        });
    })
    .delete('/healthPlaces/:id', function(req, res){
        HealthPlaces.findOneAndRemove({_id: req.params.id}, req.body, function(err, result) {
            if (err) {
                res.status(500).json({})
            } else {
                res.status(200).json({
                    message: 'removed'
                })
            }
        });
    });