
export function getAppointmentsForDay(state, day) {
 const resultArray = [];
 for(const item in state.days) {
   if (state.days[item].name === day) {
    const result = (state.days[item].appointments);
    for(const id of result) {
      if(state.appointments[`${id}`]) {
        resultArray.push(state.appointments[`${id}`])
      }
    }
    return resultArray;
   }
 }
 return resultArray;
}

export function getInterview(state, interview) {
  
  if (interview === null) {
    return null;
  }

  
  for (const item in state.appointments) {

    if (state.appointments[item].interview) {
      if (state.appointments[item].interview.student === interview.student && state.appointments[item].interview.interviewer === interview.interviewer){
        for(const id in state.interviewers) {
          if (state.interviewers[id].id === interview.interviewer) {
            return ({student: interview.student, interviewer: state.interviewers[id]})
          }
        }
      }  
    } 
  } 
}

