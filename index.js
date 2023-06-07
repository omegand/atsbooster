module.exports = function gofast(mod) {
	const configPath = path.join(__dirname, "config.json");
	const readmePath = path.join(__dirname, "README.md");
	const fs = require("fs");
	const path = require("path");

	let config = JSON.parse(fs.readFileSync(configPath));
	console.log(config);

	let enabled = config.settings.enabled;
	let command = mod.command || mod.require.command;

	let totalaspeed = 0;
	let job;
	let multiplier = 1;

	command.add("gofast", (arg, value) => {
		switch (arg) {
			case "multiplier":
				if (value) {
					multiplier = parseFloat(value);
					command.message("Multiplier set to: ${multiplier}.");
					config.classOptions[job].multiplier = multiplier;
					fs.writeFileSync(configPath, JSON.stringify(config, null, 4), (err) => {
						if (err) {
							command.message("Error updating config:", err);
						} else {
							command.message("Config updated successfully.");
						}
					});
				} else {
					command.message("Please provide a valid value for the multiplier.");
				}
				break;
			case "reload":
				config = JSON.parse(fs.readFileSync(configPath));
				command.message("Reloaded settings.");
				break;
			case "help":
				fs.readFile(readmePath, "utf8", (err, data) => {
					if (err) {
						command.message("Wtf where did you put the readme");
						console.log(err);
					} else {
						command.message(data);
					}
				});
				break;
			default:
				enabled = !enabled;
				command.message("You are " + (enabled ? "" : "(not) ") + "going fast.");
		}
	});

	mod.hook("S_LOGIN", 14, { order: -Infinity, filter: { fake: null } }, (event) => {
		job = (event.templateId - 10101) % 100;
	}
	);

	mod.hook("S_PLAYER_STAT_UPDATE", 14, { order: -Infinity, filter: { fake: null } },
		(event) => {
			if (!config.settings.enabled || !config.classOptions[job].enabled) return;
			multiplier = config.classOptions[job].multiplier;
			totalaspeed = event.attackSpeed + event.attackSpeedBonus;
			event.attackSpeed = config.classOptions[job].baseAttackSpeed;
			event.attackSpeedBonus =
				(totalaspeed - config.classOptions[job].baseAttackSpeed) * multiplier;
			return true;
		}
	);
};
