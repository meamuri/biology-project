query:
```javascript
db.getCollection('species').aggregate([
  { $group : { 
      '_id' : '$family.name',
     'speciesCount': { $sum: 1 } 
  }}
]).toArray().forEach(e => {
    print(e._id.toString() + ':' + e.speciesCount)  
})
```

output (at 17.06.2020):
```
Cyperaceae:14
Ericaceae:4
Pyrolaceae:4
Rosaceae:4
Campanulaceae:3
Lentibulariaceae:1
Linaceae:1
Polypodiaceae:1
Gentianaceae:2
Melanthiaceae:2
Cruciferae:10
Onocleaceae:1
Umbelliferae:11
Asclepiadaceae:2
Gramineae:16
Potamogetonaceae:3
Rubiaceae:1
Pinaceae:1
Parnassiaceae:1
Trapaceae:1
Araceae:1
Scrophulariaceae:5
Polemoniaceae:1
Hyacinthaceae:3
Asteraceae:20
Caryophyllaceae:7
Lycopodiaceae:4
Ranunculaceae:13
Salicaceae:1
Limoniaceae:5
Scheuchzeriaceae:1
Iridaceae:6
Chenopodiaceae:7
Liliaceae:7
Ephedraceae:1
Cistaceae:2
Cupressaceae:1
Trilliaceae:1
Ophioglossaceae:4
Rutaceae:1
Urticaceae:1
Boraginaceae:7
Orchidaceae:19
Alliaceae:5
Najadaceae:1
Paeoniaceae:1
Droseraceae:2
Convolvulaceae:1
Ceratophyllaceae:1
Dipsacaceae:2
Fabaceae:16
Primulaceae:4
Labiatae:5
```
