import React, { useEffect, useReducer } from "react";
import "./App.css";
import { QuizContext } from "./Context";

const initialState = {
  questions: []
};

function reducer(state, action) {
  switch (action.type) {
    case "loadQuestions":
      return { ...state, questions: action.payload };
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
      });
  }, []);

  return (
    <QuizContext.Provider value={dispatch}>
      <div className="Quiz">
        <ul>
          {state.questions.map((question) => 
            <li key={question.question}>{question.question}</li>
          )}
        </ul>
      </div>
    </QuizContext.Provider>
  );
}

export default Quiz;
