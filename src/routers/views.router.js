import { Router } from 'express';
import { productModel } from '../dao/models/products.model.js';

const router = Router();

router.get('/', async (req, res) => {
  const products = await productModel.find().lean();
  return res.render('home', { products, styles: 'style.css', title: 'Home' });
});

router.get('/realTimeProducts', (req, res) => {
  return res.render('realTimeProducts', { styles: 'style.css', title: 'Real Time Products' });
});

router.get('/chat', (req, res) => {
  return res.render('chat', { styles: 'chat.css', title: 'Chat' });
});


export default router;