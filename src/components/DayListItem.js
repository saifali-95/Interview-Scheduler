import React from "react";
import classNames from 'classnames/bind';
import "components/DayListItem.scss";



export default function DayListItem(props) {
  
  const formatSpots = () => (
  
    props.spots ? `${props.spots} spot${props.spots > 1 ? 's' : ''} remaining` : "no spots remaining"
    
  )

  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });
  
  return (
    <li className= {dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className={dayClass}>{props.name}</h2>
      <h3 className={dayClass}>{formatSpots()}</h3>
    </li>
  );
}


