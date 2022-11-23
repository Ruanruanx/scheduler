import React, { Fragment, useEffect } from "react";
import "components/Appointment/styles.scss";
import Empty from "./Empty";
import Show from "./Show";
import Status from "./Status";
import Header from "./header";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Confirm from "./Confirm";
import Error from "./Error";

export default function Appointment(props) {
    const EMPTY = "EMPTY";
    const SHOW = "SHOW";
    const SAVING = "SAVING";
    const CREATE = "CREATE";
    const DELETING = "DELETING";
    const CONFIRM = "CONFIRM";
    const EDIT = "EDIT";
    const ERROR_SAVE = "ERROR_SAVE";
    const ERROR_DELETE = "ERROR_DELETE";
    const ERROR_INPUT = "ERROR_INPUT";

    const { mode, transition, back } = useVisualMode(
        props.interview ? SHOW : EMPTY
    );
    function save(name, interviewer) {
        const interview = {
            student: name,
            interviewer
        };
        if(!name||!interviewer){
            transition(ERROR_INPUT)
        }else{
            
        transition(SAVING);
            props
            .bookInterview(props.id, interview)
            .then(()=>transition(SHOW))
            .catch(err =>transition(ERROR_SAVE,true))  
        }
        
    }

    function cancelInterview() {
        transition(DELETING,true);
        props
        .deleteInterview(props.id)
        .then(() => { transition(EMPTY) })
        .catch(err=>transition(ERROR_DELETE,true))
    }

    function destroy(){
        back();
    }

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
                {mode === ERROR_SAVE && <Error message={"Can't save"}
                onClose={destroy}/>}
                {mode === ERROR_DELETE && <Error message={"Can't delete"}
                onClose={destroy}/>}
                {mode === ERROR_INPUT && <Error message={"You need to input more information"}
                onClose={destroy}/>}
            </Fragment>

        </article>

    )
}