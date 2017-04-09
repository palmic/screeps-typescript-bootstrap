///<reference path="../../Test.ts"/>
///<reference path="../../../src/App/Squad/SquadFactory.ts"/>

namespace App {
	export namespace Squad {
		export class SquadFactoryTest extends Test {
			public run(): void {
				describe("SquadFactory", () => {
					it('should return Squad with given parameters', () => {
						let name = "squad 1";
						let factory: SquadFactory = new SquadFactory();
						let config = this.getSquadConfig();
						let squad = factory.get(name, config);
						this.chai.expect(squad).to.be.instanceof(Squad);
						this.chai.expect(squad.getName()).to.equal(name);
					});
				});
			}
		}
	}
}
