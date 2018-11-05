import { ThemeContext } from "@dvll/ulight-react";
import * as React from "react";
import { NavLink } from "react-router-dom";
import "./BaseLink.css";

export interface LinkProps {
    name?: string;
    to: string;
    className?: string;
    style?: React.CSSProperties;
}

const BaseLink: React.SFC<LinkProps> = (props) => {
    return (
        <ThemeContext.Consumer>
            {theme => {
                const style = {["--foreground-rgb" as any] : theme.foreground, ["--secondary-rgb" as any]: theme.secondary }
                return (
                    <NavLink 
                        className={"BaseLink " + props.className }
                        style={style} 
                        to={props.to}
                    >
                        {props.children}
                    </NavLink>
                )
            }}
        </ThemeContext.Consumer>
    );
};

export default BaseLink;