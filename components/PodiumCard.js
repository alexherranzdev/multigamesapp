import { Draggable } from 'react-beautiful-dnd-next'

const styles = {
  1: {
    backgroundPosition: '100% 0',
    alignItems: 'flex-end'
  },
  2: {
    backgroundPosition: '100% 100%'
  },
  3: {
    backgroundPosition: '0 0',
    alignItems: 'flex-end'
  },
  4: {
    backgroundPosition: '0 100%'
  },
  5: {
    backgroundPosition: '0 0',
    alignItems: 'flex-end'
  },
  6: {
    backgroundPosition: '0 100%'
  },
  7: {
    backgroundPosition: '0 0',
    alignItems: 'flex-end'
  },
  8: {
    backgroundPosition: '100% 100%'
  },
  9: {
    backgroundPosition: '0 100%'
  }
}

export default function PodiumCard({
  index,
  id,
  text,
  size = 'normal',
  isDraggable = false,
  ...props
}) {
  const styleCard = {
    ...styles[id],
    ...{ backgroundImage: `url(images/podium/icons${id}.png)` }
  }
  return (
    <>
      <Draggable
        key={id}
        draggableId={'' + id}
        index={index}
        isDragDisabled={!isDraggable}
      >
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <article
              className={`relative flex p-5 rounded-3xl text-xl podium-card-${id} size-${size} ${
                snapshot.isDragging ? 'dragging' : ''
              }`}
              style={styleCard}
              {...props}
            >
              {text}
            </article>
          </div>
        )}
      </Draggable>
      <style jsx>{`
        article {
          background-color: #6eb6ea;
          background-repeat: no-repeat;
          color: #fff;
          box-shadow: 6px 6px 11px rgba(52, 71, 82, 0.4);
          height: 232px;
          width: 232px;
        }

        .dragging {
          box-shadow: 6px 6px 11px rgba(52, 71, 82, 0.4);
        }

        .size-small {
          zoom: 0.38;
        }
      `}</style>
    </>
  )
}
