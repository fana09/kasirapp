import express from 'express';
import * as KategoriApi from './src/app/kategori/kategoriApi';

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.get('/kategori', KategoriApi.getKategori);
app.post('/kategori', KategoriApi.createKategori);
app.get('/kategori/:id', KategoriApi.findKategoriById);
app.put('/kategori/:id', KategoriApi.updateKategori);
app.delete('/kategori/:id', KategoriApi.deleteKategori);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

