const express = require("express");
const app = express();
const path = require("path"); // Node.js built-in module for working with file paths
// ℹ️ Sets the PORT for our app to have access to it. If no env has been set, we hard code it to 3000
const PORT = process.env.PORT || 3001;

app.get("/home", (req, res) => {
  const homePath = path.join(__dirname, "pages", "home.html"); // You can send any response you like here
  res.sendFile(homePath);
});

app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

// 👇 Start handling routes here

const homeRoutes = require("./routes/home.routes");
app.use("/home", homeRoutes);
