import React, { Fragment } from "react";
import "components/Appointment/styles.scss";
import Empty from "./Empty";
import Show from "./Show";
import Header from "./header";

export default function Appointment(props) {
    return (
        <article className="appointment">
            <Header time={props.time} />
            <Fragment>
                {props.interview ?
                    <>
                    <Show 
                    student={props.interview.student}
                    interviewer={props.interview.interviewer}/>
                    </>
                    :
                    <Empty />
                }
            </Fragment>

        </article>

    )
}