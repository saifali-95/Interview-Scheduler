import React from "react";
import classNames from 'classnames/bind';
import DayListItem from "./DayListItem";


export default function DayList(props) {
  
  const { days , setDay} = props
  const day =  days.map((day) => {return <DayListItem key={day.id} name= {day.name} spots = {day.spots} selected={day.name === props.day}
  setDay={setDay}/>})

  return (
    <li> <ul> {day} </ul> </li>
  );
}