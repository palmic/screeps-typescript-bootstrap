///<reference path="Unit.ts"/>

namespace App {
	export namespace AI {
		export namespace Unit {
			export class Feeder1 extends App.AI.AI {
				public run(unit: App.Units.Unit, game: Game): void {

					let creep = unit.getCreep();

					if(creep.carry.energy == 0) {
						let sources = <any>creep.room.find(FIND_SOURCES);
						if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
							creep.moveTo(sources[0]);
						}
					}
					else {
						if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
							creep.moveTo(creep.room.controller);
						}
					}
				}
			}
		}
	}
}
