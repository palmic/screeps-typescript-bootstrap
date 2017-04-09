///<reference path="Squad.ts"/>

namespace App {
	export namespace Squad {
		export class SquadFactory {

			public get(name: string, config: ISquadConfig): Squad {
				return new Squad(name, config);
			}
		}
	}
}
