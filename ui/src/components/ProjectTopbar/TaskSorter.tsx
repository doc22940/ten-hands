import React, { useEffect } from "react";
import { HTMLSelect, Dialog } from "@blueprintjs/core";
import { useProjects } from "../shared/Projects";
import { useUpdateEffect } from "../shared/hooks";
import { recorderProjectTasks } from "../../utils/projects";
import { useTheme } from "../shared/Themes";
import CommandOrderListContainer from "./CommandOrderListContainer";

interface ITaskSorterProps {
  activeProject: IProject;
}

const TaskSorter: React.FC<ITaskSorterProps> = React.memo(
  ({ activeProject }) => {
    const { reorderTasks } = useProjects();

    const [tasksOrder, setTasksOrder] = React.useState<TASKS_SORT_ORDER>(
      activeProject.taskOrder || "default"
    );

    const [commandsOrderModalOpen, setCommandsOrderModalOpen] = React.useState<
      boolean
    >(false);

    const { theme } = useTheme();

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

    const handleChangeOrderModalClose = () => {
      setCommandsOrderModalOpen(false);
    };

    return (
      <React.Fragment>
        Sort tasks by: <span style={{ paddingRight: 10 }}></span>
        <HTMLSelect
          value={tasksOrder}
          onChange={e => {
            const tasksOrder: TASKS_SORT_ORDER = e.target
              .value as TASKS_SORT_ORDER;
            console.log(e.target.value);
            setTasksOrder(e.target.value as TASKS_SORT_ORDER);
            if (tasksOrder === "default") {
              setCommandsOrderModalOpen(true);
            }
          }}
          options={[
            { label: "Name (A-Z)", value: "name-asc" },
            { label: "Name (Z-A)", value: "name-desc" },
            { label: "Last Executed", value: "last-executed" },
            { label: "Custom", value: "default" }
          ]}
        />
        <Dialog
          title="Change Tasks Order"
          icon={"numbered-list"}
          className={theme}
          isOpen={commandsOrderModalOpen}
          onClose={handleChangeOrderModalClose}
        >
          <CommandOrderListContainer activeProject={activeProject} />
        </Dialog>
      </React.Fragment>
    );
  }
);

export default TaskSorter;
