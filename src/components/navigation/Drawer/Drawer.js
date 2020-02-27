import React, {Component} from 'react'
import classes from './Drawer.module.css'
import Backdrop from '../../UI/Backdrop/Backdrop'

const links = [
    1, 2, 3
]

class Drawer extends Component{

    renderList(){
        return links.map((link, idx) => {
            return(
                <li key={idx}>
                    <a href='#'>Link &nbsp; {link}</a>
                </li>
            )
        })
    }
    render(){
        const cls = [classes.Drawer]
        if(!this.props.isOpen){
            cls.push(classes.close)
        }
        return(
            <React.Fragment>
                <nav className={cls.join(' ')}>
                    <ul>
                        { this.renderList() }
                    </ul>
                </nav>
                { this.props.isOpen ? <Backdrop onClose={this.props.onClose} /> : null}
            </React.Fragment>
        )
    }
}

export default Drawer