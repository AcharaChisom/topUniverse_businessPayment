const express = require('express')
const ShortUniqueId = require('short-unique-id')
const qr = require('qr-image');
const {createDirIfNotExists} = require('./helper')

const app = express()
app.use(express.json())

// application running PORT
const PORT = process.env.PORT || 5000



// base route
app.get('/', (req, res) => {
    res.send('Hello world!')
})

app.post('/businessLink', async (req, res) => {
    // always verify your data
	
	const {firstName, lastName, phoneNumber, email, message} = req.body
	
	// if you want to use this style, then 
	// transform the email to small case first.
	
    if(email.slice(email.length - 4) !== '.com') {
        res.statusCode = 404
        throw Error('invalid email format')
    }

    const ID = new ShortUniqueId({ length: 7 });
	let UniqueID = ID()
    
	const qrSvg = qr.image(UniqueID, { type: 'png' });
	
	// make a new directory if it does 
	// not exist using out helper function
	createDirIfNotExists('qrcodes')
	
    qrSvg.pipe(require('fs').createWriteStream(`qrcodes/${UniqueID}.png`));
	
    res.json({link: `http://bus.me/${UniqueID}`}).end()

})



app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`)
})
