const express = require('express')
const body_parser = require('body-parser')
const ShortUniqueId = require('short-unique-id')
const qr = require('qr-image');

// const svg_string = qr.imageSync('I love QR!', { type: 'svg' });

const uid = new ShortUniqueId({ length: 7 });

const app = express()
app.use(body_parser())
const PORT = 5000

app.get('/', (req, res) => {
    res.send('Hello world!')
})

app.post('/business_info', (req, res) => {
    const {firstName, lastName, phoneNumber, email, message} = req.body
    if(email.slice(email.length - 4) !== '.com') {
        res.statusCode = 404
        throw Error('invalid email format')
    }

    const id = uid()
    const qr_svg = qr.image(id, { type: 'png' });
    qr_svg.pipe(require('fs').createWriteStream(`qrcodes/${id}.png`));
    console.log(`Id is ${id}`)

    res.end(`response =  { "link": "<http://bus.me/${id}" }`)

})

app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`)
})
