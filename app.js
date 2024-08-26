const express = require('express');
const expressLayouts = require('express-ejs-layouts')
const morgan = require('morgan');
const { dirname } = require('path');
const app = express();
const port = 3000;

//gunakkan ejs
app.set('view engine', 'ejs');

//Third-party Middleware
app.use(expressLayouts)
app.use(morgan('dev'))

//Built in middleware
app.use(express.static('public'))


//application level middleware
app.use((req,res, next) => {
    console.log('Time: ',Date.now());
    next();
})


app.get('/',(req, res) => {
    const mahasiswa = [
        {nama: 'Tegar',
            email: 'tegar@gmail.com'
        },
        {nama: 'Galih',
            email: 'galih@gmail.com'
        },
        {nama: 'Doddy',
            email: 'doddy@gmail.com'
        },
    ]
    res.render('index', { 
        nama: 'Tegar Panggalih' ,
        layout: 'layouts/main-layouts',
        title: 'Halaman Home',
        mahasiswa
    });
})

app.get('/about',(req, res) => {
    res.render('about', {
        layout: 'layouts/main-layouts',
        title: 'Halaman About',
    });
})

app.get('/contact',(req, res) => {
    res.render('contact',{
        layout: 'layouts/main-layouts',
        title: 'Halaman Contact',
    });
})

app.get('/product/:id', (req, res) => {
    res.send(`Product ID : ${req.params.id} <br> Category : ${req.query.category}`);
})

app.use('/', (req, res) => {
    res.status(404)
    res.send('<h1>404</h1>')
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

