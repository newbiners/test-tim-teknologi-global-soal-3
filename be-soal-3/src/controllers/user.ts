import mysql from "mysql2";
import config from "../config/config";
import { Request, Response } from "express";

const connection = mysql.createConnection({
  ...config.mysql,
  insecureAuth: true,
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err.stack);
    return;
  }
  console.log("Connected to the database as id", connection.threadId);
});

class UserController {
  async getAllUsers(req: Request, res: Response) {
    const query = "SELECT * FROM users";
    connection.query(query, (err, results) => {
      if (err) {
        console.error("Error executing query:", err.stack);
        res.status(500).json({ error: "Failed to execute query" });
        return;
      }
      res.status(200).json(results);
    });
  }

  async getUserById(req: Request, res: Response) {
    const userId = req.params.id;
    const query = `SELECT * FROM users WHERE id = ${userId}`;
    connection.query(query, (err, results) => {
      if (err) {
        console.error("Error executing query:", err.stack);
        res.status(500).json({ error: "Failed to execute query" });
        return;
      }
      res.status(200).json(results);
    });
  }
  async createUser(req: Request, res: Response) {
    const { name, gender } = req.body;
    const query = "INSERT INTO users (name, gender) VALUES (?, ?)";
    connection.query(query, [name, gender], (err, results) => {
      if (err) {
        console.error("Error executing query:", err.stack);
        res.status(500).json({ error: "Failed to execute query" });
        return;
      }
      res.status(201).json({ message: "User created successfully" });
    });
  }

  async updateUser(req: Request, res: Response) {
    const { id } = req.params;
    const { name, gender } = req.body;
    const query = "UPDATE users SET name = ?, gender = ? WHERE id = ?";
    connection.query(query, [name, gender, id], (err, results) => {
      if (err) {
        console.error("Error executing query:", err.stack);
        res.status(500).json({ error: "Failed to execute query" });
        return;
      }
      res.status(200).json({ message: "User updated successfully" });
    });
  }

  async deleteUser(req: Request, res: Response) {
    const { id } = req.params;
    const query = "DELETE FROM users WHERE id = ?";
    connection.query(query, [id], (err, results) => {
      if (err) {
        console.error("Error executing query:", err.stack);
        res.status(500).json({ error: "Failed to execute query" });
        return;
      }
      res.status(200).json({ message: "User deleted successfully" });
    });
  }

}

// Handle graceful shutdown
process.on("SIGINT", () => {
  connection.end((err) => {
    if (err) {
      console.error("Error closing the database connection:", err.stack);
    } else {
      console.log("Database connection closed.");
    }
    process.exit(err ? 1 : 0);
  });
});

export default new UserController();
