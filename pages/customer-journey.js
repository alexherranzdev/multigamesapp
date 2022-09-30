import { useEffect, useState } from 'react'
import Landing from 'components/Landing'
import BGObject from 'components/BGObject'
import { useIdleTimer } from 'react-idle-timer'
import Result from 'components/Result'
import { colors } from 'styles/theme'
import { cjourney } from 'data/cjourney'
import Roadmap from 'components/Roadmap'
import { FaceHappy } from 'components/icons/FaceHappy'
import { FaceSmile } from 'components/icons/FaceSmile'
import { FaceSad } from 'components/icons/FaceSad'
import { FaceQuestion } from 'components/icons/FaceQuestion'
import { FaceBad } from 'components/icons/FaceBad'
import { DragDropContext, Droppable } from 'react-beautiful-dnd-next'
import RoadmapItem from 'components/RoadmapItem'
import { eyes, carts, handshakes } from 'constants/icons'
import { Eye } from 'components/icons/Eye'
import { Cart } from 'components/icons/Cart'
import { Handshake } from 'components/icons/Handshake'
import { addApiCustomerJourney } from 'services/CustomerJourneyService'

const step = 'cjourney'

export default function Podium() {
  const [status, setStatus] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [activeElement, setActiveElement] = useState(null)
  const [selecteds, setSelecteds] = useState({})
  const [icon, setIcon] = useState('eye')

  useEffect(() => {
    if (activeElement === null) {
      setActiveElement(cjourney.at(0))
    }
  }, null)

  const handleChangeStatus = () => {
    setStatus(1)
  }

  const IDLE_TIMEOUT = 1000 * 60 * 5

  const onIdle = () => resetStep()

  useIdleTimer({
    onIdle,
    timeout: IDLE_TIMEOUT
  })

  const resetStep = () => {
    setStatus(0)
    setShowResults(false)
    setActiveElement(cjourney.at(0))
    setSelecteds({})
    setIcon('eye')
  }

  const onDragEnd = (result) => {
    const { draggableId, destination } = result
    if (
      destination &&
      destination.droppableId === `dropzone-${activeElement.id}`
    ) {
      setSelecteds({ ...selecteds, [activeElement.id]: draggableId })

      const index = cjourney.findIndex((a) => a.id === activeElement.id) + 1
      const nextElement = cjourney.at(index)

      if (nextElement) {
        setActiveElement(nextElement)
        if (index < 3) {
          setIcon('eye')
        } else if (index > 3 && index < 6) {
          setIcon('cart')
        } else {
          setIcon('handshake')
        }
      } else {
        handleShowResults()
      }
    }
  }

  const handleShowResults = () => {
    addApiCustomerJourney(selecteds).then(() => {
      setStatus(0)
      setShowResults(true)
    })
  }

  return (
    <>
      <BGObject position={'left'} status={status} step={step}></BGObject>
      {status === 0 && !showResults && (
        <Landing
          step={step}
          title='Cuéntanos tu experiencia'
          status={status}
          onClick={handleChangeStatus}
        />
      )}
      {status === 1 && !showResults && (
        <section className='flex flex-col w-full h-full'>
          {activeElement && (
            <header className='w-3/4 mx-auto text-center'>
              <span className='text-3xl'>{`${activeElement.id}/${cjourney.length}`}</span>
              <h2 className='mt-8 text-3xl font-bold'>
                {activeElement.section}
              </h2>
              <h1 className='mt-8 text-6xl font-bold'>{activeElement.text}</h1>
              <p className='mt-20 text-2xl text-center'>
                Arrastra un emoji para valorar cada fase del Costumer Journey
              </p>
            </header>
          )}

          <DragDropContext onDragEnd={onDragEnd}>
            <Roadmap
              data={cjourney}
              step={step}
              active={activeElement.id}
              selecteds={selecteds}
            />
            <Droppable droppableId='faces'>
              {(provided) => (
                <div
                  className='flex items-start justify-around w-3/4 mx-auto mt-36'
                  ref={provided.innerRef}
                >
                  <RoadmapItem value={5} text='Increíble'>
                    <FaceHappy />
                  </RoadmapItem>
                  <RoadmapItem value={4} text='Muy bueno'>
                    <FaceSmile />
                  </RoadmapItem>
                  <RoadmapItem value={3} text='Aún no he usado este servicio'>
                    <FaceQuestion />
                  </RoadmapItem>
                  <RoadmapItem value={2} text='Regular'>
                    <FaceSad />
                  </RoadmapItem>
                  <RoadmapItem value={1} text='No tan bueno'>
                    <FaceBad />
                  </RoadmapItem>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          {icon === 'eye' && (
            <div className='footer-icons'>
              {eyes.map(({ bottom, left, rotate }, index) => (
                <Eye
                  key={index}
                  className='absolute transition-all duration-500'
                  style={{
                    bottom,
                    left,
                    transform: `rotate(${rotate}deg)`
                  }}
                />
              ))}
            </div>
          )}

          {icon === 'cart' && (
            <div className='footer-icons'>
              {carts.map(({ bottom, left, rotate }, index) => (
                <Cart
                  key={index}
                  className='absolute transition-all duration-500'
                  style={{
                    bottom,
                    left,
                    transform: `rotate(${rotate}deg)`
                  }}
                />
              ))}
            </div>
          )}

          {icon === 'handshake' && (
            <div className='footer-icons'>
              {handshakes.map(({ bottom, left, rotate }, index) => (
                <Handshake
                  key={index}
                  className='absolute transition-all duration-500'
                  style={{
                    bottom,
                    left,
                    transform: `rotate(${rotate}deg)`
                  }}
                />
              ))}
            </div>
          )}
        </section>
      )}
      {showResults && (
        <Result step={step} title='Finalizado' onClick={resetStep} />
      )}
      <style jsx>{`
        header {
          height: 450px;
        }

        section {
          background: ${colors[step].secondary};
          color: ${colors[step].text};
          padding-top: 220px;
        }
      `}</style>
    </>
  )
}
