import React from 'react'
import classes from './Answer.module.css'

const Answer = props => {
    const cls = [classes.Answer]
    if(props.answerState){
        cls.push(classes[props.answerState])
    }
    return (
        <li 
            className={cls.join(' ')}
            onClick={() => props.onAnswerClick(props.answer.id)}
        >
            { props.answer.text }
        </li>
    )
}

export default Answer