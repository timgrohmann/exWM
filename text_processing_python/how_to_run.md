pip install -r requirements.txt

FLASK_APP=tagging.py flask run

in python execute:
import nltk
nltk..download_gui()
under models select punkt and download it

im Browser (Beispiel):
http://localhost:5000/suggest_tags?text="Holz ist so toll. Man kann es schleifen, und schneiden. Kaltgerätekabel. Kühlschrank. Porzellanfliesen"

To evaluate tags:
localhost:5000/evaluate_tags?useless=[]&helpful=[]
where strings in quotes are put into the list

these words are then added to relevances.txt and determine their scores

Abbreviations like EVU are preferred as well as longer words like Eisenbahnverkehrsunternehmen