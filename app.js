const cors = require('cors');
const express = require('express');
require('dotenv').config();
const sgMail = require('@sendgrid/mail');
const bodyParser = require('body-parser');
sgMail.setApiKey(process.env.REACT_APP_SENDGRID_API_KEY );

const app = express();

app.use(cors());

//body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());

app.post('/counter-register', (req, res) => {
    const {email} = req.body.details;

    // model message to be sent
    const msg = {
        to: email,
        from: 'nodenkey@gmail.com',
        templateId: process.env.REACT_APP_TEMPLATE_ID,
        subject: 'Sending with SendGrid is Fun',
    }

    sgMail.send(msg).then(() => {
        console.log('Email sent');
        res.sendStatus(200);
    })
        .catch((error) => {
            res.status(500).send(error);
        })
    ;
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));