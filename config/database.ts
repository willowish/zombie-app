export default {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  sync: true,
  port: parseInt(process.env.DATABASE_PORT),
};
