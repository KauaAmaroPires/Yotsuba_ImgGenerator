const { readdirSync } = require('fs');

const list = readdirSync('src/methods');

const methods = [];

for (const method of list) {
  const func = method.split('.js').join('');
  methods.push(func);
}

class Canvas {
  constructor() {
    this.methods = methods;
  }

  async vasco ({ req: req, res: res }) {
    require('./methods/vasco')({ req: req, res: res }).catch(err => {
      return res.json({
        status: 500,
        error: 'Ocorreu um erro ao executar esse comando.'
      });
    });
  };

  async ship ({ req: req, res: res }) {
    require('./methods/ship')({ req: req, res: res }).catch(err => {
      return res.json({
        status: 500,
        error: 'Ocorreu um erro ao executar esse comando.'
      });
    });
  };

  async asciicolor ({ req: req, res: res }) {
    require('./methods/asciicolor')({ req: req, res: res }).catch(err => {
      return res.json({
        status: 500,
        error: 'Ocorreu um erro ao executar esse comando.'
      });
    });
  };

  async ascii ({ req: req, res: res }) {
    require('./methods/ascii')({ req: req, res: res }).catch(err => {
      return res.json({
        status: 500,
        error: 'Ocorreu um erro ao executar esse comando.'
      });
    });
  };

  async ednaldopereira ({ req: req, res: res }) {
    require('./methods/ednaldopereira')({ req: req, res: res }).catch(err => {
      return res.json({
        status: 500,
        error: 'Ocorreu um erro ao executar esse comando.'
      });
    });
  };

  async bolsonaro ({ req: req, res: res }) {
    require('./methods/bolsonaro')({ req: req, res: res }).catch(err => {
      return res.json({
        status: 500,
        error: 'Ocorreu um erro ao executar esse comando.'
      });
    });
  };

  async bolsoquadro ({ req: req, res: res }) {
    require('./methods/bolsoquadro')({ req: req, res: res }).catch(err => {
      return res.json({
        status: 500,
        error: 'Ocorreu um erro ao executar esse comando.'
      });
    });
  };

  async culto ({ req: req, res: res }) {
    require('./methods/culto')({ req: req, res: res }).catch(err => {
      return res.json({
        status: 500,
        error: 'Ocorreu um erro ao executar esse comando.'
      });
    });
  };

  async datena ({ req: req, res: res }) {
    require('./methods/datena')({ req: req, res: res }).catch(err => {
      return res.json({
        status: 500,
        error: 'Ocorreu um erro ao executar esse comando.'
      });
    });
  };

  async faustão ({ req: req, res: res }) {
    require('./methods/faustão')({ req: req, res: res }).catch(err => {
      return res.json({
        status: 500,
        error: 'Ocorreu um erro ao executar esse comando.'
      });
    });
  };

  async gabrielmonteiro ({ req: req, res: res }) {
    require('./methods/gabrielmonteiro')({ req: req, res: res }).catch(err => {
      return res.json({
        status: 500,
        error: 'Ocorreu um erro ao executar esse comando.'
      });
    });
  };

  async clyde ({ req: req, res: res }) {
    require('./methods/clyde')({ req: req, res: res }).catch(err => {
      return res.json({
        status: 500,
        error: 'Ocorreu um erro ao executar esse comando.'
      });
    });
  };

  async youtube ({ req: req, res: res }) {
    require('./methods/youtube')({ req: req, res: res }).catch(err => {
      return res.json({
        status: 500,
        error: 'Ocorreu um erro ao executar esse comando.'
      });
    });
  };

  async delete ({ req: req, res: res }) {
    require('./methods/delete')({ req: req, res: res }).catch(err => {
      return res.json({
        status: 500,
        error: 'Ocorreu um erro ao executar esse comando.'
      });
    });
  };

  async difference ({ req: req, res: res }) {
    require('./methods/difference')({ req: req, res: res }).catch(err => {
      return res.json({
        status: 500,
        error: 'Ocorreu um erro ao executar esse comando.'
      });
    });
  };

  async rainbow ({ req: req, res: res }) {
    require('./methods/rainbow')({ req: req, res: res }).catch(err => {
      return res.json({
        status: 500,
        error: 'Ocorreu um erro ao executar esse comando.'
      });
    });
  };

  async trigger ({ req: req, res: res }) {
    require('./methods/trigger')({ req: req, res: res }).catch(err => {
      return res.json({
        status: 500,
        error: 'Ocorreu um erro ao executar esse comando.'
      });
    });
  };

  async wanted ({ req: req, res: res }) {
    require('./methods/wanted')({ req: req, res: res }).catch(err => {
      return res.json({
        status: 500,
        error: 'Ocorreu um erro ao executar esse comando.'
      });
    });
  };

  async wasted ({ req: req, res: res }) {
    require('./methods/wasted')({ req: req, res: res }).catch(err => {
      return res.json({
        status: 500,
        error: 'Ocorreu um erro ao executar esse comando.'
      });
    });
  };

  async blur ({ req: req, res: res }) {
    require('./methods/blur')({ req: req, res: res }).catch(err => {
      return res.json({
        status: 500,
        error: 'Ocorreu um erro ao executar esse comando.'
      });
    });
  };

  async circulo ({ req: req, res: res }) {
    require('./methods/circulo')({ req: req, res: res }).catch(err => {
      return res.json({
        status: 500,
        error: 'Ocorreu um erro ao executar esse comando.'
      });
    });
  };

  async escaladecinza ({ req: req, res: res }) {
    require('./methods/escaladecinza')({ req: req, res: res }).catch(err => {
      return res.json({
        status: 500,
        error: 'Ocorreu um erro ao executar esse comando.'
      });
    });
  };

  async fuse ({ req: req, res: res }) {
    require('./methods/fuse')({ req: req, res: res }).catch(err => {
      return res.json({
        status: 500,
        error: 'Ocorreu um erro ao executar esse comando.'
      });
    });
  };

  async invert ({ req: req, res: res }) {
    require('./methods/invert')({ req: req, res: res }).catch(err => {
      return res.json({
        status: 500,
        error: 'Ocorreu um erro ao executar esse comando.'
      });
    });
  };

  async quote ({ req: req, res: res }) {
    require('./methods/quote')({ req: req, res: res }).catch(err => {
      return res.json({
        status: 500,
        error: 'Ocorreu um erro ao executar esse comando.'
      });
    });
  };

  async sepia ({ req: req, res: res }) {
    require('./methods/sepia')({ req: req, res: res }).catch(err => {
      return res.json({
        status: 500,
        error: 'Ocorreu um erro ao executar esse comando.'
      });
    });
  };

  async sharpen ({ req: req, res: res }) {
    require('./methods/sharpen')({ req: req, res: res }).catch(err => {
      return res.json({
        status: 500,
        error: 'Ocorreu um erro ao executar esse comando.'
      });
    });
  };

  async trevas ({ req: req, res: res }) {
    require('./methods/trevas')({ req: req, res: res }).catch(err => {
      return res.json({
        status: 500,
        error: 'Ocorreu um erro ao executar esse comando.'
      });
    });
  };

};

module.exports = Canvas;
