/* eslint-disable no-console */
/* eslint-disable prefer-destructuring */
const MongoClient = require('mongodb').MongoClient;
const DatabaseOperations = require('./operations');
const DatabaseOperationsUsingPromises = require('./promiseOperations');

const url = 'mongodb://localhost:27017/';
const dbName = 'conFusion';
MongoClient.connect(url, { useNewUrlParser: true }).then((client) => {
  console.log('Connected correctly to server');

  const db = client.db(dbName);
  DatabaseOperationsUsingPromises.insertDocument(db, { name: 'Max', description: 'Test' }, 'dishes').then((result) => {
    console.log('Insert Document ', result.ops);
  });
  DatabaseOperationsUsingPromises.insertDocument(db, { name: 'Vadonut', description: 'Test' }, 'dishes').then((result) => {
    console.log('Insert Document ', result.ops);
  });
  DatabaseOperationsUsingPromises.findDocuments(db, 'dishes').then((docs) => {
    console.log('Found Documents:\n', docs);
  });
  DatabaseOperationsUsingPromises.findDocuments(db, 'dishes').then((docs) => {
    console.log('Found Updated Documents:\n', docs);
  });
  DatabaseOperationsUsingPromises.updateDocument(db, { name: 'Vadonut' },
    { description: 'Updated Test' }, 'dishes').then((result) => {
    console.log('Updated Document:\n', result.result);
  });
  DatabaseOperationsUsingPromises.removeDocument(db, { name: 'Vadonut' }, 'dishes').then((result) => {
    console.log(result.result);
  });
  db.dropCollection('dishes').then((result) => {
    console.log(result);
    client.close();
  }).catch(err => console.log(err));
}).catch(err => console.log(err));
