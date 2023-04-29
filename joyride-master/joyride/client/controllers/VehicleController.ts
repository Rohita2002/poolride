import * as express from 'express';

import Controller from '../interfaces/IController';
import vehicle from '../schemas/Vehicle';

/**
 * Controller class for the user.
 * @TODO write functions for updating, deleting, and getting user.
 */
export default class VehicleController implements Controller {
	public path = '/vehicle';
	public router = express.Router();

	private userVehicle = vehicle;

	constructor() {
		this.initRoutes();
	}

	/**
	 * Initialize all routes
	 */
	public initRoutes() {
		this.router.get(`${this.path}/vehicleDetails/:id`, this.getVehicle);
		this.router.delete(`${this.path}/:id`, this.deleteVehicle);
		this.router.get(`${this.path}/allvehicles`, this.getAllVehicles);
	}

	/**
	 * Get all users.
	 */
	private getAllVehicles = (
		request: express.Request,
		response: express.Response
	) => {
		console.log('get all vehicles');
		this.userVehicle.find().then((vehicles) => {
			response.send(vehicles);
		});
	};

	private getVehicle = (
		request: express.Request,
		response: express.Response
	) => {
		console.log('called getVehicle');
		// console.log('request.body', request.body);
		console.log('helooooo');

		const userId = request.params.id;
		console.log('userId', userId);
		// const emailID = loginData.emailID;

		this.userVehicle.findOne({ driverID: userId }).then(async (founduser) => {
			if (founduser) {
				// response.sendStatus(200);
				response.send(founduser);
				console.log('found vehicle', founduser);
			} else {
				console.log('vehicle not found');
				response.sendStatus(404);
				// response.send('not found');
			}
		});

		// return vechileDetails;
	};

	private deleteVehicle = (
		request: express.Request,
		response: express.Response
	) => {
		console.log('called delete vehicle');

		const driverID = request.params.id;
		console.log('driverID', driverID);

		// Delete the vehicle with the given driverID from the vehicles collection
		this.userVehicle
			.deleteOne({ driverID: driverID })
			.then(async (founduser) => {
				if (founduser) {
					response.sendStatus(200);
					// response.send(founduser);
				} else {
					console.log('vehicle not found');
					response.sendStatus(404);
					// response.send('not found');
				}
			});
	};
}
