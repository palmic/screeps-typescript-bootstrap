///<reference path="./SpawnerFactory.ts"/>
///<reference path="../Units/Unit.ts"/>

namespace App {
	import SquadsController = App.Squad.SquadsController;
	import Unit = App.Units.Unit;
	export class SpawnersController extends Controller {

		private spawns: Spawner[] = [];

		protected tick(game: Game): void {
			super.tick(game);
			this.resetSpawners(game.spawns);
			this.spawnMissingUnits(game);
		}

		public getSpawns(): Spawner[] {
			return this.spawns;
		}

		private resetSpawners(spawns: {[name: string]: Spawn}): void {
			let out: Spawner[] = [];
			let spawnerFactory = this.spawnerFactory;
			_.forEach(spawns, function (spawn: Spawn) {
				out.push(spawnerFactory.get(spawn));
			});
			this.spawns = out;
		}

		private spawnMissingUnits(game: Game): void {
			let unitsToSpawn = this.getUnitsToSpawn();
			let t = this;
			_.forEach(unitsToSpawn, function (unitToSpawn: IUnitToSpawn) {
				if (unitToSpawn.count > 0) {
					t.tryToSpawn(game, unitToSpawn);
				}
			});
		}

		private tryToSpawn(game: Game, unitToSpawn: IUnitToSpawn): Unit {
			let unit: Unit;
			_.forEach(this.spawns, function (spawner: Spawner) {
				try {
					unit = spawner.spawn(game, unitToSpawn.body, unitToSpawn.name, unitToSpawn.memory);
					return;
				} catch (e) {
					// console.log(e.message);
				}
			});
			return unit;
		}

		private getUnitsToSpawn(): IUnitToSpawn[] {
			let out: IUnitToSpawn[] = [];
			let squadsController: SquadsController = <SquadsController>this.getSubcontrollerByName("squads");
			let squads = squadsController.getSquads();
			let app = <AppController>this.getSubcontrollerByName("app");
			_.forEach(squads, function (squad: Squad) {
				let ss = squad.getUnitsToSpawn(app);
				for (let s of ss) {
					out.push(s);
				}
			});
			return out;
		}
	}
}
