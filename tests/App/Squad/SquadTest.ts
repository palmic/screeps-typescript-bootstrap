///<reference path="../../../src/App/AI/Unit/Harvester1.ts"/>
///<reference path="../../../src/App/AI/Unit/Feeder1.ts"/>
///<reference path="../../../src/App/Squad/Squad.ts"/>
///<reference path="../../Test.ts"/>
///<reference path="../../screeps.ts"/>

namespace App {
	export namespace Squad {
		import Harvester1 = App.AI.Unit.Harvester1;
		import Feeder1 = App.AI.Unit.Feeder1;
		export class SquadTest extends Test {
			private name: string = "";

			public run(): void {
				describe("Squad", () => {
					it('should return its given name', () => {
						let name = "squad 1";
						let squad: Squad = new Squad(name, this.getSquadConfig());
						this.chai.expect(squad.getName()).to.equal(name);
					});
					it('should return its assigned units', () => {
						let harvesterCreep = new Creep();
						let feederCreep = new Creep();
						let harvester: Unit = new Unit(harvesterCreep, this.getAIFactoryMock([]));
						let feeder: Unit = new Unit(feederCreep, this.getAIFactoryMock([]));
						let squad: Squad = new Squad("squad 1", this.getSquadConfig());

						squad.assignUnit(harvester);
						squad.assignUnit(feeder);

						let units = squad.getUnits();
						this.chai.expect(units)
							.to.be.instanceof(Array)
							.and.have.length(2)
							.and.contain(harvester)
							.and.contain(feeder)
						;
						this.chai.expect(harvesterCreep.memory.squad).to.equal("squad 1");
						this.chai.expect(feederCreep.memory.squad).to.equal("squad 1");
					});
					this.shouldReturnItsAssignedUnitsOfType();
					this.shouldReturnUnitsToSpawn();
					this.shouldRunAllItsUnits();
				});
			}

			private shouldReturnItsAssignedUnitsOfType() {
				it('should return its assigned units of type', () => {
					let units = {
						harvester1: this.getUnitMock("s", "h1", "harvesters"),
						harvester2: this.getUnitMock("s", "h2", "harvesters"),
						feeder1: this.getUnitMock("s", "f1", "feeders"),
					};
					let squad: Squad = new Squad("squad", this.getSquadConfig());

					squad.assignUnit(units.harvester1);
					squad.assignUnit(units.harvester2);
					squad.assignUnit(units.feeder1);

					let harvesters = squad.getUnitsOfType("harvesters");
					let feeders = squad.getUnitsOfType("feeders");
					this.chai.expect(harvesters)
						.to.be.instanceof(Array)
						.and.have.length(2)
						.and.contain(units.harvester1)
						.and.contain(units.harvester2)
					;
					this.chai.expect(feeders)
						.to.be.instanceof(Array)
						.and.have.length(1)
						.and.contain(units.feeder1)
					;
				});
			}

			private shouldReturnUnitsToSpawn() {
				it('should return units to spawn', () => {
					let app: AppController = this.getAppControllerMock();
					let squadConfig = this.getSquadConfig();

					squadConfig.units = [
						{
							type: "t1",
							name: function () {
								return "name 1";
							},
							ai: new Harvester1(),
							body: ["b1"],
							countToSpawn: function () {
								return 2;
							},
						},
						{
							type: "t2",
							name: function () {
								return "name 2";
							},
							ai: new Feeder1(),
							body: ["b2"],
							countToSpawn: function () {
								return 3;
							},
						},
					];
					let squad: Squad = new Squad("squad 1", squadConfig);
					let unitsToSpawn: IUnitToSpawn[] = squad.getUnitsToSpawn(app);
					this.chai.expect(unitsToSpawn)
						.to.be.instanceof(Array)
						.and.have.length(2)
						.and.contain({
						name: "name 1",
						body: ["b1"],
						count: 2,
						memory: {
							type: "t1",
							ai: "Harvester1",
							squad: "squad 1",
						},
					})
						.and.contain({
						name: "name 2",
						body: ["b2"],
						count: 3,
						memory: {
							type: "t2",
							ai: "Feeder1",
							squad: "squad 1",
						},
					})
					;
				});
			}

			private shouldRunAllItsUnits() {
				it('should run all its units', () => {
					let harvester: Unit = this.getUnitMock("squad 1", "harvester", "harvester");
					let feeder: Unit = this.getUnitMock("squad 1", "feeder", "feeder");
					let squad: Squad = new Squad("squad 1", this.getSquadConfig());

					squad.assignUnit(harvester);
					squad.assignUnit(feeder);

					let game = <Game><any>{name: "Game"};
					squad.run(game);

					this.assertAIRunCalled(harvester, game);
					this.assertAIRunCalled(feeder, game);
				});
			}

			private assertAIRunCalled(unit, game: Game) {
				this.chai.assert(
					unit.run.withArgs(game).calledOnce,
					`unit.run() should be called once with unit "${unit.getName()}" and game: ${game}`);
			}
		}
	}
}
