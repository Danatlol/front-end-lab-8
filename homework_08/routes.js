let fs = require('fs');
let handlers = require('./controllers/handlers.js');

let appRouter = function (app) {
  app.post('/rockstar', handlers.postRockstarHandler);
  app.get('/rockstars', handlers.getRockstarsHandler);
  app.get('/rockstar/:id', handlers.getRockstarIdHandler);
  app.put('/rockstar/:id', handlers.putRockstarIdHandler);
  app.delete('/rockstar/:id', handlers.deleteRockstarIdHandler);
};

module.exports = appRouter;