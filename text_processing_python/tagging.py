import nltk
import operator
import json
from flask import Flask, request
from german_tagging import doit
import flask_cors
import ast
from tuple_flatten import flatten

# nltk.download()
text = open('example_text.txt').read()



app = Flask(__name__)
flask_cors.CORS(app)


@flask_cors.cross_origin()
@app.route("/suggest_tags")
def suggest_tags_route():
    print(request.args.get('text'))
    return json.dumps(doit(request.args.get('text')), ensure_ascii=False)


@app.route('/')
def handle():
    return 'Hello, World from Flask!'


@flask_cors.cross_origin()
@app.route('/evaluate_tags')
def evaluate_tags():
    helpful = ast.literal_eval(request.args.get('helpful'))
    useless = ast.literal_eval(request.args.get('useless'))

    print('Helpful:', helpful, 'Useless:', useless)

    with open('relevances.txt', 'r') as fin:
        rels = ast.literal_eval('{' + fin.read() + '}')

    for key in helpful:
        helpf, cnt = rels.get(key, (0, 0))
        rels[key] = flatten((helpf, cnt), (1, 1))

    for key in useless:
        helpf, cnt = rels.get(key, (0, 0))
        rels[key] = flatten((helpf, cnt), (0, 1))

    with open('relevances.txt', 'w+') as fout:
        for k, v in rels.items():
            fout.write('"' + k + '": ' + str(v) + ',\n')

    return 'Thank you for your feedback'

# print(suggest_tags(text=open('example_text.txt').read(), n=10))
