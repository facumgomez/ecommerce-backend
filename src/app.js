import express from 'express';
import productsRouter from './routers/prducts.router.js';
import cartsRouter from './routers/carts.router.js';

const app = express();
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Corriendo app en el puerto ${PORT}`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  return res.send('Ecommerce Backend');
});
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);