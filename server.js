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
console.log('__dirname:', __dirname);
const distPath = path.join(__dirname, 'frontend', 'dist');
const rootDist = path.join(__dirname, 'dist');
let served = null;
if (fs.existsSync(distPath)) { app.use(express.static(distPath)); served = distPath; }
else if (fs.existsSync(rootDist)) { app.use(express.static(rootDist)); served = rootDist; }
console.log('Serving static from:', served);
app.post('/api/biscuit', (req,res)=> res.json({ok:true, received: req.body?.amount||1, message: 'Biscoito enviado com carinho! 🍪'}));
app.post('/api/offer', (req,res)=> res.json({ok:true, id: Date.now(), ...req.body, status:'oferta enviada'}));
app.post('/api/exchange', (req,res)=> res.json({ok:true, id: Date.now(), status:'proposta de troca enviada'}));
app.post('/api/auth/google', (req,res)=> res.json({ok:true, user:{name:'Dani Estefani', provider:'google'}}));
app.post('/api/auth/flow', (req,res)=> res.json({ok:true, user:{name:'Dani', provider:'flow', address:'0xArmaZen'+Date.now()}}));
app.get('/api/feed', (req,res)=> res.json({ok:true, pulse:['Feed Zen - Lâmina Sussurro #014','IA-7 mintou em Flow $0.000179']}));
app.get('/api/health', (req,res)=> res.json({ok:true, app:'ArmaZenNFT=ZenWeaponNFT', version:'2.0-ALMA-ZEN', static: served || 'none'}));
app.get('*', (req,res)=>{
  if (req.path.startsWith('/api/')) return res.status(404).json({error:'API not found'});
  const candidates = [path.join(__dirname,'frontend','dist','index.html'), path.join(__dirname,'dist','index.html'), path.join(__dirname,'frontend','index.html')];
  for (const p of candidates) if (fs.existsSync(p)) return res.sendFile(p);
  res.status(200).send('<h1>ArmaZenNFT - Build em andamento</h1><p><a href="/api/health">health</a></p>');
});
app.listen(PORT, ()=> console.log(`🍪 ArmaZenNFT rodando na porta ${PORT}`));
