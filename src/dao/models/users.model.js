import { Schema, model} from 'mongoose';

const nameCollection = 'User';

const UserSchema = new Schema({
  name: { type: String, required: [true, 'Nombre es obligatorio'] },
  lastName: { type: String, required: [true, 'Apellido es obligatorio'] },
  email: { type: String, required: [true, 'Correo electronico es obligatorio'], unique: true },
  password: { type: String, required: [true, 'Contraseña es obligatorio'] },
  rol: { type: String, default: 'user', enum: ['user', 'admin'] },
  status: { type: Boolean, default: true },
  fechaCreation: { type: Date, default: Date.now }
});

UserSchema.set('toJSON', {
  transform: function (doc, ret) {
    delete ret.__v;
    return ret
  }
});

export const userModel = model(nameCollection, UserSchema);