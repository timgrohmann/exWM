import nltk
import operator
import json
from flask import Flask, request
from german_tagging import doit
import flask_cors
import ast
from tuple_flatten import flatten
import boto3
import decimal

# nltk.download()
dynamodb = boto3.resource('dynamodb')
print(dynamodb)
'''print(dynamodb.(RequestItems={
    'string': {
        'Keys': [
            {
                'uuid': '6b2f0b793a20b74e170530960064ddc3'
            }
        ],
        'AttributesToGet': [
            'uuid',
        ]
    }
}))'''

# client = boto3.client('dynamodb')
# print(client)
tag_table = dynamodb.Table('ExwmKeywords')
# print(tag_table)
# print(tag_table.scan())

# print(tag_table.get_item(Key={'keyword': 'Laktoseintoleranz'}))
print(tag_table.scan())


def delete_all(tag_table):
    for pk in tag_table.scan()['Items']:
        tag_table.delete_item(
            Key={'keyword': pk['keyword']}
        )
# delete_all(tag_table)

app = Flask(__name__)
flask_cors.CORS(app)


@flask_cors.cross_origin()
@app.route("/suggest_tags")
def suggest_tags_route():
    print(request.args.get('text'))
    return json.dumps(doit(request.args.get('text'), tag_table), ensure_ascii=False)


@app.route('/')
def handle():
    return 'Hello World from Flask!'


@flask_cors.cross_origin()
@app.route('/evaluate_tags')
def evaluate_tags():
    helpful = ast.literal_eval(request.args.get('helpful'))
    useless = ast.literal_eval(request.args.get('useless'))

    print('Helpful:', helpful, 'Useless:', useless)

    for key in useless + helpful:
        try:
            tag_table.update_item(
                Key={
                    'keyword': key
                },
                UpdateExpression="set evaluation.suggestion_count = evaluation.suggestion_count + :val",
                ExpressionAttributeValues={
                    ':val': decimal.Decimal(1)
                }
            )
        except Exception as e:
            print(e, e.args)
            tag_table.put_item(
                Item={
                    'keyword': key,
                    'evaluation': {
                        'helpfulness': 0,
                        'suggestion_count': 1
                    }
                }
            )

        if key in helpful:
            tag_table.update_item(
                Key={
                    'keyword': key
                },
                UpdateExpression="set evaluation.helpfulness = evaluation.helpfulness + :val",
                ExpressionAttributeValues={
                    ':val': decimal.Decimal(1)
                }
            )

    print('Tag Table Scan:', tag_table.scan())
    # with open('relevances.txt', 'w+') as fout:
    #    for k, v in rels.items():
    #        fout.write('"' + k + '": ' + str(v) + ',\n')
    return 'Thank you for your feedback'
# print(suggest_tags(text=open('example_text.txt').read(), n=10))
