import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function Question({ question, onAnswerSelect }) {

  const answers = question.answers;
  const fourOptions = [];

  for (const key in answers) {
    if (answers[key] === null) {
      break;
    }

    const option = (
      <label key={key}>
        <input
          type="radio"
          name={`answer-${question.id}`}
          value={key}
          onChange={(e) => onAnswerSelect(e.target.value)}
        />
        {answers[key]}
      </label>
    );
    fourOptions.push(option);
  }
  return (
    <>
      <h3>{question.question}</h3>
      <div>{fourOptions.map((option) => <div key={option.key}>{option}</div>)}</div>
    </>
  );
}

function App() {
  const [questionBank, setQuestionBank] = useState([]);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});

  useEffect(() => {

    const apiKey = import.meta.env.VITE_API_KEY;

    axios
      .get('https://quizapi.io/api/v1/questions', {
        params: {
          apiKey: apiKey,
          limit: 10,
          category: 'Linux',
          difficulty: 'easy',
        },
      })
      .then((res) => {

        setQuestionBank(res.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleAnswerSelect = (questionId, selectedAnswer) => {
    setUserAnswers({ ...userAnswers, [questionId]: selectedAnswer });
  };

  const handleSubmit = () => {

    let totalScore = 0;

    questionBank.forEach((question) => {
      if (userAnswers[question.id] === question.correct_answer) {
        totalScore++;
      }
    });

    setScore(totalScore);
    alert(`Your score is ${totalScore}/${questionBank.length}. Refresh the page for more Linux quizzes.`);
  };

  return (
    <>
      <h1>Linux Quiz</h1>
      <ol>

        {questionBank.map((question) => (
          <li key={question.id}>
            <Question
              question={question}
              onAnswerSelect={(selectedAnswer) =>
                handleAnswerSelect(question.id, selectedAnswer)
              }
            />
          </li>
        ))}

      </ol>

      <button onClick={handleSubmit}>Submit</button>
    </>
  );
}

export default App;