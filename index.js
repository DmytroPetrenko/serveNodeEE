/* 


"use strict"
//const nodemailer = require("nodemailer")
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")

const app = express()

//const urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.json(), cors()) */

/* app.post("/contact", function (request, response) {
	if (!request.body) return response.sendStatus(400)
	console.log(request.body)
	// async..await is not allowed in global scope, must use a wrapper
	async function main() {
		// create reusable transporter object using the default SMTP transport
		let transporter = nodemailer.createTransport({
			host: "smtp.gmail.com",
			port: 587,
			secure: false, // true for 465, false for other ports
			auth: {
				user: "eemailsender1@gmail.com", // generated ethereal user
				pass: "electricengines1", // generated ethereal password
			},
		})

		// send mail with defined transport object
		let info = await transporter.sendMail({
			from: `${request.body.name} <${request.body.email}>`, // sender address
			to: "electricenginescar@gmail.com", // list of receivers
			subject: "Contact Form Message", // Subject line
			text: request.body.message, // plain text body
			phone: request.body.phone,
			html: `<b>Name: ${request.body.name}</b>
      <p>Phone: ${request.body.phone}</p>
      <p>Contact email: ${request.body.email}</p>
      <p>Message: ${request.body.message}</p>`, // html body
		})

		console.log("Message sent: %s", info.messageId)
		// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
	}

	main().catch(console.error)
	//response.status(200)
}) */
/* 
var sendpulse = require("./api/sendpulse.js")
sendpulse.init(d9f68537207838915515538643ed987e, ef199afd79484fbdf48b6649eda00700, TOKEN_STORAGE)

var email = {
	html: "<p>Your email content goes here</p>",
	text: "Your email text version goes here",
	subject: "Testing SendPulse API",
	from: {
		name: "Your Sender Name",
		email: "your-sender-email@gmail.com",
	},
	to: [
		{
			name: "Subscriber's name",
			email: "subscriber@gmail.com",
		},
	],
}
var answerGetter = function answerGetter(data) {
	console.log(data)
}
sendpulse.smtpSendMail(answerGetter, email)

const port = process.env.port || 3000
app.listen(port, () => console.log(`app listening port ${port}`))
 */
/* const express = require("express")
const bodyParser = require("body-parser")

const app = express()
const urlencodedParser = bodyParser.urlencoded({ extended: false }) */

var sendpulse = require("sendpulse-api")
/*
 * https://login.sendpulse.com/settings/#api
 */
var API_USER_ID = "d9f68537207838915515538643ed987e"
var API_SECRET = "ef199afd79484fbdf48b6649eda00700"
var TOKEN_STORAGE = "/tmp/"

/* app.post("/contact", urlencodedParser, function (request, response) {
	if (!request.body) return response.sendStatus(400)
	sendpulse.init(API_USER_ID, API_SECRET, TOKEN_STORAGE, function (token) {
		console.log("your token: " + token)
	})
	var answerGetter = function (data) {
		console.log(data)
	}

	var email = {
		html: `<b>Name: ${request.body.name}</b>
		<p>Phone: ${request.body.phone}</p>
		<p>Contact email: ${request.body.email}</p>
		<p>Message: ${request.body.message}</p>`,
		text: request.body.message,
		subject: "Contact Form Message",
		from: {
			name: "Electric Engines",
			email: "shop@electricengines.com.ua",
		},
		to: [
			{
				name: "Electric Engines",
				email: "electricenginescar@gmail.com",
			},
		],
	}
	sendpulse.smtpSendMail(answerGetter, email)
	return response.sendStatus(answerGetter)
})

const port = process.env.port || 3000
app.listen(port, () => console.log(`app listening port ${port}`)) */

const express = require("express")
const bodyParser = require("body-parser")
var cors = require("cors")

const app = express()
app.use(bodyParser.json(), cors())

//const urlencodedParser = bodyParser.urlencoded({ extended: false })
app.post("/contact", function (req, response) {
	sendpulse.init(API_USER_ID, API_SECRET, TOKEN_STORAGE, function (token) {
		console.log("your token: " + token)
	})
	var answerGetter = function (data) {
		console.log(data)
	}

	var email = {
		text: req.body.message,
		html: `<b>Name: ${req.body.name}</b>
			<p>Phone: ${req.body.phone}</p>
			<p>Contact email: ${req.body.email}</p>
			<p>Message: ${req.body.message}</p>`,
		subject: "Contact Form Message",
		from: {
			name: "Electric Engines",
			email: "shop@electricengines.com.ua",
		},
		to: [
			{
				name: "Electric Engines",
				email: "electricenginescar@gmail.com",
			},
		],
	}
	console.log(email)
	sendpulse.smtpSendMail(answerGetter, email)
	response.sendStatus(200)
})
const port = process.env.port || 3000
app.listen(port, () => console.log(`app listening port ${port}`))
