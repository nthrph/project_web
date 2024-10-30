const express = require('express');
const bodyParser = require('body-parser');
var mysql = require('mysql2');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// CORS settings
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE"
    );
    next();
});

// MySQL connection
var con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "123456",
    port: "3306",
    database: "products",
});

con.connect(function (err) {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to the database as ID', con.threadId);
});


app.get('/api/products_shop/cake', (req, res) => {
    con.query('SELECT * FROM products_shop WHERE category = "cake" ', function (err, result, fields) {
        if (err) throw res.status(400).send("No products found");
        console.log(result);
        res.send(result);
    });
})

app.get('/api/products_shop/cookie', (req, res) => {
    con.query('SELECT * FROM products_shop WHERE category = "cookie" ', function (err, result, fields) {
        if (err) throw res.status(400).send("No products found");
        console.log(result);
        res.send(result);
    });
})

app.get('/api/products_shop/drink', (req, res) => {
    con.query('SELECT * FROM products_shop WHERE category = "drink" ', function (err, result, fields) {
        if (err) throw res.status(400).send("No products found");
        console.log(result);
        res.send(result);
    });
})

//หน้าhome ของหมิว--------------------------------
app.get('/api/products_shop/cakehome', (req, res) => {
    con.query('SELECT * FROM products_shop WHERE category = "cake" LIMIT 5', function (err, result, fields) {
        if (err) throw res.status(400).send("No products found");
        console.log(result);
        res.send(result);
    });
})

app.get('/api/products_shop/cookiehome', (req, res) => {
    con.query('SELECT * FROM products_shop WHERE category = "cookie" LIMIT 5', function (err, result, fields) {
        if (err) throw res.status(400).send("No products found");
        console.log(result);
        res.send(result);
    });
})

app.get('/api/products_shop/drinkhome', (req, res) => {
    con.query('SELECT * FROM products_shop WHERE category = "drink"LIMIT 5 ', function (err, result, fields) {
        if (err) throw res.status(400).send("No products found");
        console.log(result);
        res.send(result);
    });
})

//---------------------------------------------

//cart
app.get('/api/products/:id', (req, res) => {
    const id = req.params.id;
    con.query("SELECT * FROM products_shop WHERE id = ?", [id], function (err, result, fields) {
        if (err) {
            console.error(err);
            return res.status(500).send("Error retrieving product");
        }
        if (result.length == 0) {
            return res.status(404).send(`No product with id: ${id} found`);
        }
        console.log(result);
        res.send(result);
    });
});


// update products
app.put('/api/updateproduct/:id', (req, res) => {
    const id = req.params.id;
    const { name_bakery, category, ingredients, price, quantity, img } = req.body;
    con.query('UPDATE products_shop SET name_bakery = ?, category =? ,ingredients=? , price = ?, quantity=? ,img = ? WHERE id = ?', [name_bakery, category, ingredients, price, quantity, img,id], function (err, result) {
        if (err) return res.status(500).send(`Error updating product: ${err.message}`);
        if (result.affectedRows == 0) return res.status(400).send(`No product with id: ${id} found`);
        res.send({ status: "ok" });
    });
});
// add Products
app.post('/api/addeproduct', (req, res) => {
    const { name_bakery, category, ingredients, price, quantity, img } = req.body;
    con.query('INSERT INTO products_shop (name_bakery, category, ingredients, price, quantity, img) VALUES (?, ?, ?, ?, ?, ?)', 
    [name_bakery, category, ingredients, price, quantity, img], function (err, result) {
        if (err) return res.status(500).send(`Error inserting product: ${err.message}`);
        res.send({ status: "ok" });
    });
});


// customer
// show all customer
app.get('/api/customer', (req, res) => {
    con.query("SELECT * FROM customer", function (err, result, fields) {
        if (err) throw res.status(400).send("No products found");
        console.log(result);
        res.send(result);
    });
})
// update status Done
app.put('/api/updatestatus_done/:id', (req, res) => {
    const id = req.params.id;
    con.query('UPDATE customer SET status="done" WHERE id = ?', [id], function (err, result) {
        if (err) return res.status(500).send(`Error updating product: ${err.message}`);
        if (result.affectedRows == 0) return res.status(400).send(`No product with id: ${id} found`);
        res.send({ status: "ok" });
    });
});
// update status Cancel
app.put('/api/updatestatus_cancel/:id', (req, res) => {
    const id = req.params.id;
    con.query('UPDATE customer SET status="cancel" WHERE id = ?', [id], function (err, result) {
        if (err) return res.status(500).send(`Error updating product: ${err.message}`);
        if (result.affectedRows == 0) return res.status(400).send(`No product with id: ${id} found`);
        res.send({ status: "ok" });
    });
});
// add Cart customer

//--------add name , tel : home page--------------
app.post('/api/addcart', (req, res) => {
    const { name_customer, tel} = req.body;
    con.query('INSERT INTO customer (name_customer , tel,status) VALUES (?, ?,"wait")', 
    [name_customer,tel], function (err, result) {
        if (err) return res.status(500).send(`Error inserting product: ${err.message}`);
        res.send({ status: "ok" });
    });
});

