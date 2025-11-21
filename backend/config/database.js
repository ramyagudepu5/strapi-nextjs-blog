const path = require('path');

module.exports = ({ env }) => {
  const client = env('DATABASE_CLIENT', 'sqlite');

  if (client === 'sqlite') {
    return {
      connection: {
        client: 'sqlite',
        connection: {
          filename: path.join(__dirname, '..', env('DATABASE_FILENAME', '.tmp/data.db')),
        },
        useNullAsDefault: true,
      },
    };
  }

  return {
    connection: {
      client,
      connection: {
        host: env('DATABASE_HOST', 'localhost'),
        port: env.int('DATABASE_PORT', 5432),
        database: env('DATABASE_NAME'),
        user: env('DATABASE_USERNAME'),
        password: env('DATABASE_PASSWORD'),
        ssl: env.bool('DATABASE_SSL', true),
      },
      pool: { min: 0, max: 10 },
    },
  };
};
