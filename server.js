'use strict'

// BASE SETUP
let express = require('express')
let bodyParser = require('body-parser')
let app = express()
let morgan = require('morgan')

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

let router = express.Router()

router.use((req, res, next) => {
	console.log('Something is happening.')
	next()
})

router.get('/', (req, res) => {
	res.json({ message: 'hooray! welcome to our api!' })
})


let port = process.env.PORT || 3000
app.listen(port)
console.log('Magic happens on port ' + port)

// MODEL SETUP
let mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/Iganiq8o')

let Bear = require('./app/models/bear')


router.get('/', (req, res) => {
	res.json()
})

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

	.put((req, res) => {
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


app.use('/api', router)