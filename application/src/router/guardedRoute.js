import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";


const GuardedRoute = ({  path,
    component: Component,
    render,
    isAuth,
    ...rest }) => (
        <Route
        path={path}
        {...rest}
        render={(props) => {
          if (isAuth) {
            return Component ? <Component {...props} /> : render(props);
          }
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          );
        }}
      />
);

const mapStateToProps = (state) => {
    const { isAuth } = state.auth;
    return {
      isAuth
    };
  };


export default connect(mapStateToProps)(GuardedRoute);