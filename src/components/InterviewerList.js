import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList(props) {
    const {interviewers}=props;
    const interviewersList = interviewers.map((interviewer)=>{
        const {id,name,avatar}=interviewer;
        return(
            <InterviewerListItem
                key={id}
                name={name}
                avatar={avatar}
                selected={id===props.interviewer}
                setInterviewer={()=>props.setInterviewer(id)}
            />
        )
    })
    return (
        <section>
            <h4 className="interviewers__header text--light"> Interviewer</h4>
            <ul className="interviewers__list">{interviewersList}</ul>
        </section>
    )
}