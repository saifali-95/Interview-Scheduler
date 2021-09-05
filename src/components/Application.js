import React, { useState, useEffect }  from "react";
import DayList from "./DayList";
import "components/Application.scss";
import Appointment from "../components/Appointment";
import axios from 'axios';
import { getAppointmentsForDay, getInterview } from '../helpers/selectors'


export default function Application(props) {
  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers : {}
  });

  const setDay = (day) => { 
    setState({ ...state, day });
  }
  
  const dailyAppointments = getAppointmentsForDay(state, state.day)

  const appointment_list =  dailyAppointments.map((appointment) => {
    
    const interview = getInterview(state, appointment.interview);
    
    return (
      <Appointment
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={interview}
      />   
    )
  })


  useEffect(() => {
    
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ]).then((all) => { 
      console.log('all', all[2].data);
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    })

  }, []);

  
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
        {appointment_list}
      </section>
    </main>
  );
}
