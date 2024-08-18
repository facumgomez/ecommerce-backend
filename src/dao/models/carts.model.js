import { Schema, model } from 'mongoose';

const nemeCollection = 'Cart';

const CartSchema = new Schema({
  products: [
    {
      _id: false,
      id: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
      },
      quantity: {
        type: Number,
        requiered: [ true, 'La cantidad del producto es obligatorio']
      }
    }
  ]
});

CartSchema.set('toJSON', {
  transform: function(doc, ret) {
    delete ret.__v;
    return ret;
  }
});

export const cartModel = model(nemeCollection, CartSchema);