///<reference path="Spawner.ts"/>
///<reference path="../Units/UnitFactory.ts"/>

namespace App {
	import UnitFactory = App.Units.UnitFactory;
	export class SpawnerFactory {

		private unitFactory: UnitFactory;

		constructor(unitFactory: App.Units.UnitFactory) {
			this.unitFactory = unitFactory;
		}

		public get(spawn: Spawn): Spawner {
			return new Spawner(spawn, this.unitFactory);
		}
	}
}
