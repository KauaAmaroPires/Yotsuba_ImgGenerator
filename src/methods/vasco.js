const canvas = require('canvas');
const { fillTextWithTwemoji } = require('node-canvas-with-twemoji-and-discord-emoji');

module.exports = async ({ req: req, res: res }) => {

  const images = req.body.images || false;

  if (!images || !images[0] || !images[0].content) return res.json({
    status: 500,
    error: 'Imagem não encontrada.'
  });

  if (!images[0].name) return res.json({
    status: 500,
    error: 'nome não encontrado.'
  });

  const img = await canvas.loadImage(images[0].content);

  await canvas.registerFont('./src/fonts/Brodaers-Regular.otf', {
    family: 'Brodaers',
    weight: 'regular'
  });

  const Canvas = canvas.createCanvas(1310, 870);

  const ctx = Canvas.getContext('2d');

  ctx.drawImage(img, 40, 90, 530, 557);

  const img2 = await canvas.loadImage('./src/image/vasco.png');

  ctx.drawImage(img2, 0, 0);

  ctx.font = '90px Brodaers';
  ctx.fillStyle = '#FFFFFF';
  await fillTextWithTwemoji(ctx, images[0].name, 650, 450);

  const prof = [
    'GOLEIRO',
    'ZAGUEIRO',
    'LATERAL ESQUERDO',
    'LATERAL DIREITO',
    'LIBERO',
    'CENTROAVANTE',
    'VOLANTE',
    'ALAS DIREITO',
    'ALAS ESQUERDO',
    'MÉDIO-CENTRO',
    'MEIO-CAMPISTA LATERAL',
    'MEIA-ATACANTE',
    'PONTA'
  ];

  const random = prof[Math.floor(Math.random() * prof.length)];

  ctx.font = '40px Sans';
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText(random, 650, 520);

  res.set({ "Content-Type": "image/png" });
  return res.send(Canvas.toBuffer());

}
