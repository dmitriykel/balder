import React from "react";
import { Route } from "react-router-dom";

export default class AppliedRoute extends React.Component {
    render() {
        const Comp = this.props.component;
        const childProps = this.props.props;
        const exact = this.props.exact;
        const path = this.props.path;

        return (
            <Route path={path} exact={exact} render={(routerProps) => {
                return (
                    <Comp {...routerProps} {...childProps}/>
                );
            }}/>
        );
    }
 };