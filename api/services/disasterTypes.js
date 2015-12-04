app
    .get('/disasterTypes', function(req, res){
        DisasterTypes.find().exec(function(err, result){
            if(err) {
                res.status(500).json({})
            } else {
                res.status(200).json({
                    disasterTypes: result
                })
            }
        })
    })
    .get('/disasterTypes/:id', function(req, res){
        DisasterTypes.find({_id: req.params.id}).exec(function(err, result){
            if(err) {
                res.status(500).json({})
            } else {
                res.status(200).json({
                    disasterType: result
                })
            }
        })
    })
    .post('/disasterTypes', function(req, res){
        var type = new DisasterTypes(req.body);
        type.save(function(err, result) {
            if(err) {
                res.status(500).json({})
            } else {
                res.status(201).json({
                    message: 'created'
                })
            }
        });
    })
    .put('/disasterTypes/:id', function(req, res){
        DisasterTypes.findOneAndUpdate({_id: req.params.id}, req.body, function(err, result) {
            if(err) {
                res.status(500).json({})
            } else {
                res.status(201).json({
                    message: 'updated'
                })
            }
        });
    })
    .delete('/disasterTypes/:id', function(req, res){
        DisasterTypes.findOneAndRemove({_id: req.params.id}, req.body, function(err, result) {
            if (err) {
                res.status(500).json({})
            } else {
                res.status(200).json({
                    message: 'removed'
                })
            }
        });
    });