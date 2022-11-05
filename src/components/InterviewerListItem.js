import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";

export default function InterviewerListItem(props){
    const nameClassName = classNames("interviewers__item",
    {
        "interviewers__item--selected":props.selected,
    })
    const imgClassName = classNames("interviewers__item-image",
    {
        "interviewers__item-selected-image":props.selected
    })

    return(
    <li onClick={()=> props.setInterviewer(props.id)} className={nameClassName}>
        <img
        className={imgClassName}
        src={props.avatar}
        alt={props.name}
        />
       {props.selected && props.name}
    
    </li>)
}