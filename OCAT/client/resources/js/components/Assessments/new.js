import React ,{useState}from "react";
import { AssessmentService } from '../shared/services/assessment.service';
import { useForm } from "react-hook-form";
import { Button, Toast } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

export function AssessmentNew() {

  const divStyle = {
    color: 'red'
  };
  const labelStyle = {
    fontFamily: 'lato black',

    fontWeight: 'bold',
  }
  const fontStyle = {
    fontSize: 15,
    display: 'inline',
    color:'crimson'
  }
  const SubmitStyle = {
    color: 'darkgreen',
    backgroundColor: 'darkturquoise',
    borderRadius: 4,
    fontWeight: 600
  }
  const [show, setShow] = useState(false);

  const { register, handleSubmit, errors } = useForm();
  const onSubmit = async (assessment) => {
    await AssessmentService.submit(assessment);
  };

  //Creating assessment form
  return (
    
    <div className="container">
      <div className="row justify-content-md-left">
        <div className="col-12 col-md-10">
        {/* <div
  aria-live="polite"
  aria-atomic="true"
  style={{
    position: 'relative',
    minHeight: '100px',
  }}
> */}
  <Toast
    style={{
      position: 'absolute',
      top: 0,
      right: 0,
      width:200
      
    }}
    onClose={() => setShow(false)} show={show} delay={3000} autohide
   
  >
    <Toast.Header>
    <strong className="mr-auto">Cat form</strong>
    <small>Just Now</small>
  </Toast.Header>
  
  <Toast.Body>Successfully submitted</Toast.Body>
  </Toast>
 
          <form onSubmit={handleSubmit(onSubmit)}>

            <div className="form-row align-items-left mb-3">
              <div className="col-auto">
                <label style={labelStyle} >Instrument</label><br />
                <input type="text" readOnly id="staticInstrument" value="Cats behavioral System" ref={register} name="title" />
              </div>
            </div>

            <div className="form-row align-items-left mb-3">
              <div className="col-auto">
                <label style={labelStyle}>Name of cat</label><span style={divStyle}>*</span>{errors.name && <h6 style={fontStyle}>(Required)</h6>}<br />
                <input placeholder="Name" name="name" ref={register({ required: true })} />
              </div>
            </div>

            <div className="form-row align-items-left mb-3">
              <div className="col-auto">
                <label style={labelStyle}> Date of Birth </label><span style={divStyle}>*</span>{errors.name && <h6 style={fontStyle}>(Required)</h6>}<br />
                <input type="date" name="date" format="mm-dd-yyyy" ref={register({ required: true })}></input>
              </div>
            </div>

            <div className="form-row align-items-left mb-3">
              <div className="col-auto">
                <label style={labelStyle}>Previous contact with the Cat Judicial System?</label><span style={divStyle}>*</span>
                {errors.name && <h6 style={fontStyle}>(Required)</h6>}<br />
                <label >
                  <input type="radio" value="0" ref={register({ required: true })} name="question1" />
            No
          </label><br />
                <label >
                  <input type="radio" value="1" ref={register({ required: true })} name="question1" />
            Yes
          </label>
              </div>
            </div>


            <div className="form-row align-items-left mb-3">
              <div className="col-auto">
                <label style={labelStyle}>Physical altercations with other cats? </label><span style={divStyle}>*</span>
                {errors.name && <h6 style={fontStyle}>(Required)</h6>}<br />
                <label >
                  <input type="radio" value="0" ref={register({ required: true })} name="question2" />
            0-3 altercations
          </label><br />
                <label>
                  <input type="radio" value="1" ref={register({ required: true })} name="question2" />
            3+ altercations
          </label><br />
              </div>
            </div>
            
            <div className="form-row align-items-left mb-3">
              <div className="col-auto">
                <label style={labelStyle}>Physical altercations with owner (scratching, biting, etc...)?</label><span style={divStyle}>*</span>
                {errors.name && <h6 style={fontStyle}>(Required)</h6>}<br />
                <label>
                  <input type="radio" value="0" ref={register({ required: true })} name="question3" />
            0-10 altercations
          </label><br />
                <label>
                  <input type="radio" value="1" ref={register({ required: true })} name="question3" />
            10+ altercations
          </label><br />
              </div>
            </div>
            
            <div className="form-row align-items-left mb-3">
              <div className="col-auto">
                <label style={labelStyle}>Plays well with dogs?</label><span style={divStyle}>*</span>
                {errors.name && <h6 style={fontStyle}>(Required)</h6>}<br />
                <label>
                  <input type="radio" value="0" ref={register({ required: true })} name="question4" />
           No
          </label><br />
                <label>
                  <input type="radio" value="1" ref={register({ required: true })} name="question4" />
           Yes
          </label><br />
              </div>
            </div>
            
            <div className="form-row align-items-left mb-3">
              <div className="col-auto">
                <label style={labelStyle}>Hisses at strangers?</label><span style={divStyle}>*</span>
                {errors.name && <h6 style={fontStyle}>(Required)</h6>}<br />
                <label>
                  <input type="radio" value="0" ref={register({ required: true })} name="question5" />
           No
          </label><br />
                <label>
                  <input type="radio" value="1" ref={register({ required: true })} name="question5" />
           Yes
          </label><br />
              </div>
            </div>
  
            <input style={SubmitStyle} onClick={() => setShow(true)} type="submit" />
     
          </form>
        </div>
      </div>
    </div>
  );
}
