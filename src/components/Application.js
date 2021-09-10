import React from "react";
import DayList from "./DayList";
import "components/Application.scss";
import Appointment from "../components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from '../helpers/selectors';
import useApplicationData from "hooks/useApplicationData";


export default function Application(props) {
  
  const {
    state,
    setDay,
    bookInterview,
    cancelBooking
  } = useApplicationData();

  //Finding a list of appointments already booked on the selected day.
  const dailyAppointments = getAppointmentsForDay(state, state.day);
 
  //Finding a list of interviewers available on the selected day.
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
