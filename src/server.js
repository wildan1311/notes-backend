const Hapi = require('@hapi/hapi');
// const routes = require('./routes');
const notes = require('./api/notes');
const NotesService = require('./services/postgres/NotesServices');
const { NotesValidator } = require('./validation/notes');
require('dotenv').config();

const init = async () => {
  const notesServices = new NotesService();
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.NODE_ENV !== 'production' ? process.env.HOST : '0.0.0.0',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  // server.route(routes);

  await server.register(
    {
      plugin: notes,
      options: {
        service: notesServices,
        validator: NotesValidator
      },
    }
  )

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
