import { Router } from 'express';
import ProductManager from '../productManager.js';

const router = Router();

router.get('/', (req, res) => {
  const { limit } = req.query;
  return res.json({ productos:p.getProducts(limit) });
});

router.get('/products/:pid', (req, res) => {
  const { pid } = req.params;
  return res.json({ producto: p.getProductById(Number(pid)) });
});

router.post('/', (req, res) => {
  const result = p.addProduct({...req.body});
  return res.json({result});
});

router.put('/:pid', (req, res) => {
  const { pid } = req.params;
  const result = p.updateProduct(Number(pid), req.body);
  return res.json({result});
});

router.delete('/:pid', (req, res) => {
  const { pid } = req.params;
  const result = p.deleteProduct(Number(pid));
  return res.json({result});
});

export default router;