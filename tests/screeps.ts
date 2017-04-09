///<reference path="../src/App/Units/Unit.ts"/>


// screeps objects stubs classes

import IUnitMemory = App.Units.IUnitMemory;

var WORK = "work";
var CARRY = "carry";
var MOVE = "move";
var FIND_SOURCES = 105;
var ERR_NOT_IN_RANGE = -9;
var RESOURCE_ENERGY = "energy";

class Creep {
	room;
	carry;
	carryCapacity;
	harvest;
	upgradeController;
	moveTo;
	transfer;
	name: string;
	memory: IUnitMemory = {
		type: "",
		ai: "",
		squad: "",
	};
}
class Game {
	time: number = 1;
	creeps: {
		[creepName: string]: Creep;
	} = {};
	spawns: {
		[spawnName: string]: Spawn;
	};
}
class Spawn {
	energy;
	energyCapacity;
	createCreep(body: string[], name?: string, memory?: any): number | string {
		return name
	}
}
