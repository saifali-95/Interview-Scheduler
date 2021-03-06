import React from "react";
import classNames from 'classnames/bind';
import "./styles.scss";
import Button from "../Button";
import "../Button.scss";

export default function Confirm(props) {  
   return (
    <main className="appointment__card appointment__card--confirm">
     <h1 className="text--semi-bold">{props.message}</h1>
      <section className="appointment__actions">
        <Button danger onClick = {props.onCancel}>Cancel</Button>
        <Button danger onClick = {()=> props.onConfirm(props.interview.id)} >Confirm</Button>
      </section>
    </main>
   );
 }