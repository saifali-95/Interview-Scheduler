import React from "react";
import classNames from 'classnames/bind';
import "./styles.scss";

export default function Appointment(props) {  
  return (
    <main className="appointment__card appointment__card--status">
      <img
        className="appointment__status-image"
        src="images/status.png"
        alt="Loading"
      />
      <h1 className="text--semi-bold">{props.message}</h1>
    </main>
  );
}