import React, { useContext, useState } from 'react';
import { QuizContext } from './Context';

export const Question = ({ question }) => {
  const correctAnswer = [question.correct_answer]
  const answers = correctAnswer.concat(question.incorrect_answers);
  const dispatch = useContext(QuizContext);
  
  console.log(question);
  
  const handleClick = () => {
    dispatch({
      type: 'next'
    })
  }

  const [userChoice, setUserChoice] = useState('');

  const checkboxChange = (answer) => {
    setUserChoice(answer) 
  }

  return(
    <div>
      {question && question.question}
      <button onClick={handleClick}>Next</button>
      <ul>
        {answers.map(answer => 
          <li>
            <input type="radio" name="answer" onChange={e => checkboxChange(answer)}/>
            {answer}
          </li>
        )}
      </ul>
    </div>
  )
}