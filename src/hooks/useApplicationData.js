import {
  useState,
  useEffect
} from 'react';
import axios from 'axios';

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = (day) => {
    setState({
      ...state,
      day
    });
  }

  //Function to calculate remaining booking spots when an appointment is booked on cancelled.
  const updateSpots = function (id) {
    if (state.appointments[id].interview === null) {
      for (const spot in state.days) {
        if (state.days[spot].name === state.day) {
          return state.days[spot].spots - 1;
        }
      }
    } else {
      for (const spot in state.days) {
        if (state.days[spot].name === state.day) {
          return state.days[spot].spots + 1;
        }
      }
    }
  }

  //Function to find the index of the selected day, so that the state can be modified.
  const day_id = function () {
    for (const id in state.days) {
      if (state.days[id].name === state.day) {
        return id;
      }
    }
  }

  //Function to book an appointment by calling a 'put' axios request.
  const bookInterview = function (id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: {
        ...interview
      }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, appointment)
      .then(() => {
        const spot = updateSpots(id);
        const day_index = day_id();
        const day_object = {
          ...state.days[day_index],
          spots: spot
        }

        const days = state.days;
        days[day_index] = day_object;

        setState({
          ...state,
          appointments,
          days
        })

      })
  }

  //Function to cancel booking by calling a 'delete' axios request.
  const cancelBooking = function (id) {

    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const spot = updateSpots(id);
    const day_index = day_id();
    const day_object = {
      ...state.days[day_index],
      spots: spot
    }

    const days = state.days
    days[day_index] = day_object;

    return axios.delete(`/api/appointments/${id}`)
      .then(() =>
        setState({
          ...state,
          appointments,
          day_object
        })
      )
  }

  useEffect(() => {

    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState({
        ...state,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      });
    })

  }, []);


  return {
    state,
    setDay,
    bookInterview,
    cancelBooking
  }
}