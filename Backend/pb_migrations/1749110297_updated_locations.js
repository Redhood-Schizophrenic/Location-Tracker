/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1942858786")

  // add field
  collection.fields.addAt(1, new Field({
    "hidden": false,
    "id": "json2675529103",
    "maxSize": 0,
    "name": "start",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "json"
  }))

  // add field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "json3706926091",
    "maxSize": 0,
    "name": "current",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "json"
  }))

  // add field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "json16528305",
    "maxSize": 0,
    "name": "end",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "json"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1942858786")

  // remove field
  collection.fields.removeById("json2675529103")

  // remove field
  collection.fields.removeById("json3706926091")

  // remove field
  collection.fields.removeById("json16528305")

  return app.save(collection)
})
