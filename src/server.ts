import app from './app';
import logger from './logger';

import env from './config/env';

app.listen(env.port, () => {
  logger.info(`Server running on PORT: ${env.port}`);
});
