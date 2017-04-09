///<reference path="../AI/AIFactory.ts"/>
///<reference path="Unit.ts"/>

namespace App {
	export namespace Units {
		import AIFactory = App.AI.AIFactory;
		export class UnitFactory {

			private aiFactory: AIFactory;

			constructor(aiFactory: App.AI.AIFactory) {
				this.aiFactory = aiFactory;
			}

			public get(creep: Creep): Unit {
				return new Unit(creep, this.aiFactory);
			}
		}
	}
}
