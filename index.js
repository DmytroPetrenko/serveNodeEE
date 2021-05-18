var sendpulse = require("sendpulse-api")
/*
 * https://login.sendpulse.com/settings/#api
 */
var API_USER_ID = process.env.API_USER_ID
var API_SECRET = process.env.API_SECRET
var TOKEN_STORAGE = "/tmp/"

const express = require("express")
const bodyParser = require("body-parser")
var cors = require("cors")

const app = express()
app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))

app.post("/contact", function (req, response) {
	sendpulse.init(API_USER_ID, API_SECRET, TOKEN_STORAGE, function (token) {
		console.log("your token: " + token)
	})
	console.log("User ID: " + API_USER_ID)
	var answerGetter = function () {
		console.log("Sended")
	}
	console.log(req.body)
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
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`app listening port ${port}`))
