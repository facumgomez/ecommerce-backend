import { request, response } from 'express';
import { addProductService, deleteProductService, getProductByIdService, getProductsService, updateProductService } from '../services/products.service.js';

export const getProducts = async (req = request, res = response) => {
  try {
    const result = await getProductsService({...req.query});
    return res.json({ result });
  } catch (error) {
    return res.status(500).json({ msg: 'Hablar con un administrador' });
  };
};

export const getProductById = async (req = request, res = response) => {
  try {
    const { pid } = req.params
    const product = await getProductByIdService(pid);
    if (!product)
      return res.status(404).json({ msg: `El producto con id ${pid} no existe` });
    return res.json({ product });
  } catch (error) {
    return res.status(500).json({ msg: 'Hablar con un administrador' });
  };
};

export const addProduct = async (req = request, res = response) => {
  try {
    const { title, description, price, code, stock, category } = req.body;

    if (!title, !description, !price, !code, !stock, !category)
      return res.status(404).json({ msg: 'Los campos [title, description, price, thumbnails, code, stock, category, status] son obligatorios'});

    const product = await addProductService({...req.body});
    return res.json({ product });
  } catch (error) {
    return res.status(500).json({ msg: 'Hablar con un administrador' });
  };
};

export const updateProduct = async (req = request, res = response) => {
  try {
    const { pid } = req.params;
    const { _id, ...rest } = req.body;
    const product = await updateProductService(pid, rest);
    if (product)
      return res.json({ msg: 'Producto actualizado!', product });
    return res.status(404).json({msg: `No se pudo actualizar el producto con id ${pid}`});
  } catch (error) {
    return res.status(500).json({ msg: 'Hablar con un administrador' });
  };
};

export const deleteProduct = async (req = request, res = response) => {
  try {
    const { pid } = req.params;
    const product = await deleteProductService(pid);
    if (product)
      return res.json({ msg: 'Producto eliminado!', product });
    return res.status(404).json({msg: `No se pudo eliminar el producto con id ${pid}`});
  } catch (error) {
    return res.status(500).json({ msg: 'Hablar con un administrador' });
  };
};