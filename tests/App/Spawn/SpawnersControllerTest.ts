///<reference path="../../../src/App/Spawn/SpawnersController.ts"/>
///<reference path="../../../src/App/Spawn/SpawnerFactory.ts"/>
///<reference path="../../../src/App/Squad/SquadFactory.ts"/>
///<reference path="../../../src/App/Units/UnitFactory.ts"/>
///<reference path="../ControllerTest.ts"/>

namespace App {
	import UnitFactory = App.Units.UnitFactory;
	import SquadFactory = App.Squad.SquadFactory;
	export class SpawnersControllerTest extends ControllerTest {

		protected runExtra(): void {
			describe(this.getClassName(), () => {
				this.shouldResetSpawnsInitially();
				this.shouldSpawnMissingUnits();
			});
		}

		private shouldResetSpawnsInitially(): void {
			it('should reset spawns initially', () => {
				let spawns = {
					"spawn1": <Spawn><any>{name: "spawn 1"},
					"spawn2": <Spawn><any>{name: "spawn 2"},
				};
				let game = new Game();
				game.spawns = spawns;
				let spawner1 = <Spawner><any>{name: "s1"};
				let spawner2 = <Spawner><any>{name: "s2"};
				let spawnerFactory = this.getSpawnerFactoryMock([spawner1, spawner2]);

				let controller = <SpawnersController>this.getController(
					{},
					this.getSquadFactoryMock([]),
					this.getUnitFactoryMock([]),
					spawnerFactory
				);
				controller.addSubControllers({
					app: this.getAppControllerMock(),
					squads: this.getSquadsControllerMock([])
				});
				controller.loop(game);

				this.assertSpawnerFactoryGetCalled(spawnerFactory, [spawns.spawn1, spawns.spawn2]);
				this.chai.expect(controller.getSpawns())
					.to.be.instanceof(Array)
					.and.have.length(2)
					.and.contain(spawner1)
					.and.contain(spawner2)
				;
			});
		}

		private shouldSpawnMissingUnits(): void {

			it('should spawn missing units', () => {
				let spawns = {
					"spawn1": <Spawn><any>{name: "spawn 1"},
				};
				let game = new Game();
				game.spawns = spawns;
				let app = this.getAppControllerMock();

				let unitsToSpawn = {
					squad1: [
						{
							name: "s 1.1",
							body: [WORK],
							count: 2,
							memory: {type: "t 1.1", ai: "AI11", squad: "squad1"},
						},
						{
							name: "s 1.2",
							body: [CARRY],
							count: 3,
							memory: {type: "t 1.2", ai: "AI12", squad: "squad1"},
						},
						{
							name: "unit to not to spawn!",
							body: [MOVE],
							count: 0,
							memory: {type: "t 1.3", ai: "AI13", squad: "squad1"},
						},
					],
					squad2: [
						{
							name: "s 2.1",
							body: [CARRY, CARRY],
							count: 10,
							memory: {type: "t 2.1", ai: "AI21", squad: "squad2"},
						},
						{
							name: "s 2.2",
							body: [WORK, WORK],
							count: 30,
							memory: {type: "t 2.2", ai: "AI22", squad: "squad2"},
						},
					],
				};

				let squad1 = this.getSquadMockWithUnitsToSpawn("squad 1", [], app, unitsToSpawn.squad1);
				let squad2 = this.getSquadMockWithUnitsToSpawn("squad 2", [], app, unitsToSpawn.squad2);

				let spawner1 = this.getSpawnerMock([]);

				let squadsController: SquadsController = this.getSquadsControllerMock([squad1, squad2]);
				let controller = this.getController(
					{},
					this.getSquadFactoryMock([]),
					this.getUnitFactoryMock([]),
					this.getSpawnerFactoryMock([spawner1])
				);
				controller.addSubControllers({app: app, squads: squadsController});
				controller.loop(game);

				this.assertSquadGetUnitsToSpawnCalled(squad1, app);
				this.assertSquadGetUnitsToSpawnCalled(squad2, app);
				this.assertSpawnerSpawnCalled(
					spawner1,
					game,
					[
						unitsToSpawn.squad1[0],
						unitsToSpawn.squad1[1],
						unitsToSpawn.squad2[0],
						unitsToSpawn.squad2[1]
					]
				);
				this.assertSpawnerSpawnNotCalled(spawner1, game, [unitsToSpawn.squad1[2]]);
			});
		}

		private assertSpawnerSpawnCalled(spawner, game, unitsToSpawn: IUnitToSpawn[]) {
			for (let unitToSpawn of unitsToSpawn) {
				this.chai.assert(
					spawner.spawn.withArgs(game, unitToSpawn.body, unitToSpawn.name, unitToSpawn.memory).calledOnce,
					`spawner.spawn() should be called once with unitToSpawn with name: "${unitToSpawn.name}"`);
			}
		}

		private assertSpawnerSpawnNotCalled(spawner, game, unitsToSpawn: IUnitToSpawn[]) {
			for (let unitToSpawn of unitsToSpawn) {
				this.chai.assert(
					spawner.spawn.withArgs(game, unitToSpawn.body, unitToSpawn.name, unitToSpawn.memory).notCalled,
					`spawner.spawn() should NOT be called once with unitToSpawn with name: "${unitToSpawn.name}"`);
			}
		}

		private assertSpawnerFactoryGetCalled(spawnerFactory, spawns) {
			for (let spawn of spawns) {
				this.chai.assert(
					spawnerFactory.get.withArgs(spawn).calledOnce,
					`spawnerFactory.get() should be called once with spawn: "${spawn.name}"`);
			}
		}

		private assertSquadGetUnitsToSpawnCalled(squad, app: AppController) {
			this.chai.assert(
				squad.getUnitsToSpawn.withArgs(app).calledOnce,
				`squad.getUnitsToSpawn() should be called once with given app`);
		}

		private getSquadMockWithUnitsToSpawn(name: string, assignUnits: Unit[], app: AppController, unitsToSpawn: IUnitToSpawn[]): Squad {
			let getUnitsToSpawn = this.sinon.stub();
			getUnitsToSpawn.returns(unitsToSpawn);

			let mock = this.getSquadMock(name, assignUnits);
			mock.getUnitsToSpawn = getUnitsToSpawn;
			return mock;
		}

		protected getClassName(): string {
			return "SpawnersController";
		}

		protected getController(config: {}, squadFactory: SquadFactory, unitFactory: UnitFactory, spawnerFactory: SpawnerFactory): IController {
			return new SpawnersController(config, squadFactory, unitFactory, spawnerFactory);
		}
	}
}
