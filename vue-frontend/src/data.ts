import * as md5 from "md5"
import * as AWS from "aws-sdk"
import { EntryItem } from "./declarations/item"
import { AttributeMap, AttributeValue } from "aws-sdk/clients/dynamodb";
import { AWSError } from "aws-sdk";

AWS.config.region = 'eu-west-1'; // Region
if (AWS.config.credentials == null) { //would reset other credentials otherwise
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'eu-west-1:7c77cf43-a78c-40cd-a3c3-9ca2a0da7330',
  })
}

var ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });
const document = new AWS.DynamoDB.DocumentClient({ service: ddb })

export default {
  DefaultTableName: 'ExwmEntries',
  TagTableName: 'ExwmKeywords',
  getAll(callback: ((err: AWS.AWSError | null, data: EntryItem[]) => void)) {
    document.scan({ TableName: this.DefaultTableName }, (error, data) => {
      if (error) {
        callback(error, [])
      } else if (data.Items) {
        callback(null, data.Items as EntryItem[])
      }
    })
  },
  insertNew(item: EntryItem, callback: ((arg0: string) => void) | null = null) {
    document.put({
      TableName: this.DefaultTableName,
      Item: item
    }, (error) => {
      if (error) {
        console.log(error)
      } else if (callback) {
        callback(item.uuid)
      }
    })
  },
  insertNewTag(item: string, callback: (err: AWSError | null) => void) {
    document.put({
      TableName: this.TagTableName,
      Item: {
        keyword: item
      }
    }, (error) => {
      callback(error)
    })
  },
  incrementUpvotes(item: EntryItem, callback: (err: AWSError) => void) {
    this.updateItem(item, "ADD upvotes :u", {
      ":u": 1
    }, callback)
  },
  incrementDownvotes(item: EntryItem, callback: (err: AWSError) => void) {
    this.updateItem(item, "ADD downvotes :u", {
      ":u": 1
    }, callback)
  },
  deleteEntry(item: EntryItem, callback: (err: AWSError) => void) {
    document.delete({
      TableName: this.DefaultTableName,
      Key: {
        "uuid": item.uuid,
        "timestamp": item.timestamp
      }
    }, (err, _) => {
      callback(err)
    })
  },
  updateEntryText(item: EntryItem, newHeadline: string, newBody: string, newKeyword:string, callback: (err: AWSError) => void) {
    this.updateItem(item, "SET body = :b, headline = :h, keyword = :k", {
      ":b": newBody,
      ":h": newHeadline,
      ":k": newKeyword
    }, callback)
  },
  addComment(item: EntryItem, comment: Object, callback: (err: AWSError) => void) {
    this.updateItem(item, "SET comments = list_append(comments, :c)", {
      ":c": [comment]
    }, callback)
  },
  deleteComment(item: EntryItem, index: number, callback: (err: AWSError) => void) {
    this.updateItem(item, "REMOVE comments[" + String(index) + "]", undefined, callback)
  },
  updateItem(item: EntryItem, updateExpression: string, expressionAttributeValues: AWS.DynamoDB.DocumentClient.ExpressionAttributeValueMap | undefined, callback: (err: AWSError) => void) {
    document.update({
      TableName: this.DefaultTableName,
      Key: {
        "uuid": item.uuid,
        "timestamp": item.timestamp
      },
      UpdateExpression: updateExpression,
      ExpressionAttributeValues: expressionAttributeValues
    }, callback)
  },
  findByUUID(uuid: string, callback: ((err: AWS.AWSError | null, item: EntryItem | null) => void)) {
    document.query({
      TableName: this.DefaultTableName,
      KeyConditionExpression: "#u = :id",
      ExpressionAttributeValues: {
        ":id": uuid
      },
      ExpressionAttributeNames: {
        "#u": "uuid" //"uuid" is a reserved name in DynamoDB apparently
      }
    }, (err, data) => {
      if (err) {
        callback(err, null)
      } else if (data && data.Items && data.Items[0]) {
        callback(null, data.Items[0] as EntryItem)
      }
    })
  },
  makeHash(body: string, head: string) {
    return md5(body + head + new Date())
  },
  /*TAGS*/
  /**
   * Returns all tags in a string array
   */
  getAllTags(callback: (data: string[]) => void) {
    return document.scan({ TableName: this.TagTableName }, (err, data) => {
      if (err || data.Items == undefined) {
        console.log("Scanning error (tags)", err)
        callback([])
        return
      }
      callback(data.Items.map(x => x.keyword))
    })
  },
  tags_text: [],
  tag_text(t: string) {
    const http = new XMLHttpRequest()
    const url = 'https://exwm.timgrohmann.de/nlp/suggest_tags?text=" ' + t + ' "'

    http.open("GET", url)
    http.send("")
    http.onreadystatechange = e => {
      if( http.responseText != ""){
        this.tags_text = JSON.parse(http.responseText)
        console.log(this.tags_text)
      }
    }
  },

  evaluate_tags(helpful: Array<string>, useless: Array<string>){
    const http = new XMLHttpRequest()
    const url = 'https://exwm.timgrohmann.de/nlp/evaluate_tags?helpful="' + helpful + '"&useless="' + useless + '"'

    http.open("GET", url)
    http.send()
    http.onreadystatechange = e => {
      return //console.log("This is the response: ", http.responseText)
    }
  }
}
