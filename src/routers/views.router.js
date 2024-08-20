import { Router } from 'express';
import { getProductsService } from '../services/products.service.js';
import { getCartByIdService } from '../services/carts.service.js';

const router = Router();

router.get('/', async (req, res) => {
  const { payload } = await getProductsService({})
  return res.render('home', { products: payload, style: 'style.css', title: 'Home' });
});

router.get('/realTimeProducts', (req, res) => {
  return res.render('realTimeProducts', { style: 'style.css', title: 'Real Time Products' });
});

router.get('/chat', (req, res) => {
  return res.render('chat', { style: 'chat.css', title: 'Chat' });
});

router.get('/products', async (req, res) => {
  const result = await getProductsService({...req.query});
  return res.render('products', {title:'products', result, style: 'products.css'});
});

router.get('/cart/:cid', async (req, res) => {
  const { cid } = req.params;
  const cart = await getCartByIdService(cid);
  return res.render('cart', { title:'cart', cart});
});

export default router;