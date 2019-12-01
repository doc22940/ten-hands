interface IProjectCommand {
  _id?: string;
  execDir?: string;
  name: string;
  cmd: string;
  lastExecutedAt?: number;
}

type TASKS_SORT_ORDER = "name-asc" | "name-desc" | "last-executed" | "default"; // default is the order stored in database.

interface IProject {
  _id?: string;
  name: string;
  type: string;
  path: string;
  commands: IProjectCommand[];
  taskOrder: TASKS_SORT_ORDER;
}

declare enum JobStatus {
  RUNNING,
  STOPPED
}

interface IJob {
  _id?: string;
  createdAt: Date;
  pid: number;
  status: JobStatus;
  command: IProjectCommand;
  start(): number; // returns pid
  kill(): number;
}
