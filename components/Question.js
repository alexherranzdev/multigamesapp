import QuestionOption from 'components/QuestionOption'
import { useEffect, useState } from 'react'
import { colors } from 'styles/theme'
import Bag from './icons/Bag'
import Engine from './icons/Engine'
import Pen from './icons/Pen'
import NextButton from './NextButton'
import { bags, engines, pens } from 'constants/icons'

export function Question({
  index,
  totalQuestions,
  title,
  options,
  icon,
  active,
  step,
  onAnswer,
  onClickQuestion,
  onSubmit,
  description = 'Nos interesa tu opinión, por favor contesta a estas preguntas',
  ...props
}) {
  const [status, setStatus] = useState(null)
  const [submitStatus, setSubmitStatus] = useState(false)

  const handleAnswer = (value) => {
    onAnswer(value)
    setSubmitStatus(!!value)
  }

  useEffect(() => {
    if (active) {
      document
        .querySelectorAll('.question.active .footer-icons svg')
        .forEach((bag, index) => {
          setTimeout(() => {
            bag.style.opacity = 1
          }, 600 * (index + 1))
        })
    } else if (active === false) {
      setStatus(null)
      setSubmitStatus(false)
    }
  }, [active])

  return (
    <>
      <section
        className={`question flex flex-col justify-center transition-all ${
          active ? 'active' : ''
        }`}
        {...props}
      >
        <span className='mt-5 text-2xl text-center'>{`${
          index + ''
        } / ${totalQuestions}`}</span>
        <p className='text-2xl text-center -mt-60'>{description}</p>
        <h1>{title}</h1>
        <div className='flex flex-col justify-center w-3/4 mx-auto mt-56'>
          {options.map((option, index) => {
            return (
              <QuestionOption
                label={option.label}
                key={option.label}
                type={option.type}
                active={status === index}
                onAnswer={handleAnswer}
                onOptionClick={() => setStatus(index)}
                step={step}
              />
            )
          })}
          <NextButton
            onClick={onSubmit}
            step={step}
            visible={submitStatus}
            disabled={!submitStatus}
          />
        </div>

        {icon === 'bag' && (
          <div className='footer-icons'>
            {bags.map(({ bottom, left, rotate }, index) => (
              <Bag
                fill='#FFF'
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

        {icon === 'pen' && (
          <div className='footer-icons'>
            {pens.map(({ bottom, left, rotate }, index) => (
              <Pen
                width={162}
                height={162}
                fill='#FFF'
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

        {icon === 'engine' && (
          <div className='footer-icons'>
            {engines.map(({ bottom, left, rotate }, index) => (
              <Engine
                width={184}
                height={187}
                fill='#FFF'
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

      <style jsx>{`
        .footer-icons > :global(svg) {
          opacity: 0;
        }
        section {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          color: ${colors[step].primary};
          opacity: 0;
          pointer-events: none;
        }

        section h1 {
          font-size: 60px;
          font-weight: 700;
          text-align: center;
          color: ${colors[step].primary};
          line-height: 80px;
        }

        section.active {
          opacity: 1;
          pointer-events: all;
        }
      `}</style>
    </>
  )
}
