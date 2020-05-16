module.exports.seed = async () => {
    const path = require('path');
    const bugsJSONString = require('fs')
        .readFileSync(path.resolve(__dirname, '..', 'data', 'mongodb', 'bug.json'))
        .toString();
    const bugsJSON = JSON.parse(bugsJSONString);
    
    const bugEntity = require('../../../src/_storage').storage.mongo.bug;
    await bugEntity.insertMany(bugsJSON);
    console.log('bugs seed data inserted');
}; 