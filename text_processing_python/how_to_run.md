Installation
```pip install -r requirements.txt```

in python execute:
```python
import nltk
nltk.download_shell()
d
punkt
q
quit()
```

### Then in a terminal:
```FLASK_APP=tagging.py flask run```


im Browser (Beispiel):
```localhost:5000/suggest_tags?text=Lange Wörter werden vom Algorithmus bevorzugt. Zum Beispiel sollte Eisenbahnverkehrsunternehmen eherangezeigt werden, als beispielsweise Gusseisen. Außerdem werden Abkürzungen, also Wörter mit vielenGroßbuchstaben bevorzugt. Beispiele: EVU, UmStG, SozSichAbkÄndAbk2ZAbkTURG. Abkürzungen, die häufiger auftreten werden dabei priotisiert. So sollte EVU höher angesiedelt sein als ICE, da es bereitseinmal auftrat. Um zu demonstrieren, dass auch unhilfreiche Worte ignoriert werden können, wird im folgenden ein unsinniger Tag, der vollkomen selbstverstädlich ist, oft wiederholt: Kündigungsgrund Kündigungsgrund Kündigungsgrund Kündigungsgrund Kündigungsgrund Kündigungsgrund Kündigungsgrund```

### Erste Request:
```["SozSichAbkÄndAbk2ZAbkTURG", "EVU", "ICE", "UmStG", "Kündigungsgrund", "Wörter", "Tag", "Worte", "So", "Abkürzungen"]```

To evaluate tags:
```localhost:5000/evaluate_tags?helpful=['UmStG', 'ICE', 'Eisenbahnverkehrsunternehmen']&useless=['SozSichAbkÄndAbk2ZAbkTURG', 'Kündigungsgrund', 'Wörter', 'Worte']```

### Request nach Evaluation:
```["EVU", "ICE", "UmStG", "SozSichAbkÄndAbk2ZAbkTURG", "Tag", "So", "Abkürzungen", "Beispiele", "Gusseisen", "Eisenbahnverkehrsunternehmen"]```

Es ist also ersichtlich, dass Der Unhilfreiche Tag SozSichAbkÄndAbk2ZAbkTURG weiter nach hinten gerückt ist.