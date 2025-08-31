import dotenv from 'dotenv';
dotenv.config();

export default {
  port: process.env.PORT || 3000,
  environment: process.env.ENVIRONMENT || 'development',
  appUrl: process.env.APP_URL || 'http://localhost:3000',

  db: {
    name: process.env.DB_NAME || 'bp',
    url: process.env.MONGO_URL || 'mongodb://localhost:27017',
  },

  jwt: {
    salt: process.env.SALT_ROUNDS || 1,
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    secret: process.env.JWT_SECRET || 'your_top_secret_key_to_encrypt_your_jwt_token',
  },

  razorpay: {
    keyId: process.env.RAZORPAY_KEY_ID,
    keySecret: process.env.RAZORPAY_KEY_SECRET,
    successRedirect: process.env.RAZORPAY_SUCCESS_REDIRECT,
  },
}
