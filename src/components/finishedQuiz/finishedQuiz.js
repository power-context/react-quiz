import React from 'react'
import {Link} from 'react-router-dom'
import classes from './finishedQuiz.module.css'
import Button from '../../components/UI/Button/Button'

const FinishedQuiz = props => {
    console.log(Object.keys(props.results))
    const successCount = Object.keys(props.results).reduce((total, key)=>{
        if(props.results[key] === 'success'){
            total++
        }
        return total
    },0)

    return(
        <div className={classes.FinishedQuiz}>
            <h2>Your result</h2>
            <ul>
                {props.quiz.map((quizItem, index) => {
                    const cls = ['fa']

                    if(props.results[quizItem.id] === 'error'){
                        cls.push('fa-times')
                        cls.push(classes['error'])
                    } else {
                        cls.push('fa-check')
                        cls.push(classes['success'])
                    }

                    return(
                        <li key={index}>
                            <strong>{index + 1}. &nbsp; </strong>
                            {quizItem.question}
                            <i className={cls.join(' ')}></i>
                        </li>
                    )
                })}
                <p> Right {successCount} of {props.quiz.length} </p>
            </ul>
            <div>
                <Button onClick={props.onRetry} type='primary'>
                    Repeat
                </Button>
                <Link to='/'>
                    <Button type='success'>Go to test's list</Button>
                </Link>
                
            </div>
        </div>
    )
}

export default FinishedQuiz