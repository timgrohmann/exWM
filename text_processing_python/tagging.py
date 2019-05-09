import nltk
import operator
import json
from flask import Flask, request
from german_tagging import doit
import flask_cors

# nltk.download()
text = open('example_text.txt').read()


def suggest_tags(text, n=20):
    text = doit(text)
    print(text)
    counts = {}
    for word in text:
        if word in counts:
            counts[word] += 1
        else:
            counts[word] = 1
    res = list(reversed([x for x, y in sorted(counts.items(), key=operator.itemgetter(1))]))[:n]
    print('das ist das ergebnis:')
    print(res)
    return res

app = Flask(__name__)
flask_cors.CORS(app)

@flask_cors.cross_origin()
@app.route("/suggest_tags")
def suggest_tags_route():
    print(request.args.get('text'))
    return json.dumps(suggest_tags(request.args.get('text')), ensure_ascii=False)


@app.route('/')
def handle():
    return 'Hello, World from Flask!'

# print(suggest_tags(text=open('example_text.txt').read(), n=10))