const Hapi = require('@hapi/hapi');
const notes = require('./api/notes');
const NotesService = require('./services/postgres/NotesServices');
const UserServices = require('./services/postgres/UsersServices');
const { NotesValidator } = require('./validation/notes');
const { UsersValidator } = require('./validation/users')
const users = require('./api/users');
const ClientError = require('./exception/ClientError');
const NotFoundError = require('./exception/NotFoundError');
require('dotenv').config();

const init = async () => {
  const notesServices = new NotesService();
  const userServices = new UserServices();
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.NODE_ENV !== 'production' ? process.env.HOST : '0.0.0.0',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register(
    [
      {
        plugin: notes,
        options: {
          service: notesServices,
          validator: NotesValidator
        },
      },
      {
        plugin: users,
        options: {
          service: userServices,
          validator: UsersValidator
        },
      },
    ]
  );

  server.ext('onPreResponse', (request, h)=>{
    const {response} = request
    if(response instanceof Error){
      if (response instanceof ClientError) {
        const newResponse = h.response({
          status: 'fail',
          message: response.message,
        });
        newResponse.code(response.statusCode);
        return newResponse;
      }

      if (response instanceof NotFoundError) {
        const newResponse = h.response({
          status: 'fail',
          message: response.message,
        });
        newResponse.code(response.statusCode);
        return newResponse;
      }
  
      if (!response.isServer) {
        return h.continue;
      }
  
      const newResponse = h.response({
        status: 'error',
        message: 'terjadi kegagalan pada server kami',
      });
      newResponse.code(500);
      console.log(response.message);
      return newResponse;
    }

    return h.continue;
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
