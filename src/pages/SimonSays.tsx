import React, {useEffect, useRef, useState} from 'react';
import styles from './SimonSays.module.scss';
import SimonSquare from "../components/SimonSquare";

const colours = ["green", "red", "yellow", "blue"]

interface IEnabledSquares {
  [key: string]: boolean
}

const SimonSays = () => {
  const [enabledSquares, setEnabledSquares] = useState<IEnabledSquares>({})
  const [sequenceCount, setSequenceCount] = useState<number>(0)
  const [clickSequenceCount, setClickSequenceCount] = useState<number>(0)
  const [instruction, setInstruction] = useState<string>("Press space to start")
  const sequence = useRef<string[]>([])
  const clickSequence = useRef<string[]>([])
  const gameStarted = useRef<boolean>(false)

  function addSequenceStep() {
    sequence.current.push(colours[Math.floor(Math.random() * colours.length)])
    setSequenceCount(sequence.current.length)
  }

  function showNextStep() {
    const nextSquare = sequence.current[sequence.current.length - 1]
    setEnabledSquares((prev) => {
      prev[nextSquare] = true
      return {...prev}
    })
    setTimeout(() => {
      setEnabledSquares((prev) => {
        prev[nextSquare] = false
        return {...prev}
      })
    }, 500)
  }

  function handleClick(colour: string) {
    if (!gameStarted.current) {
      return
    }

    clickSequence.current.push(colour)
    console.log(sequence.current)
    console.log(clickSequence.current)
    for (let i = 0; i < clickSequence.current.length; i++) {
      if (sequence.current[i] !== clickSequence.current[i]) {
        gameStarted.current = false
        setInstruction("RIP you failed at stage " + sequence.current.length)
        setTimeout(() => {
          setInstruction("Press space again to play again!")
        }, 3000)
        return;
      }
    }

    if (sequence.current.length === clickSequence.current.length) {
      console.log("next step")
      clickSequence.current = []
      addSequenceStep()
      setTimeout(() => {
        showNextStep()
      }, 1000)
    }

    setClickSequenceCount(clickSequence.current.length)
  }

  useEffect(() => {
    document.onkeydown = (key) => {
      if (key.key == " " && !gameStarted.current) {
        console.log("init")
        // initialise game
        gameStarted.current = true
        sequence.current = []
        clickSequence.current = []
        setEnabledSquares({})
        setSequenceCount(0)
        setClickSequenceCount(0)
        setInstruction("Remember what simon says!")
        addSequenceStep()
        showNextStep()
      }
    }
  }, [])

  return (
    <div>
      <div className={styles.topText}>
        <h1>{instruction}</h1>
        <h2>{clickSequenceCount}/{sequenceCount}</h2>
      </div>
      <div className={styles.container}>
        <div className={styles.row}>
          <SimonSquare enabled={enabledSquares.green} clickCallback={handleClick} color="green" />
          <SimonSquare enabled={enabledSquares.red} clickCallback={handleClick} color="red" />
        </div>
        <div className={styles.row}>
          <SimonSquare enabled={enabledSquares.yellow} clickCallback={handleClick} color="yellow" />
          <SimonSquare enabled={enabledSquares.blue} clickCallback={handleClick} color="blue" />
        </div>
      </div>
    </div>
  );
};

export default SimonSays;
