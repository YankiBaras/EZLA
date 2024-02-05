/* tslint:disable */
/* eslint-disable */
/**
 * Ezer LaChayim API
 * Redis' social hackathon June 2023 - bridge between volunteers and those in need of rides to the hospital 
 *
 * OpenAPI spec version: 1.0.0
 * Contact: apiteam@swagger.io
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { Driver } from './driver';
import {RideRequester} from './ride-requester';
/**
 * 
 * @export
 * @interface Ride
 */
export interface Ride {
    /**
     * 
     * @type {string}
     * @memberof Ride
     */
    rideId?: string;
    /**
     *
     * @type {string}
     * @memberof Ride
     */
    destination?: string;
    /**
     * 
     * @type {string}
     * @memberof Ride
     */
    origin?: string;
    /**
     * 
     * @type {string}
     * @memberof Ride
     */
    cellphone?: string;
    /**
     *
     * @type {string}
     * @memberof Ride
     */
    state?: RideStateEnum;
    /**
     * 
     * @type {number}
     * @memberof Ride
     */
    passengerCount?: number;
    /**
     * 
     * @type {Array<string>}
     * @memberof Ride
     */
    specialRequest?: Array<RideSpecialRequestEnum>;
    /**
     * 
     * @type {string}
     * @memberof Ride
     */
    requestTimeStamp?: Date;
    completedTimeStamp?: Date;
    /**
     * 
     * @type {number}
     * @memberof Ride
     */
    pickupDateTime?: Date;
    /**
     * 
     * @type {number}
     * @memberof Ride
     */
    relevantTime?: number; 
        /**
     * 
     * @type {number}
     * @memberof Ride
     */
    destinationArrivalTime?: number | null;
    /**
     * 
     * @type {Driver}
     * @memberof Ride
     */
    driver?: any;
    /**
     *
     * @type {RideRequester}
     * @memberof Ride
     */
    rideRequester?: any,
    /**
     *
     * @type {string}
     * @memberof Ride
     */
    firstName? : string;
    /**
     *
     * @type {string}
     * @memberof Ride
     */
    lastName?: string;
    /**
     *
     * @type {string}
     * @memberof Ride
     */
    comment?: string;
    /**
     *
     * @type {string}
     * @memberof Ride
     */
    guestToken?: string;
}

/**
    * @export
    * @enum {string}
    */
export enum RideStateEnum {
    WaitingForDriver = 'WaitingForDriver',
    Booked = 'Booked',
    DriverEnroute = 'DriverEnroute',
    DriverArrived = 'DriverArrived',
    Riding = 'Riding',
    Completed = 'Completed',
    DriverCanceled = 'DriverCanceled',
    RequesterCanceled = 'RequesterCanceled',
    Canceled = 'Canceled'
}
/**
    * @export
    * @enum {string}
    */
export enum RideSpecialRequestEnum {
    WheelChair = 'WheelChair',
    WheelChairStorage = 'WheelChairStorage',
    BabyChair = 'BabyChair',
    KidsChair = 'KidsChair',
    AccessibleCar = 'AccessibleCar',
    PatientDelivery = 'PatientDelivery'
}

