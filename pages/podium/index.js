import { useEffect, useState } from 'react'
import Landing from 'components/Landing'
import BGObject from 'components/BGObject'
import { useIdleTimer } from 'react-idle-timer'
import Result from 'components/Result'
import cards from 'data/cards'
import PodiumNumber from 'components/PodiumNumber'
import PodiumCard from 'components/PodiumCard'
import { DragDropContext, Droppable } from 'react-beautiful-dnd-next'
import { addApiPodium } from 'services/PodiumService'

const step = 'podium'

const podiums = [
  { position: '2', backgroundColor: '#4E9ED8' },
  { position: '1', backgroundColor: '#0079C2' },
  { position: '3', backgroundColor: '#71CAFF' }
]

export default function Podium() {
  const [status, setStatus] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [selecteds, setSelecteds] = useState({})
  const [items, setItems] = useState([...cards])
  const [heightPodium, setHeightPodium] = useState(900)

  useEffect(() => {
    const heights = [700, 950, 1150, 1400]

    if (items.length / 3 > 2) {
      setHeightPodium(heights[0])
    } else if (items.length / 3 > 1) {
      setHeightPodium(heights[1])
    } else if (items.length / 3 > 0) {
      setHeightPodium(heights[2])
    } else {
      setHeightPodium(heights[3])
    }
  }, [selecteds])

  const handleChangeStatus = () => {
    setStatus(1)
  }

  const IDLE_TIMEOUT = 1000 * 60 * 5

  const onIdle = () => resetStep()

  useIdleTimer({
    onIdle,
    timeout: IDLE_TIMEOUT
  })

  const handleShowResults = () => {
    addApiPodium(selecteds).then(() => {
      setStatus(0)
      setShowResults(true)
    })
  }

  const resetStep = () => {
    setStatus(0)
    setShowResults(false)
    setItems(cards)
    setSelecteds({})
    location.reload()
  }

  const onDragEnd = (result) => {
    const { source, destination } = result
    if (!destination || !destination.droppableId.startsWith('podium-')) {
      return
    }

    const podiumNumber = destination.droppableId.substring('podium-'.length)

    const newSelecteds = { ...selecteds }
    if (newSelecteds[podiumNumber]) {
      newSelecteds[podiumNumber].push(items[source.index])
    } else {
      newSelecteds[podiumNumber] = [items[source.index]]
    }

    setSelecteds(newSelecteds)
    items.splice(source.index, 1)
  }

  return (
    <>
      <BGObject
        position={'left'}
        status={status}
        hide={status}
        step={step}
      ></BGObject>
      {status === 0 && !showResults && (
        <Landing
          step={step}
          title='Nos importa tu opinión'
          status={status}
          onClick={handleChangeStatus}
        />
      )}
      {status === 1 && !showResults && (
        <div className='flex flex-col w-full h-full'>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId='cards'>
              {(provided) => (
                <section
                  className='flex flex-col items-center justify-center flex-1 max-w-3xl mx-auto'
                  ref={provided.innerRef}
                >
                  <header className='text-center'>
                    <h1 className='text-6xl font-bold'>Podio del Asesor</h1>
                    <p className='text-xl'>
                      Arrastra las todas las tarjetas de necesidades según tu
                      prioridad
                    </p>
                    {!items.length && (
                      <>
                        <p className='mt-10 text-2xl'>¡Finalizado!</p>
                        <button
                          className='px-10 py-4 mt-4 text-3xl text-white rounded-3xl bg-sky-700'
                          onClick={handleShowResults}
                        >
                          Siguiente
                        </button>
                      </>
                    )}
                  </header>
                  <div className='grid grid-cols-3 gap-6 mt-20'>
                    {items.map(({ id, text }, index) => {
                      return (
                        <PodiumCard
                          index={index}
                          id={id}
                          text={text}
                          isDraggable
                          key={`item-${index}`}
                        />
                      )
                    })}
                  </div>
                  {provided.placeholder}
                </section>
              )}
            </Droppable>

            <footer className='flex items-end'>
              {podiums.map(({ position, backgroundColor }, index) => (
                <Droppable
                  droppableId={`podium-${position}`}
                  key={`podium-${position}`}
                  index={index}
                >
                  {(provided) => (
                    <PodiumNumber
                      position={position}
                      backgroundColor={backgroundColor}
                      pref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      height={heightPodium - position * 1 * 100}
                    >
                      {selecteds[position] && (
                        <div className='grid grid-cols-3 gap-6 mt-20'>
                          {selecteds[position].map(({ id, text }, index) => (
                            <PodiumCard
                              index={index}
                              id={id}
                              text={text}
                              size='small'
                              key={`podium-item-${index}`}
                            />
                          ))}
                        </div>
                      )}
                    </PodiumNumber>
                  )}
                </Droppable>
              ))}
            </footer>
          </DragDropContext>
        </div>
      )}
      {showResults && (
        <Result step={step} title='Finalizado' onClick={resetStep} />
      )}
      <style jsx>{`
        header {
          color: #0079c2;
        }
      `}</style>
    </>
  )
}
