import store from "./store"
const AWS = require('aws-sdk');

AWS.config.region = 'eu-west-1'; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'eu-west-1:7c77cf43-a78c-40cd-a3c3-9ca2a0da7330',
});
var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
store.commit("setDB", ddb)

export default {
    DefaultTableName: 'ExwmEntries',
    getAll(callback) {
        store.state.db.scan({TableName: this.DefaultTableName}, callback)
    }
}