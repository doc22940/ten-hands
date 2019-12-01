/// <reference types="react-scripts" />

interface IConfig {
  port: string | number;
  enableTerminalTheme: boolean;
}

interface IMyTheme {
  theme: string;
  setTheme: any;
}

interface IProjectCommand {
  _id: string;
  name: string;
  cmd: string;
  execDir: string;
  lastExecutedAt: number;
}

// default is the order stored in database.
// default is same as custom on UI.
type TASKS_SORT_ORDER = "name-asc" | "name-desc" | "last-executed" | "default";

interface IProject {
  _id?: string;
  name: string;
  type: string;
  path: string;
  configFile?: string;
  commands: IProjectCommand[];
  taskOrder: TASKS_SORT_ORDER;
}

interface IJobAction {
  room: string;
  type: ACTION_TYPES;
  stdout?: string;
  state?: object;
  isRunning?: boolean;
  socketId?: string;
  process?: any;
}

interface IStateAction {
  type: ACTION_TYPES;
  state: object;
}

interface Window {
  tenHands: any;
}

interface ITenHandsFile {
  name: string;
  path?: string;
  data: string | ArrayBuffer | null;
}
