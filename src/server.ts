import http from 'http';
import app from './app';

const port = process.env.PORT || 3000;

const server = http.createServer(app)
server.listen(port, ()=>{
    console.log('up and running on port', port)
})

process.on('unhandledRejection', (reason: Error) => {
    console.log('Unhandled Promise Rejection: reason:', reason.message);
    console.log(reason.stack);
});
  

