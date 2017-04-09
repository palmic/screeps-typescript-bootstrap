///<reference path="App/Config/Squads.ts"/>
///<reference path="App/Squad/SquadsController.ts"/>
///<reference path="App/Units/UnitsController.ts"/>
///<reference path="App/AppController.ts"/>
///<reference path="App/AI/AIFactory.ts"/>
///<reference path="App/Spawn/SpawnerFactory.ts"/>
///<reference path="App/Spawn/SpawnersController.ts"/>
///<reference path="App/Squad/SquadFactory.ts"/>
///<reference path="App/Units/UnitFactory.ts"/>

import Squad = App.Squad.Squad;
import SpawnerFactory = App.SpawnerFactory;
import SquadFactory = App.Squad.SquadFactory;
import UnitFactory = App.Units.UnitFactory;
import AppController = App.AppController;
import SquadsController = App.Squad.SquadsController;
import SpawnersController = App.SpawnersController;
import UnitsController = App.Units.UnitsController;
import AIFactory = App.AI.AIFactory;

let aiFactory = new AIFactory();
let squadFactory = new SquadFactory();
let unitFactory = new UnitFactory(aiFactory);
let spawnerFactory = new SpawnerFactory(unitFactory);

// Controllers tree structure offer possibility of inner calls between them
// - Any Controller forwards its lopp() into every subController by abstract parent
// - You can call inner Controller's public methods via this.subControllers[name].method()
// - You can add Controllers duplicitly into structure so you can define them as tree of dependencies
// 		- loop() method is secured to not to be able to be called twice in one Game tick
// - every Controller is designed to have its init logic chained to loop()
// 		- dont try to move it out of module.export.loop() from main.ts, you'll lost game state' synchronization
// - after init logic it can do anything else in one game tick

let squadsConfig = {
	squads: (new App.Config.Squads()).get(),
};

let appController = new AppController({}, squadFactory, unitFactory, spawnerFactory);
let squadsController = new SquadsController(squadsConfig, squadFactory, unitFactory, spawnerFactory);
let unitsController = new UnitsController({}, squadFactory, unitFactory, spawnerFactory);
let spawnersController = new SpawnersController({}, squadFactory, unitFactory, spawnerFactory);

squadsController.addSubControllers({units: unitsController});
spawnersController.addSubControllers({app: appController, squads: squadsController});
appController.addSubControllers({spawners: spawnersController});

module.exports.loop = function () {
	appController.loop(Game);
};
