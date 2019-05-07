import * as md5 from "md5"
import * as AWS from "aws-sdk"
import { EntryItem } from "./declarations/item"
import { AttributeMap, AttributeValue, ExpressionAttributeValueMap } from "aws-sdk/clients/dynamodb";
import { AWSError } from "aws-sdk";

AWS.config.region = 'eu-west-1'; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: 'eu-west-1:7c77cf43-a78c-40cd-a3c3-9ca2a0da7330',
});
var ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

export default {
  DefaultTableName: 'ExwmEntries',
  getAll(callback: ((err: AWS.AWSError | null, data: EntryItem[]) => void)) {
    ddb.scan({ TableName: this.DefaultTableName }, (error, data) => {
      if (error) {
        callback(error, [])
      } else if (data.Items) {
        callback(null, data.Items.map(itemFromAWSRepresentation))
      }
    })
  },
  insertNew(item: EntryItem, callback: ((arg0: string) => void) | null = null) {
    ddb.putItem({
      TableName: this.DefaultTableName,
      Item: itemToAWSRepresentation(item)
    }, (error) => {
      if (error) {
        console.log(error)
      } else if (callback) {
        callback(item.uuid)
      }
    })
  },
  incrementUpvotes(item: EntryItem, callback: (err: AWSError) => void) {
    this.updateItem(item, "ADD upvotes :u", {
      ":u": { "N": "1" }
    }, callback)
  },
  incrementDownvotes(item: EntryItem, callback: (err: AWSError) => void) {
    this.updateItem(item, "ADD downvotes :u", {
      ":u": { "N": "1" }
    }, callback)
  },
  updateItem(item: EntryItem, updateExpression: string, expressionAttributeValues: ExpressionAttributeValueMap, callback: (err: AWSError) => void) {
    ddb.updateItem({
      TableName: this.DefaultTableName,
      Key: {
        "uuid": { "S": item.uuid },
        "timestamp": { "S": item.timestamp }
      },
      UpdateExpression: updateExpression,
      ExpressionAttributeValues: expressionAttributeValues
    }, callback)
  },
  findByUUID(uuid: string, callback: ((err: AWS.AWSError | null, item: EntryItem | null) => void)) {
    ddb.query({
      TableName: this.DefaultTableName,
      KeyConditionExpression: "#u = :id",
      ExpressionAttributeValues: {
        ":id": { 'S': uuid }
      },
      ExpressionAttributeNames: {
        "#u": "uuid" //"uuid" is a reserved name in DynamoDB apparently
      }
    }, (err, data) => {
      if (err) {
        callback(err, null)
      } else if (data && data.Items && data.Items[0]) {
        callback(null, itemFromAWSRepresentation(data.Items[0]))
      }
    })
  },
  makeHash(body: string, head: string) {
    return md5(body + head + new Date())
  }
}


function itemToAWSRepresentation(item: EntryItem): AttributeMap {
  let out: AttributeMap = {}
  Object.entries(item).forEach(element => {
    let typeName = ""
    switch (typeof element[1]) {
      case "string":
        typeName = "S"
        break
      case "number":
        typeName = "N"
        break
      case "boolean":
        typeName = "B"
        break
      default:
        typeName = "S"
        break
    }
    let entry: any = {}
    entry[typeName] = String(element[1])
    out[element[0]] = entry as AttributeValue
  })
  return out
}

function itemFromAWSRepresentation(aws: AttributeMap): EntryItem {
  let out: any = {}
  Object.entries(aws).forEach(element => {
    let key = element[0]
    let value = element[1]

    if (value.S) {
      out[key] = value.S
    } else if (value.N) {
      out[key] = parseInt(value.N, 0)
    }
  })
  return out
}
