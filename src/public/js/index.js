const socket = io();

socket.on('products', products => {
  const tbody = document.getElementById('products-body');
  tbody.innerHTML = '';

  products.forEach(product => {
    const row = tbody.insertRow();

    row.innerHTML = `
      <td>${product.id}</td>
      <td>${product.title}</td>
      <td>${product.description}</td>
      <td>${product.price}</td>
      <td>${product.code}</td>
      <td>${product.stock}</td>
      <td>${product.category}</td>
      <td>${product.status ? 'Activo' : 'Desactivado'}</td>
      <td>${product.thumbnails && product.thumbnails.length > 0 ? product.thumbnails[0] : 'No hay imagen'}</td>
    `;
  });
});

const form = document.getElementById('product-form');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  let title = document.getElementById('title').value;
  let description = document.getElementById('description').value;
  let price = document.getElementById('price').value;
  let code = document.getElementById('code').value;
  let stock = document.getElementById('stock').value;
  let category = document.getElementById('category').value;

  const producto = {
    title:title,
    description:description,
    price:price,
    code:code,
    stock:stock,
    category:category,
  };
  socket.emit('addProducts', producto);
  form.reset();
});
