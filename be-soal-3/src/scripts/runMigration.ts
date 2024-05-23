import mysql from 'mysql2';
import fs from 'fs';
import path from 'path';
import config from '../config/config';

const connection = mysql.createConnection({ ...config.mysql, insecureAuth: true });

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database as id', connection.threadId);

  const filePath = path.join(__dirname, '../migrations/20230523_create_users_table.sql');
  const migrationSQL = fs.readFileSync(filePath, 'utf-8');

  connection.query(migrationSQL, (err) => {
    if (err) {
      console.error('Error executing migration:', err.stack);
      connection.end();
      return;
    }
    console.log('Migration executed successfully.');
    connection.end();
  });
});
