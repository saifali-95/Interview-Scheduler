import React from "react";
import classNames from 'classnames/bind';
import "components/InterviewerList.scss";
import  InterviewerListItem  from "./InterviewerListItem";



export default function InterviewerList(props) {

  const { interviewers, setInterviewer } = props
  const person =  interviewers.map((person) => {
    return (
      <InterviewerListItem 
        key={person.id} 
        name= {person.name} 
        avatar = {person.avatar} 
        selected={person.id === props.interviewer} 
        setInterviewer={setInterviewer}
      />
    )
  })
  

  return (
    
  <section className="interviewers">
  <h4 className="interviewers__header text--light">Interviewer</h4>
  <ul className="interviewers__list"></ul>
  <li> <ul> {person} </ul> </li>
  </section>
  
  );

}