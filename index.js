var sendpulse = require("sendpulse-api")
/*
 * https://login.sendpulse.com/settings/#api
 */
var API_USER_ID = process.env.API_USER_ID
var API_SECRET = process.env.API_SECRET
var TOKEN_STORAGE = "/tmp/"

const express = require("express")
var cors = require("cors")

const app = express()
app.use(cors())
app.use(express.json())

app.post("/contact", function (req, response) {
	sendpulse.init(API_USER_ID, API_SECRET, TOKEN_STORAGE, function (token) {
		console.log("your token: " + token)
	})
	var answerGetter = function () {
		console.log("Sended")
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

app.post("/checkout", function (req, response) {
	sendpulse.init(API_USER_ID, API_SECRET, TOKEN_STORAGE, function (token) {
		console.log("your token: " + token)
	})
	var answerGetter = function (data) {
		console.log(data)
		response.send(data)
	}

	var table = function () {
		let str = ""
		if (req.body.productConfig) {
			str += `<table>
	<tr>
		<td>Item name</td>
		<td>Item price</td>
		<td>Item quantity</td>
		<td>Config</td>
	</tr>
	`
			for (let i = 0; i < req.body.productTitles.length; i++) {
				str += `<tr>
			<td>${req.body.productTitles[i]}</td>
			<td>${req.body.productPrices[i]}</td>
			<td>${req.body.productQuantities[i]}</td>
			<td>${req.body.productConfig[i]}</td>
		</tr>`
			}
		} else {
			str += `<table>
		<tr>
			<td>Item name</td>
			<td>Item price</td>
			<td>Item quantity</td>
		</tr>
		`
			for (let i = 0; i < req.body.productTitles.length; i++) {
				str += `<tr>
				<td>${req.body.productTitles[i]}</td>
				<td>${req.body.productPrices[i]}</td>
				<td>${req.body.productQuantities[i]}</td>
			</tr>`
			}
		}

		str += `</table>`
		return str
	}

	var email = {
		text: req.body.phone,
		html: `<b>Name: ${req.body.name}</b>
			<p>Phone: ${req.body.phone}</p>
			<p>Contact email: ${req.body.email}</p>
			<p>Country: ${req.body.country}</p>
			<p>Total Price: ${req.body.total}</p>
			<p>Product Table: </p>
			${table()}`,
		subject: "Shop Message",
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
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`app listening port ${port}`))
