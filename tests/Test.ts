///<reference path="../src/App/AI/IAI.ts"/>
///<reference path="../src/App/AI/Unit/Harvester1.ts"/>
///<reference path="../src/App/Spawn/SpawnerFactory.ts"/>
///<reference path="../src/App/Squad/Squad.ts"/>
///<reference path="../src/App/Units/UnitsController.ts"/>

import ISquadConfig = App.Squad.ISquadConfig;
import Unit = App.Units.Unit;
import Squad = App.Squad.Squad;
import SquadFactory = App.Squad.SquadFactory;
import UnitFactory = App.Units.UnitFactory;
import AppController = App.AppController;
import Controller = App.Controller;
import SquadsController = App.Squad.SquadsController;
import Spawner = App.Spawner;
import SpawnerFactory = App.SpawnerFactory;
import UnitsController = App.Units.UnitsController;
import Harvester1 = App.AI.Unit.Harvester1;
import AIFactory = App.AI.AIFactory;
import IAI = App.AI.IAI;
import AI = App.AI.AI;

abstract class Test {
	protected chai;
	protected sinon;

	constructor(chai, sinon) {
		this.chai = chai;
		this.sinon = sinon;
	}

	protected getSquadConfig(): ISquadConfig {
		return {
			name: "n1",
			units: [
				{
					type: "t1",
					name: function () {
					},
					ai: new Harvester1(),
					body: ["b1"],
					countToSpawn: function () {
					},
				}
			]
		};
	}

	protected getUnitMemory(): IUnitMemory {
		return {
			type: "t",
			ai: "Harvester1",
			squad: "s",
		};
	}

	protected getUnitsControllerMock(units: Unit[]): UnitsController {
		let getUnits = this.sinon.stub();
		getUnits.returns(units);

		let mock = <UnitsController><any>this.getControllerMock();
		mock.getUnits = getUnits;
		return mock;
	}

	protected getSquadsControllerMock(squads: Squad[]): SquadsController {
		let getSquads = this.sinon.stub();
		getSquads.returns(squads);

		let mock = <SquadsController><any>this.getControllerMock();
		mock.getSquads = getSquads;
		return mock;
	}

	protected getControllerMock(): Controller {
		let mock = <Controller><any>sinon.mock(Controller);
		mock.loop = this.sinon.spy();
		return mock;
	}

	protected getAppControllerMock(): AppController {
		let mock = <AppController><any>sinon.mock(AppController);
		mock.loop = this.sinon.spy();
		return mock;
	}

	protected getSquadMock(name: string, assignUnits: Unit[]): Squad {
		let assignUnit = this.sinon.spy();
		for (let unit of assignUnits) {
			assignUnit.withArgs(unit);
		}
		let getName = this.sinon.stub();
		getName.returns(name);
		let run = this.sinon.stub();

		let mock = <Squad><any>sinon.mock(Squad);
		mock.assignUnit = assignUnit;
		mock.getName = getName;
		mock.run = run;
		return mock;
	}

	protected getUnitMock(squadName: string, name: string, type: string = null): Unit {
		let getName = this.sinon.stub();
		getName.returns(name);
		let setSquadName = this.sinon.stub();
		let getSquadName = this.sinon.stub();
		let run = this.sinon.stub();
		getSquadName.returns(squadName);
		let getType = this.sinon.stub();
		getType.returns(type);

		let mock = <Unit><any>sinon.mock(Unit);
		mock.getSquadName = getSquadName;
		mock.getName = getName;
		mock.setSquadName = setSquadName;
		mock.getType = getType;
		mock.run = run;
		return mock;
	}

	protected getAIFactoryMock(ais: IAI[]): AIFactory {
		let get = this.sinon.stub();
		for (let order in ais) {
			get.onCall(order).returns(ais[order]);
		}
		let mock = <AIFactory><any>sinon.mock(AIFactory);
		mock.get = get;
		return mock;
	}

	protected getAIMock(): IAI {
		let run = this.sinon.spy();
		let mock = <IAI><any>sinon.mock(AI);
		mock.run = run;
		return mock;
	}

	protected getSquadFactoryMock(squads: Squad[]): SquadFactory {
		let get = this.sinon.stub();
		for (let order in squads) {
			get.onCall(order).returns(squads[order]);
		}
		let mock = <SquadFactory><any>sinon.mock(SquadFactory);
		mock.get = get;
		return mock;
	}

	protected getUnitFactoryMock(units: Unit[]): UnitFactory {
		let get = this.sinon.stub();
		for (let order in units) {
			get.onCall(order).returns(units[order]);
		}
		let unitFactory = <UnitFactory><any>sinon.mock(UnitFactory);
		unitFactory.get = get;
		return unitFactory;
	}

	protected getSpawnerFactoryMock(spawners: Spawner[]): SpawnerFactory {
		let get = this.sinon.stub();
		for (let order in spawners) {
			get.onCall(order).returns(spawners[order]);
		}
		let spawnerFactory = <SpawnerFactory><any>sinon.mock(SpawnerFactory);
		spawnerFactory.get = get;
		return spawnerFactory;
	}

	protected getSpawnerMock(spawnUnits: Unit[]): Spawner {
		let spawn = this.sinon.stub();
		for (let order in spawnUnits) {
			spawn.onCall(order).returns(spawnUnits[order]);
		}
		let mock = <Spawner><any>sinon.mock(Spawner);
		mock.spawn = spawn;
		return mock;
	}

}
