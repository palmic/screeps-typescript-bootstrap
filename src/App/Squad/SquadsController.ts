///<reference path="../Controller.ts"/>
///<reference path="../Squad/Squad.ts"/>
///<reference path="../Squad/SquadFactory.ts"/>
///<reference path="../Units/Unit.ts"/>
///<reference path="../Units/UnitFactory.ts"/>

namespace App {
	export namespace Squad {

		import UnitFactory = App.Units.UnitFactory;
		import UnitsController = App.Units.UnitsController;
		import Unit = App.Units.Unit;

		export interface ISquadsControllerConfig extends IControllerConfig {
			squads: Array<ISquadConfig>
		}

		export class SquadsController extends Controller {

			private squads: Squad[] = [];

			protected config: ISquadsControllerConfig;

			protected tick(game: Game): void {
				super.tick(game);
				this.resetSquads();
				this.assignLiveUnitsToSquads();
				this.runSquads(game);
			}

			public getSquads(): Squad[] {
				return this.squads;
			}

			public getSquadsByNames(): {[name: string]: Squad;} {
				let out: {[name: string]: Squad;} = {};
				_.forEach(this.squads, function (squad: Squad) {
					out[squad.getName()] = squad;
				});
				return out;
			}

			public getSquadByName(name: string): Squad {
				let squads = _.filter(this.getSquads(), function (squad: Squad) {
					return squad.getName() === name;
				});
				if (squads.length === 0) {
					throw new Error(`No squad with name: "${name}" defined!`);
				} else {
					return squads[0];
				}
			}

			private assignLiveUnitsToSquads(): void {
				let unitsController = <UnitsController> this.getSubcontrollerByName("units");
				let units = unitsController.getUnits();
				let squads = this.getSquadsByNames();
				_.forEach(units, function (unit: Unit) {
					let squadName = unit.getSquadName();
					squads[squadName].assignUnit(unit);
				});
			}

			private runSquads(game: Game) {
				_.forEach(this.squads, function (squad: Squad) {
					squad.run(game);
				});
			}

			private resetSquads(): void {
				let t = this;
				let squadsConfigs = this.config.squads;
				this.squads = [];
				if (squadsConfigs) {
					_.forEach(squadsConfigs, function (squadConfig) {
						t.addSquad(t.squadFactory.get(squadConfig.name, squadConfig));
					});
				}
			}

			private addSquad(squad: Squad): void {
				try {
					this.getSquadByName(squad.getName());
					throw new Error(`squad with name: "${squad.getName()}" already defined!`);
				} catch (e) {
					if ((<Error>e).message === `No squad with name: "${squad.getName()}" defined!`) {
						this.squads.push(squad);
					} else {
						throw e;
					}
				}
			}
		}
	}
}
