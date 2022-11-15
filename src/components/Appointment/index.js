import React, { Fragment, useEffect } from "react";
import "components/Appointment/styles.scss";
import Empty from "./Empty";
import Show from "./Show";
import Status from "./Status";
import Header from "./header";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Confirm from "./Confirm";

export default function Appointment(props) {
    const EMPTY = "EMPTY";
    const SHOW = "SHOW";
    const SAVING = "SAVING";
    const CREATE = "CREATE";
    const DELETING = "DELETING";
    const CONFIRM = "CONFIRM";
    const EDIT = "EDIT";

    const { mode, transition, back } = useVisualMode(
        props.interview ? SHOW : EMPTY
    );
    function save(name, interviewer) {
        const interview = {
            student: name,
            interviewer
        };
        transition(SAVING);
        props.bookInterview(props.id, interview);
    }

    function cancelInterview() {
        transition(DELETING);
        props.deleteInterview(props.id)
            .then(() => { transition(EMPTY) })
    }

    useEffect(() => {
        if (props.interview) {
            transition(SHOW)
        }
    }, [props.interview])

    return (
        <article className="appointment">
            <Header time={props.time} />
            <Fragment>
                {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

                {mode === SHOW && (
                    <Show
                        student={props.interview.student}
                        interviewer={props.interview.interviewer}
                        onDelete={() => transition(CONFIRM)}
                        onEdit={() => transition(EDIT)}
                    />
                )}
                {mode === SAVING && <Status message={"Saving"} />}
                {mode === CREATE && (
                    <Form
                        name=""
                        interviewer=""
                        interviewers={props.interviewers}
                        onCancel={() => back(EMPTY)}
                        onSave={save}

                    />
                )}
                {mode === DELETING && <Status message={"Deleting"} />}
                {mode === CONFIRM && <Confirm
                    onCancel={() => { transition(SHOW) }}
                    onConfirm={cancelInterview}
                    message={"Are you sure you would like to confirm?"} />}
                {mode === EDIT && (
                    <Form
                        student={props.interview.student}
                        interviewer={props.interview.interviewer.id}
                        interviewers={props.interviewers}
                        onCancel={() => back(EMPTY)}
                        onSave={save}
                    />)}
            </Fragment>

        </article>

    )
}