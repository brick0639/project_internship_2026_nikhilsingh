const express = require("express");
const cors = require("cors");
const sequelize = require("./Config/Database");
const userRoutes = require("./Routes/UserRoutes");

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Zamato Backend is Running");
});

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database Connected Successfully");

    await sequelize.sync();
    console.log("✅ Database Synced Successfully");

    app.listen(port, () => {
      console.log(`🚀 Server Running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("❌ Unable to Start Server");
    console.error(error);
  }
};

startServer();