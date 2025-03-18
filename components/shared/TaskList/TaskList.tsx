import React, { useState } from 'react';
import { SchedulerProjectData } from '@/types/global';
import TaskModal from '@/components/shared/TaskModal/TaskModal';

interface TaskListProps {
  tasks: SchedulerProjectData[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  const [selectedTask, setSelectedTask] = useState<SchedulerProjectData | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleTaskClick = (task: SchedulerProjectData) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  return (
    <div>
      <ul>
        {tasks.map(task => (
          <li key={task.id} onClick={() => handleTaskClick(task)} className="cursor-pointer hover:underline">
            {task.title}
          </li>
        ))}
      </ul>
      <TaskModal
        show={showModal}
        onHide={() => setShowModal(false)}
        task={selectedTask}
      />
    </div>
  );
};

export default TaskList;