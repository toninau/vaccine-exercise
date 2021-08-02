import app from './app';
import http from 'http';
import config from './utils/config';

const PORT = config.PORT;
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});