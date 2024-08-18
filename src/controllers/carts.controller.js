import { request, response } from 'express';
import { cartModel } from '../dao/models/carts.model.js';

export const getCartById = async (req = request, res = response) => {
  try {
    const { cid } = req.params;
    const cart = await cartModel.findById(cid);

    if (cart)
      return res.json({ cart });
    return res.status(404).json({ msg: `El carrito con id ${cid} no existe`});
  } catch (error) {
    console.log('getCartById -> ', error);
    return res.status(500).json({ msg: 'Hablar con un administrador' });
  };
};

export const createCart = async (req = request, res = response) => {
  try {
    const cart = await cartModel.create({});
    return res.json({ msg: 'Carrito creado', cart});
  } catch (error) {
    console.log('createCart -> ', error);
    return res.status(500).json({ msg: 'Hablar con un administrador' });
  };
};

export const addProductInCart = async (req = request, res = response) => {
  try {
    const { cid, pid } = req.params;
    const cart = await cartModel.findById(cid);

    if (!cart) 
      return res.status(404).json({ msg: `El carrito con id ${cid} no existe`});
    const productInCart = cart.products.find(p => p.id.toString() === pid);

    if (productInCart) 
      productInCart.quantity++;
    else 
      cart.products.push({ id: pid, quantity: 1});
    cart.save()
    return res.json({ msg: 'Carrito actualizado!', cart });
  } catch (error) {
    console.log('addProductInCart -> ', error);
    return res.status(500).json({ msg: 'Hablar con un administrador' });
  };
};