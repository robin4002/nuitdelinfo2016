app
    .get('/dangerousPlaces', function(req, res){
        DangerousPlaces.find().exec(function(err, result){
            if(err) {
                res.status(500).json({})
            } else {
                res.status(200).json({
                    dangerousPlaces: places
                })
            }
        })
    })
    .get('/dangerousPlace/:id', function(req, res){
        DangerousPlaces.find({_id: req.params.id}).exec(function(err, result){
            if(err) {
                res.status(500).json({})
            } else {
                res.status(200).json({
                    dangerousPlace: place
                })
            }
        })
    })
    .post('/dangerousPlace', function(req, res){
        var place = new DangerousPlaces(req.body);
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
    .put('/dangerousPlace/:id', function(req, res){
        DangerousPlaces.findOneAndUpdate({_id: req.params.id}, req.body, function(err, result) {
            if(err) {
                res.status(500).json({})
            } else {
                res.status(201).json({
                    message: 'updated'
                })
            }
        });
    })
    .delete('/dangerousPlace/:id', function(req, res){
        DangerousPlaces.findOneAndRemove({_id: req.params.id}, req.body, function(err, result) {
            if (err) {
                res.status(500).json({})
            } else {
                res.status(200).json({
                    message: 'removed'
                })
            }
        });
    });