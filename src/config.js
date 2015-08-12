module.exports = {
  listen: {
    port: 3030,
    host: '127.0.0.1'
  },
  session: {
    secret: 'timeloop secret'
  },
  redis: {
    socket: '/tmp/redis.sock'
  },
  database: {
    username: 'nkt',
    database: 'timeloop',
    host: '127.0.0.1',
    native: true
  }
};
