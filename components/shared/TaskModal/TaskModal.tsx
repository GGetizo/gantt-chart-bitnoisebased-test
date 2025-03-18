import React from 'react';
import { SchedulerProjectData } from '@/types/global';

interface TaskModalProps {
  show: boolean;
  onHide: () => void;
  task: SchedulerProjectData | null;
}

const TaskModal: React.FC<TaskModalProps> = ({ show, onHide, task }) => {
  if (!task || !show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-1/2">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">{task.title}</h2>
          <button onClick={onHide} className="text-gray-500 hover:text-gray-700">
            &times;
          </button>
        </div>
        <div className="p-4">
          <p><strong>Start Date:</strong> {task.startDate.toString()}</p>
          <p><strong>End Date:</strong> {task.endDate.toString()}</p>
          <p><strong>Occupancy:</strong> {task.occupancy}</p>
          <p><strong>Subtitle:</strong> {task.subtitle}</p>
          <p><strong>Description:</strong> {task.description}</p>
        </div>
        <div className="flex justify-end p-4 border-t">
          <button onClick={onHide} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;