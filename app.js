const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path')
const compression = require('compression');
const hsts = require('hsts');
const fs = require('fs');
const helmet = require('helmet');
const https = require('https');
const expressEnforceSSL = require('express-enforces-ssl');


const app  = express();
const port = process.env.PORT || 5000;

app.use(helmet())

// Instantiating HTTPS server
var options = {
  "key": fs.readFileSync('./https/key.pem'),
  "cert": fs.readFileSync('./https/cert.pem')

}

// View engine setup
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.set('trust proxy', true);
app.set('views', __dirname + '/views');

//  ######### Middleware ############

app.enable('trust proxy')
app.use(expressEnforceSSL())

app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())

app.use(hsts({
  maxAge: 15552000  // 180 days in seconds
}))

app.use(compression())

//  ######### Middleware ############

// Static folder
app.use('/public', express.static(path.join(__dirname, 'public')));


// ################ Page Routes ############################

app.get('/',(req,res)=>{
  res.render('index',{layout:false})
})
app.get('/team',(req,res)=>{
  res.render('team',{layout:false})
})

app.get('/about',(req,res)=>{
  res.render('about',{layout:false})
})

app.get('/contact',(req,res)=>{
  res.render('contact',{layout:false})
})

app.get('/single',(req,res)=>{
  res.render('single-blog',{layout:false})
})

app.get('/search',(req,res)=>{
  res.render('search',{layout:false})
})

app.get('/blog',(req,res)=>{
  res.render('blog',{layout:false})
})

app.get('/support',(req,res)=>{
  res.render('Support',{layout:false})
})

// ################ End - Page Routes ############################


// ################ Form Processing ############################
app.post('/register',(req,res)=>{
  console.log(req.body);
})

app.post('/comment',(req,res)=>{
  console.log(req.body);
})

app.post('/search',(req,res)=>{
  console.log(req.body);
})

app.post('/contact',(req,res)=>{
  console.log(req.body.email);
})



// ################ End - Form Procesing ############################
// app.listen(port, ()=>{
//   console.log(`serving on port ${port}`);
// });

app.listen(port);

https.createServer(options, app).listen(port,()=>{
  console.log(`serving on port ${port}`);
});
