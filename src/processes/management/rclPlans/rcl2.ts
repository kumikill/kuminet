import { RCLPlan } from "./rclPlan";

export class RCL2 extends RCLPlan
{
    public generate()
    {
        this.room.memory.roomPlan.rcl[2] = {};

        // Copy RCL 1
        this.room.memory.roomPlan.rcl[2].spawn = _.clone(this.room.memory.roomPlan.rcl[1].spawn);

        // Source containers
        if (!this.room.memory.roomPlan.rcl[2].container)
        {
            this.room.memory.roomPlan.rcl[2].container = [];
        }
        for (const source of this.scheduler.data.roomData[this.room.name].sources)
        {
            const containers = _.filter(source.pos.findInRange(FIND_MY_CONSTRUCTION_SITES, 1), (site: ConstructionSite) =>
            {
                return site.structureType === STRUCTURE_CONTAINER;
            });
            if (containers.length === 0)
            {
                this.room.memory.roomPlan.rcl[2].container.push(this.findEmptyInRange(source.pos, 1, this.baseSpawn.pos)!);
            }
        }

        // Source roads
        this.room.memory.roomPlan.rcl[2].road = [];
        for (const s of this.scheduler.data.roomData[this.room.name].sources)
        {
            for (const pos of PathFinder.search(this.baseSpawn.pos, { pos: s.pos, range: 1 }).path)
            {
                this.room.memory.roomPlan.rcl[2].road.push(pos);
            }
        }

        const baseToController = PathFinder.search(
            this.baseSpawn.pos, { pos: this.controller.pos, range: 3 }).path;

        // Controller roads
        for (const pos of baseToController)
        {
            this.room.memory.roomPlan.rcl[2].road.push(pos);
        }

        // General container
        const generalContainerPos = baseToController[Math.floor(baseToController.length / 2)];
        this.room.memory.roomPlan.rcl[2].container.push(generalContainerPos);

        // Base roads
        this.room.memory.roomPlan.rcl[2].road = this.room.memory.roomPlan.rcl[2].road.concat([  // Base roads
            // Top to right
            new RoomPosition(this.baseSpawn.pos.x, this.baseSpawn.pos.y - 1, this.room.name),
            new RoomPosition(this.baseSpawn.pos.x + 1, this.baseSpawn.pos.y, this.room.name),
            new RoomPosition(this.baseSpawn.pos.x + 2, this.baseSpawn.pos.y + 1, this.room.name),
            new RoomPosition(this.baseSpawn.pos.x + 3, this.baseSpawn.pos.y + 2, this.room.name),
            // Right to bottom
            new RoomPosition(this.baseSpawn.pos.x + 2, this.baseSpawn.pos.y + 3, this.room.name),
            new RoomPosition(this.baseSpawn.pos.x + 1, this.baseSpawn.pos.y + 4, this.room.name),
            new RoomPosition(this.baseSpawn.pos.x, this.baseSpawn.pos.y + 5, this.room.name),
            // Bottom to left
            new RoomPosition(this.baseSpawn.pos.x - 1, this.baseSpawn.pos.y + 4, this.room.name),
            new RoomPosition(this.baseSpawn.pos.x - 2, this.baseSpawn.pos.y + 3, this.room.name),
            new RoomPosition(this.baseSpawn.pos.x - 3, this.baseSpawn.pos.y + 2, this.room.name),
            // Left to top
            new RoomPosition(this.baseSpawn.pos.x - 2, this.baseSpawn.pos.y + 1, this.room.name),
            new RoomPosition(this.baseSpawn.pos.x - 1, this.baseSpawn.pos.y, this.room.name)
        ]);

        // Extensions
        this.room.memory.roomPlan.rcl[2].extension = [
            new RoomPosition(this.baseSpawn.pos.x - 2, this.baseSpawn.pos.y - 1, this.room.name),
            new RoomPosition(this.baseSpawn.pos.x - 2, this.baseSpawn.pos.y - 2, this.room.name),
            new RoomPosition(this.baseSpawn.pos.x - 1, this.baseSpawn.pos.y - 1, this.room.name),
            new RoomPosition(this.baseSpawn.pos.x - 2, this.baseSpawn.pos.y, this.room.name),
            new RoomPosition(this.baseSpawn.pos.x - 3, this.baseSpawn.pos.y - 1, this.room.name)
        ];

        // Extension roads
        this.room.memory.roomPlan.rcl[2].road = this.room.memory.roomPlan.rcl[2].road.concat([
            new RoomPosition(this.baseSpawn.pos.x - 1, this.baseSpawn.pos.y - 2, this.room.name),
            new RoomPosition(this.baseSpawn.pos.x - 2, this.baseSpawn.pos.y - 3, this.room.name),
            new RoomPosition(this.baseSpawn.pos.x - 3, this.baseSpawn.pos.y - 2, this.room.name),
            new RoomPosition(this.baseSpawn.pos.x - 4, this.baseSpawn.pos.y - 1, this.room.name),
            new RoomPosition(this.baseSpawn.pos.x - 5, this.baseSpawn.pos.y, this.room.name),
            new RoomPosition(this.baseSpawn.pos.x - 4, this.baseSpawn.pos.y + 1, this.room.name)
        ]);

        this.finished(2);
    }
}
