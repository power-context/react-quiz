import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import classes from "./Drawer.module.css";
import Backdrop from "../../UI/Backdrop/Backdrop";

const links = [
  { to: "/", label: "List", exact: true },
  { to: "/auth", label: "Auth", exact: false },
  { to: "/quiz-creator", label: "Quiz creator", exact: false }
];

class Drawer extends Component {
  renderList() {
    return links.map((link, idx) => {
      return (
        <li key={idx}>
          <NavLink
            to={link.to}
            exact={link.exact}
            activeClassName={classes.active}
            onClick={this.props.onClose}
          >
            {link.label}
          </NavLink>
        </li>
      );
    });
  }
  render() {
    const cls = [classes.Drawer];
    if (!this.props.isOpen) {
      cls.push(classes.close);
    }
    return (
      <React.Fragment>
        <nav className={cls.join(" ")}>
          <ul>{this.renderList()}</ul>
        </nav>
        {this.props.isOpen ? <Backdrop onClose={this.props.onClose} /> : null}
      </React.Fragment>
    );
  }
}

export default Drawer;
