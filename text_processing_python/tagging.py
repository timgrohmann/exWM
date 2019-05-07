import nltk
import operator
import json
from flask import Flask, request

# nltk.download()
text = '''Holz beizen in fünf Schritten

Holz zu beizen ist eigentlich gar nicht so schwer. Es ist sogar sehr einfach – wenn Sie sich an unsere fünf Schritte halten:

    Bevor Sie starten, sollten Sie auf dem gewünschten Holzstück oder Möbel sämtliche Metallbeschläge entfernen. Holzbeizen reagieren mit ihnen, was zu ungewollten Farbunterschieden führen kann.

    Test der Beize: Prüfen Sie an einer nicht sichtbaren Stelle, wie das Holz auf die Beize reagiert. Je nach Holzart kann der Farbton unterschiedlich ausfallen. Gefällt ihnen das Ergebnis nicht, können Sie nun noch reagieren.

    Vorbehandlung: Wässern Sie zunächst die zu beizende Holzoberfläche, damit die Holzporen die Beize später besser aufnehmen können. Tragen Sie dazu lauwarmes Leitungswasser mit einem Schwamm auf. Nach dem Abtrocknen des Holzes können Sie Holzfasern, die sich durch das Wasser aufgestellt haben, mit einem Schleifpapier in 180er Körnung abschmirgeln. Wichtig: Entfernen Sie danach gründlich alle entstandenen Abschleifreste wie Staub und Holzfasern.

    Nun können Sie anfangen: Tragen Sie die gut umgerührte oder geschüttelte Lösung mit einem breiten Pinsel gleichmäßig und satt entlang der Maserung auf. Danach pinseln Sie quer und abschließend wieder längst zur Maserung. Nach einer Antrocknungszeit von etwa einer Viertelstunde sollten Sie überschüssige Beize von der Oberfläche mit einem Lappen entfernen. Fertig.

    Etwa 6 bis 8 Stunden nach dem Auftragen ist die Beize getrocknet. Die Oberfläche ist dann wieder beanspruchbar. Wichtig: Beim Beizen wird das Holz nur gefärbt. Um es vor Feuchtigkeit und Schimmel zu schützen ist es daher empfehlenswert, das Holz anschließend noch mit Lack, Holzöl oder Wachs zusätzlich zu behandeln. Und tragen Sie die Produkte erst auf, nachdem die Beize wirklich vollständig getrocknet ist. Ansonsten ruinieren Sie sich selbst ihre vorherige Arbeit.

'''
ignore = [x.strip().lower() for x in open('./word_ignore.txt').readlines()]


def suggest_tags(text, n=5):
    text = nltk.word_tokenize(text)
    text = nltk.pos_tag(text)

    counts = {}
    for word in text:
        if word in counts:
            counts[word] += 1
        else:
            counts[word] = 1

    return list(reversed([x for (x, y), _ in sorted(counts.items(), key=operator.itemgetter(1))
                          if y == 'NNP' and x.lower() not in ignore]))[:n]


# print(suggest_tags(text))
app = Flask(__name__)


@app.route("/suggest_tags")
def suggest_tags_route():
    print(request.args.get('text'))
    return json.dumps(suggest_tags(request.args.get('text')), ensure_ascii=False)
