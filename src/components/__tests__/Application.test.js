/*
  We are rendering `<Application />` down below, so we need React.createElement
*/
import React from "react";

/*
  We import our helper functions from the react-testing-library
  The render function allows us to render Components
*/
import { getAllByTestId, queryByAltText, render } from "@testing-library/react";

/*
  We import the component that we are testing
*/
import Application from "components/Application";

/*
  A test that renders a React Component
*/

import { waitForElement,getByText,prettyDOM,getByAltText,getByPlaceholderText } from "@testing-library/react";
import { fireEvent } from "@testing-library/react/dist";
describe("Application", () => {
  it("changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"));

    fireEvent.click(getByText("Tuesday"));

    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async() => {
     const {container, debug} = render(<Application/>);
     await waitForElement(()=> getByText(container,"Archie Cohen"))
    // console.log(prettyDOM(container));
    const appointments=getAllByTestId(container,"appointment")
    //console.log(prettyDOM(appointments))
    const appointment = getAllByTestId(container, "appointment")[0];
    fireEvent.click(getByAltText(appointment,"Add"));
    fireEvent.change(getByPlaceholderText(appointment,"Enter Student Name"),{
      target:{value:"Lydia Mill-Jones"}
    })
    fireEvent.click(getByAltText(appointment,"Sylvia Palmer"));
    fireEvent.click(getByText(appointment,"Save"));
    expect(getByText(appointment,"Saving")).toBeInTheDocument();
  });
})
