import React from "react";
import "./styles.scss";
import  Header  from "./Header";
import  Show  from "./Show";
import  Empty  from "./Empty";
import  Status  from "./Status";
import  Confirm  from "./Confirm";
import  Error  from "./Error";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";

export default function Appointment(props) {  
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = 'CONFIRM';
  const EDIT = 'EDIT';
  const ERROR_SAVE = 'ERROR_SAVE';
  const ERROR_DELETE = 'ERROR_DELETE';

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
      .catch((error)=> transition(ERROR_SAVE, true))
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
      .catch((error)=> transition(ERROR_DELETE, true))
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

      {mode === ERROR_SAVE && (
         <Error
         message={'Error in Saving'}
         onClose={() => back(EMPTY)}
        />
      )}

      {mode === ERROR_DELETE && (
         <Error
         message={'Error in Deleting'}
         onClose={() => back(SHOW)}
        />
      )}    
    </article> 
   );
}