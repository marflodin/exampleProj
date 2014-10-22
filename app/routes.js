var Todo = require('./models/todo');
var Scrum = require('./models/scrumitem');

module.exports = function(app) {

	// Todos api ---------------------------------------------------------------------
	// get all todos
	app.get('/api/todos', function(req, res) {

		// use mongoose to get all todos in the database
		Todo.find(function(err, todos) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err);

			res.json(todos); // return all todos in JSON format
		});
	});

	// create todo and send back all todos after creation
	app.post('/api/todos', function(req, res) {

		// create a todo, information comes from AJAX request from Angular
		Todo.create({
			text : req.body.text,
			done : false
		}, function(err, todo) {
			if (err)
				res.send(err);

			// get and return all the todos after you create another
			Todo.find(function(err, todos) {
				if (err)
					res.send(err);
				res.json(todos);
			});
		});

	});

	// delete a todo
	app.delete('/api/todos/:todo_id', function(req, res) {
		Todo.remove({
			_id : req.params.todo_id
		}, function(err, todo) {
			if (err)
				res.send(err);

			// get and return all the todos after you create another
			Todo.find(function(err, todos) {
				if (err)
					res.send(err);
				res.json(todos);
			});
		});
	});


    // Scrum api ---------------------------------------------------------------------
    // get all todos
    app.get('/api/scrum', function(req, res) {

        // use mongoose to get all scrum objects in the database
        Scrum.find(function(err, scrums) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err);

            res.json(scrums); // return all scrum objects in JSON format
        });
    });

    app.get('/api/scrum/:scrum_id', function(req, res) {

        // use mongoose to get a specific scrum object by id
        Scrum.findOne({_id : req.params.scrum_id}, function(err, scrum) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err);

            res.json(scrum); // return scrum object in JSON format
        });
    });

    // create todo and send back all todos after creation
    app.post('/api/scrum', function(req, res) {

        // create a todo, information comes from AJAX request from Angular
        Scrum.create({
            scrumName : req.body.scrumName,
            startDate : req.body.startDate,
            endDate : req.body.endDate
        }, function(err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            Scrum.find(function(err, todos) {
                if (err)
                    res.send(err);
                res.json(todos);
            });
        });

    });

    //add a item to selected scrum
    app.post('/api/scrum/additem/:scrum_id', function(req, res) {
        console.log(req.body);
        //use selected scrum to add new value
        Scrum.findById(req.params.scrum_id, function(err, entity) {
            entity.item.push({itemName: req.body.name});
            entity.save(function (err) {
                if (err)
                    res.send(err);
                console.log('Success!');
                //return the selected scrum
                Scrum.findById(req.params.scrum_id, function(err, entity) {
                    if (err)
                        res.send(err);
                    res.json(entity);
                });
            });
        });
    });

    //update a item to selected scrum
    app.post('/api/scrum/updateitem/:scrum_id', function(req, res) {
        //use selected scrum to add new value
        Scrum.findById(req.params.scrum_id, function(err, entity) {
            var updateItem = entity.item.id(req.body._id);
            updateItem.itemName = req.body.itemName;
            entity.save(function (err) {
                if (err)
                    res.send(err);
                console.log('Success!');
                //return the selected scrum
                Scrum.findById(req.params.scrum_id, function(err, entity) {
                    if (err)
                        res.send(err);
                    res.json(entity);
                });
            });
        });
    });

    //remove a item from selected scrum
    app.post('/api/scrum/removeitem/:scrum_id/:item_id', function(req, res) {

        //use selected scrum to add new value
        Scrum.findById(req.params.scrum_id, function(err, entity) {
            entity.item.pull({_id: req.params.item_id});
            entity.save(function (err) {
                if (err)
                    res.send(err);

                console.log('Success!');
                //return the selected scrum
                Scrum.findById(req.params.scrum_id, function(err, entity) {
                    if (err)
                        res.send(err);
                    res.json(entity);
                });
            });
        });
    });

    // delete a todo
    app.delete('/api/scrum/:scrum_id', function(req, res) {
        Scrum.remove({
            _id : req.params.scrum_id
        }, function(err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            Todo.find(function(err, todos) {
                if (err)
                    res.send(err);
                res.json(todos);
            });
        });
    });


	// application -------------------------------------------------------------
	app.get('/', function(req, res) {
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});

    app.get('/add', function(req, res) {
        res.sendfile('./public/add.html'); // load the single view file (angular will handle the page changes on the front-end)
    });

    app.get('/scrumboard', function(req, res) {
        res.sendfile('./public/scrumboard.html'); // load the single view file (angular will handle the page changes on the front-end)
    });

    app.get('/draganddrop', function(req, res) {
        res.sendfile('./public/dragAndDrop.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};