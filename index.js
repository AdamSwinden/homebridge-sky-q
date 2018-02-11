'use strict';

var SkyRemote = require('sky-remote');
var Accessory, Service, Characteristic;

module.exports = function(homebridge) {

	Accessory = homebridge.platformAccessory;
	Service = homebridge.hap.Service;
	Characteristic = homebridge.hap.Characteristic;
	homebridge.registerAccessory("homebridge-sky-q", "SkyQ", SkyQAccessory);
};

function SkyQAccessory(log, config, api) {

	this.log = log;
	this.config = config;
	this.name = config.name || 'Sky Q';

	var remoteControl = new SkyRemote(config.ipAddress);
	this.skyQ = remoteControl;
}


SkyQAccessory.prototype = {

	setPowerState: function(powerOn, callback) {

		var log = this.log;
		var name = this.name;

		log("Sending on command to '" + name + "'...");

		this.skyQ.press('power', function(error) {

			if (error) {

				log('Failed to turn on ' + name + '. ' + error);
			}

			callback();
		});
	},

	identify: function(callback) {

		this.log("Identify...");

		callback();
	},

	getServices: function() {

		var switchService = new Service.Switch(this.name);

		switchService.getCharacteristic(Characteristic.On).on('set', this.setPowerState.bind(this));

		return [switchService];
	}
};
