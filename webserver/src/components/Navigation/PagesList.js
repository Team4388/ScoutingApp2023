import React from 'react'
import { Link } from "react-router-dom";

const PagesList = props => {
    return (
        <ul>
            <li><Link onClick={props.click} to="/Schedule">Schedule</Link></li>
            <li><Link onClick={props.click} to="/TeamList">Teams</Link></li>
            <li><Link onClick={props.click} to="/Dashboard">Dashboard</Link></li>
            {/* <li><Link onClick={props.click} to="/Input">Input</Link></li> */}
            {/* <li><Link onClick={props.click} to="/Notes">Notes</Link></li> */}
        </ul>
    )
}

export default PagesList
