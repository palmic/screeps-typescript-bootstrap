///<reference path="../../../src/App/Units/UnitFactory.ts"/>
///<reference path="../../Test.ts"/>
///<reference path="../../screeps.ts"/>
namespace App {
	export namespace Units {
		export class UnitFactoryTest extends Test {
			public run(): void {
				describe("UnitFactory", () => {
					it('should return Unit', () => {
						let creep = sinon.mock(Creep);
						creep.memory = {ai: "Harvester1", type: "t", squad: "s"};
						let unitFactory = new UnitFactory(this.getAIFactoryMock([]));
						let unit = unitFactory.get(creep);
						this.chai.expect(unit).to.be.instanceof(Unit);
					});
				});
			}
		}
	}
}
