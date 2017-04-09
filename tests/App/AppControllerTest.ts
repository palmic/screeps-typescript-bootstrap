///<reference path="../../src/App/AppController.ts"/>
///<reference path="./ControllerTest.ts"/>
///<reference path="../../src/App/Squad/SquadFactory.ts"/>
///<reference path="../../src/App/Units/UnitFactory.ts"/>

namespace App {
	import UnitFactory = App.Units.UnitFactory;
	import SquadFactory = App.Squad.SquadFactory;
	export class AppControllerTest extends ControllerTest {

		protected runExtra(): void {
		}

		protected getClassName(): string {
			return "AppController";
		}

		protected getController(config: {}, squadFactory: SquadFactory, unitFactory: UnitFactory, spawnerFactory: SpawnerFactory): IController {
			return new AppController(config, squadFactory, unitFactory, spawnerFactory);
		}

	}
}
