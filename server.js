const fs = require('fs');
const https = require('https');
const { createServer } = require('http');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// Carregar certificados
const httpsOptions = {
  key: fs.readFileSync('./key.pem'), // Caminho para sua chave privada
  cert: fs.readFileSync('./cert.pem'), // Caminho para seu certificado público
};

app.prepare().then(() => {
  // Criar servidor HTTPS
  https.createServer(httpsOptions, (req, res) => {
    handle(req, res);
  }).listen(3000, (err) => {
    if (err) throw err;
    console.log('Servidor HTTPS rodando em https://localhost:3000');
  });
});
