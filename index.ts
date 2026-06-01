import express, { type Request, type Response } from 'express';
import cors from 'cors'; // 1. IMPORT CORS

import * as KategoriApi from './src/app/kategori/kategoriApi';
import * as MenuApi from './src/app/menu/menuApi';
import * as OrderApi from './src/app/order/orderAPI';
import * as OrderListApi from './src/app/orderlist/orderlistAPI';

const app = express();
const port = 3000;

// 2. GUNAKAN CORS SEBELUM ROUTE LAIN
app.use(cors()); 
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.get('/kategori', KategoriApi.getKategori);
app.post('/kategori', KategoriApi.createKategori);
app.get('/kategori/:id', KategoriApi.findKategoriById);
app.put('/kategori/:id', KategoriApi.updateKategori);
app.delete('/kategori/:id', KategoriApi.deleteKategori);

app.get('/menu', MenuApi.getAllMenu);
app.post('/menu', MenuApi.createMenu);
app.get('/menu/:id',MenuApi.findMenuById);
app.put('/menu/:id',MenuApi.updateMenu);
app.delete('/menu/:id',MenuApi.deleteMenu);

app.delete('/order/reset-all', OrderApi.resetAllOrders);

app.get('/order', OrderApi.getAllOrder);
app.post('/order', OrderApi.createOrder);
app.get('/order/:id',OrderApi.findOrderById);
app.put('/order/:id',OrderApi.updateOrder);
app.delete('/order/:id',OrderApi.deleteOrder);

app.get('/orderlist', OrderListApi.getAllorderlist);
app.post('/orderlist', OrderListApi.createorderlist);
app.get('/orderlist/:id',OrderListApi.findorderlistById);
app.put('/orderlist/:id',OrderListApi.updateorderlist);
app.delete('/orderlist/:id',OrderListApi.deleteorderlist);

// 3. TAMBAHKAN "0.0.0.0" AGAR BISA DIAKSES EMULATOR / DEVICE LAIN
app.listen(port, "0.0.0.0", () => {
  console.log(`Server running at http://0.0.0.0:${port}`);
});