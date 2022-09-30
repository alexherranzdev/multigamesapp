import { useState } from 'react'
import Landing from 'components/Landing'
import Result from 'components/Result'
import questions from 'data/questions'
import { Question } from 'components/Question'
import BGObject from 'components/BGObject'
import { useIdleTimer } from 'react-idle-timer'
import { addApiAnswer } from 'services/QuizService'

const step = 'quiz'

export default function Quiz() {
  const [status, setStatus] = useState(0)
  const [questionActive, setQuestionActive] = useState(0)
  const [questionAnswers, setQuestionAnswer] = useState([])
  const [position, setPosition] = useState('left')
  const [showResults, setShowResults] = useState(false)

  const handleChangeStatus = () => {
    setStatus(1)

    setTimeout(() => {
      setQuestionActive(questionActive + 1)
    }, 600)
  }

  const handleQuestionAnswer = (index, value) => {
    if (value) {
      if (questionAnswers[index]) {
        setQuestionAnswer(questionAnswers.splice(index, 1, value))
      } else {
        setQuestionAnswer([
          ...questionAnswers,
          { question: questions[index].title, value }
        ])
      }
    }
  }

  const handleSubmit = () => {
    setQuestionActive(questionActive + 1)
    setPosition(position === 'left' ? 'right' : 'left')

    if (questionActive === questions.length) {
      setShowResults(true)
      setStatus(0)
    }

    addApiAnswer({
      ...{ id: questionActive },
      ...questionAnswers[questionActive - 1]
    })
  }

  const IDLE_TIMEOUT = 1000 * 60 * 5

  const onIdle = () => resetQuestions()

  useIdleTimer({
    onIdle,
    timeout: IDLE_TIMEOUT
  })

  const resetQuestions = () => {
    setQuestionActive(0)
    setStatus(0)
    setQuestionAnswer([])
    setShowResults(false)
    setPosition('left')
  }

  return (
    <>
      <BGObject position={position} status={status} step={step}></BGObject>
      {questionActive === 0 && (
        <Landing
          step={step}
          title='Ayúdanos a mejorar'
          status={status}
          onClick={handleChangeStatus}
        />
      )}
      {questions.map((question, index) => {
        return (
          <Question
            id={`question-${index + 1}`}
            index={index + 1}
            totalQuestions={questions.length}
            title={question.title}
            active={questionActive === index + 1}
            step={step}
            options={question.options}
            key={question.id}
            icon={question.icon}
            onAnswer={(value) => handleQuestionAnswer(index, value)}
            onSubmit={() => {
              handleSubmit()
            }}
          />
        )
      })}
      {showResults && (
        <Result step={step} title='Finalizado' onClick={resetQuestions} />
      )}
      <style jsx>{``}</style>
    </>
  )
}
