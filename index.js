const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 4444;

app.use(bodyParser.json());

// Read data from JSON file
function readDataFromFile() {
  try {
    const data = fs.readFileSync('D:/NodeJS-Prj/PRJ-JSON-CRUD/data.json', 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

// Write data to JSON file
function writeDataToFile(data) {
  fs.writeFileSync('D:/NodeJS-Prj/PRJ-JSON-CRUD/data.json', JSON.stringify(data, null, 2), 'utf8');
}

// Get all items
app.get('/items', (req, res) => {
  const data = readDataFromFile();
  res.json(data);
});

// Get a specific item by ID
app.get('/items/:id', (req, res) => {
  const data = readDataFromFile();
  const item = data.find(item => item.id === parseInt(req.params.id));
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

// Create a new item
app.post('/items', (req, res) => {
  const data = readDataFromFile();
  const newItem = req.body;
  data.push(newItem);
  writeDataToFile(data);
  res.json(newItem);
});

// Update an item by ID
app.put('/items/:id', (req, res) => {
  const data = readDataFromFile();
  const itemId = parseInt(req.params.id);
  const updatedItem = req.body;

  const index = data.findIndex(item => item.id === itemId);
  if (index !== -1) {
    data[index] = { ...data[index], ...updatedItem };
    writeDataToFile(data);
    res.json(data[index]);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

// Delete an item by ID
app.delete('/items/:id', (req, res) => {
  const data = readDataFromFile();
  const itemId = parseInt(req.params.id);

  const index = data.findIndex(item => item.id === itemId);
  if (index !== -1) {
    const deletedItem = data.splice(index, 1)[0];
    writeDataToFile(data);
    res.json(deletedItem);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
