///<reference path="../../src/App/Controller.ts"/>
///<reference path="../../src/App/Squad/SquadFactory.ts"/>
///<reference path="../../src/App/Spawn/SpawnerFactory.ts"/>
///<reference path="../../src/App/Units/UnitFactory.ts"/>
///<reference path="../Test.ts"/>
///<reference path="../screeps.ts"/>

namespace App {
	import UnitFactory = App.Units.UnitFactory;
	import SquadFactory = App.Squad.SquadFactory;
	import Unit = App.Units.Unit;
	import Squad = App.Squad.Squad;
	export abstract class ControllerTest extends Test {
		public run(): void {
			describe(this.getClassName(), () => {
				this.shouldLoopRecursively();
				this.shouldDoOtherThings();
			});
			this.runExtra();
		}

		protected shouldLoopRecursively() {
			it('should loop() through given subControllers', () => {
				let subController1 = sinon.mock(Controller);
				subController1.loop = this.sinon.spy();
				let subController2 = sinon.mock(Controller);
				subController2.loop = this.sinon.spy();
				let subController3 = sinon.mock(Controller);
				subController3.loop = this.sinon.spy();

				let basic = {
					app: <IController>this.getControllerMock(),
					squads: <IController>this.getSquadsControllerMock([]),
					units: <IController>this.getUnitsControllerMock([]),
				};

				let controller = this.getControllerWithFactories({name: "c"}, basic);
				let controller2 = this.getControllerWithFactories({name: "c2"}, basic);
				let controller3 = this.getControllerWithFactories({name: "c3"}, basic);
				controller.addSubControllers({
					s1: <IController><any>subController1,
					s2: <IController><any>subController2,
					s3: <IController><any>controller3,
				});
				controller2.addSubControllers({
					c: controller,
				});
				controller3.addSubControllers({
					c: controller,
					c2: controller2
				});
				controller3.addSubControllers({
					c3: this.getControllerWithFactories({}, basic),
				});
				controller3.loop(new Game());

				this.chai.assert(subController1.loop.calledOnce, "controller.loop() has to be called exactly once!");
				this.chai.assert(subController2.loop.calledOnce, "controller.loop() has to be called exactly once!");
			});
		}

		protected shouldDoOtherThings() {
			it('should return its given game', () => {
				let controller = this.getControllerWithFactories({name: "c"}, {
					app: this.getAppControllerMock(),
					squads: this.getSquadsControllerMock([])
				});
				let game = <Game><any>{name: "game"};
				controller.loop(game);
				this.chai.assert.deepEqual(
					controller.getGame(),
					game,
					"controller.getGame() should return its given game"
				);
			});
			it('should set given subControllers', () => {
				let subController1 = <IController><any>{name: "subController 1"};
				let subController2 = <IController><any>{name: "subController 2"};

				let controller = this.getControllerWithFactories({name: "c"}, {
					app: this.getControllerMock(),
					squads: this.getControllerMock()
				});
				controller.addSubControllers({s1: subController1, s2: subController2});

				this.chai.assert.deepEqual(
					controller.getSubcontrollerByName('s1'),
					subController1,
					"controller.getSubcontrollerByName() should return expected json object"
				);
				this.chai.assert.deepEqual(
					controller.getSubcontrollerByName('s2'),
					subController2,
					"controller.getSubcontrollerByName() should return expected json object"
				);
			});
			it('should return given subControllers by name', () => {
				let subController1 = <IController><any>{name: "s1"};
				let subController2 = <IController><any>{name: "s2"};
				let controller = this.getControllerWithFactories({name: "c"}, {
					app: this.getControllerMock(),
					squads: this.getControllerMock(),
					s1: subController1,
					s2: subController2
				});
				let s1 = controller.getSubcontrollerByName('s1');
				this.chai.assert.deepEqual(
					controller.getSubcontrollerByName('s1'),
					subController1,
					"controller.getSubcontrollerByName() should return expected json object"
				);
				this.chai.assert.deepEqual(
					controller.getSubcontrollerByName('s2'),
					subController2,
					"controller.getSubcontrollerByName() should return expected json object"
				);

				let cb = function () {
					controller.getSubcontrollerByName('undefined name');
				};
				this.chai.assert.throw(cb, Error, `subController with name "undefined name" was not found in ${this.getClassName()}!`);
			});
		}

		protected abstract runExtra(): void;

		protected abstract getController(config: {}, squadFactory: SquadFactory, unitFactory: UnitFactory, spawnerFactory: SpawnerFactory): IController;

		protected abstract getClassName(): string;

		private getControllerWithFactories(config: {}, subControllers: { [creepName: string]: IController; }): IController {
			let squadFactory = <SquadFactory><any>sinon.mock(SquadFactory);
			let unitFactory = <UnitFactory><any>sinon.mock(UnitFactory);
			let spawnerFactory = <SpawnerFactory><any>sinon.mock(SpawnerFactory);

			let controller = this.getController(config, squadFactory, unitFactory, spawnerFactory);
			controller.addSubControllers(subControllers);
			return controller;
		}
	}
}
