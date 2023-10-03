const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const app = express();
const Post = require('./models/Post');
const methodOverride = require('method-override');



// connect DB
mongoose.connect('mongodb://127.0.0.1:27017/cleanblog');

//MIDDLEWARE
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);


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

app.get('/posts/edit/:id', async (req, res) => {
  const post = await Post.findOne({ _id: req.params.id });
  console.log(post);
  res.render('edit', {
    post,
  });
});

//Edit 
app.put('/posts/:id', async (req,res) => {
  const post = await  Post.findOne({_id: req.params.id});
  post.title = req.body.title;
  post.detail = req.body.detail;
  post.save();
  res.redirect(`/posts/${req.params.id}`);
});


const port = 3001;

app.listen(port, () => {
  console.log(`Sunucu ${port} portuda başlatıldı..`);
});
