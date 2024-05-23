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

  const filePath = path.join(__dirname, '../migrations/20230525_seed_users_data.sql');
  const seedSQL = fs.readFileSync(filePath, 'utf-8');

  connection.query(seedSQL, (err) => {
    if (err) {
      console.error('Error executing seeding:', err.stack);
      connection.end();
      return;
    }
    console.log('Data seeded successfully.');
    connection.end();
  });
});
