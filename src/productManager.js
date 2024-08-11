import fs from 'fs';

class ProductManager {
  products;
  path;
  static idProduct = 0;
  
  constructor() {
    this.path = './src/data/products.json';
    this.products = this.readProductsInFile();
  };

  assignProductId() {
    let id = 1;
    if (this.products.length != 0)
      id = this.products[this.products.length -1].id + 1;
    return id;
  };

  readProductsInFile() {
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
      fs.writeFileSync(this.path, JSON.stringify(this.products));
    } catch (error) {
      console.log(`Error al guardar el archivo de productos, ${error}`);
    };
  };

  addProduct(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code || !stock)
      return 'Todos los parametros son requeridos [title, description, price, thumbnail, code, stock]';

    const codeRepeated = this.products.some(p => p.code == code);
    if (codeRepeated)
      return `Codigo ${code} registrado en otro producto`;
      
    ProductManager.idProduct = ProductManager.idProduct + 1
    const id = this.assignProductId();
    const newProduct = {
      id,
      title,
      description,
      price,
      thumbnail,
      code,
      stock
    };
    this.products.push(newProduct);
    this.saveFile();
    return 'Producto agregado con exito!';
  };

  getProducts(limit = 0) {
    limit = Number(limit);
    if (limit > 0)
      return this.products.slice(0, limit);
    return this.products;
  };

  getProductById(id) {
    const product = this.products.find(p => p.id == id);
    if (product)
      return product;
    else 
      return `Not Found del producto con id ${id}`;
  };

  updateProduct(id, objectUpdate) {
    let msg = `Producto ${id} no existe`;
    const index = this.products.findIndex(p => p.id === id);
    if (index !== -1) {
      const {id, ...rest} = objectUpdate;
      this.products[index] = {...this.products[index], ...rest};
      this.saveFile();
      msg = '¡Producto actualizado!'
    };
    return msg;
  };

  deleteProduct(id) {
    let msg = `Producto ${id} no existe`;
    const index = this.products.findIndex(p => p.id === id);
    if (index !== -1) {
      this.products = this.products.filter(p => p.id !== id);
      this.saveFile();
      msg = '¡Producto eliminado!'
    };
    return msg 
  };
}

export default ProductManager;