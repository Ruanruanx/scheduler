
import React, {useEffect, useState} from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterview } from "helpers/selectors";

export default function Application(props) {
  const [state, setState] =useState({
    day:"Monday",
    days:[],
    appointments:{},
    interviewers:{}
  })
  const dailyAppointments = getAppointmentsForDay(state,state.day);
  const setDay = day => setState({ ...state, day});
  // const setDays = days => setState(prev => ({ ...prev, days }));

const appointmentList = dailyAppointments.map((appointment) => {
  const interview = getInterview(state,appointment.interview);
  return (
    <Appointment
      key={appointment.id}
      {...appointment}
      interview={interview}
    />
  )
})

  useEffect(()=>{
    const path1="/api/days";
    const path2="/api/appointments";
    const path3="/api/interviewers";

    Promise.all([
      axios.get(path1),
      axios.get(path2),
      axios.get(path3)
    ]).then((all)=>{
      console.log(all[0])
      console.log(all[1])
      console.log(all[2])
      setState(prev=>({...prev,
        days:all[0].data,
        appointments:all[1].data,
        interviewers: all[2].data  
      }))
    })
    // axios.get(path).then(response=>{
    //   // setDays(response.data)
    // })
  },[])

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentList}
        <Appointment key="last" time="5pm"/>
      </section>
    </main>
  );
}
