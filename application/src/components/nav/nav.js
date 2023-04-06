import React from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux'; 
import "./nav.css";
import { logoutUser } from '../../redux/actions/authActions';

 const mapDispatchToProps = {
    logoutUser: logoutUser,
  }
  
const Nav = (props) => {
    const logout = () => props.logoutUser();

    return (
        <div className="nav-strip">
            <Link to={"/order"} className="nav-link">
                <div className="nav-link-style">
                    <label className="nav-label">Order Form</label>
                </div>
            </Link>
            <Link to={"/view-orders"} className="nav-link" id="middle-link">
                <div className="nav-link-style">
                    <label className="nav-label">View Orders</label>
                </div>
            </Link>
            <Link to={"/"} onClick={logout} className="nav-link">
                <div className="nav-link-style">
                    <label className="nav-label">Log Out</label>
                </div>
            </Link>
        </div>
    );
}

export default connect(null, mapDispatchToProps)(Nav);