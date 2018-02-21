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

## Advanced Configuration

>cmd option

Can be used to send other commands to the Sky Q box also, for example a shortcut to channel 101 or to record what is currently being watched.

When using the "cmd" option (and when it is set to anything other than "power") the switch state in the Home app will always return to the off state (as it doesn't make sense for a shortuct switch to be on/off).

The full list of available commands is here:

`sky` `power`

`tvguide` or `home` `boxoffice` `services` or `search` `interactive` or `sidebar`

`up` `down` `left` `right` `select`

`channelup` `channeldown` `i`

`backup` or `dismiss` `text` `help`

`play` `pause` `rewind` `fastforward` `stop` `record`

`red` `green` `yellow` `blue`

`0` `1` `2` `3` `4` `5` `6` `7` `8` `9`



>delayed option

There is a special feature to work around a Samsung Soundbar HDMI CEC bug on startup (where it flips off of the HDMI channel ~30 seconds after turning on). With the "delayed" option set true, and when NOT using the "cmd" option, when the Sky Q box is instructed to switch on, after 20 seconds it will send the "sky" button command as well to re-send the HDMI CEC signal and force the Soundbar to stay on that channel.



>autoOn option

When using the "cmd" option, if the box is off, when AutoOn is true it will switch the Sky Q box on before sending the cmd. Also works in conjunction with the "delayed" function if enabled.


```
{
	"accessory": "SkyQ",
	"name": "Sky Q Power",
	"ipAddress": "<Sky Q Box IP Address>"
	"cmd": "1,0,1",
	"delayed": true,
	"autoOn": true
}
```
## Tips

When creating a 'go to channel' type command, it is recommended you put 'backup,backup,backup' before the channel to ensure any menu/playing programme is quit before entering the number;

```"cmd": "backup,backup,backup,1,0,1"```

To play a specific program the search function works best, similar to above, be sure to do a 'search,search' to clear any preivous search info. This example searches for "pep" (Peppa Pig), goes right 3 times to allow time for the search to complete, selects it and moves down to 'More Like This' and then up 1 to 'Recordings', select, up a few times to ensure Series 1, right twice to get to 'Watch From Start' (to avoid playing from a random previous point) and select to play;

```"cmd": "search,search,7,3,3,7,right,right,right,select,down,down,down,down,down,down,down,up,select,up,up,up,up,up,right,right,select"```

If typing a word which requires 2 letters from the same number, split them with a couple of 'dud' key presses to let it time out, for example, "abc" would be;

```"cmd": "search,search,2,red,red,2,2,red,red,2,2,2"```

## Getting your Sky Q Box's IP address

On your Sky Q Box, go to Settings > Setup > Network > Advanced Settings > IP address.
Note that it is advisable to assign your Sky Q box a reserved IP via the DHCP settings on your router. Without doing this your Sky Q box will likely get a different IP when your router is ever rebooted.
