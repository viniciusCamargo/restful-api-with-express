'use strict'

let mongoose = require('mongoose')
let Schema = mongoose.Schema

let FruitSchema = new Schema({
  _id: Schema.Types.ObjectId,
  _creator: { type: Schema.Types.ObjectId, ref: 'Bear' },
  name: String
})

module.exports = mongoose.model('Fruit', FruitSchema)
