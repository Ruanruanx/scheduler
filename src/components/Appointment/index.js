import React, { Fragment, useEffect } from "react";
import "components/Appointment/styles.scss";
import Empty from "./Empty";
import Show from "./Show";
import Header from "./header";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";

export default function Appointment(props) {
    const EMPTY = "EMPTY";
    const SHOW = "SHOW";
    const SAVING = "SAVING";
    const CREATE = "CREATE";

    const { mode, transition, back } = useVisualMode(
        props.interview ? SHOW : EMPTY
    );
    function save(name, interviewer) {
        const interview = {
          student: name,
          interviewer
        };
        transition(SAVING);
        props.bookInterview(props.id,interview);
   
      }
      useEffect(()=>{
        if(props.interview){
            transition(SHOW)
        }
      },[props.interview])

    return (
        <article className="appointment">
            <Header time={props.time} />
            <Fragment>
                {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

                {mode === SHOW && (
                    <Show
                        student={props.interview.student}
                        interviewer={props.interview.interviewer}
                    />
                )}
                {mode === CREATE && (
                    <Form
                        name=""
                        interviewer=""
                        interviewers={props.interviewers}
                        onCancel={() => back(EMPTY)}
                        onSave={save}            
                    />
                )}
            </Fragment>

        </article>

    )
}