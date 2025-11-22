import dotenv from 'dotenv';

dotenv.config();

export default {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  mongodbUri: process.env.MONGODB_URI || 'mongodb+srv://Roshan:Roshan%40123@cluster0.lfxbvrg.mongodb.net/PravaraHealthClinic1',
  corsOrigin: process.env.CORS_ORIGIN || '*',
};

