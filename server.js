'use strict'

let express = require('express')
let bodyParser = require('body-parser')
let morgan = require('morgan')
let mongoose = require('mongoose')

let app = express()

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/'))

let port = process.env.PORT || 3000

mongoose.connect('mongodb://localhost:27017/bears-db')

let router = express.Router()

router.use((req, res, next) => {
	console.log('Something is happening.')
	next()
})

router.get('/', (req, res) => {
	res.sendFile('index.html')
	res.json({ message: 'hooray! welcome to our api!' })
})

let Bear = require('./app/models/bear')

router.route('/bears')
	.post((req, res) => {
		let bear = new Bear()
		bear.name = req.body.name

		bear.save((err) => {
			if (err)
				res.send(err)

			res.json({ message: 'Bear created!' })
		})
	})
	.get((req, res) => {
		Bear.find((err, bears) => {
			if (err)
				res.send(err)

			res.json(bears)
		})
	})

router.route('/bears/:bear_id')
	.get((req, res) => {
		Bear.findById(req.params.bear_id, (err, bear) => {
			if (err)
				res.send(err)

			res.json(bear)
		})
	})
	.post((req, res) => {
		Bear.findById(req.params.bear_id, (err, bear) => {
			if (err)
				res.send(err)

			bear.name = req.body.name

			bear.save((err) => {
				if (err)
					res.send(err)

				res.json({ message: 'Bear updated!' })
			})
		})
	})
	.delete((req, res) => {
		Bear.remove({
			_id: req.params.bear_id
		}, (err, bear) => {
			if (err)
				// res.send(err)
				res.send('oe')

			res.json({ message: 'Successfully deleted' })
		})
	})

// let Fruit = require('./app/models/bear')
router.route('/bears/:bear_id/fruits')
	.post((req, res) => {
		Bear.findById(req.params.bear_id, (err, bear) => {
			if (err)
				res.send(err)

			// console.log(req.body.name)
			bear.fruits.push( {name: req.body.name} )

			bear.save((err) => {
				if (err)
					res.send(err)

				res.json({ message: 'Fruits added!' })
			})
		})
	})
// router.route('/bears/:bear_id/fruits')
// 	.post((req, res) => {
// 		bear.fruits = req.body.fruits

// 		bear.save((err) => {
// 			if (err)
// 				res.send(err)

// 			res.json({ message: 'Fruit created!' })
// 		})
// 	})
// 	.get((req, res) => {
// 		Fruit.find((err, fruit) => {
// 			if (err)
// 				res.send(err)

// 			res.json(fruit)
// 		})
// 	})

// router.route('/bears/:bear_id/fruits/:fruit_id')


app.use('/api', router)

app.listen(port)
console.log('Magic happens on port ' + port)
