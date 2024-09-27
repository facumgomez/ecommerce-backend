import { request, response } from 'express';
import { getProductsService } from '../services/products.service.js';
import { getCartByIdService } from '../services/carts.service.js';

export const homeView = async (req = request, res = response) => {
  const limit = 50;
  const { payload } = await getProductsService({ limit });
  const user = req.session.user;

  return res.render('home', { products: payload, style: 'style.css', title: 'Home', user });
};

export const realTimeProductsView = async (req = request, res = response) => {
  return res.render('realTimeProducts', { style: 'style.css', title: 'Real Time Products' });
};

export const chatView = async (req = request, res = response) => {
  const user = req.session.user;
  return res.render('chat', { style: 'chat.css', title: 'Chat', user });
};

export const productsView = async (req = request, res = response) => {
  const result = await getProductsService({ ...req.query });
  const user = req.session.user;
  return res.render('products', { title:'products', result, style: 'products.css', user });
};

export const cartIdView = async (req = request, res = response) => {
  const { cid } = req.params;
  const user = req.session.user;
  const cart = await getCartByIdService(cid);
  return res.render('cart', { title:'cart', cart}, user);
};

export const loginGet = async (req = request, res = response) => { 
  if (req.session.user) 
    return res.redirect('/');
  return res.render('login', { title:'Login', style:'login.css' });
};

export const registerGet = async (req = request, res = response) => { 
  if (req.session.user) 
    return res.redirect('/');
  return res.render('register', { title:'Registro', style:'login.css' });
};

export const registerPost = async (req = request, res = response) => { 
  if (!req.user)
    return res.redirect('/register');

  return res.redirect('/login');
};

export const login = async (req = request, res = response) => { 
  if (!req.user)
    return res.redirect('/login');

  req.session.user = {
    name: req.user.name,
    lastName: req.user.lastName,
    email: req.user.email,
    rol: req.user.rol,
    image: req.user.image,
  };
  return res.redirect('/'); 
};

export const logout = async (req = request, res = response) => {
  req.session.destroy(err => {
    if (err)
      return res.send({ status: false, body: err });
    else 
      return res.redirect('/login');
  });
};