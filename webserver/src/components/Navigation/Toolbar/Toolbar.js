import React from 'react'

import DrawerButton from '../Drawer/DrawerButton';
import PagesList from '../PagesList';
import './Toolbar.css';
import { Link } from 'react-router-dom';

const Toolbar = props => {
    return (
            <header className="toolbar">
                <nav className="toolbar_navigation">
                    <DrawerButton click={props.drawerClickHandler} />
                    <div className = "toolbar_logo"><Link to="/">Ridgebotics Scouting</Link></div>
                    <div className = "toolbar_spacer" />
                    <div className = "toolbar_items">
                        <PagesList />
                    </div>
                </nav>
            </header>
    )
}

export default Toolbar
