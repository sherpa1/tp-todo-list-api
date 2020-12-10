const express = require("express");
const app = express();
const port = 3000;

const todos_routes = require("./routes/todos");
app.use('/todos',todos_routes);

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.listen(port, () => {
  console.log(`TP Todo List API listening at http://localhost:${port}`);
})
