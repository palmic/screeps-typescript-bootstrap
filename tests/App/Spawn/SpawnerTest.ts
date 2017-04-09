///<reference path="../../../src/App/Spawn/Spawner.ts"/>
///<reference path="../../../src/App/Units/Unit.ts"/>
///<reference path="../../Test.ts"/>
///<reference path="../../screeps.ts"/>

namespace App {
	import UnitFactory = App.Units.UnitFactory;
	import Unit = App.Units.Unit;
	export class SpawnerTest extends Test {

		public run(): void {
			describe("Spawner", () => {
				it('should spawn unit', () => {
					let body = ["a", "b", "c"];
					let name = "creepABC";
					let memory: IUnitMemory = this.getUnitMemory();
					let spawn = this.getSpawnStructureMock([{body: body, name: name, memory: memory}]);
					let unit = this.getUnitMock("s1", "1");
					let spawner: Spawner = new Spawner(
						spawn,
						this.getUnitsFactoryMock([unit])
					);
					let game = new Game();
					game.creeps[name] = new Creep();

					let unitSpawned = spawner.spawn(game, body, name, memory);

					this.chai.expect(unitSpawned).to.equal(unit);
					this.assertSpawnCreateCreepCalled(spawn, [{body: body, name: name, memory: memory}]);
				});
			});
		}

		private assertSpawnCreateCreepCalled(spawn, argss) {
			for (let args of argss) {
				this.chai.assert(
					spawn.createCreep.withArgs(args.body, args.name, args.memory).calledOnce,
					`spawn.createCreep() called at spawn should be called once for unit with name: "${args.name}"`);
			}
		}

		private getSpawnStructureMock(callsArguments): Spawn {
			let createCreep = this.sinon.stub();
			for (let args of callsArguments) {
				createCreep.withArgs(args.body, args.name, args.memory);
			}

			let mock = <Spawn><any>sinon.mock(Spawn);
			mock.createCreep = createCreep;
			return mock;
		}

		private getUnitsFactoryMock(units: Unit[]): UnitFactory {
			let get = this.sinon.stub();
			for (let order in units) {
				get.onCall(order).returns(units[order]);
			}
			let unitFactory = <UnitFactory><any>sinon.mock(UnitFactory);
			unitFactory.get = get;
			return unitFactory;
		}

	}
}
