export const hasProjectWithSameName = (
  projects: IProject[],
  newProjectName: string
): boolean => {
  const existingNames: string[] = projects.map(project =>
    project.name.toLowerCase()
  );
  const hasProject = existingNames.includes(newProjectName.toLowerCase());
  return hasProject;
};

export const recorderProjectTasks = (
  project: IProject,
  taskOrder: TASKS_SORT_ORDER = "name-asc"
): IProject => {
  let sortedTasks: IProjectCommand[] = [...project.commands];
  console.log("beforeTasks:", sortedTasks);
  if (taskOrder === "name-asc") {
    sortedTasks.sort((a, b) =>
      a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1
    );
  } else if (taskOrder === "name-desc") {
    sortedTasks.sort((a, b) =>
      a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1
    );
  } else if (taskOrder === "last-executed") {
    // To fix the old versions where there won't be any lastExecutedAt.
    sortedTasks = sortedTasks.map(task =>
      task.lastExecutedAt === null || task.lastExecutedAt === undefined
        ? { ...task, lastExecutedAt: 0 }
        : task
    );

    sortedTasks.sort((a, b) => b.lastExecutedAt - a.lastExecutedAt);
  }

  console.log("sortedTasks:", sortedTasks);
  const updatedProject: IProject = {
    ...project,
    commands: sortedTasks
  };

  return updatedProject;
};
