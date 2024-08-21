import express from 'express';
import { Server } from 'socket.io';
import { engine } from 'express-handlebars';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import 'dotenv/config';

import productsRouter from './routers/products.router.js';
import cartsRouter from './routers/carts.router.js';
import viewsRouter from './routers/views.router.js' 
import __dirname from './utils.js';
import { dbConnection } from './config/config.js';
import { messageModel } from './dao/models/message.model.js';
import { addProductService, getProductsService } from './services/products.service.js';

const app = express();
const PORT =  process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.use(session({
  store: MongoStore.create({
    mongoUrl: `${process.env.MONGO_URL}/${process.env.NAME_DB}`,
    ttl: 3600
  }),
  secret: process.env.SECRET_SESSION,
  saveUninitialized: true,
  resave: false
}));

app.engine('handlebars', engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use('/', viewsRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

await dbConnection();

const server = app.listen(PORT, () => { console.log(`Corriendo app en el puerto ${PORT}`);});
const io = new Server(server);

io.on('connection', async (socket) => {
  const limit = 50;
  const { payload } = await getProductsService({limit});
  const products = payload;
  socket.emit('products', payload);
  socket.on('addProducts', async (product) => {
    const newProduct = await addProductService({...product});
    if (newProduct) {
      products.push(newProduct);
      socket.emit('products', products);
    };
  });

  const messages = await messageModel.find();
  socket.emit('message', messages);

  socket.on('message', async (data) => {
    const newMessage = await messageModel.create({...data});
    if (newMessage) {
      const messages = await messageModel.find();
      io.emit('messageLogs', messages);
    };
  });
  socket.broadcast.emit('new_user');
});