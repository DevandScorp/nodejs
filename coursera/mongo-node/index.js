/* eslint-disable no-console */
/* eslint-disable prefer-destructuring */
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017/';
const dbName = 'conFusion';
MongoClient.connect(url, { useNewUrlParser: true }, (mongoError, client) => {
  assert.equal(mongoError, null);
  console.log('Connected correctly to server');

  const db = client.db(dbName);
  const collection = db.collection('dishes');

  collection.insertOne({ name: 'Max' }, (insertionError, result) => {
    assert.equal(insertionError, null);
    console.log('After Insertion');
    console.log(result.ops);// количество операций

    collection.find({}).toArray((searchError, docs) => {
      assert.equal(searchError, null);

      console.log('Found:\n');
      console.log(docs);
      db.dropCollection('dishes', (dropError, result) => {
        assert.equal(dropError, null);

        client.close();
      });
    });
  });
});
