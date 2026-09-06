import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve frontend dist if exists
const distPath = path.join(__dirname, 'frontend', 'dist');
const rootDist = path.join(__dirname, 'dist');

if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
}
if (fs.existsSync(rootDist)) {
  app.use(express.static(rootDist));
}

// APIs - Biscoitos, Ofertas, Auth
app.post('/api/biscuit', (req,res)=>{
  res.json({ok:true, received: req.body.amount||1, message: 'Biscoito enviado com carinho! 🍪'});
});

app.post('/api/offer', (req,res)=>{
  const {artworkId, value, message} = req.body;
  res.json({ok:true, id: Date.now(), artworkId, value, status:'oferta enviada ao artista'});
});

app.post('/api/exchange', (req,res)=>{
  res.json({ok:true, id: Date.now(), status:'proposta de troca enviada'});
});

app.post('/api/auth/google', (req,res)=>{
  res.json({ok:true, user:{name:'Dani Estefani', provider:'google', email:'dani@armazenft.com'}});
});

app.post('/api/auth/flow', (req,res)=>{
  res.json({ok:true, user:{name:'Dani', provider:'flow', address:'0xArmaZen'+Date.now()}});
});

app.get('/api/feed', (req,res)=>{
  res.json({ok:true, pulse:['Dani adicionou 3 obras ao Jardim Secreto','IA-7 mintou autonomamente em Flow - $0.000179','Você recebeu 12 biscoitos']});
});

app.get('/api/health', (req,res)=> res.json({ok:true, app:'ArmaZenNFT=ZenWeaponNFT', version:'1.0.0'}));

// SPA fallback
app.get('*', (req,res)=>{
  const candidates = [
    path.join(__dirname, 'frontend','dist','index.html'),
    path.join(__dirname, 'dist','index.html'),
    path.join(__dirname, 'frontend','index.html')
  ];
  for (const p of candidates) {
    if (fs.existsSync(p)) return res.sendFile(p);
  }
  res.status(200).send('<h1>ArmaZenNFT rodando</h1><p>Faça npm --prefix frontend run build</p>');
});

app.listen(PORT, ()=> console.log(`🍪 ArmaZenNFT / ZenWeaponNFT rodando na porta ${PORT} - ${new Date().toISOString()}`));
