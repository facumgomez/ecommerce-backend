import fs from 'fs';

class ProductManager {
  products;
  path;
  static instance;
  
  constructor() {
    if (ProductManager.instance)
      return ProductManager.instance;
    
    this.path = './src/data/products.json';
    this.products = this.readProductsInFile();

    ProductManager.instance = this;
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

  addProduct({title, description, price, thumbnails = [], code, stock, category, status = true}) {
    let result = 'Ocurrio un error';
    if (!title || !description || !price || !code || !stock || !category) {
      result = 'Todos los parametros son requeridos [title, description, price, code, stock, category]';
    } else {
      const codeRepeated = this.products.some(p => p.code == code);
      if (codeRepeated) {
        result = `Codigo ${code} registrado en otro producto`;
      } else {
        const id = this.assignProductId();
        const newProduct = {
          id,
          title,
          description,
          price,
          thumbnails,
          code,
          stock,
          category, 
          status
        };
        this.products.push(newProduct);
        this.saveFile();
        result = {
          msg: 'Producto agregado con exito!', 
          producto: newProduct
        };
      };
    };
    return result;
  };

  getProducts(limit = 0) {
    limit = Number(limit);
    if (limit > 0)
      return this.products.slice(0, limit);
    return this.products;
  };

  getProductById(id) {
    let status = false;
    let answer = `Producto ${id} no existe!`;
    const product = this.products.find(p => p.id == id);
    if (product) {
      status = true;
      answer = product;
    };
    return {status, answer};
  };

  updateProduct(id, objectUpdate) {
    let result = `Producto ${id} no existe`;
    const index = this.products.findIndex(p => p.id === id);
    if (index !== -1) {
      const {id, ...rest} = objectUpdate;
      const allowedProperties = ['title', 'description', 'price', 'thumbnails', 'code', 'stock', 'category', 'status'];
      const updatedProperties = Object.keys(this.rest).filter(properties => allowedProperties.includes(properties)).reduce((obj, key) => {
        obj[key] = rest[key];
        return obj
      }, {});
      this.products[index] = {...this.products[index], ...updatedProperties};
      this.saveFile();
      result = {
        msg: '¡Producto actualizado!',
        producto: this.products[index]
      };
    };
    return result;
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