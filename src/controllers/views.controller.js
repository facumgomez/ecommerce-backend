import { request, response } from 'express';
import { getProductsService } from '../services/products.service.js';
import { getCartByIdService } from '../services/carts.service.js';
import { getUserEmail, registerUser } from '../services/users.service.js';

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
  return res.render('chat', { style: 'chat.css', title: 'Chat' });
};

export const productsView = async (req = request, res = response) => {
  const result = await getProductsService({...req.query});
  return res.render('products', {title:'products', result, style: 'products.css'});
};

export const cartIdView = async (req = request, res = response) => {
  const { cid } = req.params;
  const cart = await getCartByIdService(cid);
  return res.render('cart', { title:'cart', cart});
};

export const loginGet = async (req = request, res = response) => { 
  return res.render('login', { title:'Login', style:'login.css' });
};

export const registerGet = async (req = request, res = response) => { 
  return res.render('register', { title:'Registro', style:'login.css' });
};

export const registerPost = async (req = request, res = response) => { 
  const { password, confirmPassword } = req.body;
  if (password !== confirmPassword) 
    return res.redirect('/register');
  const user = await registerUser({ ...req.body });

  if (user) {
    const userName = `${user.name} ${user.lastName}`;
    req.session.user = userName;
    req.session.rol = user.rol;
    return res.redirect('/');
  };
  return res.redirect('/register'); 
};

export const loginPost = async (req = request, res = response) => { 
  const { email, password } = req.body;

  const user = await getUserEmail(email);

  if (user && user.password === password) {
    const userName = `${user.name} ${user.lastName}`;
    req.session.user = userName;
    req.session.rol = user.rol;
    return res.redirect('/'); 
  };
  return res.redirect('/login'); 
};

export const logout = async (req = request, res = response) => {
  req.session.destroy(err => {
    if (err)
      return res.send({ status: false, body: err });
    else 
      return res.redirect('/login');
  });
};
