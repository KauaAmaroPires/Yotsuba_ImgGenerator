const canvas = require('canvas');

module.exports = async ({ req: req, res: res }) => {

  const images = req.body.images || false;

  if (!images || !images[0] || !images[0].content) return res.json({
    status: 500,
    error: 'Imagem não encontrada.'
  });

  const img = await canvas.loadImage(await grey(images[0].content));
  const backg = await canvas.loadImage('./src/Image/wasted.png');

  const Canvas = canvas.createCanvas(512, 512);
  const ctx = Canvas.getContext('2d');

  ctx.drawImage(img, 0, 0, 512, 512);
  ctx.drawImage(backg, 0, 0, 512, 512);

  res.set({ "Content-Type": "image/png" });
  return res.send(Canvas.toBuffer());

};

const grey = async (image) => {

  const img = await canvas.loadImage(image);
  const Canvas = await canvas.createCanvas(img.width, img.height);
  const ctx = Canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);

  const imgData = ctx.getImageData(0, 0, Canvas.width, Canvas.height);

  for (let i = 0; i < imgData.data.length; i += 4) {
    const brightness = 0.34 * imgData.data[i] + 0.5 * imgData.data[i + 1] + 0.16 * imgData.data[i + 2];
    imgData.data[i] = brightness;
    imgData.data[i + 1] = brightness;
    imgData.data[i + 2] = brightness;
  };

  ctx.putImageData(imgData, 0, 0);

  return Canvas.toBuffer();

};
