import React, {RefObject, useEffect, useRef} from 'react';
import styles from './SimonSquare.module.scss'

interface SimonSquareProps {
  color: string
  clickCallback: (colour: string) => void
  enabled: boolean
}

const SimonSquare = (props: SimonSquareProps) => {
  const squareRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    squareRef.current!.onmousedown = () => {
      props.clickCallback(props.color)
      squareRef.current!.classList.add(styles.squareClicked)
    }
    squareRef.current!.onmouseup = () => {
      squareRef.current!.classList.remove(styles.squareClicked)
    }
  }, [])

  let className = styles.square
  if (props.enabled) {
    className = className.concat(" ", styles.squareClicked, " ", styles.squareScale)
  }

  return (
    <div ref={squareRef} className={className} style={{backgroundColor: props.color}}></div>
  );
};

export default SimonSquare;
