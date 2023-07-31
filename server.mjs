import pg from "pg";
import express from "express";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import dotenv from "dotenv";
import { promisify } from "util";

dotenv.config();
const server = express();






server.listen(3000, () => console.log('http://localhost:3000'));