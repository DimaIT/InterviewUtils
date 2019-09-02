const app = require('./app');

const PORT = 8080;

function connect() {
  app.listen(PORT, (error) => {
    if (error) {
      console.error('Unable to listen for connections ', error);
      process.exit(10);
    }

    console.log(`Server is listening on port ${PORT}`);
  });
}

connect();
