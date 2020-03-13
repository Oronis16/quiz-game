import React, { useEffect, useReducer } from "react";
import "./App.css";
import { QuizContext } from "./Context";
import { Question } from './Question';

const initialState = {
  questions: [],
  counter: 0
};

function reducer(state, action) {
  switch (action.type) {
    case "loadQuestions":
      return { ...state, questions: action.payload };
    case 'next':
      return { ...state, counter: state.counter + 1}; //maximum a tömb végéig kell menjen
    default:
      throw new Error();
  }
}

function Quiz() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=10")
      .then(resp => {
        return resp.json();
      })
      .then(api => {
        dispatch({
          type: "loadQuestions",
          payload: api.results
        });
        console.log(api.results);
        
      });
  }, []);

  return (
    <QuizContext.Provider value={dispatch}>
      <div className="Quiz">
        {state.questions && state.questions.length > 0 && <Question question={state.questions[state.counter]}/>}
      </div>
    </QuizContext.Provider>
  );
}

export default Quiz;
