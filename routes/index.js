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

export const routes = app => {
  // Render home page
  app.get('/', function (req, res) {
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
  app.get('/users', userController.getAllUser);
  app.put('/user/update/:userId', userController.updateUser);
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

  /*-----------------------Dealership Route---------------------------------------*/
  app.post('/dealership/add', dealershipController.createDealership);
  app.put('/dealership/update/:dealershipId', dealershipController.updateDealership);
  app.delete('/dealership/:dealershipId', dealershipController.deleteDealership);
  app.get('/dealership/:dealershipId', dealershipController.findDealershipById);
  app.get('/dealerships', dealershipController.getAllDealership);

  /*-----------------------Part Service---------------------------------------*/
  app.post('/service/add', serviceController.createService);
  app.put('/service/update/:serviceId', serviceController.updateService);
  app.delete('/service/:serviceId', serviceController.deleteService);
  app.get('/service/:serviceId', serviceController.findServiceById);
  app.get('/services', serviceController.getAllService);

  /*----------------------- Part ServicePackage ---------------------------------------*/
  app.post('/servicePackage/add', servicePackageController.addServicePackage);
  app.put('/servicePackage/update/:servicePackageId', servicePackageController.updateServicePackage);
  app.delete('/servicePackage/:servicePackageId', servicePackageController.deleteServicePackage);
  app.get('/servicePackage/:servicePackageId', servicePackageController.findServicePackageById);
  app.get('/servicePackages', servicePackageController.getAllServicePackage);

  /*-----------------------Part ReplacePart---------------------------------------*/
  app.post('/replacePart/add', replacePartController.addReplacePart);
  app.put('/replacePart/update/:replacePartId', replacePartController.updateReplacePart);
  app.delete('/replacePart/:replacePartId', replacePartController.deleteReplacePart);
  app.get('/replacePart/:replacePartId', replacePartController.findReplacePartById);
  app.get('/replaceParts', replacePartController.getAllReplaceParts);

  // /*-----------------------Part VehicleOwnerShip---------------------------------------*/
  // app.post('/vehicleOwnership/add', vehicleOwnershipController.addVehicleOwnership);
  // app.put('/vehicleOwnership/update/:vehicleOwnershipId', vehicleOwnershipController.updateVehicleOwnership);
  // app.delete('/vehicleOwnership/:vehicleOwnershipId', vehicleOwnershipController.deleteVehicleOwnership);
  // app.get('/vehicleOwnership/:vehicleOwnershipId', vehicleOwnershipController.findVehicleOwnershipById);
  // app.get('/vehicleOwnerships', vehicleOwnershipController.getAllVehicleOwnership);

  app.post('/file/upload/getUploadFileUrl', [auth], file.getFileUploadUrl);
};
