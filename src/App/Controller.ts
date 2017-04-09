///<reference path="./Spawn/Spawner.ts"/>
///<reference path="./Squad/Squad.ts"/>
///<reference path="./Squad/SquadFactory.ts"/>
///<reference path="./Units/Unit.ts"/>
///<reference path="./Units/UnitFactory.ts"/>

namespace App {
	import Unit = App.Units.Unit;
	import UnitFactory = App.Units.UnitFactory;
	import SquadFactory = App.Squad.SquadFactory;
	export interface IController {
		loop(game: Game): void;
		addSubControllers(subControllers: { [name: string]: IController; }): void;
		getSubcontrollerByName(name: string): IController;
		getGame(): Game;
	}

	export interface IControllerConfig {
	}

	export class Controller implements IController {

		private lastLoopTick: number = null;
		private game: Game;
		protected config: IControllerConfig;
		protected subControllers: {
			[name: string]: IController;
		} = {};
		protected squadFactory: SquadFactory;
		protected spawnerFactory: SpawnerFactory;
		protected unitFactory: UnitFactory;

		constructor(config: IControllerConfig, squadFactory: SquadFactory, unitFactory: UnitFactory, spawnerFactory: SpawnerFactory) {
			this.config = config;
			this.squadFactory = squadFactory;
			this.spawnerFactory = spawnerFactory;
			this.unitFactory = unitFactory;
		}

		public addSubControllers(subControllers: { [name: string]: IController; }): void {
			this.subControllers = _.merge(this.subControllers, subControllers);
		}

		public loop(game: Game): void {
			this.game = game;
			if (this.lastLoopTick !== game.time) {
				this.lastLoopTick = game.time;
				_.forEach(this.subControllers, function (controller: IController) {
					controller.loop(game);
				});
				this.tick(game);
			}
		}

		public getSubcontrollerByName(name: string): IController {
			if (this.subControllers.hasOwnProperty(name)) {
				return this.subControllers[name];
			} else {
				throw new Error(
					`subController with name "${name}" was not found in ${this.constructor["name"]}!`
				);
			}
		}

		public getGame(): Game {
			return this.game;
		}

		protected tick(game: Game): void {

		}
	}
}
