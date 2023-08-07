// login.js

import bcrypt from "bcrypt";
import connection from "./dataBaseConnection.js";

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user in the database based on the email
    const getUserQuery = "SELECT * FROM users WHERE email = ?";
    connection.query(getUserQuery, [email], async (err, results) => {
      if (err) {
        console.error("Error while checking user:", err);
        res.status(500).json({ message: "Error while logging in" });
      } else if (results.length === 0) {
        // User with the provided email does not exist
        res.status(401).json({ message: "Invalid credentials" });
      } else {
        const user = results[0];
        // Check if the provided password matches the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          res.status(401).json({ message: "Invalid credentials" });
        } else {
          // Password is valid, user logged in successfully
          // You can redirect the user to the lobby page or render another success page
          res.status(200).json({ message: "Login successful" });
        }
      }
    });
  } catch (err) {
    console.error("Error while logging in:", err);
    res.status(500).json({ message: "Error while logging in" });
  }
};
