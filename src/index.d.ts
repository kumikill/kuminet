interface Memory {
  uuid: number;
  log: any;
}

declare module "*.json" {
  const value: any;
  export default value;
}

declare const __REVISION__: string;
