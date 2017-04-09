///<reference path="../Units/Unit.ts"/>
///<reference path="../Units/UnitFactory.ts"/>

namespace App {
	import UnitFactory = App.Units.UnitFactory;
	import Unit = App.Units.Unit;
	import IUnitMemory = App.Units.IUnitMemory;

	export interface IUnitToSpawn {
		name: string,
		body: string[],
		count: number,
		memory: IUnitMemory,
	}

	export class Spawner {

		private spawnStructure: Spawn;
		private unitFactory: UnitFactory;

		constructor(spawnStructure: Spawn, unitFactory: UnitFactory) {
			this.spawnStructure = spawnStructure;
			this.unitFactory = unitFactory;
		}

		spawn(game: Game, body: string[], name: string, memory: IUnitMemory): Unit {
			let ret = this.spawnStructure.createCreep(body, name, memory);
			if (game.creeps[name]) {
				let creep = game.creeps[name];
				return this.unitFactory.get(creep);
			} else {
				throw new Error(`Unit was not spawned due to error: "${ret}"`);
			}
		}
	}
}
