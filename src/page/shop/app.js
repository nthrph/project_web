// app.js (Node.js + Express)
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

app.use(cors()); // เปิดให้สามารถเชื่อมต่อจาก Frontend ได้

// ตั้งค่าการเชื่อมต่อฐานข้อมูล MySQL
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '123456',
  database: 'bakery',
  port: '3306'
});

db.connect((err) => {
  if (err) {
    console.log('Error connecting to database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// สร้าง API สำหรับดึงข้อมูลเค้กทั้งหมด
app.get('/cakes', (req, res) => {
  const sql = 'SELECT * FROM products where category = "Cake" ';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

app.get('/cookie', (req, res) => {
  const sql = 'SELECT * FROM products where category = "Cookie" ';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

app.get('/drink', (req, res) => {
  const sql = 'SELECT * FROM products where category = "Drink" ';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

app.get('/status', (req, res) => {
  const sql = 'SELECT * FROM orders';
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(result);
  });
});

// อัปเดตสถานะของออร์เดอร์
app.put('/shop/Status/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  let order = orders.find(order => order.id === parseInt(id));
  if (order) {
    order.status = status;
    res.json({ message: 'Order status updated successfully', order });
  } else {
    res.status(404).json({ message: 'Order not found' });
  }
});


// หน้า home
app.get('/home_cake', (req, res) => {
  const sql = 'SELECT * FROM products WHERE category = "Cake" AND id BETWEEN 1 AND 4'; // เพิ่มเงื่อนไข id  
  // const sql = 'SELECT * FROM products WHERE name="Strawberry Cheesecake';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});
app.get('/home_cookie', (req, res) => {
  const sql = 'SELECT * FROM products WHERE category = "Cookie" AND id BETWEEN 9 AND 12'; // เพิ่มเงื่อนไข id  
  // const sql = 'SELECT * FROM products WHERE name="Strawberry Cheesecake';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});
app.get('/home_drink', (req, res) => {
  const sql = 'SELECT * FROM products WHERE category = "Drink" AND id BETWEEN 13 AND 16'; // เพิ่มเงื่อนไข id  
  // const sql = 'SELECT * FROM products WHERE name="Strawberry Cheesecake';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});



// รันเซิร์ฟเวอร์ที่ port 3306
app.listen(3001, () => {
  console.log('Server is running on port 3001');
});


