// Name: Yung King Fung SID:1155112412
// Name: Tsang Ka Hung SID:1155112415
// Name: Yu Ka Wai SID:1155125476
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const fetch = require('node-fetch');
const session = require('express-session');
var mongoose = require('mongoose');
var cors = require('cors');
var bcrypt = require('bcryptjs');
const app = express();

//url use for post method's Location header
var hkevent_url = "https://ogcef.one.gov.hk/event-api/eventList";
var server_url = "http://csci2720-g11.cse.cuhk.edu.hk";
mongoose.connect('mongodb://khtsang9:x24792@localhost/khtsang9');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));
app.use(session({secret: 'randomthinghere', resave:false, saveUninitialized:true}));


var db = mongoose.connection;
//Upon connection failure
db.on('error', console.error.bind(console, 'Connection error:'));
//Upon opening the database successfully
db.once('open', function(){
	console.log("Connection is open...");
});

var UserSchema = mongoose.Schema({
	username: {type: String, required: true, unique: true},
	password: {type: String, required: true}
});

var HKEventSchema = mongoose.Schema({
	event_id: {type: Number, required: true, unique: true},
	event_summary: {type: String, required: true},
    event_desc: {type: String},
	event_date: {type: String},
	event_org: {type: String},
    event_location: {type: String},
    event_url: {type: String}
});

var FavouriteSchema = mongoose.Schema({
	user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	event: {type: mongoose.Schema.Types.ObjectId, ref: 'HKEvent'}
});

var CommentSchema = mongoose.Schema({
	user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	event: {type: mongoose.Schema.Types.ObjectId, ref: 'HKEvent'},
	header: {type: String},
	description: {type: String},
	color: {type: String},
	position: {type: String}
});

var User = mongoose.model('User', UserSchema);
var Event = mongoose.model('HKEvent', HKEventSchema);
var Favourite = mongoose.model('Favourite', FavouriteSchema);
var Comment = mongoose.model('Comment', CommentSchema);

function getEventHK() {
    request("https://ogcef.one.gov.hk/event-api/eventList", (err, res, body) => {
      if (err) return console.log(err);
      var json = JSON.parse(body);
      for (var i = 0; i < json.length; i++) {
          var newEvent = new Event({
              event_id: json[i].event_id,
              event_summary: json[i].event_summary,
              event_desc: json[i].event_desc,
              event_date: json[i].event_date,
              event_org: json[i].event_org,
              event_location: json[i].event_location,
              event_url: json[i].event_url
          });
          newEvent.save(function (err) {
              if (err) return console.log(err);
              console.log("\nnew event added!");
          });
      }
    });
}

getEventHK();
// setInterval(() => {
//     getEventHK();
// }, 60000);

function handleError(err) {
	console.error("\nIn handle Error...\n");
	console.error(err);
}

app.post('/api/CreateUser', function(req, res) {
	// console.log(req.body['username']);
	var hash = bcrypt.hashSync(req.body['password']);
    var userObj = { username: req.body['username'], password: hash };
    User.create(userObj, function(err, result) {
        if (err) return handleError(err);
		res.send(result.username + " created!");
    });

});

app.post('/api/ValidateUser', function(req, res) {
    // console.log("in validateUser");
    // console.log(req.body['username']);
    // console.log(req.body['password']);

	User.findOne( { username: req.body['username'] }, function(err, user) {
        if (err) return handleError(err);
        // Return the result of comparison (true or false)
        if (bcrypt.compareSync(req.body['password'], user.password)) {
			var data = {'loginstate': 1};
			req.session.user = user.username;
			res.json(data);
        }else {
			var data = {'loginstate': 0};
			res.json(data);
        }
    });
});

app.get('/api/Logout', function(req, res) {
	if (req.session) {
		req.session.destroy(function(err) {
			// console.log(req.session.user);
			if (err) return handleError(err);
			res.send("Logout success");
		});
	}
});

app.get('/api/Reload', function(req, res){
	var newEvent = ""
	function setNewEvent(ev){
		newEvent = ev;
	}

	function getNewEvent() {
		return newEvent;
	}

	function promiseFunction() {
		return new Promise(resolve => {
			setTimeout(() => {
				resolve
			});
		});
	}

	function getEventHK() {

		fetch("https://ogcef.one.gov.hk/event-api/eventList").then((response) => {
			if (response.status !== 200) {
	          console.log('Looks like there was a problem. Status Code: ' +
	            response.status);
	          return;
	        }
	      // var json = JSON.parse(response);
		  response.json().then(function(json) {
			  // console.log(json);
			  for (var i = 0; i < json.length; i++) {
    	          var newE = new Event({
    	              event_id: json[i].event_id,
    	              event_summary: json[i].event_summary,
    	              event_desc: json[i].event_desc,
    	              event_date: json[i].event_date,
    	              event_org: json[i].event_org,
    	              event_location: json[i].event_location,
    	              event_url: json[i].event_url
    	          });
    			  // setNewEvent(newE);
    			  newE.save(function (err) {
    				if (err) return console.log(err);
    				console.log("\nnew event added!");
    			  });
    	      }
			  res.send('Reload finish!');
		  });
	  }).catch(function(err) {
	  	console.log(err);
	  });

	}
	getEventHK();

});

