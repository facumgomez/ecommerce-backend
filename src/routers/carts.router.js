import { Router } from 'express';
import { addProductInCart, createCart, deleteCart, deleteProductsInCart, getCartById, updateProductInCart } from '../controllers/carts.controller.js';

const router = Router();

router.get('/:cid', getCartById);
router.post('/', createCart);
router.post('/:cid/product/:pid', addProductInCart);
router.delete('/:cid/products/:pid', deleteProductsInCart);
router.put('/:cid/products/:pid', updateProductInCart);
router.delete('/:cid', deleteCart);

export default router;