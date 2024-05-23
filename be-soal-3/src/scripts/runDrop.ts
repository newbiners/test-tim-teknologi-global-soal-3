import mysql from 'mysql2';
import fs from 'fs';
import path from 'path';
import config from '../config/config';

const connection = mysql.createConnection(config.mysql);

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database as id', connection.threadId);

  const filePath = path.join(__dirname, '../migrations/20230524_drop_users_table.sql');
  const dropSQL = fs.readFileSync(filePath, 'utf-8');

  connection.query(dropSQL, (err) => {
    if (err) {
      console.error('Error executing drop:', err.stack);
      connection.end();
      return;
    }
    console.log('Table dropped successfully.');
    connection.end();
  });
});
