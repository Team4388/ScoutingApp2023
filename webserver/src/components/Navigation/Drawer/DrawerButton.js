import React from 'react'

import './DrawerButton.css'

const DrawerButton = props => {
    return (
        <button className="drawer_button" onClick={props.click}>
            <div className="drawer_button_line" />
            <div className="drawer_button_line" />
            <div className="drawer_button_line" />    
        </button>
    )
}

export default DrawerButton
