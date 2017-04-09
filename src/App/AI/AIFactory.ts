///<reference path="IAI.ts"/>

namespace App {
	export namespace AI {
		export class AIFactory {
			public get(className: string): IAI {
				return new App.AI.Unit[className]();
			}
		}
	}
}
