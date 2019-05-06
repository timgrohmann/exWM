import store from "./store"
import md5 from "md5"
const AWS = require("aws-sdk")

AWS.config.region = 'eu-west-1'; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: 'eu-west-1:7c77cf43-a78c-40cd-a3c3-9ca2a0da7330',
});
var ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });
store.commit("setDB", ddb)

export default {
  DefaultTableName: 'ExwmEntries',
  getAll(callback) {
    ddb.scan({ TableName: this.DefaultTableName }, callback)
  },
  insertNew(item, callback = null) {
    ddb.putItem({
      TableName: this.DefaultTableName,
      Item: item
    }, (error) => {
      if (error) {
        console.log(error)
      } else {
        callback(item.uuid.S)
      }
    })
  },
  updateUpvotes(item, count, callback = null) {
    ddb.updateItem({
      TableName: this.DefaultTableName,
      Key: {
        "uuid": { "S": item.uuid },
        "timestamp": { "S": item.timestamp }
      },
      UpdateExpression: "SET upvotes = :u",
      ExpressionAttributeValues: {
        ":u": { "N": String(count) }
      }
    }, (error) => {
      if (error) {
        console.log(error)
      } else {
        callback(item.uuid.S)
      }
    })
  },
  findByUUID(uuid, callback) {
    ddb.query({
      TableName: this.DefaultTableName,
      KeyConditionExpression: "#u = :id",
      ExpressionAttributeValues: {
        ":id": { 'S': uuid }
      },
      ExpressionAttributeNames: {
        "#u": "uuid" //"uuid" is a reserved name in DynamoDB apparently
      }
    }, callback)
  },
  makeHash(body, head) {
    return md5(body + head + new Date())
  }
}
