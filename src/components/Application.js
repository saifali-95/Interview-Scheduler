import React, { useState, useEffect }  from "react";
import DayList from "./DayList";
import "components/Application.scss";
import Appointment from "../components/Appointment";
import axios from 'axios';

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },

  {
    id: 3,
    time: "3pm",
    interview: {
      student: "Saif Ali",
      interviewer: {
        id: 4,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      }
    }
  },

  {
    id: 4,
    time: "4pm",
    interview: {
      student: "LHL student",
      interviewer: {
        id: 2,
        name: "Tori Malcolm",
        avatar: "https://i.imgur.com/Nmx0Qxo.png",
      }
    }
  },

  {
    id : "last",
    time : "5pm",   
  }

];



export default function Application(props) {
  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
  });

  const setDay = (day) => { 
    setState({ ...state, day });
  }
  
  const setDays = (days) => {
    setState(prev => ({ ...prev, days }));
  }

  const appointment_list =  appointments.map((appointment) => {
    return (
      <Appointment key={appointment.id} {...appointment} />
      
    )
  })

  useEffect(() => {
    const url = `http://localhost:8001/api/days`;
    
    axios.get(url)
    .then(res => {
      console.log('res Data',res.data)
      setDays(res.data)
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
