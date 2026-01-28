import { DragDropContext, Droppable, Draggable, type DropResult } from '@hello-pangea/dnd';
import { useSelector, useDispatch } from 'react-redux';
import { selectFilteredTasks, reorderTasks } from '../../features/tasks/tasksSlice';
import { Inbox } from 'lucide-react';
import TaskItem from './TaskItem';

export default function TaskList() {
  const tasks = useSelector(selectFilteredTasks);
  const dispatch = useDispatch();

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    if (result.source.index === result.destination.index) return;
    dispatch(reorderTasks({ from: result.source.index, to: result.destination.index }));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="task-list">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`mt-6 min-h-96 p-4 bg-secondary bg-[#0F172A] border-2 rounded-2xl transition-all ${
              snapshot.isDraggingOver ? 'border-primary border-[#2563EB]' : 'border-border'
            }`}
          >
            {tasks.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-80 text-center">
                <Inbox className="w-16 h-16 text-muted mb-4" />
                <p className="text-xl font-semibold text-muted mb-2">No tasks yet</p>
                <p className="text-sm text-muted">Create your first task to get started</p>
              </div>
            ) : (
              <>
                {tasks.map((t, i) => (
                  <Draggable key={t.id} draggableId={t.id} index={i}>
                    {(prov, snapshot) => (
                      <div
                        ref={prov.innerRef}
                        {...prov.draggableProps}
                        {...prov.dragHandleProps}
                        className={snapshot.isDragging ? 'opacity-50' : ''}
                      >
                        <TaskItem task={t} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </>
            )}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}