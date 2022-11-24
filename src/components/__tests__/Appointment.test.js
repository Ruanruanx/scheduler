/*
  We are rendering `<Application />` down below, so we need React.createElement
*/
import React from "react";

/*
  We import our helper functions from the react-testing-library
  The render function allows us to render Components
*/
import { render } from "@testing-library/react";

/*
  We import the component that we are testing
*/
import Appointment from "components/Appointment";

/*
  A test that renders a React Component
*/

let data = {
    day : "Monday",
    appointments: {1:{id: 1, time: "12pm", interview: null}},
    days: [{id: 1, name: "Monday", appointments: Array(5), interviewers: Array(5), spots: 2}],
    interviewers: {1: {id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png"}}
  
  }
    
  describe("Appointment", () => {
    it("renders without crashing", () => {
      render(<Appointment  data/>);
    });
  });
