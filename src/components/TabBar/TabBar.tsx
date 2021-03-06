import { ThemeContext } from "@dvll/ulight-react";
import * as React from "react";
import { NavLink } from "react-router-dom";
import { fromEvent, Subscription } from "rxjs";
import { debounceTime } from "rxjs/operators";

import './TabBar.css';

interface TabBarState {
    showDivider: boolean;
}
export interface TabBarProps {
    backButton?: boolean;
    navLinks: Array<{ name: string, to: string }>;
}

class TabBar extends React.Component<TabBarProps, TabBarState> {

    public state = { showDivider: false }

    // private backButton = this.props.backButton && <Link className="TabBar-back" to="/"><span>b</span></Link>
    private navLinks = this.props.navLinks.map((l) => <NavLink className="TabBar-link" key={l.to} to={l.to}><span>{l.name}</span></NavLink>)
    // private sideContent = this.props.children && <span className="TabBar-side">props.children</span>;

    private scrollStream = fromEvent(window, 'scroll').pipe(
        debounceTime(10)
        // map(() => window.pageYOffset)
    );


    private scrollSubscription: Subscription;

    public componentDidMount() {
        this.scrollSubscription = this.scrollStream.subscribe(() => {
            const showDivider = window.innerHeight + window.pageYOffset < document.body.offsetHeight;
            if (this.state.showDivider !== showDivider) {
                this.setState({ showDivider })
            }
        });
    }

    public componentWillUnmount() {
        this.scrollSubscription.unsubscribe();
    }

    public render() {
        return <React.Fragment>
            {/* <div className="TabBar-dummy" /> */}
            <ThemeContext.Consumer>
                {theme => {
                    return (<nav className={'TabBar-nav ' + (this.state.showDivider ? 'divider' : '')} style={
                        {
                            ["--foreground-rgb" as any]: theme.foreground,
                            ["--background-rgb" as any]: theme.background,
                            ["--accent-rgb" as any]: theme.accent,
                        }}>
                        {/* {this.backButton} */}
                        {this.navLinks}
                        {/* {this.sideContent} */}
                    </nav>)
                }
                }
            </ThemeContext.Consumer>
        </React.Fragment>;
    }
}

export default TabBar;
