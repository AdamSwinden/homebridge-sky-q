'use strict';

var SkyRemote = require('sky-remote');
var SkyQCheck = require('sky-q');
var Accessory, Service, Characteristic;

module.exports = function(homebridge) {

	Accessory = homebridge.platformAccessory;
	Service = homebridge.hap.Service;
	Characteristic = homebridge.hap.Characteristic;
	homebridge.registerAccessory("homebridge-sky-q-play", "SkyQPlay", SkyQAccessory);
};

function SkyQAccessory(log, config, api) {

	this.log = log;
	this.config = config;
	this.name = config.name || 'Sky Q';
	this.stateful = false;

	if (this.config.cmd === 'power' || !this.config.cmd) {

		this.stateful = true;
	}

	var remoteControl = new SkyRemote(config.ipAddress);
	var boxCheck = new SkyQCheck({ip:config.ipAddress})
	this.skyQ = remoteControl;
	this.box = boxCheck;
}


SkyQAccessory.prototype = {

	setPowerState: function(powerOn, callback) {

		var log = this.log;
		var name = this.name;
		var stateful = this.stateful;
		
		if (this.config.cmd) {

			this.cmd = this.config.cmd.split(',');
		} else {

			this.cmd = 'power';
		}
		
		log('Sending "' + this.cmd + '" command to ' + name + '...');

		this.skyQ.press(this.cmd, function(error) {

			if (error) {

				log('Failed to send cmd ' + name + '. ' + error);
			}

			if (stateful === true) {	

				callback();
			} else {

				callback(new Error(1)); //Only way to keep the switch from turning on/off
			}
		});
	},

	identify: function(callback) {

		this.log("Identify...");

		callback();
	},

	getState: function(callback) {
		if (this.stateful) {

			this.box.getPowerState().then(isOn=>{
	  		if (isOn) {

			    this.log(this.name + " is on :-)")
			  } else {

			    this.log(this.name + " is in standby :-(")
			  }
			  callback(null, isOn);

			}).catch(err=>{

			  this.log("Unable to determine power state")
			  this.log("Perhaps looking at this error will help you figure out why" + err)
			  callback(err || new Error('Error getting state of ' + this.name));
			})
		} else {

		  callback(null, 0);
		}
	},

	getServices: function() {

		var switchService = new Service.Switch(this.name);

		var characteristic = switchService.getCharacteristic(Characteristic.On).on('set', this.setPowerState.bind(this));

		characteristic.on('get', this.getState.bind(this));

		return [switchService];
	}
};
