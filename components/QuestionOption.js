import { useEffect, useState, useRef } from 'react'
import { colors } from 'styles/theme'

export default function QuestionOption({
  label,
  type,
  step,
  active,
  onAnswer,
  onOptionClick,
  ...props
}) {
  const [showInput, setShowInput] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const inputRef = useRef(null)

  const handleOptionClick = () => {
    active = true
    onOptionClick()
    if (type !== 'text') {
      onAnswer(label)
    } else if (!inputValue.length) {
      onAnswer('')
    }
  }

  useEffect(() => {
    setShowInput(active && type === 'text')
  }, [active])

  useEffect(() => {
    if (showInput) {
      inputRef.current?.focus()
    }
  })

  useEffect(() => {
    if (inputValue !== '') {
      onAnswer(inputValue)
    }
  }, [inputValue])

  return (
    <>
      <button
        className={`block px-6 py-4 mb-4 text-3xl text-left text-white rounded-xl ${
          active ? 'active' : ''
        }`}
        onClick={handleOptionClick}
        {...props}
      >
        {label}
      </button>
      {type === 'text' && (
        <input
          ref={inputRef}
          type='text'
          value={inputValue}
          onInput={(e) => setInputValue(e.target.value)}
          placeholder='Escribe tu respuesta'
          className='focus:outline-none'
          style={{ display: showInput ? 'inline' : 'none' }}
        />
      )}

      <style jsx>{`
        button {
          background-color: ${colors[step].primary};
        }

        .active {
          background: ${colors[step].active};
          color: ${colors[step].primary};
        }

        input {
          background: transparent;
          border-bottom: 1px solid ${colors[step].primary};
          font-size: 26px;
          color: ${colors[step].primary};
        }

        ::placeholder {
          color: ${colors[step].primary}77;
        }
      `}</style>
    </>
  )
}
