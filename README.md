# homebridge-sky-q

[Homebridge](https://github.com/nfarina/homebridge) plugin to turn on/off a Sky Q box and send custom commands (such as channel shortcuts or record)

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
	"name": "Sky Q Power",
	"ipAddress": "<Sky Q Box IP Address>"
}
```

## Advnaced Configuration

Can be used to send other commands to the Sky Q box also, for example a shortcut to channel 101:
```
{
	"accessory": "SkyQ",
	"name": "Sky CH101",
	"ipAddress": "<Sky Q Box IP Address>",
	"cmd": "1,0,1"
}
```
When using the "cmd" option (and when it is set to anything other than "power") the switch state in the Home app will no longer toggle on/off (as it doesn't make sense for a shortuct switch to be on/off), it will remain in the off state and may also present an (!) error in the Home app as a result - this is expected behaviour.

The full list of available commands is here:

`sky` `power`

`tvguide` or `home` `boxoffice` `services` or `search` `interactive` or `sidebar`

`up` `down` `left` `right` `select`

`channelup` `channeldown` `i`

`backup` or `dismiss` `text` `help`

`play` `pause` `rewind` `fastforward` `stop` `record`

`red` `green` `yellow` `blue`

`0` `1` `2` `3` `4` `5` `6` `7` `8` `9`

There is a special feature to work around a Samsung Soundbar HDMI CEC bug on startup (where it flips off of the HDMI channel ~30 seconds after turning on). With the "delayed" option set true, and when NOT using the "cmd" option, when the Sky Q box is instructed to switch on, after 20 seconds it will send the "sky" button command as well to re-send the HDMI CEC signal and force the Soundbar to stay on that channel.
```
{
	"accessory": "SkyQ",
	"name": "Sky Q Power",
	"ipAddress": "<Sky Q Box IP Address>"
	"delayed": true
}
```


## Getting your Sky Q Box's IP address

On your Sky Q Box, go to Settings > Setup > Network > Advanced Settings > IP address.
Note that it is advisable to assign your Sky Q box a reserved IP via the DHCP settings on your router. Without doing this your Sky Q box will liekly get a different IP when your router is ever rebooted.
