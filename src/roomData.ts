export class RoomData {
  // Room metadata.
  public static room: Room;

  // Room objects.
  public static spawns: Spawn[];
  public static structures: Structure[];
  public static extensions: Extension[];
  public static containers: Container[];
  public static mineralContainer: Container | undefined;
  public static storage: Storage | undefined;
  public static extractor: StructureExtractor | undefined;
  public static walls: StructureWall[];
  public static ramparts: Rampart[];
  public static roads: StructureRoad[];
  public static towers: Tower[];
  public static sources: Source[];
  public static minerals: Mineral[];
  public static sites: ConstructionSite[];
  public static creeps: Creep[];
  public static hostileCreeps: Creep[];
  public static creepsOfRole: {};
  public static dropped: Resource[];
  public static storageFromLink: Link | undefined;
  public static storageToLink: Link | undefined;
  public static upgradeFromLink: Link | undefined;
  public static upgradeToLink: Link | undefined;

  // Other rooms.
  public static invaderCount = 0;
  public static longHarvesterCount: number[];
  public static reserverCount: number[];

  /**
   * Reinitialize room object properties.
   * @static
   * @memberof RoomData
   */
  public static reset() {
    this.spawns = [];
    this.structures = [];
    this.extensions = [];
    this.containers = [];
    this.mineralContainer = undefined;
    this.storage = undefined;
    this.extractor = undefined;
    this.walls = [];
    this.ramparts = [];
    this.roads = [];
    this.towers = [];
    this.sources = [];
    this.minerals = [];
    this.sites = [];
    this.creeps = [];
    this.hostileCreeps = [];
    this.dropped = [];
    this.storageFromLink = undefined;
    this.storageToLink = undefined;
    this.upgradeFromLink = undefined;
    this.upgradeToLink = undefined;
    this.invaderCount = 0;
    this.longHarvesterCount = [];
    this.reserverCount = [];
  }
}
