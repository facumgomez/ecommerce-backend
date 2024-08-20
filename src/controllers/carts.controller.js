import { request, response } from 'express';
import { addProductInCartService, createCartService, deleteCartService, deleteProductsInCartService, getCartByIdService, updateProductInCartService } from '../services/carts.service.js';

export const getCartById = async (req = request, res = response) => {
  try {
    const { cid } = req.params;
    const cart = await getCartByIdService(cid);

    if (cart)
      return res.json({ cart });
    return res.status(404).json({ msg: `El carrito con id ${cid} no existe`});
  } catch (error) {
    return res.status(500).json({ msg: 'Hablar con un administrador' });
  };
};

export const createCart = async (req = request, res = response) => {
  try {
    const cart = await createCartService();
    return res.json({ msg: 'Carrito creado', cart});
  } catch (error) {
    return res.status(500).json({ msg: 'Hablar con un administrador' });
  };
};

export const addProductInCart = async (req = request, res = response) => {
  try {
    const { cid, pid } = req.params;
    const cart = await addProductInCartService(cid, pid);

    if (!cart) 
      return res.status(404).json({ msg: `El carrito con id ${cid} no existe`});
    return res.json({ msg: 'Carrito actualizado!', cart });
  } catch (error) {
    return res.status(500).json({ msg: 'Hablar con un administrador' });
  };
};

export const deleteProductsInCart = async (req = request, res = response) => {
  try {
    const { cid, pid } = req.params;
    const cart = await deleteProductsInCartService(cid, pid);

    if (!cart) 
      return res.status(404).json({ msg: 'No se pudo realizar la opercion' });
    return res.json({ msg: 'Producto eliminado del carrito!', cart });
  } catch (error) {
    return res.status(500).json({ msg: 'Hablar con un administrador' });
  };
};

export const updateProductInCart  = async (req = request, res = response) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    if (!quantity || !Number.isInteger(quantity))
      return res.status(404).json({ msg: 'Propiedad quantity es obligatoria, debe ser un numero entero'});

    const cart = await updateProductInCartService(cid, pid, quantity);
    if (!cart) 
      return res.status(404).json({ msg: 'No se pudo realizar la opercion' });
    return res.json({ msg: 'Producto actualizado en el carrito!', cart });
  } catch (error) {
    return res.status(500).json({ msg: 'Hablar con un administrador' });
  };
};

export const deleteCart  = async (req = request, res = response) => {
  try {
    const { cid } = req.params;
    const cart = await deleteCartService(cid);

    if (!cart) 
      return res.status(404).json({ msg: 'No se pudo realizar la opercion' });
    return res.json({ msg: 'Producto actualizado en el carrito!', cart });
  } catch (error) {
    return res.status(500).json({ msg: 'Hablar con un administrador' });
  };
};