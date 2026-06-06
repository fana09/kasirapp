import express, { type Request, type Response } from 'express';
import cors from 'cors'; 
import multer from 'multer';
import morgan from 'morgan';

import * as KategoriApi from './src/app/kategori/kategoriApi';
import * as MenuApi from './src/app/menu/menuApi';
import * as OrderApi from './src/app/order/orderAPI';
import * as OrderListApi from './src/app/orderlist/orderlistAPI';
import { updateKeamanan, getKeamanan } from './src/app/admin/adminAPI';

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(cors()); 
app.use(express.json());
app.use(morgan('dev'));

// Ganti diskStorage lokal ke folder 'temp/' yang bersifat sementara
const upload = multer({ dest: 'temp/' });

// Route admin sandi
app.put('/admin/:id', updateKeamanan);
app.get('/admin/:id', getKeamanan);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
});

// --- ROUTE KATEGORI ---
app.get('/kategori', KategoriApi.getKategori);
app.post('/kategori', KategoriApi.createKategori);
app.get('/kategori/:id', KategoriApi.findKategoriById);
app.put('/kategori/:id', KategoriApi.updateKategori);
app.delete('/kategori/:id', KategoriApi.deleteKategori);

// --- ROUTE MENU ---
// Semua route menu sudah terhubung ke fungsi Cloudinary di menuApi.ts
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