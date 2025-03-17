import { config } from "dotenv";
config();

export const PORT = process.env.PORT || 3000;
export const DB_USER = process.env.DB_USER || "sa";
export const DB_PASSWORD = process.env.DB_PASSWORD || "admin2025";
export const DB_SERVER = process.env.DB_SERVER || "172.174.241.144";
export const DB_DATABASE = process.env.DB_DATABASE || "multisoft";