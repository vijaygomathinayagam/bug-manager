process.stdin.resume();

let exitHandlers = [];
let isExistHandlersCalled = false;

const handleExit = async () => {
    if(isExistHandlersCalled) {
        return;
    }
    isExistHandlersCalled = true;
    exitHandlers.forEach(async (handler) => await handler());
}

//do something when app is closing
process.on('exit', handleExit);

//catches ctrl+c event
process.on('SIGINT', handleExit);

// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', handleExit);
process.on('SIGUSR2', handleExit);

//catches uncaught exceptions
//process.on('uncaughtException', );

module.exports.addExitHandler = (exitHandler) => {
    exitHandlers.push(exitHandler);
};