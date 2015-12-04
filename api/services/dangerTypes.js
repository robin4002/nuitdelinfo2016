app
    .get('/dangerTypes', function(req, res){
        DangerTypes.find().exec(function(err, result){
            if(err) {
                res.status(500).json({})
            } else {
                res.status(200).json({
                    dangerTypes: result
                })
            }
        })
    })
    .get('/dangerType/:id', function(req, res){
        DangerTypes.find({_id: req.params.id}).exec(function(err, result){
            if(err) {
                res.status(500).json({})
            } else {
                res.status(200).json({
                    dangerType: result
                })
            }
        })
    })
    .post('/dangerType', function(req, res){
        var type = new DangerTypes(req.body);
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
    .put('/dangerType/:id', function(req, res){
        DangerTypes.findOneAndUpdate({_id: req.params.id}, req.body, function(err, result) {
            if(err) {
                res.status(500).json({})
            } else {
                res.status(201).json({
                    message: 'updated'
                })
            }
        });
    })
    .delete('/dangerType/:id', function(req, res){
        DangerTypes.findOneAndRemove({_id: req.params.id}, req.body, function(err, result) {
            if (err) {
                res.status(500).json({})
            } else {
                res.status(200).json({
                    message: 'removed'
                })
            }
        });
    });