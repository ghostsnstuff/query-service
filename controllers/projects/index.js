'use strict';

var projectSchema = require('../../models/projectSchema'),
    projectModel  = require('../../models/projectModel'),
    queryKeyNames = require('../../lib/queryKeyNames'),
    Router        = require('express').Router(),
    utils         = require('../../lib/utils'),
    Mongoose      = require('mongoose');


var DB, schema, projects;

// Connect to db
DB = Mongoose.connect('mongodb://localhost/KickstarterProjects');

// Construct collection schema
schema = new Mongoose.Schema(projectSchema, { collection : 'kickstarterprojects' });

// Construct model
Mongoose.model('kickstarterprojects', schema);

// Reference collection
projects = Mongoose.model('kickstarterprojects');

var CACHE, N = 10;


// Fetch all projects (paginate)
Router.get('/', function (req, res, next) {
  var page, queries = {};

  // Default page
  if (!req.query.pg) return res.redirect('/projects?pg=1');

  page = Number(req.query.pg);

  var rangeQueries = ['backers', 'goal', 'funding', 'percentRaised', 'numImages'];

  // Traverse query params
  Object.keys(req.query).forEach(function onEach (q) {
    var key = queryKeyNames[q];

    // Potential range [min, max] query params
    if (rangeQueries.indexOf(q) !== -1) {
      var range = JSON.parse(req.query[q]);

      // Single value
      if (typeof range === 'number') {
        queries[key] = req.query[q];
      }
      // Range of values
      else {
        if (range.length === 2) {
          queries[key] = { $gte: range[0], $lte: range[1] };
        }
      }
    }
    // Non-range query params
    else if (q !== 'pg') {
      queries[key] = { $regex: new RegExp(req.query[q]), $options: 'i' };
    }
  });

  console.log(queries);

  projects.find(queries, function (err, docs) {

    if (err) return res.send(404);

    res.json(utils.paginate(page, docs, N));

  });
});


Router.post('/', function (req, res, next) {

  // Construct document, parse JSON
  var doc = req.body; // TODO: validate schema

  // Save document to mongo
  new projectModel(doc).save();

  res.json(doc);
});


// Project id related CRUD operations
Router.route('/id/:id')

  // Fetch a project
  .get(function (req, res, next) {
    var id = req.params.id;

    projects.find({ _id: id }, function (err, doc) {

      if (err) return res.send(404);

      res.json(doc);
    });
  })

  // Remove a project
  .delete(function (req, res, next) {
    var id = req.params.id;

    projects
      .find({ _id: new Mongoose.Types.ObjectId(id) })
      .remove(function (err) {

        if (err) return res.send(404);

        res.send('');
      });
  });


// Fetch a project by title
Router.get('/:title', function (req, res, next) {
  var title = req.params.title;

  projects.find({ generalTitle: { $regex: new RegExp(title), $options: 'i' }  }, function (err, doc) {

    if (err) return res.send(404);

    res.json(doc);
  });
});


module.exports = Router;
