
export default function getAppointmentsForDay(state, day) {
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

