# homebridge-sky-q

[Homebridge](https://github.com/nfarina/homebridge) plugin to turn on/off a Sky Q box.

## Installation

Install the plugin globally using npm.

```
npm install -g homebridge-sky-q
```

## Configuration

Add this to your `~/.homebridge/config.json` as an accessory:
```
{
	"accessory": "SkyQ",
	"name": "Sky Q Box",
	"ipAddress": "<Sky Q Box IP Address>"
}
```

## Getting your Sky Q Box's IP address

On your Sky Q Box, go to Settings > Setup > Network > Advanced Settings > IP address.
