import React, {Component} from 'react';
import classes from './Layout.module.css';
import MenuToggle from '../components/navigation/MenuToggle/MenuToggle';
import Drawer from '../components/navigation/Drawer/Drawer';
import { connect } from 'react-redux';

class Layout extends Component {

    state = {
        menu: false
    }

    toggleMenuHandler = () => {
        this.setState({
            menu: !this.state.menu
        })
    }

    closeMenuHandler = () => {
        this.setState({
            menu: false
        })
    }

    render(){
        return (
            <div className={classes.Layout}>
                <Drawer 
                    isOpen={this.state.menu}
                    onClose={this.closeMenuHandler}
                    isAuth={this.props.isAuth}
                />
                <MenuToggle 
                    onToggle={this.toggleMenuHandler}
                    isOpen={this.state.menu}
                />
                <main>
                    { this.props.children }
                </main>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        isAuth: !!state.authReducer.token
    }
}

export default connect(mapStateToProps)(Layout);