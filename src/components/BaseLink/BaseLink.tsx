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
    const {style, className, name, children, ...restProps} = props;
    return (
        <ThemeContext.Consumer>
            {theme => {
                const styles = {
                    ["--foreground-rgb" as any] : theme.foreground, 
                    ["--secondary-rgb" as any]: theme.secondary,
                    ["--background-rgb" as any]: theme.background,
                    ...style
                }
                const classNames = 
                    "Ulight-container Ulight-link BaseLink " + 
                    className
                ;
                
                return (
                    <NavLink 
                        className={classNames}
                        style={styles} 
                        {...restProps}
                    >
                        {children}
                    </NavLink>
                )
            }}
        </ThemeContext.Consumer>
    );
};

export default BaseLink;