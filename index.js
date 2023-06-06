module.exports = function gofast(mod) {
	
	const SpeedDivider = [120, 100, 110, 90, 110, 120, 105, 105, 100, 100, 100, 100, 100];
	let totalaspeed = 0;
	let job;
	let multiplier = 1.1;
	
	mod.hook('S_LOGIN', 14, { order: -Infinity, filter: { fake: null } }, (event) => {
        job = (event.templateId - 10101) % 100;
	});

	mod.hook('S_PLAYER_STAT_UPDATE', 14, { order: -Infinity, filter: { fake: null } }, (event) => {
		totalaspeed = event.attackSpeed + event.attackSpeedBonus;
		event.attackSpeed = SpeedDivider[job];
		event.attackSpeedBonus = (totalaspeed - SpeedDivider[job]) * multiplier;
		return true
	})
}	