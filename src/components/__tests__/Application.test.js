/*
  We are rendering `<Application />` down below, so we need React.createElement
*/
import React from "react";

/*
  We import our helper functions from the react-testing-library
  The render function allows us to render Components
*/
import { getAllByTestId, queryByAltText, queryByText, render, waitForElementToBeRemoved } from "@testing-library/react";

/*
  We import the component that we are testing
*/
import Application from "components/Application";

/*
  A test that renders a React Component
*/
import { waitForElement, getByText, prettyDOM, getByAltText, getByPlaceholderText } from "@testing-library/react";
import { fireEvent } from "@testing-library/react/dist";
import axios from "axios";


describe("Application", () => {
  it("changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"));

    fireEvent.click(getByText("Tuesday"));

    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container, debug } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"))
    // console.log(prettyDOM(container));
    const appointments = getAllByTestId(container, "appointment")
    //console.log(prettyDOM(appointments))
    const appointment = getAllByTestId(container, "appointment")[0];
    fireEvent.click(getByAltText(appointment, "Add"));
    fireEvent.change(getByPlaceholderText(appointment, "Enter Student Name"), {
      target: { value: "Lydia Mill-Jones" }
    })
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    await waitForElementToBeRemoved(() => getByText(appointment, "Saving"));
    const day=getAllByTestId(container,"day")
    const selectedDay=day.find(ele=>queryByText(ele,"Monday"))
    expect(getByText(selectedDay,"no spots remaining")).toBeInTheDocument()
  });

  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container,debug } = render(<Application />);
  
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
  
    // 3. Click the "Delete" button on the first appointment.
    const appointment = getAllByTestId(container,"appointment")[1];
    fireEvent.click(getByAltText(appointment,"Delete"))
    fireEvent.click(getByText(appointment,"Confirm"))
    await waitForElementToBeRemoved(()=>getByText(appointment,"Deleting"))
    const day=(getAllByTestId(container,"day").find(
      ele=>queryByText(ele,"Monday")))
    expect(getByText(day,"2 spots remaining")).toBeInTheDocument()
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async() => {
    const { container, debug } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"))
    const appointments = getAllByTestId(container, "appointment")
    const appointment = appointments[1];
    fireEvent.click(getByAltText(appointment, "Edit"));
    fireEvent.change(getByPlaceholderText(appointment,  "Enter Student Name"), {
      target: { value: "Lydia Mill-Jones" }
    })
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    await waitForElementToBeRemoved(() => getByText(appointment, "Saving"));
    const day=getAllByTestId(container,"day")
    const selectedDay=day.find(ele=>queryByText(ele,"Monday"))
    expect(getByText(selectedDay,"1 spot remaining")).toBeInTheDocument()
  })

  it("shows the save error when failing to save an appointment", () => {
    axios.put.mockRejectedValueOnce();
  });

  it("shows the save error when failing to save an appointment", () => {
    axios.delete.mockRejectedValueOnce();
  });
})
