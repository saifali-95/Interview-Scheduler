import React, { useState, useEffect }  from "react";
import DayList from "./DayList";
import "components/Application.scss";
import Appointment from "../components/Appointment";
import axios from 'axios';
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from '../helpers/selectors';
import useApplicationData from "hooks/useApplicationData";


export default function Application(props) {
  
  const {
    state,
    setDay,
    bookInterview,
    cancelBooking
  } = useApplicationData();

  const dailyAppointments = getAppointmentsForDay(state, state.day);
 
  const interviewers =  getInterviewersForDay(state, state.day);
  
  const appointments =  dailyAppointments.map((appointment) => {
      
    return (
      <Appointment
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={getInterview(state, appointment.interview)}
      interviewers = {interviewers}
      bookInterview = {bookInterview}
      cancelBooking = {cancelBooking}
      />   
    )
  })

  return (
    <main className="layout">
      <section className="sidebar">
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointments}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
