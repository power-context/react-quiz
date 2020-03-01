import React, { Component } from "react"

import classes from './Auth.module.css'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import is from 'is_js'

export default class Auth extends Component {

  state = {
    formControls: {
      email: {
          value: '',
          type: 'email',
          label: 'Email',
          errorMessage: 'Enter correct email',
          valid: false,
          touched: false,
          validation: {
            required: true,
            email: true
          }
      },
      password: {
        value: '',
        type: 'password',
        label: 'Password',
        errorMessage: 'Enter correct password',
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6
        }
      }
    }
  }

  singInHandler = () => {

  }

  singUpHandler = () => {

  }
  
  submitHandler = event => {
    event.preventDefault()
  }

  validateControl(value, validation){
    let isValid = true

    if(!validation){
      return true
    }

    if(validation.required){
      isValid = value.trim() !== '' && isValid
    }

    if(validation.email){
      isValid = is.email(value) && isValid
    }

    if(validation.minLength){
      isValid = value.length >= validation.minLength && isValid
    }

    return isValid
  }

  changeHandler(event, controlName){

    const formControls = { ...this.state.formControls }
    const control = { ...formControls[controlName] }

    control.value = event.target.value
    control.touched = true
    control.valid = this.validateControl(control.value, control.validation)
    formControls[controlName] = control

    this.setState({
      formControls
    })
  }

  renderInputs(){
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName]
      return(
        <Input 
          key={controlName + index}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          errorMessage={control.errorMessage}
          shouldValidate={!!control.validation}
          onChange = {event => this.changeHandler(event, controlName)}
        />
      )
    })
  }

  render() {
    return (
      <div className={classes.Auth}>
        <div>
          <h1>Authorization</h1>
          <form onSubmit={this.submitHandler} className={classes.AuthForm}>
            { this.renderInputs() }
            <div>
              <Button
                type="success"
                onClick={this.singInHandler}
              >
                Sing in
              </Button>
              <Button
                type="primary"
                onClick={this.singUpHandler}
              >
                Sing up
              </Button>
            </div>
            
          </form>
        </div>
        
      </div>
    );
  }
}
