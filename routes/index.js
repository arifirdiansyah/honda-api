import { auth } from '../config/auth.js';
import * as file from '../controller/fileController.js';
import * as permissions from '../config/permissions.js';
import * as authController from '../controller/AuthController.js';
import * as userController from '../controller/UserController.js';
import * as catalogController from '../controller/CatalogController.js';
import * as motorcycleController from '../controller/MotorcycleController.js';
import * as partController from '../controller/PartController.js';

export const routes = app => {
  // Render home page
  app.get('/', function(req, res) {
    return res.send({ message: 'Welcome to Honda API' });
  });

  app.get('/version', (req, res) => {
    return res.send({
      version: 'v0.0.1',
    });
  });

  /*-----------------------Auth Routes---------------------------------------*/
  app.post('/auth/post-register', authController.postRegisterUser);

  /*-----------------------User Routes---------------------------------------*/
  app.get('/users', [auth, permissions.superAdmin], userController.getAllUser);
  app.get('/user/find/userByEmail/:email', userController.findUserByEmail);

  /*-----------------------Catalog Routes---------------------------------------*/
  app.post('/catalog/add', catalogController.addCatalog);
  app.put('/catalog/update/:catalogId', catalogController.updateCatalog);
  app.delete('/catalog/:catalogId', catalogController.deleteCatalog);
  app.get('/catalog/:catalogId', catalogController.findCatalog);
  app.get('/catalogs', catalogController.getAllCatalog);

  /*-----------------------Motorcycle Routes---------------------------------------*/
  app.post('/motorcycle/add', motorcycleController.addMotorCycle);
  app.put('/motorcycle/update/:motorCycleId', motorcycleController.updateMotorCycle);
  app.delete('/motorcycle/:motorCycleId', motorcycleController.deleteMotorCycle);
  app.get('/motorcycle/:motorCycleId', motorcycleController.findMotorCycle);
  app.get('/motorcycles', motorcycleController.getAllMotorCycle);

  /*-----------------------Part Routes---------------------------------------*/
  app.post('/part/add', partController.addPart);
  app.put('/part/update/:partId', partController.updatePart);
  app.delete('/part/:partId', partController.deletePart);
  app.get('/part/:partId', partController.findPart);
  app.get('/parts', partController.getAllPart);

  app.post('/file/upload/getUploadFileUrl', [auth], file.getFileUploadUrl);
};
