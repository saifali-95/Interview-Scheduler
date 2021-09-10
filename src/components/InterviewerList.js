import React from "react";
import "components/InterviewerList.scss";
import  InterviewerListItem  from "./InterviewerListItem";
import PropTypes from 'prop-types';



function InterviewerList(props) {

  const { interviewers } = props
  const interviewers__list =  interviewers.map((interviewer) => {
   return (
      <InterviewerListItem 
        key={interviewer.id} 
        name= {interviewer.name} 
        avatar = {interviewer.avatar} 
        selected={interviewer.id === props.interviewer} 
        setInterviewer={(event) => props.onChange(interviewer.id)}
      />
    )
  })
  
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list"> {interviewers__list}  </ul>
    </section>
  );
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

export default InterviewerList;

