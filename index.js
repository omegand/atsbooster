module.exports = function gofast(mod) {
	command.add('gofast', (arg) => {
		switch (arg) {
			case 'multiplier'
			case 'reload':
				delete require.cache[require.resolve('./config')];
				({ settings, individualEnabled, classBaseAttackSpeeds } = require('./config'));
				command.message('Reloaded settings.');
				break;
			case 'help':
				const readmePath = path.join(__dirname, 'README.md');
				fs.readFile(readmePath, 'utf8', (err, data) => {
					if (err) {
						command.message('Wtf where did you put the readme');
						console.log(err);
					} else {
						command.message(data);
					}
				});
				break;
			default:
				enabled = !enabled;
				command.message('You are' + (enabled ? '' : 'Not') + 'going fast');
				break;
		}
	});
	//import settings from config.js
	let { settings, individualEnabled, classBaseAttackSpeeds } = require('./config');

	let totalaspeed = 0;
	let job;
	let multiplier = settings.multiplier;

	mod.hook('S_LOGIN', 14, { order: -Infinity, filter: { fake: null } }, (event) => {
		job = (event.templateId - 10101) % 100;
	});

	mod.hook('S_PLAYER_STAT_UPDATE', 14, { order: -Infinity, filter: { fake: null } }, (event) => {
		if (!individualEnabled[job] || !settings.enabled) return;
		totalaspeed = event.attackSpeed + event.attackSpeedBonus;
		event.attackSpeed = SpeedDivider[job];
		event.attackSpeedBonus = (totalaspeed - classBaseAttackSpeeds[job]) * multiplier;
		return true
	})


}	