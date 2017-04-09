///<reference path="Unit.ts"/>

namespace App {
	export namespace AI {
		export namespace Unit {
			export class Harvester1 extends App.AI.AI {
				public run(unit: App.Units.Unit, game: Game): void {

					let creep = unit.getCreep();

					if (creep.carry.energy < creep.carryCapacity) {
						let source = <any>creep.room.find(FIND_SOURCES)[0];
						if(creep.harvest(source) === ERR_NOT_IN_RANGE) {
							creep.moveTo(source);
						}
					} else {
						let spawn = <any>game.spawns.Spawn1;
						if (spawn.energy < spawn.energyCapacity) {
							if (creep.transfer(spawn, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
								creep.moveTo(spawn);
							}
						}
					}
				}
			}
		}
	}
}
