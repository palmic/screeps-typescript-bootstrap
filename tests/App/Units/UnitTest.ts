///<reference path="../../../src/App/Units/Unit.ts"/>
///<reference path="../../../src/App/AI/AIFactory.ts"/>
///<reference path="../../Test.ts"/>
///<reference path="../../screeps.ts"/>

namespace App {
	export namespace Units {
		import AIFactory = App.AI.AIFactory;
		export class UnitTest extends Test {
			private creep: Creep;
			private aiFactory: AIFactory;
			private memory: IUnitMemory;

			constructor(chai, sinon) {
				super(chai, sinon);

				this.creep = sinon.mock(Creep);
				this.aiFactory = sinon.mock(AIFactory);
				this.memory = {ai: "Harveste1", type: "t", squad: "s"};
				this.creep.memory = this.memory;
			}

			public run(): void {
				describe(this.getTestContextName(), () => {
					it('should return given memory', () => {
						let unit = this.getUnit(this.creep, this.aiFactory);
						this.chai.expect(unit.getMemory()).to.equal(this.memory);
					});
					it('should return its name', () => {
						let name = "Squad 1";
						let creep = this.creep;
						creep.name = name;
						let unit = this.getUnit(creep, this.aiFactory);
						unit.setSquadName(name);
						this.chai.expect(unit.getName()).to.equal(creep.name);
					});
					it('should return its type', () => {
						let type = "Type 1";
						let creep = this.creep;
						creep.memory = {type: type, ai: "Harveste1", squad: "s"};
						let unit = this.getUnit(creep, this.aiFactory);
						this.chai.expect(unit.getType()).to.equal(type);
					});
					it('should return its squad name', () => {
						let unit = this.getUnit(this.creep, this.aiFactory);
						let name = "Squad 1";
						unit.setSquadName(name);
						this.chai.expect(unit.getSquadName()).to.equal(name);
					});
					it('should run its AI', () => {
						let ai = this.getAIMock();
						let aiFactory = this.getAIFactoryMock([ai]);
						let unit = this.getUnit(this.creep, aiFactory);
						let game = new Game();
						unit.run(game);
						this.assertAIRunCalled(ai, unit, game);
					});
					it('should return its creep', () => {
						let creep = <Creep><any>{memory: this.getUnitMemory()};
						let unit = this.getUnit(creep, this.getAIFactoryMock([]));
						this.chai.expect(unit.getCreep()).to.equal(creep);
					});
				});
			}

			private assertAIRunCalled(ai, unit: Unit, game: Game) {
				this.chai.assert(
					ai.run.withArgs(unit, game).calledOnce,
					`ai.run() should be called once with unit and game: "${unit.getName()} and ${game}"`);
			}

			private getUnit(creep: Creep, aiFactory: AIFactory): Unit {
				return new Unit(creep, aiFactory);
			}

			protected getTestContextName(): string {
				return "Unit"
			}
		}
	}
}
