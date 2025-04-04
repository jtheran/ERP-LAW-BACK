import adminCreate from './seed/admin.js';
import { client } from './services/wsp.js';
import app from './server.js';
import config from './config/config.js';
import logger from './logs/logger.js';


adminCreate().then(() => {
    app.listen(config.port, () => {
        logger.info(`[SERVER] Server running on port ${config.port}`);
        console.log(`🚀 Server running on port ${config.port}`);
        client.initialize();
    });

});