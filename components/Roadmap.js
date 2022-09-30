import { colors } from 'styles/theme'
import { Droppable } from 'react-beautiful-dnd-next'
import { FaceHappy } from './icons/FaceHappy'
import { FaceSmile } from './icons/FaceSmile'
import { FaceQuestion } from './icons/FaceQuestion'
import { FaceSad } from './icons/FaceSad'
import { FaceBad } from './icons/FaceBad'

export default function Roadmap({ data, active = 0, step, selecteds = {} }) {
  return (
    <>
      <div className='pb-4 overflow-hidden'>
        <ul
          className='items-center transition-transform'
          style={{
            width: data.length * (90 + 328),
            transform: `translateX(${
              1080 / 2 - 69 / 2 - 328 * 1.2 * (active - 1)
            }px)`
          }}
        >
          {data.map((item) => {
            return (
              <Droppable
                droppableId={`dropzone-${item.id}`}
                key={`dropzone-${item.id}`}
                index={item.id}
              >
                {(provided, snapshot) => (
                  <li
                    className={`${item.id === active ? 'active' : ''} ${
                      snapshot.isDraggingOver ? 'dragging' : ''
                    }`}
                    ref={provided.innerRef}
                  >
                    <div>
                      {selecteds[item.id] === '5' && <FaceHappy />}
                      {selecteds[item.id] === '4' && <FaceSmile />}
                      {selecteds[item.id] === '3' && <FaceQuestion />}
                      {selecteds[item.id] === '2' && <FaceSad />}
                      {selecteds[item.id] === '1' && <FaceBad />}
                    </div>
                  </li>
                )}
              </Droppable>
            )
          })}
        </ul>
      </div>
      <style jsx>{`
        ul {
          display: flex;
          gap: 328px;
          margin-top: 185px;
          position: relative;
          transform: translateX(${1080 / 2 - 69 / 2}px);
        }

        ul::before {
          background: ${colors[step].primary};
          content: '';
          height: 6px;
          left: 0;
          position: absolute;
          top: 50%;
          width: 100%;
        }

        li {
          width: 200px;
          height: 150px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        li:first-child {
          margin-left: -50px;
        }

        li div {
          background: ${colors[step].primary};
          border-radius: 100%;
          height: 69px;
          width: 69px;
          position: relative;
          z-index: 2;
        }

        li.active div {
          height: 90px;
          width: 90px;
        }

        li.dragging div {
          transform: scale(1.3);
        }

        li :global(svg) {
          transform: scale(0.7);
          position: absolute;
          top: -13px;
          left: -15px;
        }

        li.active div :global(svg) {
          transform: scale(0.9);
          top: -6px;
          left: -4px;
        }
      `}</style>
    </>
  )
}
