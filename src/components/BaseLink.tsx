import * as React from "react";
import { NavLink } from "react-router-dom";
import "./BaseLink.css";

export interface LinkProps {
    name?: string;
    to: string;
    children?: any;
}

const BaseLink = (props: LinkProps) => {
    return (
        <NavLink className="BaseLink" to={props.to}>{props.children}</NavLink>
    );
};

export default BaseLink;