app.get('/api/Event/:eventId', function(req, res) {
	if (!req.session.user) {
		return res.status(401).send();
	}
	Event.findOne({event_id: req.params['eventId']})
		.exec(function(err, result){
			if(err) return handleError(err);
			if (result == null) {
				var data = {'exist': false}
				res.json(data);
			}
			else{
				var data = {
					'exist': true,
					'event_id': result.event_id,
					'event_summary': result.event_summary,
					'event_desc': result.event_desc,
					'event_date': result.event_date,
					'event_org': result.event_org,
					'event_location': result.event_location,
					'event_url': result.event_url,
				}

				res.json(data);
			}
		});
});

app.put('/api/Event/:eventId', function(req, res) {
	if (!req.session.user) {
		return res.status(401).send();
	}
	console.log(req.body);
	var eventObj = {
		'event_summary': req.body.event_summary,
		'event_desc': req.body.event_desc,
		'event_date': req.body.event_date,
		'event_org': req.body.event_org,
		'event_location': req.body.event_location,
		'event_url': req.body.event_url,
	}
	Event.update({event_id: req.params['eventId']}, eventObj, function(err, result) {
		if (err) return handleError(err);
		res.send(result.event_id + " updated!");
	});
});

app.delete('/api/Event/:eventId', function(req, res) {
	if (!req.session.user) {
		return res.status(401).send();
	}
	var eventid = "";
	function setEventId(id) {
		eventid = id;
	}
	function getEventId() {
		return eventid;
	}

	Event.findOne({event_id: req.params['eventId']}).exec(function(err, result) {
		if(err) return handleError(err);
		setEventId(result._id);
		Event.remove({_id: getEventId()}, function(err, result) {
			if (err) return handleError(err);
			Favourite.remove({event: getEventId()}, function(err, result) {
				if (err) return handleError(err);
				Comment.remove({event: getEventId()}, function(err, result) {
					if (err) return handleError(err);
					res.send("delete success!");
				});
			});
		});
	});
});


app.get('/api/Event', function(req, res){
	if (!req.session.user) {
		return res.status(401).send();
	}
	var event_org = req.query['event_org'];
	var page = req.query['page'];
	var sort_by = parseInt(req.query['sort_by']);
	var field;
	switch(Math.abs(sort_by)) {
		case 1:
		  field = "event_id";
			break;
		case 2:
			field = "event_summary";
		  break;
		case 3:
			field = "event_date";
			break;
		case 4:
			field = "event_org";
			break;
	}

	var sortObject = {};
	sortObject[field] = Math.sign(sort_by);
	var count = "";
	function setCount(data) {
		count = data;
	}
	function getCount() {
		return count;
	}
	//no query
	if (event_org === undefined || event_org === '') {
		Event.count({}, function(err, count) {
			// console.log("Total event: " + count);
			setCount(count);
			Event.find().sort(sortObject).skip((page-1)*10).limit(10)
				.exec(function(err, results){
					if(err) return handleError(err);
					var json = [];
					if (results.length == 0) {
						res.json(json);
					}
					else{
						json.push({'count': getCount()});
						var events = [];
						for (var i = 0; i < results.length; i++) {
							var data = {
				                'event_id': results[i].event_id,
				                'event_summary': results[i].event_summary,
				                'event_desc': results[i].event_desc,
				                'event_date': results[i].event_date,
				                'event_org': results[i].event_org,
				                'event_location': results[i].event_location,
				                'event_url': results[i].event_url,
				            }
				            events.push(data);
						}
						json.push(events);
						res.json(json);
					}
				});
		});

	//have query
	}else{
		Event.find({event_org: event_org})
			.exec(function(err, results){
				if(err) return handleError(err);
				if (results.length == 0) {
					console.log("event_org: " + req.query['event_org'] + " not found!");
				}
				else{
					var json = [];
					var data = {
		                'event_id': results[i].event_id,
		                'event_summary': results[i].event_summary,
		                'event_desc': results[i].event_desc,
		                'event_date': results[i].event_date,
		                'event_org': results[i].event_org,
		                'event_location': results[i].event_location,
		                'event_url': results[i].event_url,
		            }
		            json.push(data);
					res.json(json);
				}
			});
	}
});

app.post('/api/Event', function(req, res){
	if (!req.session.user) {
		return res.status(401).send();
	}
	var newEventId = -1;
	function setNewEventId(n) {
		newEventId = n;
	}
	function getNewEventId() {
		return newEventId;
	}

	//find the maximum current event ID
	Event.findOne().sort('-event_id').select('event_id').exec(function (err, ev) {
		if (err) return handleError(err);
		if (ev == null) {
			setNewEventId(0);
		}else{
			setNewEventId(ev.event_id + 1);
		}
		var eventObj = {
			'event_id': getNewEventId(),
			'event_summary': req.body.event_summary,
			'event_desc': req.body.event_desc,
			'event_date': req.body.event_date,
			'event_org': req.body.event_org,
			'event_location': req.body.event_location,
			'event_url': req.body.event_url,
		}
		Event.create(eventObj, function(err, result) {
	        if (err) return handleError(err);
			res.send(result.event_id + " created!");
	    });
	});
});

