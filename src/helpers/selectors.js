export function getAppointmentsForDay(state, day) {
    let result=[];
    for (const date of state.days) {
        console.log(date)
        if (date.name===day) {
            for(let i of date.appointments){
                result.push(state.appointments[i])
            }
            
        }
    }
    return result;
}