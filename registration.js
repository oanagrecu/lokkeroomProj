// registration.js
import bcrypt from "bcrypt";
import connection from "./dataBaseConnection.js";

export const registerUser = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    // Check if the user already exists in the database based on the email
    const checkUserQuery = "SELECT * FROM users WHERE email = ?";
    connection.query(checkUserQuery, [email], async (err, results) => {
      if (err) {
        console.error("Error while checking user:", err);
        res.status(500).json({ message: "Error while registering user" });
      } else if (results.length > 0) {
        // User with the provided email already exists in the database
        res.status(409).json({ message: "User already exists" });
      } else {
        // Hash the password
        try {
          // You can adjust this number for security
          const hashedPassword = await bcrypt.hash(password, 8);

          // Insert the user into the "users" table in the database
          const newUser = {
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: hashedPassword,
          };

          const insertUserQuery = "INSERT INTO users SET ?";
          connection.query(insertUserQuery, newUser, (err, result) => {
            if (err) {
              console.error("Error while registering user:", err);
              res.status(500).json({ message: "Error while registering user" });
            } else {
              console.log("User registered successfully:", result);
              // Redirect to the login page after successful registration
              res.redirect("/login");
            }
          });
        } catch (hashError) {
          console.error("Error while hashing password:", hashError);
          res.status(500).json({ message: "Error while registering user" });
        }
      }
    });
  } catch (err) {
    console.error("Error while registering user:", err);
    res.status(500).json({ message: "Error while registering user" });
  }
};