app.get('/api/Favourite', function(req, res){
	if (!req.session.user) {
		return res.status(401).send();
	}
	var userid = "";
	function setUserId(id) {
		userid = id;
	}
	function getUserId() {
		return userid;
	}
	User.findOne({username: req.session.user}).exec(function(err, result) {
		if(err) return handleError(err);
		// console.log("in get favourite");
		setUserId(result._id);
		Favourite.find({user: getUserId()}).populate('event')
			.exec(function(err, results){
				if(err) return handleError(err);
				var json = [];
				if (results.length == 0) {
					console.log("no events found!");
				}
				else{
					for (var i = 0; i < results.length; i++) {
						var data = {
			                'event_id': results[i].event.event_id,
			                'event_summary': results[i].event.event_summary,
			                'event_desc': results[i].event.event_desc,
			                'event_date': results[i].event.event_date,
			                'event_org': results[i].event.event_org,
			                'event_location': results[i].event.event_location,
			                'event_url': results[i].event.event_url,
			            }
			            json.push(data);
					}
				}
				res.json(json);
			});
	});

});

app.post('/api/Favourite/:eventId', function(req, res){
	if (!req.session.user) {
		return res.status(401).send();
	}
	var eventid = "";
	var userid = "";
	function setEventId(id) {
		eventid = id;
	}
	function setUserId(id) {
		userid = id;
	}
	function getEventId() {
		return eventid;
	}
	function getUserId() {
		return userid;
	}

	Event.findOne({event_id: req.params['eventId']}).exec(function(err, result) {
		if(err) return handleError(err);
		setEventId(result._id);
		User.findOne({username: req.session.user}).exec(function(err, result) {
			if(err) return handleError(err);
			setUserId(result._id);
			var favouriteObj = {
				user: getUserId(),
				event: getEventId()
			};
			Favourite.create(favouriteObj, function(err, result) {
				// console.log(eventid);
				// console.log(userid);

		        if (err) return handleError(err);
				res.send("Favourite added!");
		    });
		});
	});
});

app.delete('/api/Favourite/:eventId', function(req, res){
	if (!req.session.user) {
		return res.status(401).send();
	}
	var eventid = "";
	var userid = "";
	function setEventId(id) {
		eventid = id;
	}
	function setUserId(id) {
		userid = id;
	}
	function getEventId() {
		return eventid;
	}
	function getUserId() {
		return userid;
	}

	Event.findOne({event_id: req.params['eventId']}).exec(function(err, result) {
		if(err) return handleError(err);
		setEventId(result._id);
		User.findOne({username: req.session.user}).exec(function(err, result) {
			if(err) return handleError(err);
			setUserId(result._id);
			var favouriteObj = {
				user: getUserId(),
				event: getEventId()
			};
			Favourite.remove(favouriteObj, function(err, result) {
		        if (err) return handleError(err);
				res.send("Favourite deleted!");
		    });
		});
	});
});

app.get('/api/comment/:eventId', function(req, res) {
	if (!req.session.user) {
		return res.status(401).send();
	}
	// console.log('in get comment ' + req.params['eventId']);
	Comment.find().populate('user event').exec(function(err, results) {
		if(err) return handleError(err);
		var json = [];
		if (results.length == 0) {
			res.json(json);
		}
		else{
			for (var i = 0; i < results.length; i++) {
				if (results[i].event.event_id == req.params['eventId']) {
					var data = {
		                'name': results[i].user.username,
		                'subject': results[i].header,
		                'comment': results[i].description,
		                'time': results[i].time,
		                'color': results[i].color,
						'id': results[i].position,
		            }
					json.push(data);
				}
			}
			res.json(json);
		}
	});
});

app.post('/api/comment/:eventId', function(req, res) {
	if (!req.session.user) {
		return res.status(401).send();
	}
	var eventid = "";
	var userid = "";
	function setEventId(id) {
		eventid = id;
	}
	function setUserId(id) {
		userid = id;
	}
	function getEventId() {
		return eventid;
	}
	function getUserId() {
		return userid;
	}

	Event.findOne({event_id: req.params['eventId']}).exec(function(err, result) {
		if(err) return handleError(err);
		setEventId(result._id);
		User.findOne({username: req.session.user}).exec(function(err, result) {
			if(err) return handleError(err);
			setUserId(result._id);
			var commentObj = {
				header: req.body['subject'],
				description: req.body['comment'],
				color: req.body['color'],
				position: req.body['id'],
				user: getUserId(),
				event: getEventId()
			};
			Comment.create(commentObj, function(err, result) {
				console.log(eventid);
				console.log(userid);

		        if (err) return handleError(err);
				res.json(req.params['eventId']);
		    });
		});
	});




});

//index.html
app.get('/', function(req, res){
	//send this to client

	// res.sendfile('index.html', function (err) {
    //     if (err) res.send(404);
    // });
});

//listen to port 2011
const server = app.listen(2011);
