const express = require('express');
const routes = express.Router();
const bodyParser = require('body-parser')
const fetch = require('node-fetch');

const btcController = require('./btcController');
const urlencodedParser = bodyParser.urlencoded({ extended: false })

routes.get('/rate', async (req, res) => {
    try {
        const response = await fetch("https://api.coinbase.com/v2/prices/spot?currency=UAH");

        if (!response.ok) {
            return res.status(400).send("Cannot get data from API");
        }

        const result = await response.json();
        return res.status(200).send({status: 'success', data: result.data});
    } catch (err) {
        return res.status(500).send("Try again later");
    }
})

routes.post('/subscribe', urlencodedParser, (req, res) => {
    try {
        btcController.addEmail(req.body.email, (err, user) => {
            if (err) {
                return res.status(409).send(err);
            } else {
                return res.status(200).send({status: 'success', data: user});
            }
        })
    } catch (error) {
        return res.status(500).send("Try again later");
    }
})

routes.post('/sendEmails', async (req, res) => {
    try {
        const response = await fetch("https://api.coinbase.com/v2/prices/spot?currency=UAH");

        if (!response.ok) {
            return res.status(400).send("Cannot get data from API");
        }

        const result = await response.json();
        btcController.getEmails(async (err, emails) => {
            if (err) {
                return res.status(400).send(err);
            } else {
                try {
                    for (let i = 0; i < emails.length; i++) {
                        await btcController.sendEmail(emails[i], result);
                    }
                    return res.status(200).send({status: 'success', Sent_to: emails});
                } catch (err) {
                    return res.status(400).send(err);
                }

            }
        })

    } catch (err) {
        return res.status(500).send("Try again later");
    }
})

module.exports = routes;