import { Process } from "../../os/process";

export class SuspensionProcess extends Process
{
  public type = "suspend";
  /** Run the SuspensionProcess process */
  public run()
  {
    const proc = this;
    proc.kernel.suspendCount = 0;
    _.forEach(proc.kernel.processTable, function(process)
    {
      if (!process.suspend === false)
      {
        proc.kernel.suspendCount += 1;
        if (typeof process.suspend === "number" && proc.metaData.master)
        {
          process.suspend -= 1;
          if (process.suspend === 0)
          {
            process.suspend = false;
          }
        }

        if (typeof process.suspend === "string")
        {
          if (
            !process.kernel.hasProcess(process.suspend)
            ||
            process.kernel.getProcessByName(process.suspend).completed
          )
          {
            process.suspend = false;
          }
        }
      }
    });

    this.completed = true;
  }
}
