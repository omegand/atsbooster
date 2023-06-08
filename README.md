# atsbooster

## About <a name = "about"></a>

Increases your fake attackspeed with a multiplier, works way better than a base number.
Obviously doesn't work on all the time, depends on SP used, how prone to ghosting the class is, your ping etc...

## Usage <a name = "usage"></a>

### Commands

```
'/proxy gofast' globally toggles on/off
'/proxy gofast multiplier [number], e.g. 1, 1.4, 2, 1.01
'/proxy gofast show' shows current class multiplier
'/proxy gofast reload' brings in fresh settings from config.js without relaunching
'/proxy gofast help' prints this readme
```

Set the multiplier either by editing config.json and reloading or setting it directly with the command.

Setting new multiplier will directly change the config.json.

If you want to disable bonus ats on some classes, set enabled:false on your desired class in config.json.