import { ThemeContext } from "@dvll/ulight-react";
import * as React from "react";
import { Link, NavLink } from "react-router-dom";
import './NavPane.css';

interface Props {
    backButton?: boolean;
    navLinks: Array<{name: string, to: string}>;
}


// TODO Add lifecycle hook for monitoring scroll position and show a seperator
const NavPane: React.SFC<Props> = (props) => {
    const backButton = props.backButton && <Link className="NavPane-back" to="/"><span>b</span></Link>
    const navLinks = props.navLinks.map((l) => <NavLink className="NavPane-link" key={l.to} to={l.to}><span>{l.name}</span></NavLink>)
    const sideContent = props.children && <span className="NavPane-side">props.children</span>;
    return <React.Fragment>
            <div className="NavPane-dummy" />
            <ThemeContext.Consumer>
                {theme => {
                console.log("theme", theme)
                    return (<nav className="NavPane-nav" style={
                        { 
                            ["--foreground-rgb" as any]: theme.foreground, 
                            ["--background-rgb" as any]: theme.background, 
                            ["--accent-rgb" as any]: theme.accent, 
                        }}>
                            {backButton}
                            {navLinks}
                            {sideContent}
                    </nav> )}
                    }
            </ThemeContext.Consumer>
        </React.Fragment>;
}

export default NavPane;
