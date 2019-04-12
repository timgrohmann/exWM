# Referenzdokument Team ∃WM
## Anordnende Instanz/Projektsponsor
Vorlesung Projektmanagement II/Udo Erdmann (DHBW Mannheim)
## Kunde
mittelständische Softwareentwicklungs-Unternehmen
## Ziele
- auf AWS gehostete, zugreifbare Internetseite
- intuitives, leicht verständliches Interface, das ohne eine Dokumentation verstanden werden kann
- Einträge können in Textform angelegt, durchsucht, angezeigt und bearbeitet werden
- beim Eintragen können Schlagworte hinzugefügt werden
  - bereits vorhandene Schlagworte werden vorgeschlagen
  - optional: kontextbasierte Schlagworte werden vorgeschlagen
- Schlagworte können strukturiert angezeigt werden (Baumdiagramm), wobei zutreffende Einträge angezeigt werden
- optional: Single-Sign-On über Google zur Demonstration der Anbindungsmöglichkeit an betriebsinterne Systeme
- mit dem Beitragsersteller kann kommuniziert werden
  - entweder über Nutzerprofile (eventuell zu aufwendig) oder über Angabe von Mail-Adresse/Telefonnummer bei Erstellung
  - optional: Nutzerprofile wie in Kontaktbuch durchsuchbar
- optional: News bezüglich des Unternehmens werden auf Startseite angezeigt (beispielsweise Weiterbildungen)
- Beiträge können bewertet werden (hilfreich/nicht hilfreich)
- jeder kann einen Artikel bearbeiten und diese Bearbeitung an den Autor zur Überprüfung senden
- Anzeige der neusten bzw. beliebtesten Beiträge
## Limitierungen
Aufgrund der eingeschränkten Zeit (bis Semesterende), der limitierten Teamgröße und der differenzierten Kompetenzverteilung ist das Projekt nur zum MVP entwickelbar.
## Kosten/Budget
Da dieses Projekt im Rahmen eines universitären Vorhabens umgesetzt wird, entfällt dieser Punkt.
## Ressourcen
- 6 Informatik-Studenten
- GitHub (dieses Projekt)
- AWS-Hosting (S3, Pipeline, Datenbanken)
## Ergebnisse
Zwischenergebnisse:
- [x] Projekt auf Github exisitiert
- [x] Code von Github wird von AWS verarbeitet und dort veröffentlicht, auf eine noch inhaltslose Website kann zugegriffen werden
- [ ] ein Eintrag kann angelegt und wieder abgerufen werden
- [ ] ein Eintrag kann bewertet werden
- [ ] (Nutzer können sich anmelden)

Endergebnis: _MVP_ eines Wissensmanagementsystems.
## Projektphasen und Zeitpläne
Zeit | Phase
-|-
bis xx.xx.xx | Planung
ab xx.xx.xx | Umsetzung
## Risiken
siehe [hier](https://github.com/timgrohmann/exWM/blob/master/dokumentation/risikoanalyse.md)
## Strategie
Das Projekt wird cloudbasiert umgesetzt und mit node.js im Backend und Vue im Frontend umgesetzt.
## Annahmen und Hypothesen
- agile Projektarbeit führt zu einer sehr effizienten Umsetzung
## Aufgaben und Zuständigkeiten
siehe Dokument zu Projektrollen