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
              res.status(200).json({ message: "User registered successfully" });
            }
          });
        } catch (hashError) {
          console.error("Error while hashing password:", hashError);
          res.status(500).json({ message: "Error while registering user" , redirectUrl: "/login" });
        }
      }
    });
  } catch (err) {
    console.error("Error while registering user:", err);
    res.status(500).json({ message: "Error while registering user" });
  }
};

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
