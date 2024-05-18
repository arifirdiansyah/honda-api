import { auth } from '../config/auth.js';
import * as file from '../controller/fileController.js';
import * as permissions from '../config/permissions.js';
import * as authController from '../controller/AuthController.js';
import * as userController from '../controller/UserController.js';
import * as catalogController from '../controller/CatalogController.js';
import * as motorcycleController from '../controller/MotorcycleController.js';
import * as partController from '../controller/PartController.js';
import * as dealershipController from '../controller/DealershipController.js';
import * as addressController from '../controller/AddressController.js';
import * as serviceController from '../controller/ServiceController.js';
import * as servicePackageController from '../controller/ServicePackageController.js';
import * as replacePartController from '../controller/ReplacedPartController.js';
import * as vehicleOwnershipController from '../controller/VehicleOwnerShipController.js';

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

  /*-----------------------Part Dealership---------------------------------------*/
  app.router.post('/dealership/add', dealershipController.addDealership);
  app.router.put('/dealership/update/:dealershipId', dealershipController.updateDealership);
  app.router.delete('/dealership/:dealershipId', dealershipController.deleteDealership);
  app.router.get('/dealership/:dealershipId', dealershipController.findDealership);
  app.router.get('/dealerships', dealershipController.getAllDealerships);

  /*-----------------------Part Address---------------------------------------*/
  app.router.post('/address/add', addressController.createAddress);
  app.router.put('/address/update/:addressId', addressController.updateAddress);
  app.router.delete('/address/:addressId', addressController.deleteAddress);
  app.router.get('/address/:addressId', addressController.findAddressById);
  app.router.get('/addresses', addressController.getAllAddresses);

  /*-----------------------Part Service---------------------------------------*/
  app.router.post('/service/add', serviceController.createService);
  app.router.put('/service/update/:serviceId', serviceController.updateService);
  app.router.delete('/service/:serviceId', serviceController.deleteService);
  app.router.get('/service/:serviceId', serviceController.findServiceById);
  app.router.get('/services', serviceController.getAllServices);

  /*-----------------------Part ServicePackage---------------------------------------*/
  app.router.post('/servicePackage/add', servicePackageController.createServicePackage);
  app.router.put('/servicePackage/update/:servicePackageId', servicePackageController.updateServicePackage);
  app.router.delete('/servicePackage/:servicePackageId', servicePackageController.deleteServicePackage);
  app.router.get('/servicePackage/:servicePackageId', servicePackageController.findServicePackageById);
  app.router.get('/servicePackages', servicePackageController.getAllServicePackages);

  /*-----------------------Part ReplacePart---------------------------------------*/
  app.router.post('/replacePart/add', replacePartController.addReplacedPart);
  app.router.put('/replacePart/update/:replacePartId', replacePartController.updateReplacedPart);
  app.router.delete('/replacePart/:replacePartId', replacePartController.deleteReplacedPart);
  app.router.get('/replacePart/:replacePartId', replacePartController.findReplacedPartById);
  app.router.get('/replaceParts', replacePartController.getAllReplacedParts);

  /*-----------------------Part VehicleOwnerShip---------------------------------------*/
  app.router.post('/vehicleOwnership/add', vehicleOwnershipController.addVehicleOwnership);
  app.router.put('/vehicleOwnership/update/:vehicleOwnershipId', vehicleOwnershipController.updateVehicleOwnership);
  app.router.delete('/vehicleOwnership/:vehicleOwnershipId', vehicleOwnershipController.deleteVehicleOwnership);
  app.router.get('/vehicleOwnership/:vehicleOwnershipId', vehicleOwnershipController.findVehicleOwnershipById);
  app.router.get('/vehicleOwnerships', vehicleOwnershipController.getAllVehicleOwnerships);

  app.post('/file/upload/getUploadFileUrl', [auth], file.getFileUploadUrl);
};
