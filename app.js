const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const app = express();
const Post = require('./models/Post');


// connect DB
mongoose.connect('mongodb://127.0.0.1:27017/cleanblog');

//MIDDLEWARE
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());


app.set('view engine', 'ejs');

app.get('/', async(req, res) => {
  const posts = await Post.find({});
  console.log(posts);
  res.render('index',{
    posts
  });
});
app.get('/about', (req, res) => {
  res.render("about")
});

app.get('/add_post', (req, res) => {
  res.render("add_post")
});
app.get('/posts/:id', async(req, res) => {
  const post = await Post.findById(req.params.id);
  res.render('post', {
    post
  })
});


// FORM POST REQUEST

app.post('/posts', async(req,res) => {
  await Post.create(req.body);
  res.redirect('/');
});




const port = 3001;

app.listen(port, () => {
  console.log(`Sunucu ${port} portuda başlatıldı..`);
});