// app.post('/api/addcart', (req, res) => {
//     const { name_customer, tel,name_menu, quantity, price, note} = req.body;
//     con.query('INSERT INTO customer (name_customer,tel,name_menu, quantity, price, note, status) VALUES (?,?, ?, ?, ?, ?, "wait")', 
//     [name_customer,tel, name_menu, quantity, price, note], function (err, result) {
//         if (err) return res.status(500).send(`Error inserting product: ${err.message}`);
//         res.send({ status: "ok" });
//     });
// });
app.post('/api/addOrders', (req, res) => {
    const { cartItems, customerInfo } = req.body;

    // ตรวจสอบว่ามี cartItems และเป็น array หรือไม่
    if (!cartItems || !Array.isArray(cartItems)) {
        return res.status(400).send('Invalid cartItems data');
    }

    const promises = cartItems.map(item => {
        const { name, quantity, price, note } = item;

        if (!name || !quantity || !price) {
            return Promise.reject(new Error('Missing required fields in cart item'));
        }

        return new Promise((resolve, reject) => {
           
            con.query(
                'SELECT * FROM customer WHERE name_customer = ? AND name_menu = ?',
                [customerInfo.name, name],
                (err, results) => {
                    if (err) return reject(err);

                    if (results.length > 0) {
                        con.query(
                            'UPDATE customer SET quantity = quantity + ? WHERE name_menu  = ?',
                            [quantity, name],
                            (err, result) => {
                                if (err) return reject(err);

                                // อัปเดตจำนวนสินค้าคงเหลือใน `products_shop`
                                con.query(
                                    'UPDATE products_shop SET quantity= quantity- ? WHERE name_bakery = ?',
                                    [quantity, name],
                                    (err, result) => {
                                        if (err) return reject(err);
                                        resolve(results[0].id);
                                    }
                                );
                            }
                        );
                    } else {
                        // ถ้าไม่มีสินค้า ให้แทรกข้อมูลใหม่ลงใน `customer`
                        con.query(
                            'INSERT INTO customer (name_customer, tel, name_menu, price, quantity, note, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
                            [customerInfo.name, customerInfo.tel, name, price, quantity, note || '', 'wait'],
                            (err, result) => {
                                if (err) return reject(err);

                                // อัปเดตจำนวนสินค้าคงเหลือใน `products_shop`
                                con.query(
                                    'UPDATE products_shop SET quantity = quantity - ? WHERE name_bakery = ?',
                                    [quantity, name],
                                    (err, result) => {
                                        if (err) return reject(err);
                                        resolve(result.insertId);
                                    }
                                );
                            }
                        );
                    }
                }
            );
        });
    });

    // รอให้ Promise ทั้งหมดเสร็จสิ้น
    Promise.all(promises)
        .then(orderIds => {
            res.status(201).send({ status: "ok", orderIds });
        })
        .catch(err => {
            res.status(500).send(`Error inserting orders: ${err.message}`);
        });
});

  

// app.get('/menu', (req, res) => {
//     let sql = 'SELECT * FROM menu';
//     con.query(sql, (err, result) => {  
//         if (err) throw err;
//         res.send(result);
//     });
// });
// app.get('/orderss', (req, res) => {
//     let sql = 'SELECT * FROM customer_orders';
//     con.query(sql, (err, result) => {  
//         if (err) throw err;
//         res.send(result);
//     });
// });
app.get('/orders', (req, res) => {
    const nameCustomer = req.query.name_customer;  // กำหนดค่า nameCustomer ก่อนใช้

    let sql = `
        SELECT 
            c.name_menu, 
            c.quantity, 
            c.status, 
            p.img
        FROM 
            customer AS c 
        INNER JOIN 
            products_shop AS p ON c.name_menu = p.name_bakery
        WHERE 
            c.name_customer = ?
    `;

    console.log(`Fetching orders for customer: ${nameCustomer}`); // แสดงชื่อผู้ใช้ที่ใช้ในการดึงข้อมูล

    con.query(sql, [nameCustomer], (err, result) => {  
        if (err) {
            console.error(`Error fetching orders: ${err.message}`);
            res.status(500).send(`Error fetching orders: ${err.message}`);
            return;
        }
        res.send(result);
    });
});


app.post('/menu/save', (req, res) => {
    const { name, price, ingredients, piece, img_url } = req.body;

    // Check if the menu item with the same name exists
    con.query('SELECT * FROM menu WHERE name = ?', [name], function (err, results) {
        if (err) return res.status(500).send(`Error checking menu item: ${err.message}`);
        
        if (results.length > 0) {
            // If the item exists, update the quantity by adding the new piece value
            con.query(
                'UPDATE menu SET price = ?, ingredients = ?, piece = piece + ?, img_url = ? WHERE name = ?',
                [price, ingredients, piece, img_url, name],
                function (err, result) {
                    if (err) return res.status(500).send(`Error updating menu item: ${err.message}`);
                    res.send({ status: "ok", message: "Menu item updated" });
                }
            );
        } else {
            // If the item does not exist, insert a new one
            con.query(
                'INSERT INTO menu (name, price, ingredients, piece, img_url) VALUES (?, ?, ?, ?, ?)',
                [name, price, ingredients, piece, img_url],
                function (err, result) {
                    if (err) return res.status(500).send(`Error inserting product: ${err.message}`);
                    res.send({ status: "ok", message: "Menu item inserted" });
                }
            );
        }
    });
});


// app.post('/menu/update-stock', (req, res) => {
//     const { id, newStock } = req.body;

//     con.query('UPDATE products_shop SET quantity = ? WHERE id = ?', [newStock, id], function (err, result) {
//         if (err) return res.status(500).send(`Error updating stock: ${err.message}`);
//         res.send({ status: "ok" });
//     });
// });


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});