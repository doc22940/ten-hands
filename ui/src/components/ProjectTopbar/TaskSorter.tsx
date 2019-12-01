import React, { useEffect } from "react";
import { HTMLSelect } from "@blueprintjs/core";
import { useProjects } from "../shared/Projects";
import { useUpdateEffect } from "../shared/hooks";
import { recorderProjectTasks } from "../../utils/projects";

interface ITaskSorterProps {
  activeProject: IProject;
}

const TaskSorter: React.FC<ITaskSorterProps> = React.memo(
  ({ activeProject }) => {
    const { reorderTasks } = useProjects();

    const [tasksOrder, setTasksOrder] = React.useState<TASKS_SORT_ORDER>(
      activeProject.taskOrder || "default"
    );

    const sortTaskOrder = React.useCallback(
      (order: TASKS_SORT_ORDER) => {
        const reorderedProject: IProject = recorderProjectTasks(
          activeProject,
          order
        );
        reorderTasks(activeProject._id!, reorderedProject.commands, order);
      },
      [activeProject]
    );

    useEffect(() => {
      console.log("Initial: ", tasksOrder);
      if (activeProject.taskOrder !== tasksOrder) {
        if (!activeProject.taskOrder) {
          // If there is no taskOrder currently, change it to "default"
          setTasksOrder(tasksOrder);
        } else {
          setTasksOrder(activeProject.taskOrder);
        }
      }
    }, [activeProject]);

    useUpdateEffect(() => {
      console.log("later: ", tasksOrder);
      sortTaskOrder(tasksOrder);
    }, [tasksOrder]);

    return (
      <React.Fragment>
        Sort tasks by: <span style={{ paddingRight: 10 }}></span>
        <HTMLSelect
          value={tasksOrder}
          onChange={e => {
            console.log(e.target.value);
            setTasksOrder(e.target.value as TASKS_SORT_ORDER);
          }}
          options={[
            { label: "Name (A-Z)", value: "name-asc" },
            { label: "Name (Z-A)", value: "name-desc" },
            { label: "Last Executed", value: "last-executed" },
            { label: "Custom", value: "default" }
          ]}
        />
      </React.Fragment>
    );
  }
);

export default TaskSorter;
