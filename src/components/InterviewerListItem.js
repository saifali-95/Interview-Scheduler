import React from "react";
import classNames from 'classnames/bind';
import "components/InterviewerListItem.scss";



export default function InterviewerListItem(props) {

  const interviewer = classNames("interviewers__item", {
    "interviewers__item--selected interviewers__item-image": props.image && props.selected,
    "interviewers__item-image": props.image,
    "interviewers__item--selected interviewers__item--selected:hover ": props.selected,
  });

  return (
    
    <li className={interviewer} onClick = {props.setInterviewer}>
    <img
    className={interviewer}
    src={props.avatar}
    alt={props.name}
    />
    {props.selected && props.name}
    </li>
  );

}




