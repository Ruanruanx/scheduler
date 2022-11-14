export function getAppointmentsForDay(state, day) {
    let result = [];
    for (const date of state.days) {
        if (date.name === day) {
            for (let i of date.appointments) {
                result.push(state.appointments[i])
            }

        }
    }
    return result;
}

export function getInterview(state, interview) {
    if (!interview) {
        return null;
    }
    return {
        student: interview.student,
        interviewer: state.interviewers[interview.interviewer]
    }
}

export function getInterviewersForDay(state,day) {
    const filteredDays = state.days.filter(currentDay => {
        return currentDay.name===day
    })

    if(filteredDays.length===0){
        return [];
    }

    const result = filteredDays[0].interviewers.map((interviewer)=>{
        return state.interviewers[interviewer]
    })

    return result;
}