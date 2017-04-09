///<reference path="../AI/IAI.ts"/>
///<reference path="../AI/AIFactory.ts"/>

namespace App {
	export namespace Units {

		import IAI = App.AI.IAI;
		import AIFactory = App.AI.AIFactory;
		export interface IUnitMemory {
			type: string,
			ai: string,
			squad: string,
		}

		export interface IUnitConfig {
			type: string,
			name: Function,
			ai: IAI,
			body: string[],
			countToSpawn: Function
		}

		export class Unit {
			private creep: Creep;
			private aiFactory: AIFactory;
			private ai: IAI;

			constructor(creep: Creep, aiFactory: AIFactory) {
				this.creep = creep;
				this.aiFactory = aiFactory;
			}

			public run(game: Game): void {
				this.getAI().run(this, game);
			}

			public getName(): string {
				return this.creep.name;
			}

			public getType(): string {
				return this.getMemoryOf("type");
			}

			public setSquadName(name: string): void {
				this.setMemoryOf("squad", name);
			}

			public getSquadName(): string {
				return this.getMemoryOf("squad");
			}

			public getMemory(): any {
				return this.creep.memory;
			}

			public getCreep(): Creep {
				return this.creep;
			}

			private getAI(): IAI {
				if (!this.ai) {
					this.ai = this.aiFactory.get(this.getMemoryOf("ai"));
				}
				return this.ai;
			}

			private setMemoryOf(key: string, value: any): void {
				this.creep.memory[key] = value;
			}

			private getMemoryOf(key: string): any {
				let m = this.getMemory();
				if (m[key]) {
					return m[key];
				}
			}
		}
	}
}
