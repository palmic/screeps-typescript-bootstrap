///<reference path="../../Test.ts"/>
///<reference path="../../../src/App/AI/AIFactory.ts"/>
///<reference path="../../../src/App/AI/Unit/Feeder1.ts"/>
///<reference path="../../../src/App/AI/Unit/Harvester1.ts"/>

namespace App {
	export namespace AI {
		import Feeder1 = App.AI.Unit.Feeder1;
		import Harvester1 = App.AI.Unit.Harvester1;
		export class AIFactoryTest extends Test {
			public run(): void {
				let aiFactory = new AIFactory();
				describe("AI Factory", () => {
					it('should return AI', () => {
						this.chai.expect(aiFactory.get("Harvester1"))
							.to.be.instanceof(
							Harvester1,
							"given AI should be instance of Harvester1"
						);
						this.chai.expect(aiFactory.get("Feeder1"))
							.to.be.instanceof(
							Feeder1,
							"given AI should be instance of Feeder1"
						);
					});
				});
			}
		}
	}
}
