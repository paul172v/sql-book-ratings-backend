import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import sequelize from "./util/database";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // Read JSON data
app.use(cors()); // Enable CORS

// Set the view engine to EJS
app.set("view engine", "ejs");
app.set("views", "./views");

// Add  and use Routers
import booKRouter from "./routes/bookRoutes";
app.use("/api/v1/", booKRouter);

// Define a route to render the placeholder view
app.get("/", (req, res) => {
  res.render("home");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
