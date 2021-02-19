const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.use(express.static(publicPath));

app.set('view engine', 'hbs');
app.set('views', viewsPath);

hbs.registerPartials(partialsPath);

const madeby = 'Marco Fidalgo';
const usename = 'Marco';

app.get('',(req,res) => {
    res.render('index', {
        title: 'Weatherapp',
        nome: usename,
        owner: madeby
    });
})

app.get('/about',(req,res) => {
    res.render('about', {
        title: 'Weatherapp | About',
        heading1: 'Sobre a nossa aplicação',
        owner:madeby
    });
})

app.get('/help',(req,res) => {
    res.render('help', {
        title: 'Weatherapp | Help',
        heading1: 'Sobre a nossa aplicação',
        owner:madeby
    });
})

app.get('/weather',(req,res) => {
    if(!req.query.city){
        return res.send({
            error: "Localização não definida"
        });
    }
    geocode(req.query.city, (error, { latitude, longitude, location } = {} ) => {
        if(error) {
            return res.send({ error })
        }
        forecast( latitude, longitude, (error, forecastData ) => {
            if(error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location
            })
        })
    })
});

app.get('*',(req,res) => {
    res.render('404',{});
})

app.listen(5000,()=>{
    console.log('O servidor iniciou');
})

// nodemon src/app.js -e js,hbs

