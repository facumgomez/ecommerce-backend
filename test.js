const ProductManager = require('./productManager');

const product = new ProductManager();

product.addProduct();
console.log(product.addProduct('Notebook', 'hp', 1000000, 'img1', 'code01', 10));
console.log(product.addProduct('Notebook', 'lenovo', 900000, 'img2', 'code02', 10));

console.log(product.getProducts());
