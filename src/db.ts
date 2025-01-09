import sql from 'mssql';

const config: sql.config = {
  user: 'my-typescript-project',
  password: 'typescript',
  server: 'localhost', // e.g. localhost
  database: 'Students',
  options: {
    encrypt: true, // Use this if you're on Windows Azure
    trustServerCertificate: true,
    enableArithAbort: true, // Change to true for local dev / self-signed certs
    connectTimeout: 30000, // 30 seconds timeout (adjust as needed)
    requestTimeout: 30000 // 30 seconds timeout for requests (adjust as needed)
  },
};

export const connectToDatabase = async () => {
  try {
    const pool = await sql.connect(config);
    console.log('Connected to the database');
    return pool;
  } catch (err) {
    console.error('Database connection failed:', err);
    throw err;
  }
};
