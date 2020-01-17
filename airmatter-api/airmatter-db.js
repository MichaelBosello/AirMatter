const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017';
const dbName = 'airmatter';

let _db;

module.exports = {
    getDb,
    initDb
};

function initDb(callback) {
  if (_db) {
    console.warn("Trying to init DB again!");
    return callback(null, _db);
  }

  client = new MongoClient(url);
  client.connect(function(err) {
    if (err) {
      return callback(err);
    }
    console.log("Connected successfully to server");
    _db = client.db(dbName);
    return callback(null, _db);
  });
}

function getDb() {
  assert.ok(_db, "Db has not been initialized. Please called init first.");
  return _db;
}