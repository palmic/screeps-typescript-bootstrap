///<reference path="Config.ts"/>
///<reference path="../AI/Unit/Harvester1.ts"/>
///<reference path="../AI/Unit/Feeder1.ts"/>

namespace App {
	export namespace Config {
		import Feeder1 = App.AI.Unit.Feeder1;
		import Harvester1 = App.AI.Unit.Harvester1;
		export class Squads implements IConfig {
			public get(): {}[] {
				return [
					{
						name: "harvesters",
						units: [
							{
								type: "harvesters 1",
								name: (app: AppController): string => {
									return `harvester ${app.getGame().time} ${this.getSquadByName("harvesters", app)
										.getUnits().length + 1}`;
								},
								ai: new Harvester1(),
								body: [WORK, CARRY, MOVE],
								countToSpawn: (app: AppController): number => {
									return 3 - this.getSquadByName("harvesters", app).getUnitsOfType("harvesters 1").length;
								}
							}
						]
					},
					{
						name: "feeders",
						units: [
							{
								type: "feeders 1",
								name: (app: AppController): string => {
									return `feeder ${app.getGame().time} ${this.getSquadByName("feeders", app)
										.getUnits().length + 1}`;
								},
								ai: new Feeder1(),
								body: [WORK, CARRY, MOVE],
								countToSpawn: (app: AppController): number => {
									let harvesters = this.getSquadByName("harvesters", app);
									let feeders = this.getSquadByName("feeders", app);
									if (harvesters.getUnitsOfType("harvesters 1").length < 2) {
										return 0;
									}
									return 3 - feeders.getUnitsOfType("feeders 1").length;
								}
							}
						]
					},
				];
			}

			private getSquadByName(name: string, app: AppController): Squad {
				let squadsController = <any><SquadsController>app
					.getSubcontrollerByName("spawners")
					.getSubcontrollerByName("squads");
				return <Squad>squadsController.getSquadByName(name)
			}
		}
	}
}
