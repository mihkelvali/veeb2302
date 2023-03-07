var express = require('express');
var cors = require('cors');
var app = express();
app.use(cors());
app.use(express.json())

let uusId = 0;
let todoItems = [];

// muutmine
app.put('/', function (req, res) {
  for (let i = 0; i < todoItems.length; i++) {
    let todoId = req.body.todoId;
    if (todoItems[i].id == todoId) {
      todoItems[i].isChecked = !todoItems[i].isChecked;
      break;
    }
  }
  res.send(JSON.stringify(todoItems));
})

// kustutamine
app.delete('/', function (req, res) {
  for (let i = 0; i < todoItems.length; i++) {
    let todoId = req.body.todoId;
    if (todoItems[i].id == todoId) {
      todoItems.splice(i, 1);
      break;
    }
  }
  res.send(JSON.stringify(todoItems));
});

// uus todo
app.post('/', function (req, res) {
  todoItems.push({
    id: uusId++,
    isChecked: false,
    text: req.body.text
  })
  res.send(JSON.stringify(todoItems));
});

app.get('/', function (req, res) {
  res.send(JSON.stringify(todoItems));
});

var server = app.listen(8081, function () {
   var port = server.address().port
   console.log("Example app listening at http://localhost:%s", port)
})
