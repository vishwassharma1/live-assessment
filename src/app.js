const express = require('express');
const bodyParser  = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const routes = require('./Routes')
const {upload} = require('./middlewares/fileUpload')
const cors = require('cors');

app.use(cors())
app.options('*', cors());


app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }))

mongoose.connect('mongodb+srv://vsharma7100:BSA%40vish%40123@nodeapp.pioapum.mongodb.net/live-test?retryWrites=true&w=majority&appName=nodeApp',{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

const db = mongoose.connection

db.on('error',(error)=>console.error(error))

db.once('open',()=>console.log('db is connected'))

app.use('/',routes)
app.post('/upload', upload.single('profile'), (req, res) => {
    res.redirect('/upload');
    res.json({data: "success"})
})
app.listen(3000,()=>console.log('server is running on port 3000'))