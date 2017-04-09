Screeps typescript quickstart

**!running grunt with your screeps account set will overwrite your default branch at screeps server!**

```
1. cp .secrets_template.js .secrets.js
2. change your scribes credentials in .secrets.js
3. npm install -g grunt-cli typescript
4. npm install
5. grunt
```

You'll find code from ./src compiled into main.js at server.

**Units organized to squads**

Units are organized to squads.

Purpose of squads is not used yet, but you can access units at the end of `AppController.loop()` via `squadsController.getSquads()[0].getUnits()`, see `main.ts` and `tests/`.

In future squads could be used to have its own AIs which could be asked by their units before their own AI will run...

**Units spawning based on config**

There is config in `src/App/Config/Squads.ts` where you can set your squads and units settings.

Units will be spawned based on their `countToSpawn()` attribute and will have ai set by config.

In `AI` class itself you can write anything you want them to do.

You can create new AI classes and switch between them in Squads config then.
