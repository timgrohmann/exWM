#Datenmodelle
##Entry
Ein Entry beschreibt einen Eintrag in unserem Wissensmanagementsystem.

``` 
{
    uuid: (String) Eine eindeutige Bezeichnung für den Eintrag (Primary Key),
    timestap: (String) Der Timestamp ist ein Timestamp im UNIX Format,
    body: (String) Inhalt des Eintrags,
    headline: (String) Ist die Überschrift des Eintrags,
    upvotes: number,
    downvotes: number,
    keyword: string[],
} 
```
Mehr hierzu in item.d.ts
