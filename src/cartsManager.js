import fs from 'fs';
import ProductManager from './productManager.js';

class CartsManager {
  carts;
  path;
  static idProduct = 0;
  
  constructor() {
    this.path = './src/data/carts.json';
    this.carts = this.readCartsInFile();
  };

  assignCartId() {
    let id = 1;
    if (this.carts.length != 0)
      id = this.carts[this.carts.length - 1].id + 1;
    return id;
  };

  readCartsInFile() {
    try {
      if (fs.existsSync(this.path))
        return JSON.parse(fs.readFileSync(this.path, 'utf-8'));
      return [];
    } catch (error) {
      console.log(`Error al leer el archivo de productos, ${error}`);
    };
  };

  saveFile() {
    try {
      fs.writeFileSync(this.path, JSON.stringify(this.carts));
    } catch (error) {
      console.log(`Error al guardar el archivo de productos, ${error}`);
    };
  };

  getCartById(id) {
    const cart = this.carts.find(p => p.id == id);
    if (cart)
      return cart;
    else 
      return `Not Found del carrito con id ${id}`;
  };
  
  createCart() {
    const newCart = {
      id: this.assignCartId(),
      products: []
    };
    this.carts.push(newCart);
    this.saveFile();

    return newCart;
  };

  addProductInCart(cid, pid) {
    let answer = `Carrito con id ${cid} no existe!`;
    const indexCart = this.carts.findIndex(c => c.id === cid);

    if (indexCart !== -1) {
      const index = this.carts[indexCart].products.findIndex(p => p.id === pid);
      const p = new ProductManager();
      const product = p.getProductById(pid);

      if (product.status && index === -1) {
        this.carts[indexCart].products.push({ id: pid, 'quantity': 1 });
        this.saveFile();
        answer = 'Producto agregado al carrito';
      } else if (product.status && index !== -1) {
        ++this.carts[indexCart].product[index].quantity;
        this.saveFile();
        answer = 'Producto agregado al carrito';
      } else {
        answer = `Producto con id ${pid} no existe!`;
      }
    };
    return answer;
  };
}

export default CartsManager;