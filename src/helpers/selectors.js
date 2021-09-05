
// export function getAppointmentsForDay(state, day) {
//   const resultArray = []; 
//   for(const item in state.days) {
//    if (state.days[item].name === day) {
//     const result = [(state.days[item].appointments)]
//     return result;
//    }
//  }
// }

//Test Case Scenario 2: (PASSED)

// export function getAppointmentsForDay(state, day) {
//  //console.log(state.days);
//  for(const item in state.days) {
//    if (state.days[item].name === day) {
//      const result = state.days[item].appointments;
//      return result;
//    }
//  }
// }

//Test Case Scenario 3: (PASSED)

// export function getAppointmentsForDay(state, day) {
//  //console.log(state.days);
//  const resultArray = [];
//  for(const item in state.days) {
//    if (state.days[item].name === day) {
//     const result = (state.days[item].appointments);
//     for(const id of result) {
//       if(state.appointments[`${id}`]) {
//         resultArray.push(state.appointments[`${id}`])
//       }
//     }
//     return resultArray;
//    }
//  }
// }

//Test Case Scenario 4: (PASSED)

export function getAppointmentsForDay(state, day) {
 //console.log(state.days);
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


//Test Case Scenario 5: (PASSED)

// export function getAppointmentsForDay(state, day) {
//  //console.log(state.days);
//  for(const item in state.days) {
//    if (state.days[item].name === day) {
//      const result = (state.days[item].appointments).length;
//      return result;
//    }
//  }
//  return [];
// }

//Test Case Scenario 6: (PASSED)

// export function getAppointmentsForDay(state, day) {
//  //console.log(state.days);
//  const resultArray = [];
//  for(const item in state.days) {
//    if (state.days[item].name === day) {
//      const result = (state.days[item].appointments);
//      return result;
//    }
//  }
//  return [];
// }