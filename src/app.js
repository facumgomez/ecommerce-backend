import express from 'express';
import { Server } from 'socket.io';
import { engine } from 'express-handlebars';
import productsRouter from './routers/products.router.js';
import cartsRouter from './routers/carts.router.js';
import viewsRouter from './routers/views.router.js' 
import __dirname from './utils.js';
import ProductManager from './productManager.js';

const app = express();
const PORT = 3000;

const p = new ProductManager();

const server = app.listen(PORT, () => { console.log(`Corriendo app en el puerto ${PORT}`);});
const io = new Server(server);
io.on('connection', socket => {
  const products = p.getProducts();
  socket.emit('products', products);

  socket.on('addProducts', product => {
    const result = p.addProduct({...product});
    if (result.producto) 
      socket.emit('products', result.producto);
  });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.engine('handlebars', engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use('/', viewsRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);