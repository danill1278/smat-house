import {Device} from '../BaseDevices/Device/Device'; 
import { Logger } from "../Utilities/Logger/Logger";
export const SmartHouse = function(name = "Smart House") {
  this._devices = [];
  this._activeDevice = null;

  this.onAll = function() {
    this._devices.forEach(device => device.on());
  };

  this.offAll = function() {
    this._devices.forEach(device => device.off());
  };

  this.deleteAllDevices = function() {
    this.offAll();
    this._devices = [];
  };

  this.getAllDevicesByModel = function(model) {
    return this._devices.filter(device => {
      if (device.getModel() == model) {
        return device;
      }
    });
  };

  this.getDeviceByName = function(name, showMessage = true) {
    let device = null;
    if (typeof name === 'string' && name.length) {
      device = this._devices.find(device => {
        if (device.getName() === name) {
          return device;
        }
      });
      if ( !device && showMessage) {
        Logger.warning('There are no devices with such name');
      }
    } else {
      Logger.error('Please, enter valid device name');
    }
  };

  this.deleteDevicesByModel = function(model) {
    this._devices.filter((device, i) => {
      if (device.getModel() == model) {
        this._devices.splice(i, 1);
      }
    });
  };

  this._checkName = function(name) {
    // return true;
    if (typeof name !== "string") {
      Logger.error("Name must be a string");
      return false;
    }
    name = name.trim();
    const regex = /[\w\d\s]{5,10}/;
    const result = regex.test(name);
    
    if (!result) {
      Logger.error("Name must include more than 5 characters");
      return false;
    }

    let isNameUnic = this.getDeviceByName(name, false);
    
    if (!isNameUnic) {
      Logger.error('Device with those name already exist');
      return false;
    }
    return true;
  };

  if (this._checkName(name)) {
    this._name = name;
  }

  this.getName = function() {
    return this._name;
  };

  this.addDevice = function(device) {
    if (device instanceof Device) {
      console.log(device.getName());
      
      this._checkName(device.getName());
      this._devices.push(device);
    } else {
      Logger.error("Devices must be objects of iKettle or Speaker");
    }
  };

  this.deleteDeviceByName = function(name) {
    let deleteObjIndex = this._devices.find((device, index) => {
      if (device.getName() === name) {
        deleteObjIndex = index;
        return true;
      }
    });

    this._devices[deleteObjIndex].off();
    this._devices.splice(deleteObjIndex, 1);
  };

  this.getAllDevices = function() {
    return this._devices;
  };
};
