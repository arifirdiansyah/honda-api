import { auth } from '../config/auth.js';
import * as file from '../controller/fileController.js';
import * as permissions from '../config/permissions.js';
import * as authController from '../controller/AuthController.js';
import * as userController from '../controller/UserController.js';
import * as catalogController from '../controller/CatalogController.js';
import * as motorcycleController from '../controller/MotorcycleController.js';
import * as partController from '../controller/PartController.js';
import * as dealershipController from '../controller/DealershipController.js';
import * as serviceController from '../controller/ServiceController.js';
import * as servicePackageController from '../controller/ServicePackageController.js';
import * as replacePartController from '../controller/ReplacePartController.js';
import * as ownershipController from '../controller/VehicleOwnerShipController.js';

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
  app.put('/user/update/:userId', [auth, permissions.superAdmin], userController.updateUser);
  app.get('/user/find/userByEmail/:email', [auth, permissions.superAdmin], userController.findUserByEmail);

  /*-----------------------Catalog Routes---------------------------------------*/
  app.post('/catalog/add', [auth, permissions.superAdmin], catalogController.addCatalog);
  app.put('/catalog/update/:catalogId', [auth, permissions.superAdmin], catalogController.updateCatalog);
  app.delete('/catalog/:catalogId', [auth, permissions.superAdmin], catalogController.deleteCatalog);
  app.get('/catalog/:catalogId', [auth], catalogController.findCatalog);
  app.get('/catalogs', [auth], catalogController.getAllCatalog);

  /*-----------------------Motorcycle Routes---------------------------------------*/
  app.post('/motorcycle/add', [auth, permissions.superAdmin], motorcycleController.addMotorCycle);
  app.put('/motorcycle/update/:motorCycleId', [auth, permissions.superAdmin], motorcycleController.updateMotorCycle);
  app.delete('/motorcycle/:motorCycleId', [auth, permissions.superAdmin], motorcycleController.deleteMotorCycle);
  app.get('/motorcycle/:motorCycleId', [auth], motorcycleController.findMotorCycle);
  app.get('/motorcycles', [auth], motorcycleController.getAllMotorCycle);

  /*-----------------------Part Routes---------------------------------------*/
  app.post('/part/add', [auth, permissions.superAdmin], partController.addPart);
  app.put('/part/update/:partId', [auth, permissions.superAdmin], partController.updatePart);
  app.delete('/part/:partId', [auth, permissions.superAdmin], partController.deletePart);
  app.get('/part/:partId', [auth], partController.findPart);
  app.get('/parts', [auth], partController.getAllPart);

  /*-----------------------Dealership Route---------------------------------------*/
  app.post('/dealership/add', [auth, permissions.superAdmin], dealershipController.createDealership);
  app.put('/dealership/update/:dealershipId', [auth, permissions.superAdmin], dealershipController.updateDealership);
  app.delete('/dealership/:dealershipId', [auth, permissions.superAdmin], dealershipController.deleteDealership);
  app.get('/dealership/:dealershipId', [auth], dealershipController.findDealershipById);
  app.get('/dealerships', [auth], dealershipController.getAllDealership);

  /*-----------------------Part Service---------------------------------------*/
  app.post('/service/add', [auth, permissions.admin], serviceController.createService);
  app.put('/service/update/:serviceId', [auth, permissions.admin], serviceController.updateService);
  app.delete('/service/:serviceId', [auth, permissions.admin], serviceController.deleteService);
  app.get('/service/:serviceId', [auth], serviceController.findServiceById);
  app.get('/services', [auth], serviceController.getAllService);

  /*----------------------- Part ServicePackage ---------------------------------------*/
  app.post('/servicePackage/add', [auth, permissions.admin], servicePackageController.addServicePackage);
  app.put('/servicePackage/update/:servicePackageId', [auth, permissions.admin], servicePackageController.updateServicePackage);
  app.delete('/servicePackage/:servicePackageId', [auth, permissions.admin], servicePackageController.deleteServicePackage);
  app.get('/servicePackage/:servicePackageId', [auth], servicePackageController.findServicePackageById);
  app.get('/servicePackages', [auth], servicePackageController.getAllServicePackage);


  /*-----------------------Part VehicleOwnerShip---------------------------------------*/
  app.post('/vehicleOwnership/add', [auth], ownershipController.addVehicleOwnership);
  app.delete('/vehicleOwnership/delete', [auth], ownershipController.deleteVehicleOwnership);
  app.get('/vehicleOwnership', [auth], ownershipController.getVehicleOwnershipData);

  app.post('/file/upload/getUploadFileUrl', [auth], file.getFileUploadUrl);
};
