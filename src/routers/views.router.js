import { Router } from 'express';
import { cartIdView, chatView, homeView, loginGet, login, logout, productsView, realTimeProductsView, registerGet, registerPost } from '../controllers/views.controller.js';
import { auth, admin } from '../middleware/auth.js';
import passport from 'passport';

const router = Router();

router.get('/', homeView);
router.get('/realTimeProducts', [auth, admin], realTimeProductsView);
router.get('/chat', auth, chatView);
router.get('/products', auth, productsView);
router.get('/cart/:cid', auth, cartIdView);
router.get('/login', loginGet);
router.get('/register', registerGet);
router.get('/logout', logout);
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }), async (req, res) => { });
router.get('/login-github-callbak', passport.authenticate('github', { failureRedirect:'/register'}), login);

router.post('/login', passport.authenticate('login', { failureRedirect:'/login' }), login);
router.post('/register', passport.authenticate('register', { failureRedirect:'/register' }), registerPost);

export default router;