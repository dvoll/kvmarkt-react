import { BaseButton, BaseLabel, ThemeContext } from "@dvll/ulight-react";
import * as React from "react";
import { NavLink } from "react-router-dom";
import { fromEvent, Subscription } from "rxjs";
import { debounceTime, map } from "rxjs/operators";
import './NavPane.css';

interface Props {
    backButton?: boolean;
    goBackHandler?: () => void
    navLinks?: Array<{name: string, to: string}>;
    title?: string;
}

interface NavPaneState {
    showDivider: boolean;
}


class NavPane extends React.Component<Props, NavPaneState> {

    public state = { showDivider: false}

    private sideContent = this.props.children && <span className="NavPane-side">props.children</span>;

    private scrollStream = fromEvent(window, 'scroll').pipe(
        debounceTime(10),
        map(() => window.pageYOffset)
    );

    private scrollSubscription: Subscription;
    
    constructor(props: Props) {
        super(props);
        this.goBack = this.goBack.bind(this);
    }

    public componentDidMount() {
        this.scrollSubscription = this.scrollStream.subscribe( (offset) => {
            const showDivider = offset > 5;
            if (this.state.showDivider !== showDivider) {
                this.setState({showDivider})
            }
        });
    }

    public componentWillUnmount() {
        this.scrollSubscription.unsubscribe();
    }
    
    public render() {
        // tslint:disable-next-line:jsx-no-lambda
        const backButton = !this.props.navLinks && !this.props.backButton ? null : <BaseButton icon="arrow-left" onClick={this.goBack} style={{visibility: this.props.backButton ? 'visible' : 'hidden'}}>Zurück</BaseButton>;
        const navLinks = this.props.navLinks ? this.props.navLinks.map((l) => <NavLink className="NavPane-link" key={l.to} to={l.to}><span>{l.name}</span></NavLink>) : null;
        const title = this.props.title ? (<BaseLabel className="NavPane-title" name={this.props.title} />) : null;
        return <React.Fragment>
            {/* <div className="NavPane-dummy" /> */}
            <ThemeContext.Consumer>
                {theme => {
                    return (<div className={'NavPane-nav ' + (this.state.showDivider ? 'divider' : '')} style={
                        {
                            ["--foreground-rgb" as any]: theme.foreground,
                            ["--background-rgb" as any]: theme.background,
                            ["--accent-rgb" as any]: theme.accent,
                        }}>
                        {backButton}
                        {navLinks}
                        {title}
                        {this.sideContent}
                        
                    </div>)
                }
                }
            </ThemeContext.Consumer>
        </React.Fragment>;
    }

    private goBack() {
        // tslint:disable-next-line:no-unused-expression
        this.props.goBackHandler && this.props.goBackHandler();
    }
}

export default NavPane;
