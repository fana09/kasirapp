import express, { type Request, type Response } from 'express';
import cors from 'cors'; 


import multer from 'multer';
import fs from 'fs';
import path from 'path';

import * as KategoriApi from './src/app/kategori/kategoriApi';
import * as MenuApi from './src/app/menu/menuApi';
import * as OrderApi from './src/app/order/orderAPI';
import * as OrderListApi from './src/app/orderlist/orderlistAPI';

const app = express();
const port = 3000;

app.use(cors()); 
app.use(express.json());


const uploadDir = './public/uploads';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage: storage });


app.use('/uploads', express.static(uploadDir)); 


app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

// --- ROUTE KATEGORI ---
app.get('/kategori', KategoriApi.getKategori);
app.post('/kategori', KategoriApi.createKategori);
app.get('/kategori/:id', KategoriApi.findKategoriById);
app.put('/kategori/:id', KategoriApi.updateKategori);
app.delete('/kategori/:id', KategoriApi.deleteKategori);

// --- ROUTE MENU 
app.get('/menu', MenuApi.getAllMenu);
app.post('/menu', upload.single('gambar'), MenuApi.createMenu); 
app.get('/menu/:id', MenuApi.findMenuById);
app.put('/menu/:id', upload.single('gambar'), MenuApi.updateMenu); 
app.delete('/menu/:id', MenuApi.deleteMenu);

// --- ROUTE ORDER ---
app.delete('/order/reset-all', OrderApi.resetAllOrders);
app.get('/order', OrderApi.getAllOrder);
app.post('/order', OrderApi.createOrder);
app.get('/order/:id', OrderApi.findOrderById);
app.put('/order/:id', OrderApi.updateOrder);
app.delete('/order/:id', OrderApi.deleteOrder);
app.put('/order/:id/batal', OrderApi.batalOrder);

// --- ROUTE ORDERLIST ---
app.get('/orderlist', OrderListApi.getAllorderlist);
app.post('/orderlist', OrderListApi.createorderlist);
app.get('/orderlist/:id', OrderListApi.findorderlistById);
app.put('/orderlist/:id', OrderListApi.updateorderlist);
app.delete('/orderlist/:id', OrderListApi.deleteorderlist);

app.listen(port, "0.0.0.0", () => {
  console.log(`Server running at http://0.0.0.0:${port}`);
});