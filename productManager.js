class ProductManager {
  products;
  static idProduct = 0;
  
  constructor() {
    this.products = [];
  };

  addProduct(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code || !stock)
      return 'Todos los parametros son requeridos [title, description, price, thumbnail, code, stock]';

    const codeRepeated = this.products.some(p => p.code == code);
    if (codeRepeated)
      return `Codigo ${code} registrado en otro producto`;
      
    ProductManager.idProduct = ProductManager.idProduct + 1
    const id = ProductManager.idProduct;
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
    return 'Producto agregado con exito!';
  };

  getProducts() {
    return this.products;
  };

  getProductById(id) {
    const product = this.products.find(p => p.id == id);
    if (product)
      return product;
    else 
      return `Not Found del producto con id ${id}`;
  };
}

module.exports = ProductManager;