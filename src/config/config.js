import mongoose from 'mongoose';

export const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('Base de datos online!');
  } catch (error) {
    console.log(`Error al levantar la base de datos ${error}`);
    process.exit(1);
  };
}