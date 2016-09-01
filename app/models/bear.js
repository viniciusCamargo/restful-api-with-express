'use strict'

let mongoose = require('mongoose')
let Schema = mongoose.Schema

let BearSchema = new Schema({
	name: String,
  fruits: Array
})

// let FruitSchema = new Schema({
//   _creator: { type: Number, ref: 'Bear' },
//   name: String
// })

// module.exports = mongoose.model('Fruit', FruitSchema)
module.exports = mongoose.model('Bear', BearSchema)
