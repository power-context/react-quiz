import React, { Component } from "react";
import classes from './QuizCreator.module.css'
import Button from "../../components/UI/Button/Button"
import {createControl, validate, validateForm} from '../../forms/FormFramework'
import Input from '../../components/UI/Input/Input'
import Select from '../../components/UI/Select/Select'

function createOptionControl(num){
  return createControl({
    id: num,
    label: `Enter answer ${num}`,
    errorMessage: 'The question can\'t be empty'
  }, {required: true})
}

function createFormControls(){
  return {
      question: createControl({
        label: 'Enter question\'s text',
        errorMessage: 'The question can\'t be empty'
      }, {
        required: true
      }),
      answer1: createOptionControl(1),
      answer2: createOptionControl(2),
      answer3: createOptionControl(3),
      answer4: createOptionControl(4)
  }
}

export default class QuizCreator extends Component {
  state = {
    rightAnswerId: 1,
    quiz: [],
    isFormValid: false,
    formControls: createFormControls()
  }

  onFormSubmit = event => {
    event.preventDefault()
  }

  addButtonHandler = event =>{
    event.preventDefault()
    const quiz = this.state.quiz.concat()
    const index = quiz.length + 1

    const {question, option1, option2, option3, option4} = this.state.formControls

    const questionItem = {
      question: question.value,
      id: index,
      rightAnswerId: this.state.rightAnswerId,
      answers: [
        {text: option1.value, id: option1.id},
        {text: option2.value, id: option2.id},
        {text: option3.value, id: option3.id},
        {text: option4.value, id: option4.id}
      ]
    }
    quiz.push(questionItem)

    this.setState({
      quiz,
      rightAnswerId: 1,
      isFormValid: false,
      formControls: createFormControls()
    })
  }

  finishButtonHandler = () => {

  }

  changeHandler(value, name){
    const formControls = { ...this.state.formControls }
    const control = { ...formControls[name] }

    control.touched = true
    control.value = value
    control.valid = validate(control.value, control.validation)

    formControls[name] = control
    this.setState({
      formControls,
      isFormValid: validateForm(formControls)
    })
  }

  renderControls(){
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName]
      return(
        <React.Fragment key={controlName + index}>
          <Input 
            value={control.value}
            valid={control.valid}
            touched={control.touched}
            label={control.label}
            errorMessage={control.errorMessage}
            shouldValidate={!!control.validation}
            onChange = {event => this.changeHandler(event.target.value, controlName)}
          />
          { index === 0 ? <hr /> : null }
        </React.Fragment>
      )
    })
  }

  selectChangeHandler = event =>{
    this.setState({
      rightAnswerId: +event.target.value
    })
  }

  render() {
    const select = <Select 
      label='Change right answer'
      value={this.state.rightAnswerId}
      onChange={this.selectChangeHandler}
      options={[
        {text: 'Text 1', value: 1},
        {text: 'Text 2', value: 2},
        {text: 'Text 3', value: 3},
        {text: 'Text 4', value: 4}
      ]}
    />
    return (
      <div className={classes.QuizCreator}>
        <div>
          <h1>QuizCreator</h1>
          <form onSubmit={this.onFormSubmit}>

            { this.renderControls() }

            { select }
            <Button
              type='primary'
              onClick={this.addButtonHandler}
              disabled={!this.state.isFormValid}
            >
              Add question
            </Button>
            <Button
              type='success'
              onClick={this.finishButtonHandler}
              disabled={this.state.quiz.length === 0}
            >
              Finish test
            </Button>
          </form>
        </div>
      </div>
    )
  }
}


