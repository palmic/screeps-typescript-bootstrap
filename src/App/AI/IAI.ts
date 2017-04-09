///<reference path="../Units/Unit.ts"/>

namespace App {
	export namespace AI {
		export interface IAI {
			run: Function
		}
		export abstract class AI implements IAI {
			public abstract run(unit: App.Units.Unit, game: Game);
		}
	}
}
