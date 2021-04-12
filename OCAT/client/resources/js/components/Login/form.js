import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { LoginService } from '../shared/services/login.service';

export function LoginForm() {

  const [signInDisplayed, setSignInDisplayed] = useState(true);
  const createLoginObject = (data) => {
    const login = {
      username: data.username,
      password: data.password,

    }
    return login;
  }

  const [pwd, setPwd] = useState('');

  const [isRevealPwd, setIsRevealPwd] = useState(false);

  const createSignUpObject = (userType) => {
    const username = document.querySelector(".username");
    const password = document.querySelector(".password");
    const first_name = document.querySelector(".first_name");
    const last_name = document.querySelector(".last_name");

    const signUp = {
      first_name: first_name.value,
      last_name: last_name.value,
      username: username.value,
      password: password.value,
      isSupervisor: userType == 'supervisor' ? true : false,
    }

    return signUp;
  }

  const changeFormDisplayed = () => {
    setSignInDisplayed(!signInDisplayed);
  }

  const submitSignUpForm = async (userType) => {
    const signUp = createSignUpObject(userType);
    await LoginService.signUp(signUp);
  }

  const { register, handleSubmit, errors } = useForm({ shouldFocusError: true });

  const onSubmit = async (data, event) => {
    const login = createLoginObject(data);
    await LoginService.login(login);
  };

  const signInForm = <div className="container">
    <div className="row justify-content-md-center">
      <div className="col-12 col-md-8">

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-row mb-1">
            <div className="col-auto">
              <h5>Username</h5>
              <input className="form-control form-control-sm" type="text" name="username" 
              autoFocus ref={register({ required: true, maxLength: 50 })} />
            </div>
          </div>
          <div className="form-row mb-4">
            <div className="col-auto">
              {errors.username && <p>Required</p>}
            </div>
          </div>

          <div className="form-row mb-1">
            <div className="col-auto">
              <h5 style={{ display: 'inline-block', paddingRight: '10px' }}>Password</h5>
              <button title={isRevealPwd ? "Hide password" : "Show password"}
                onClick={(e) => { e.preventDefault(); setIsRevealPwd(prevState => !prevState) }} 
                style={{ display: 'contents', fontSize: '15px' }}>(Show / Hide)</button>
              <input className="form-control form-control-sm" type={isRevealPwd ? "text" : "password"}
                value={pwd}
                onChange={e => setPwd(e.target.value)} name="password" ref={register({ required: true })}
              /></div>
          </div>
          <div className="form-row mb-4">
            <div className="col-auto">
              {errors.password && <p>Required</p>}
            </div>
          </div>

          <div className="form-row">
            <div className="col-auto">
              <input className="btn btn-primary" type="submit" value="Sign In" />
            </div>
          </div>
        </form>
        <button onClick={changeFormDisplayed} 
        style={{  color: 'indigo', backgroundColor: 'white', borderWidth: '0px' }}>Register</button>

      </div>
    </div>
  </div>

  const signUpForm = <div className="container">
    <div className="row justify-content-md-center">
      <div className="col-12 col-md-8">

        <form className="sign-up-form">
          <div className="form-row mb-1">
            <div className="col-auto">
              <h5>First Name</h5>
              <input className="form-control form-control-sm first_name" 
              type="text" name="first_name" ref={register({ required: true })} />
            </div>
          </div>
          <div className="form-row mb-4">
            <div className="col-auto">
              {errors.username && <p>Required</p>}
            </div>
          </div>

          <div className="form-row mb-1">
            <div className="col-auto">
              <h5>Last Name</h5>
              <input className="form-control form-control-sm last_name" type="text" name="last_name" ref={register({ required: true })} />
            </div>
          </div>
          <div className="form-row mb-4">
            <div className="col-auto">
              {errors.username && <p>Required</p>}
            </div>
          </div>

          <div className="form-row mb-1">
            <div className="col-auto">
              <h5>Username</h5>
              <input className="form-control form-control-sm username" type="text" name="username"
               autoFocus ref={register({ required: true, maxLength: 50 })} />
            </div>
          </div>
          <div className="form-row mb-4">
            <div className="col-auto">
              {errors.username && <p>Required</p>}
            </div>
          </div>

          <div className="form-row mb-1">
            <div className="col-auto">
              <h5 style={{ display: 'inline-block', paddingRight: '10px' }}>Password</h5>
              <button title={isRevealPwd ? "Hide password" : "Show password"}
                onClick={(e) => { e.preventDefault(); setIsRevealPwd(prevState => !prevState) }} 
                style={{ display: 'contents', fontSize: '15px' }}>(Show / Hide)</button>
              <input className="form-control form-control-sm password"
                type={isRevealPwd ? "text" : "password"}
                value={pwd}
                onChange={e => setPwd(e.target.value)} name="password" ref={register({ required: true })} />
            </div>
          </div>
          <div className="form-row mb-4">
            <div className="col-auto">
              {errors.password && <p>Required</p>}
            </div>
          </div>

          <div className="form-row">
            <div className="col-auto">
              <div onClick={submitSignUpForm.bind(this, "user")} className="btn btn-primary">Register as User</div>
              <div onClick={submitSignUpForm.bind(this, "supervisor")} className="btn btn-secondary" 
              style={{ marginLeft: '3rem' }}>Register as Supervisor</div>
            </div>
          </div>
        </form>
        <button onClick={changeFormDisplayed} 
        style={{  color: 'indigo', backgroundColor: 'white', borderWidth: '0px' }}>Log in</button>

      </div>
    </div>

  </div>

  return (
    <>
      {signInDisplayed ?
        signInForm
        : signUpForm}
    </>
  );
}
