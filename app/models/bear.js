'use strict'

let mongoose = require('mongoose')
let Schema = mongoose.Schema

let BearSchema = new Schema({
  _id: Schema.Types.ObjectId,
	name: String,
})

module.exports = mongoose.model('Bear', BearSchema)
