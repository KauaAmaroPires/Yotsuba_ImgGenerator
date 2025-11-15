const express = require('express');
const cors = require('cors');
const app = express();
const token = require('./util/token.json').token;
const canvas = require('./src/canvas');
const Canvas = new canvas();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  var headers = {
    authorization: req.headers.authorization || 'TOKEN_NOT_FOUND'
  };
  if (!token.includes(headers.authorization)) {
    return res.json({
      status: 401,
      error: 'Solicitação não autorizada.'
    });
  }
  next();
});

app.post(['/vasco', '/vs'], async (req, res) => {
  await Canvas.vasco({ req: req, res: res });
});

app.post(['/ship', '/sp'], async (req, res) => {
  await Canvas.ship({ req: req, res: res });
});

app.post(['/asciicolor', '/asco'], async (req, res) => {
  await Canvas.asciicolor({ req: req, res: res });
});

app.post(['/asciiImg', '/asi'], async (req, res) => {
  await Canvas.ascii({ req: req, res: res });
});

app.post(['/ednaldopereira', '/ed'], async (req, res) => {
  await Canvas.ednaldopereira({ req: req, res: res });
});

app.post(['/bolsonaro', '/bl'], async (req, res) => {
  await Canvas.bolsonaro({ req: req, res: res });
});

app.post(['/bolsonaroquadro', '/blq'], async (req, res) => {
  await Canvas.bolsoquadro({ req: req, res: res });
});

app.post(['/culto', '/cl'], async (req, res) => {
  await Canvas.culto({ req: req, res: res });
});

app.post(['/datena', '/dt'], async (req, res) => {
  await Canvas.datena({ req: req, res: res });
});

app.post(['/clyde', '/cly'], async (req, res) => {
  await Canvas.clyde({ req: req, res: res });
});

app.post(['/delete', '/dlt'], async (req, res) => {
  await Canvas.delete({ req: req, res: res });
});

app.post(['/difference', '/diff'], async (req, res) => {
  await Canvas.difference({ req: req, res: res });
});

app.post(['/faustão', '/faustao'], async (req, res) => {
  await Canvas.faustão({ req: req, res: res });
});

app.post(['/gabrielmonteiro', '/gbm'], async (req, res) => {
  await Canvas.gabrielmonteiro({ req: req, res: res });
});

app.post(['/rainbow', '/rain'], async (req, res) => {
  await Canvas.rainbow({ req: req, res: res });
});

app.post(['/trigger', '/trg'], async (req, res) => {
  await Canvas.trigger({ req: req, res: res });
});

app.post(['/wanted', '/wan'], async (req, res) => {
  await Canvas.wanted({ req: req, res: res });
});

app.post(['/wasted', '/was'], async (req, res) => {
  await Canvas.wasted({ req: req, res: res });
});

app.post(['/youtube', '/yt'], async (req, res) => {
  await Canvas.youtube({ req: req, res: res });
});

app.post(['/fuse', '/fs'], async (req, res) => {
  await Canvas.fuse({ req: req, res: res });
});

app.post(['/escaladecinza', '/esc'], async (req, res) => {
  await Canvas.escaladecinza({ req: req, res: res });
});

app.post(['/circulo', '/clo'], async (req, res) => {
  await Canvas.circulo({ req: req, res: res });
});

app.post(['/blur', '/blu'], async (req, res) => {
  await Canvas.blur({ req: req, res: res });
});

app.post(['/invert', '/inv'], async (req, res) => {
  await Canvas.invert({ req: req, res: res });
});

app.post(['/quote', '/quo'], async (req, res) => {
  await Canvas.quote({ req: req, res: res });
});

app.post(['/sepia', '/sep'], async (req, res) => {
  await Canvas.sepia({ req: req, res: res });
});

app.post(['/sharpen', '/shar'], async (req, res) => {
  await Canvas.sharpen({ req: req, res: res });
});

app.post(['/trevas', '/trev'], async (req, res) => {
  await Canvas.trevas({ req: req, res: res });
});

app.use((req, res) => {
  return res.json({
    status: 404,
    error: 'Função inexistente.'
  });
});

const PORT = 4000;

app.listen(process.env.PORT || 4000, async () => {
  console.log('servidor on');
});

process.on("multipleResolves", (type, promise, reason) => {
  console.log(`Vários erros identificados:\n\n` + type, promise, reason);
});

process.on("unhandRejection", (reason, promise) => {
  console.log(`Erros identificado:\n\n` + reason, promise);
});

process.on("uncaughtException", (error, origin) => {
  console.log(`Erros identificado:\n\n` + error, origin);
});

process.on("uncaughtExceptionMonitor", (error, origin) => {
  console.log(`Erros identificado:\n\n` + error, origin);
});
