import { Draggable } from 'react-beautiful-dnd-next'

export default function RoadmapItem({ value, text = null, children }) {
  return (
    <Draggable draggableId={'' + value} index={value}>
      {(provided, snapshot) => (
        <>
          <div
            className='flex flex-col items-center text-center w-44'
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {children}
            {!snapshot.isDragging && (
              <span className='mt-4 text-2xl'>{text}</span>
            )}
          </div>
        </>
      )}
    </Draggable>
  )
}
