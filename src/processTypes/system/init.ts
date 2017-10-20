import { Process } from "../../os/process";

import { FlagWatcherProcess } from "../flagWatcher";
import { EnergyManagementProcess } from "../management/energy";
import { StructureManagementProcess } from "../management/structure";
import { RoomDataProcess } from "../roomData";
import { SuspensionProcess } from "./suspension";

export class InitProcess extends Process
{
  public type = "init";

  /** Run the init process */
  public run()
  {
    const proc = this;

    if (Game.cpu.bucket > 3000)
    {
      this.kernel.limit = (Game.cpu.limit + 500) - 20;
    }

    for (const name in Memory.creeps)
    {
      if (!Game.creeps[name])
      {
        delete Memory.creeps[name];
      }
    }

    _.forEach(Game.rooms, function(room)
    {
      proc.kernel.addProcess(RoomDataProcess, "roomData-" + room.name, 99, {
        roomName: room.name
      });

      if (!proc.kernel.getProcessByName("em-" + room.name))
      {
        proc.kernel.addProcess(EnergyManagementProcess, "em-" + room.name, 50, {
          roomName: room.name
        });
      }

      if (!proc.kernel.hasProcess("sm-" + room.name))
      {
        proc.kernel.addProcess(StructureManagementProcess, "sm-" + room.name, 48, {
          roomName: room.name
        });
      }
    });

    this.kernel.addProcess(SuspensionProcess, "suspension-master", 99, { master: true });
    this.kernel.addProcess(FlagWatcherProcess, "flag-watcher", 98, {});

    this.completed = true;
  }
}
