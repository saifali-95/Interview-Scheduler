import React from "react";
import "./styles.scss";
import  Header  from "./Header";
import  Show  from "./Show";
import  Empty  from "./Empty";
import  Status  from "./Status";
import  Confirm  from "./Confirm";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";

export default function Appointment(props) {  
  //const { interview } = props;
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = 'CONFIRM';
  const EDIT = 'EDIT';

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  
  const save = function (name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };  
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(()=> transition(SHOW))
      .catch((error)=> console.log(error))
  }

  const onDelete = function (id) {  
    transition(CONFIRM);
  }

  const onCancel = function () {
    transition(SHOW)
  }

  const onConfirm = function (id) {
    transition(DELETING);
    props.cancelBooking(id)
      .then(()=> {
        transition(EMPTY) 
      })
      .catch((error)=> console.log(error))
  }

  const onEdit  = function() {
    transition(EDIT)
  } 


  return (
    <article className="appointment">
      <Header time = {props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
         <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          interview = {props}
          onDelete = {onDelete}
          onEdit = {onEdit}
        />
      )}

      {mode === CREATE && (
         <Form   
        interviewers={props.interviewers}
        onCancel={() => back(EMPTY)}
        onSave={save}
        
        />
      )}

      {mode === SAVING && (
         <Status
         message = {SAVING}   
        />
      )}

      {mode === CONFIRM && (
         <Confirm
         onCancel = {onCancel}  
         onConfirm = {onConfirm}  
         interview = {props}
        />
      )}

      {mode === DELETING && (
         <Status
         message = {DELETING}   
        />
      )}

      {mode === EDIT && (
         <Form
         name={props.interview.student}
         interviewer = {props.interview.interviewer.id}
         interviewers={props.interviewers}
         onCancel={() => back(SHOW)}
         onSave={save}
        />
      )}



     
    </article> 
   );
}