import React, { useEffect, useState } from "react";
import axios from "axios";

export default function useApplicationData() {
    const [state, setState] = useState({
        day: "Monday",
        days: [],
        appointments: {},
        interviewers: {}
    })
    const setDay = day => setState({ ...state, day });

    function bookInterview(id, interview) {
        const appointment = {
            ...state.appointments[id],
            interview: { ...interview }
        };
        const appointments = {
            ...state.appointments,
            [id]: appointment
        };
        return axios.put(`/api/appointments/${id}`, appointment)
            .then(() => {
                setState((prev) => ({ ...prev, appointments }));
            })
    }

    function deleteInterview(id) {
        const appointment = {
            ...state.appointments[id],
            interview: null
        }
        const appointments = {
            ...state.appointments,
            [id]: appointment
        }
        return axios.delete(`/api/appointments/${id}`, appointment)
            .then(() => {
                setState((prev) => ({ ...prev, appointments }))
            })

    }

    
  useEffect(() => {
    const path1 = "/api/days";
    const path2 = "/api/appointments";
    const path3 = "/api/interviewers";

    Promise.all([
      axios.get(path1),
      axios.get(path2),
      axios.get(path3)
    ]).then((all) => {
      setState(prev => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }))
    })

  }, [])
  return {
    state,
    setDay,
    bookInterview,
    deleteInterview
  }
}