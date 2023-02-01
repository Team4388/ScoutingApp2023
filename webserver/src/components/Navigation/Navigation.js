import React, {Component} from 'react'
import Toolbar from './Toolbar/Toolbar'
import SideDrawer from './Drawer/SideDrawer'
import './Navigation.css'

class Navigation extends Component {   
    state = {
        sideDrawerOpen: false
    };
    
    drawerToggleClickHandler = () => {
        this.setState((prevState) => {
            return {sideDrawerOpen: !prevState.sideDrawerOpen};
        });
    };

    render() {
        return (
        <div className="Navigation">
            <Toolbar drawerClickHandler={this.drawerToggleClickHandler} />
            <SideDrawer show={this.state.sideDrawerOpen} drawerClickHandler={this.drawerToggleClickHandler}/>
        </div>
        )
    }
}

export default Navigation