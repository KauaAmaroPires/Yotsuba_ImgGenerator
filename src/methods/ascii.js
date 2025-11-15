const canvas = require('canvas');

module.exports = async ({ req: req, res: res }) => {

  const images = req.body.images || false;

  if (!images || !images[0] || !images[0].content) return res.json({
    status: 500,
    error: 'Imagem não encontrada.'
  });

  const image = await process(images[0].content);

  res.set({ "Content-Type": "image/png" });
  return res.send(image.toBuffer());

};

const process = async (image) => {

  const fontHeight = 11;

  const img = await canvas.loadImage(image);
  const Canvas = canvas.createCanvas(512, 512);
  const Canvas2 = canvas.createCanvas(512, 512);

  const ctx = Canvas.getContext('2d');
  const ctx2 = Canvas2.getContext('2d');

  const width = 512;
  const height = 512;

  ctx.width = width;
  ctx.height = height;
  ctx2.width = width;
  ctx2.height = height;

  ctx.drawImage(img, 0, 0, width, height);

  ctx2.fillStyle = "#36393f"
  ctx2.fillRect(0, 0, width, height)

  ctx2.textBaseline = 'top';
  ctx2.font = `${fontHeight}px Consolas`;

  const text = ctx2.measureText('@');
  const fontWidth = parseInt(text.width);

  //const letras = ' .`^",:;Il!i><~+_-?][}{1)(|tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$';
  const letras = ' .:;+=xX$';

  for (let y = 0; y < height; y += fontHeight) {
    for (let x = 0; x < width; x += fontWidth) {
      const frameSection = ctx.getImageData(x, y, fontWidth, fontHeight);
      const theRGBvalues = frameSection.data;

      const bridgt = (theRGBvalues[0] + theRGBvalues[1] + theRGBvalues[2]) / 3;

      ctx2.fillStyle = `#FFFFFF`;
      ctx2.fillText(`${letras.substr(Math.floor(bridgt * letras.length / 255), 1)}`, x, y);
    };
  };

  return Canvas2;

};
