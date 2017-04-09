///<reference path="../../../src/App/Units/UnitFactory.ts"/>
///<reference path="../../../src/App/Spawn/Spawner.ts"/>
///<reference path="../../../src/App/Spawn/SpawnerFactory.ts"/>
///<reference path="../../Test.ts"/>
///<reference path="../../screeps.ts"/>

namespace App {
	import UnitFactory = App.Units.UnitFactory;
	import Unit = App.Units.Unit;
	export class SpawnerFactoryTest extends Test {

		public run(): void {
			let spawn = sinon.mock(Spawn);
			let unitFactory = this.getUnitFactoryMock([]);
			let spawnerFactory = new SpawnerFactory(unitFactory);
			describe("Spawner Factory", () => {
				it('should return Spawner', () => {
					let spawner = spawnerFactory.get(spawn);
					this.chai.expect(spawner).to.be.instanceof(Spawner);
				});
			});
		}
	}
}
