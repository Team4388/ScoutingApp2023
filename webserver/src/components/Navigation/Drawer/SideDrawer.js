import React from 'react'
import PagesList from '../PagesList';

import './SideDrawer.css'

const SideDrawer = props => {
    let drawerClasses = 'side_drawer';
    if (props.show) {
        drawerClasses = 'side_drawer open';
    }
    return (
        <nav className={drawerClasses}>
            <PagesList click={props.drawerClickHandler}/>
        </nav>
    )
}

export default SideDrawer
