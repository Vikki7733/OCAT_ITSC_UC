import React from "react";
import { AssessmentService } from '../shared/services/assessment.service';
import { useForm } from "react-hook-form";

export function AssessmentNew() {

  const divStyle = {
    color: 'red'
  };

  const fontStyle = {
    fontSize: 12,
    display: "inline"
  }

  const { register, handleSubmit, errors } = useForm();
  const onSubmit = async (assessment) => {
    await AssessmentService.submit(assessment);
  };

  //Creating assessment form
  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      <label><input type="text" defaultValue="Cats behavioral System" ref={register} name="title" /> </label><br />

      <label>Enter name of cat</label><span style={divStyle}>*</span>{errors.name && <h6 style={fontStyle}>(Required)</h6>}<br />
      <input placeholder="Name" name="name" ref={register({ required: true })} /><br />

      <label> Date of Birth of cat</label><span style={divStyle}>*</span>{errors.name && <h6 style={fontStyle}>(Required)</h6>}<br></br>
      <input type="date" name="date" format="mm-dd-yyyy" ref={register({ required: true })}></input><br />

      <label>Previous contact with the Cat Judicial System?</label><span style={divStyle}>*</span>
      {errors.name && <h6 style={fontStyle}>(Required)</h6>}<br />
      <label>
        <input type="radio" value="0" ref={register({ required: true })} name="question1" />
            No
          </label><br />
      <label>
        <input type="radio" value="1" ref={register({ required: true })} name="question1" />
            Yes
          </label><br />
      <label>Physical altercations with other cats? </label><span style={divStyle}>*</span>
      {errors.name && <h6 style={fontStyle}>(Required)</h6>}<br />
      <label>
        <input type="radio" value="0" ref={register({ required: true })} name="question2" />
            0-3 altercations
          </label><br />
      <label>
        <input type="radio" value="1" ref={register({ required: true })} name="question2" />
            3+ altercations
          </label><br />
      <label>Physical altercations with owner (scratching, biting, etc...)?</label><span style={divStyle}>*</span>
      {errors.name && <h6 style={fontStyle}>(Required)</h6>}<br />
      <label>
        <input type="radio" value="0" ref={register({ required: true })} name="question3" />
            0-10 altercations
          </label><br />
      <label>
        <input type="radio" value="1" ref={register({ required: true })} name="question3" />
            10+ altercations
          </label><br />
      <label>Plays well with dogs?</label><span style={divStyle}>*</span>{errors.name && <h6 style={fontStyle}>(Required)</h6>}<br />
      <label>
        <input type="radio" value="0" ref={register({ required: true })} name="question4" />
           No
          </label><br />
      <label>
        <input type="radio" value="1" ref={register({ required: true })} name="question4" />
           Yes
          </label><br />
      <label>Hisses at strangers?</label><span style={divStyle}>*</span>{errors.name && <h6 style={fontStyle}>(Required)</h6>}<br />
      <label>
        <input type="radio" value="0" ref={register({ required: true })} name="question5" />
           No
          </label><br />
      <label>
        <input type="radio" value="1" ref={register({ required: true })} name="question5" />
           Yes
          </label><br />
      <input type="submit" />

    </form>
  );
}
