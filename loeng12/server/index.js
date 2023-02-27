const http = require("http");

const host = 'localhost';
const port = 8080;

const matkadeAndmed = {
  kogus: 2,
  labiviija: 'Mihkel',
  matkad: [
    {
      pealkiri: 'Rännak ümber Ülemiste',
      kestvus: '1h',
      pikkus: '1km',
      pildiUrl: 'https://images.unsplash.com/photo-1575936123452-b67c3203c357'
    },
    {
      pealkiri: 'Merematk Tallinna lahel',
      kestvus: '3h',
      pildiUrl: 'https://github.com/mihkelvali/veeb2302/blob/33a73ac8a24132227b1278ccf77145f587e67421/loeng12/server/images/panda.jpeg?raw=true'
    },
  ]
};

const requestListener = function (req, res) {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.writeHead(200);
  res.end(JSON.stringify(matkadeAndmed));
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});

