///<reference path="../ControllerTest.ts"/>
///<reference path="../../../src/App/Squad/SquadsController.ts"/>
///<reference path="../../../src/App/Squad/Squad.ts"/>
///<reference path="../../../src/App/Squad/SquadFactory.ts"/>
///<reference path="../../../src/App/Spawn/SpawnerFactory.ts"/>
///<reference path="../../../src/App/Units/UnitsController.ts"/>
///<reference path="../../../src/App/Units/Unit.ts"/>

namespace App {
	export namespace Squad {
		import UnitFactory = App.Units.UnitFactory;
		import UnitsController = App.Units.UnitsController;
		import Unit = App.Units.Unit;
		export class SquadsControllerTest extends ControllerTest {

			public run(): void {
				this.runExtra();
			}
			protected runExtra(): void {
				describe(this.getClassName(), () => {
					this.shouldReturnItsSquads();
					this.shouldReturnItsSquadsByNames();
					this.shouldNotAllowToSetSquadWithDuplicitName();
					this.shouldAssignLiveUnitsToTheirSquads();
					this.shouldRunItsSquads();
				});
			}

			private shouldReturnItsSquads(): void {
				it('should return its squads', () => {
					let squad1 = new Squad('squad1', this.getSquadConfig());
					let squad2 = new Squad('squad2', this.getSquadConfig());
					let squadFactory = this.getSquadFactoryMock([squad1, squad2]);
					let unitsFactoryMock = this.getUnitFactoryMock([]);
					let spawnerFactory = new SpawnerFactory(unitsFactoryMock);
					let controller = <SquadsController>this.getController(
						{squads: [{name: "squad1"}, {name: "squad2"}]},
						squadFactory,
						unitsFactoryMock,
						spawnerFactory
					);
					controller.addSubControllers({units: this.getUnitsControllerMock([])});
					controller.loop(new Game());

					this.chai.expect(controller.getSquads())
						.to.be.instanceof(Array)
						.and.have.length(2)
						.and.contain(squad1)
						.and.contain(squad2);
				});
			}

			private shouldReturnItsSquadsByNames(): void {
				it('should return its squads by name', () => {
					let squad1 = new Squad('squad1', this.getSquadConfig());
					let squad2 = new Squad('squad2', this.getSquadConfig());
					let squadFactory = this.getSquadFactoryMock([squad1, squad2]);
					let unitsFactoryMock = this.getUnitFactoryMock([]);
					let spawnerFactory = new SpawnerFactory(unitsFactoryMock);
					let controller = <SquadsController>this.getController(
						{squads: [{name: "squad1"}, {name: "squad2"}]},
						squadFactory,
						unitsFactoryMock,
						spawnerFactory
					);
					controller.addSubControllers({units: this.getUnitsControllerMock([])});
					controller.loop(new Game());

					this.chai.expect(controller.getSquadByName('squad1')).to.be.equal(squad1);
					this.chai.expect(controller.getSquadByName('squad2')).to.be.equal(squad2);
					let cb = function () {
						controller.getSquadByName('undefined');
					};
					this.chai.assert.throw(cb, Error, `No squad with name: "undefined" defined!`);

					this.chai.assert.deepEqual(
						controller.getSquadsByNames(),
						{squad1: squad1, squad2: squad2},
						"getSquadsByNames() should return expected json object"
					);
				});

			}

			private shouldNotAllowToSetSquadWithDuplicitName(): void {
				it('should not allow to set squad with duplicit name', () => {
					let squad1 = new Squad('squad', this.getSquadConfig());
					let squad2 = new Squad('squad', this.getSquadConfig());
					let squadFactory = this.getSquadFactoryMock([squad1, squad2]);
					let unitsFactoryMock = this.getUnitFactoryMock([]);
					let spawnerFactory = new SpawnerFactory(unitsFactoryMock);
					let controller = <SquadsController>this.getController(
						{squads: [{name: "squad"}, {name: "squad"}]},
						squadFactory,
						unitsFactoryMock,
						spawnerFactory
					);
					controller.addSubControllers({units: this.getUnitsControllerMock([])});
					let cb = function () {
						controller.loop(new Game())
					};
					this.chai.assert.throw(cb, Error, `squad with name: "squad" already defined!`);
				});
			}

			private shouldAssignLiveUnitsToTheirSquads(): void {
				it('should assign live units to their squads', () => {
					let harvester1 = this.getUnitMock("harvesters", "harvester1");
					let harvester2 = this.getUnitMock("harvesters", "harvester2");
					let feeder1 = this.getUnitMock("feeders", "feeder1");

					let harvesters = this.getSquadMock("harvesters", [harvester1, harvester2]);
					let feeders = this.getSquadMock("feeders", [feeder1]);
					let squadFactory = this.getSquadFactoryMock([harvesters, feeders]);

					let unitsController = this.getUnitsControllerMock([harvester1, harvester2, feeder1]);
					let unitFactoryMock = this.getUnitFactoryMock([]);

					let controller = <SquadsController>this.getController(
						{squads: [{name: "harvesters"}, {name: "feeders"}]},
						squadFactory,
						unitFactoryMock,
						new SpawnerFactory(unitFactoryMock)
					);
					controller.addSubControllers({units: unitsController});
					controller.loop(new Game());

					this.assertSquadAssignUnitCalled(harvesters, [harvester1, harvester2]);
					this.assertSquadAssignUnitCalled(feeders, [feeder1]);
				});
			}

			private shouldRunItsSquads(): void {
				it('should run its squads', () => {

					let harvesters = this.getSquadMock("harvesters", []);
					let feeders = this.getSquadMock("feeders", []);

					let controller = <SquadsController>this.getController(
						{squads: [{name: "harvesters"}, {name: "feeders"}]},
						this.getSquadFactoryMock([harvesters, feeders]),
						this.getUnitFactoryMock([]),
						this.getSpawnerFactoryMock([])
					);
					controller.addSubControllers({units: this.getUnitsControllerMock([])});
					let game = <Game><any>{name: "Game"};
					controller.loop(game);

					this.assertSquadRunCalled(harvesters, game);
					this.assertSquadRunCalled(feeders, game);
				});
			}

			private assertSquadAssignUnitCalled(squad, units: Unit[]) {
				for (let unit of units) {
					this.chai.assert(
						squad.assignUnit.withArgs(unit).calledOnce,
						`squad.assignUnit() should be called once for unit with name: "${unit.getName()}"`);
				}
			}

			private assertSquadRunCalled(squad, game: Game) {
				this.chai.assert(
					squad.run.withArgs(game).calledOnce,
					`squad.run() should be called once for squad with name: "${squad.getName()}" with game: ${game}`);
			}

			protected getClassName(): string {
				return "SquadsController";
			}

			protected getController(config: {}, squadFactory: SquadFactory, unitFactory: UnitFactory, spawnerFactory: SpawnerFactory): IController {
				return new SquadsController(config, squadFactory, unitFactory, spawnerFactory);
			}

		}
	}
}
