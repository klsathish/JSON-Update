data.json
[
  { "id": 1, "name": "Item 1" },
  { "id": 2, "name": "Item 2" },
  { "id": 3, "name": "Item 3" }
]

------------------------------------
app.js

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Middleware to parse JSON data from the request body
app.use(bodyParser.json());

// Endpoint to fetch all items from the JSON file
app.get('/items', (req, res) => {
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading the JSON file:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    const items = JSON.parse(data);
    res.json(items);
  });
});

// Endpoint to add a new item to the JSON file
app.post('/items', (req, res) => {
  const newItem = req.body;
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading the JSON file:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    const items = JSON.parse(data);
    newItem.id = items.length + 1;
    items.push(newItem);

    fs.writeFile('data.json', JSON.stringify(items, null, 2), (err) => {
      if (err) {
        console.error('Error writing to the JSON file:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      res.status(201).json({ message: 'Item added successfully', newItem });
    });
  });
});

// Endpoint to update an existing item in the JSON file
app.put('/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id, 10);
  const updatedItem = req.body;

  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading the JSON file:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    let items = JSON.parse(data);
    const existingItem = items.find(item => item.id === itemId);

    if (!existingItem) {
      return res.status(404).json({ error: 'Item not found' });
    }

    // Merge the updated data with the existing item
    Object.assign(existingItem, updatedItem);

    fs.writeFile('data.json', JSON.stringify(items, null, 2), (err) => {
      if (err) {
        console.error('Error writing to the JSON file:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      res.json({ message: 'Item updated successfully', updatedItem });
    });
  });
});

// Endpoint to delete an item from the JSON file
app.delete('/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id, 10);

  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading the JSON file:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    let items = JSON.parse(data);
    const index = items.findIndex(item => item.id === itemId);

    if (index === -1) {
      return res.status(404).json({ error: 'Item not found' });
    }

    // Remove the item from the array
    items.splice(index, 1);

    fs.writeFile('data.json', JSON.stringify(items, null, 2), (err) => {
      if (err) {
        console.error('Error writing to the JSON file:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      res.json({ message: 'Item deleted successfully' });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
