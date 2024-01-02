import dotenv from "dotenv";
import Express from "./Express";
dotenv.config();

const port = !isNaN(parseInt(process.env.PORT as string)) ? parseInt(process.env.PORT as string) : 3000;
const server = new Express(port, "/", { siteKey: "", secretKey: "" });
export default server;
