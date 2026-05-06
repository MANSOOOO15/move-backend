const authRoutes = require("./routes/auth");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

const activitiesRoutes = require("./routes/activities");
app.use("/api/activities", activitiesRoutes);

app.get("/", (req, res) => {
  res.send("Backend funcionando 🚀");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor en puerto " + PORT);
});