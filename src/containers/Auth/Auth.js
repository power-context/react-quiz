import React, { Component } from "react"

import classes from './Auth.module.css'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import is from 'is_js'
import axios from 'axios'

export default class Auth extends Component {

  state = {
    isFormValid: false,
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

  singInHandler = async () => {
    const authData = {
      email: this.state.formControls.email.value,
      password: this.state.formControls.password.value,
      returnSecureToken: true
    }
    try {
      const responce = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCxKu0C6JpPx8tDFf_YDieuEfMwChf3r80', authData)
      console.log(responce.data)
    } catch(e){
      console.log(e)
    }
  }

  singUpHandler = async () => {
    const authData = {
      email: this.state.formControls.email.value,
      password: this.state.formControls.password.value,
      returnSecureToken: true
    }
    try {
      const responce = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCxKu0C6JpPx8tDFf_YDieuEfMwChf3r80', authData)
      console.log(responce.data)
    } catch(e){
      console.log(e)
    }
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

    let isFormValid = true
    
    Object.keys(formControls).forEach(name => {
      isFormValid = formControls[name].valid && isFormValid
    })

    this.setState({
      formControls,
      isFormValid
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
                disabled={!this.state.isFormValid}
              >
                Sing in
              </Button>
              <Button
                type="primary"
                onClick={this.singUpHandler}
                disabled={!this.state.isFormValid}

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
