const express = require("express");
const app = express();
const path = require("path"); // Node.js built-in module for working with file paths
// ℹ️ Sets the PORT for our app to have access to it. If no env has been set, we hard code it to 3000
const PORT = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "pages")));

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

// 👇 Start handling routes here

app.get("/home", (req, res) => {
    const homePath = path.join(__dirname, "pages", "home.html"); // You can send any response you like here
    res.sendFile(homePath);
  });

app.get('/quem-somos', (req, res) => {
    const quemSomosPath = path.join(__dirname, 'pages', 'quem-somos.html')
    res.sendFile(quemSomosPath)
})

app.get('/aduaneiro', (req, res) => {
    const aduaneiroPath = path.join(__dirname, 'pages', 'aduaneiro.html')
    res.sendFile(aduaneiroPath)
})

app.get('/civil', (req, res) => {
    const civilPath = path.join(__dirname, 'pages', 'civil.html')
    res.sendFile(civilPath)
})

app.get('/trabalhista', (req, res) => {
    const trabalhistaPath = path.join(__dirname, 'pages', 'trabalhista.html')
    res.sendFile(trabalhistaPath)
})

app.get('/carbono', (req, res) => {
    const carbonoPath = path.join(__dirname, 'pages', 'carbono.html')
    res.sendFile(carbonoPath)
})

app.get('/artigos', (req, res) => {
    const artigosPath = path.join(__dirname, 'pages', 'artigos.html')
    res.sendFile(artigosPath)
})

app.get('/contato', (req, res) => {
    const contatoPath = path.join(__dirname, 'pages', 'contato.html')
    res.sendFile(contatoPath)
})