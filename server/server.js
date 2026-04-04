const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

let inventory = [
  { id: 1, inventory_name: "М'яч волейбольний Mikasa V200W", description: "Ексклюзивний офіційний м'яч Міжнародної федерації волейболу (FIVB) від бренду MIKASA (Японія). Професійна модель V200W дебютувала у 2019 році під час чемпіонату світу з волейболу серед чоловіків та жінок. Вона також була офіційним м'ячем Олімпійських ігор у Токіо у 2020 році.", photo_url: "https://content.rozetka.com.ua/goods/images/big/89278686.jpg" }
];

app.get('/api/inventory', (req, res) => {
  res.json(inventory);
});

app.get('/api/inventory/:id', (req, res) => {
  const item = inventory.find(i => i.id === parseInt(req.params.id));
  item ? res.json(item) : res.status(404).json({ message: "Не знайдено" });
});

app.post('/api/register', upload.single('photo'), (req, res) => {
  const { inventory_name, description } = req.body;
  if (!inventory_name) return res.status(400).json({ message: "Назва обов'язкова" });

  const newItem = {
    id: Date.now(),
    inventory_name,
    description,
    photo_url: req.file ? `http://localhost:${PORT}/uploads/${req.file.filename}` : null
  };
  inventory.push(newItem);
  res.status(201).json(newItem);
});

app.put('/api/inventory/:id', (req, res) => {
  const index = inventory.findIndex(i => i.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Не знайдено" });

  inventory[index] = { 
    ...inventory[index], 
    ...req.body,
    updated_at: new Date().toISOString()
  };
  
  console.log("Дані оновлено:", inventory[index]);
  res.json(inventory[index]);
});

app.put('/api/inventory/:id/photo', upload.single('photo'), (req, res) => {
  const index = inventory.findIndex(i => i.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Не знайдено" });

  if (req.file) {
    inventory[index].photo_url = `http://localhost:${PORT}/uploads/${req.file.filename}`;
  }
  res.json(inventory[index]);
});

app.delete('/api/inventory/:id', (req, res) => {
  inventory = inventory.filter(i => i.id !== parseInt(req.params.id));
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`🚀 Бекенд запущено на http://localhost:${PORT}`);
});