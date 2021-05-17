var sendpulse = require("sendpulse-api")
/*
 * https://login.sendpulse.com/settings/#api
 */
var API_USER_ID = "d9f68537207838915515538643ed987e"
var API_SECRET = "ef199afd79484fbdf48b6649eda00700"
var TOKEN_STORAGE = "/tmp/"

const express = require("express")
const bodyParser = require("body-parser")
var cors = require("cors")

const app = express()
app.use(bodyParser.json(), cors())

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
	sendpulse.smtpSendMail(answerGetter, email)
	response.sendStatus(200)
})
const port = process.env.port // || 3000
app.listen(port, () => console.log(`app1 listening port ${port}`))
