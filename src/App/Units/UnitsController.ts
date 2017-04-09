///<reference path="../Controller.ts"/>
///<reference path="../Units/Unit.ts"/>
///<reference path="../Units/UnitFactory.ts"/>

namespace App {
	export namespace Units {
		import Squad = App.Squad.Squad;
		export class UnitsController extends Controller {

			private units: Unit[] = [];

			public getUnits(): Unit[] {
				return this.units;
			}

			protected tick(game: Game): void {
				super.tick(game);
				this.resetLiveUnits(game.creeps);
			}

			private resetLiveUnits(creeps: {[creepName: string]: Creep}): void {
				let out: Unit[] = [];
				let unitFactory: UnitFactory = this.unitFactory;
				_.forEach(creeps, function (creep: Creep) {
					out.push(unitFactory.get(creep));
				});
				this.units = out;
			}
		}
	}
}
