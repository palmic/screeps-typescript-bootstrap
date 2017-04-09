
///<reference path="./App/AI/AIFactoryTest.ts"/>
///<reference path="./App/Units/UnitTest.ts"/>
///<reference path="./App/Units/UnitFactoryTest.ts"/>
///<reference path="./App/Squad/SquadTest.ts"/>
///<reference path="./App/Squad/SquadFactoryTest.ts"/>
///<reference path="./App/Squad/SquadsControllerTest.ts"/>
///<reference path="./App/AppControllerTest.ts"/>
///<reference path="./App/Units/UnitsControllerTest.ts"/>
///<reference path="./App/Spawn/SpawnerTest.ts"/>
///<reference path="./App/Spawn/SpawnerFactoryTest.ts"/>
///<reference path="./App/Spawn/SpawnersControllerTest.ts"/>
///<reference path="./screeps.ts"/>

let _ = require('lodash');
let sinon = require('sinon');
let ch = require('chai');
ch.should();
ch.use(require('chai-things'));

(new App.AI.AIFactoryTest(ch, sinon)).run();
(new App.Units.UnitTest(ch, sinon)).run();
(new App.Units.UnitFactoryTest(ch, sinon)).run();
(new App.Squad.SquadTest(ch, sinon)).run();
(new App.Squad.SquadFactoryTest(ch, sinon)).run();
(new App.Squad.SquadsControllerTest(ch, sinon)).run();
(new App.AppControllerTest(ch, sinon)).run();
(new App.UnitsControllerTest(ch, sinon)).run();
(new App.SpawnerTest(ch, sinon)).run();
(new App.SpawnerFactoryTest(ch, sinon)).run();
(new App.SpawnersControllerTest(ch, sinon)).run();
