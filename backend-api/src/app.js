const initServer = async () => {
    const { addExitHandler } = require('./exit-handler');

    // initializing env variables
    if(process.env.NODE_ENV==='development') {
        require('dotenv').config({
            path: require('path').resolve(process.cwd(), '.env.development')
        });
    }
    // initializing storage
    const storage = require('./_storage');
    await storage.initStorage();
    addExitHandler(async () => await storage.closeConnections());
    
    // configuring and listening to server
    const app = require('./server')();
    const server = app.listen('8080', () => console.log('server started. Listening at 8080'));
    addExitHandler(async () => await server.close());
};

try {
    initServer();
} catch(err) { 
    console.log(err); 
}