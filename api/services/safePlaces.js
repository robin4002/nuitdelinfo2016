app
    .get('/safePlaces', function(req, res){
        SafePlaces.find().exec(function(err, result){
            if(err) {
                res.status(500).json({})
            } else {
                res.status(200).json({
                    safePlaces: result
                })
            }
        })
    })
    .get('/safePlaces/:id', function(req, res){
        SafePlaces.find({_id: req.params.id}).exec(function(err, result){
            if(err) {
                res.status(500).json({})
            } else {
                res.status(200).json({
                    safePlace: result
                })
            }
        })
    })
    .post('/safePlaces', function(req, res){
        var place = new SafePlaces(req.body);
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
    .put('/safePlaces/:id', function(req, res){
        SafePlaces.findOneAndUpdate({_id: req.params.id}, req.body, function(err, result) {
            if(err) {
                res.status(500).json({})
            } else {
                res.status(201).json({
                    message: 'updated'
                })
            }
        });
    })
    .delete('/safePlaces/:id', function(req, res){
        SafePlaces.findOneAndRemove({_id: req.params.id}, req.body, function(err, result) {
            if (err) {
                res.status(500).json({})
            } else {
                res.status(200).json({
                    message: 'removed'
                })
            }
        });
    });