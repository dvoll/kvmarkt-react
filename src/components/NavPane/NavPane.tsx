import { ThemeContext } from "@dvll/ulight-react";
import * as React from "react";
import { Link, NavLink } from "react-router-dom";
import { fromEvent, Subscription } from "rxjs";
import { debounceTime, map } from "rxjs/operators";
import './NavPane.css';

interface Props {
    backButton?: boolean;
    navLinks: Array<{name: string, to: string}>;
}

interface NavPaneState {
    showDivider: boolean;
}


// TODO Add lifecycle hook for monitoring scroll position and show a seperator
// const NavPane: React.SFC<Props> = (props) => {
class NavPane extends React.Component<Props, NavPaneState> {

    public state = { showDivider: false}

    private backButton = this.props.backButton && <Link className="NavPane-back" to="/"><span>b</span></Link>
    private navLinks = this.props.navLinks.map((l) => <NavLink className="NavPane-link" key={l.to} to={l.to}><span>{l.name}</span></NavLink>)
    private sideContent = this.props.children && <span className="NavPane-side">props.children</span>;

    private scrollStream = fromEvent(window, 'scroll').pipe(
        debounceTime(10),
        map(() => window.pageYOffset)
    );


    private scrollSubscription: Subscription; 

    public componentDidMount() {
        this.scrollSubscription = this.scrollStream.subscribe( (offset) => {
            const showDivider = offset > 5;
            if (this.state.showDivider !== showDivider) {
                this.setState({showDivider})
            }
        });
        // window.addEventListener('scroll', this.scrollEventHandler);
    }

    public componentWillUnmount() {
        this.scrollSubscription.unsubscribe();
        // window.removeEventListener('scroll', this.scrollEventHandler);
    }
    
    public render() {
        return <React.Fragment>
            <div className="NavPane-dummy" />
            <ThemeContext.Consumer>
                {theme => {
                    console.log("theme", theme)
                    return (<nav className={'NavPane-nav ' + (this.state.showDivider ? 'divider' : '')} style={
                        {
                            ["--foreground-rgb" as any]: theme.foreground,
                            ["--background-rgb" as any]: theme.background,
                            ["--accent-rgb" as any]: theme.accent,
                        }}>
                        {this.backButton}
                        {this.navLinks}
                        {this.sideContent}
                    </nav>)
                }
                }
            </ThemeContext.Consumer>
        </React.Fragment>;
    }
}

export default NavPane;
