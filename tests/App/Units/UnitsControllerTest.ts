///<reference path="../../../src/App/Units/UnitsController.ts"/>
///<reference path="../ControllerTest.ts"/>
///<reference path="../../../src/App/Squad/Squad.ts"/>
///<reference path="../../../src/App/Squad/SquadFactory.ts"/>
///<reference path="../../../src/App/Units/Unit.ts"/>
///<reference path="../../../src/App/Units/UnitFactory.ts"/>

namespace App {
	import UnitFactory = App.Units.UnitFactory;
	import UnitsController = App.Units.UnitsController;
	import Unit = App.Units.Unit;
	import Squad = App.Squad.Squad;
	import SquadFactory = App.Squad.SquadFactory;
	export class UnitsControllerTest extends ControllerTest {

		protected runExtra(): void {
			describe(this.getClassName(), () => {
				it('should reset alive units initially', () => {
					let game = new Game();
					game.creeps = {
						"unit1": new Creep(),
						"unit2": new Creep(),
						"unit3": new Creep(),
					};
					let harvester1 = this.getUnitMock("harvesters", "harvester1");
					let harvester2 = this.getUnitMock("harvesters", "harvester2");
					let feeder1 = this.getUnitMock("harvesters", "feeder1");

					let unitsFactoryMock = this.getUnitFactoryMock([harvester1, harvester2, feeder1]);
					let spawnerFactory = new SpawnerFactory(unitsFactoryMock);

					let controller = <UnitsController>this.getController(
						{},
						this.getSquadFactoryMock([]),
						unitsFactoryMock,
						spawnerFactory
					);
					controller.loop(game);

					this.chai.expect(controller.getUnits())
						.to.be.instanceof(Array)
						.and.have.length(3)
						.and.contain(harvester1)
						.and.contain(harvester2)
						.and.contain(feeder1)
				});
			});
		}

		protected getClassName(): string {
			return "UnitsController";
		}

		protected getController(config: {}, squadFactory: SquadFactory, unitFactory: UnitFactory, spawnerFactory: SpawnerFactory): IController {
			return new UnitsController(config, squadFactory, unitFactory, spawnerFactory);
		}
	}
}
