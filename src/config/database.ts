import ENV from './env';
import mongoose from 'mongoose';
import logger from '../logger';

const dbConnection = async () => {
  try {
    const connection = await mongoose.connect(
      ENV.db.url,
      { dbName: ENV.db.name },
    );

    if (connection) {
      logger.info('Connected with MongoDB Database!!!');
    }
  } catch (error) {
    logger.error('Error occurred while connecting with MongoDB Database', error);
  }
}

export default dbConnection;
