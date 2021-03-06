app
    .get('/notifications', function(req, res){
        Notifications.find().exec(function(err, result){
            if(err) {
                res.status(500).json({})
            } else {
                res.status(200).json({
                    notifications: result
                })
            }
        })
    })
    .get('/notifications/:id', function(req, res){
        Notifications.find({_id: req.params.id}).exec(function(err, result){
            if(err) {
                res.status(500).json({})
            } else {
                res.status(200).json({
                    notification: result
                })
            }
        })
    })
    .post('/notifications', function(req, res){
        var notif = new Notifications(req.body);
        notif.save(function(err, result) {
            if(err) {
                res.status(500).json({})
            } else {
                res.status(201).json({
                    message: 'created'
                })
            }
        });
    })
    .put('/notifications/:id', function(req, res){
        Notifications.findOneAndUpdate({_id: req.params.id}, req.body, function(err, result) {
            if(err) {
                res.status(500).json({})
            } else {
                res.status(201).json({
                    message: 'updated'
                })
            }
        });
    })
    .delete('/notifications/:id', function(req, res){
        Notifications.findOneAndRemove({_id: req.params.id}, req.body, function(err, result) {
            if (err) {
                res.status(500).json({})
            } else {
                res.status(200).json({
                    message: 'removed'
                })
            }
        });
    });