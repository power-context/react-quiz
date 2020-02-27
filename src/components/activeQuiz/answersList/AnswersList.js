import React from 'react'
import classes from './AnswersList.module.css'
import Answer from './Answer/Answer'

const AnswersList = props => (
    <ul className={classes.AnswersList}>
        {props.answers.map((answer, idx) => {
            return (
                <Answer 
                    key={idx}
                    answer={answer}
                    onAnswerClick={props.onAnswerClick}
                    answerState={props.answerState ? props.answerState[answer.id] : null}
                />
            ) 
        })}
    </ul>
)

export default AnswersList