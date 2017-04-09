///<reference path="../Units/Unit.ts"/>

namespace App {
	import Unit = App.Units.Unit;
	export namespace Squad {

		import IUnitConfig = App.Units.IUnitConfig;

		export interface ISquadConfig {
			name: string,
			units: Array<IUnitConfig>,
		}

		export class Squad {
			private name: string;
			private config: ISquadConfig;
			private units: Unit[] = [];

			constructor(name: string, config: ISquadConfig) {
				this.name = name;
				this.config = config;
			}

			public getName(): string {
				return this.name;
			}

			public assignUnit(unit: Unit): void {
				this.units.push(unit);
				unit.setSquadName(this.getName());
			}

			public getUnits(): Unit[] {
				return this.units;
			}

			public run(game: Game): void {
				_.forEach(this.units, function (unit: Unit) {
					unit.run(game);
				});
			}

			public getUnitsToSpawn(app: AppController): IUnitToSpawn[] {
				let out: IUnitToSpawn[] = [];
				let t = this;
				_.forEach(this.config.units, function (unitConfig: IUnitConfig) {
					out.push({
						name: unitConfig.name(app),
						body: unitConfig.body,
						count: unitConfig.countToSpawn(app),
						memory: {
							type: unitConfig.type,
							ai: unitConfig.ai.constructor["name"],
							squad: t.name,
						},
					});
				});
				return out;
			}

			public getUnitsOfType(type: string): Unit[] {
				let unitsByTypes = this.getUnitsByTypes();
				if (unitsByTypes.hasOwnProperty(type)) {
					return unitsByTypes[type];
				} else {
					return [];
				}
			}

			private getUnitsByTypes(): { [type: string]: Unit[] } {
				let out: { [type: string]: Unit[] } = {};
				_.forEach(this.units, function (unit: Unit) {
					let t = unit.getType();
					if (!out.hasOwnProperty(t)) {
						out[t] = [];
					}
					out[t].push(unit);
				});
				return out;
			}
		}
	}
}
