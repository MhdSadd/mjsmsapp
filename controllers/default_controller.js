const mongoose = require('mongoose');


const Index = async(req, res)=>{
  let pageTitle = 'Home'
  res.render("default/index", {pageTitle});
}

const Contact = async(req, res)=>{
  let pageTitle = 'Contact'
  res.render("default/contact", {pageTitle});
}

const Blog = async(req, res)=>{
  let pageTitle = 'Blog'
  res.render("default/blog", {pageTitle});
}

const LoginGet = async(req, res)=>{
  let pageTitle = 'Login'
  res.render("default/login", {pageTitle});
}

module.exports ={
  Index,
  Contact,
  Blog,
  LoginGet,
}