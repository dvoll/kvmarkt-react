import * as React from "react";
import { connect } from "react-redux";
import { Redirect, Route, RouteComponentProps, Switch, withRouter } from "react-router";
import { compose, Dispatch } from "redux";
import { fromEvent, Subscription } from "rxjs";
import { debounceTime, map } from "rxjs/operators";
import { SchemeContext } from "src/scheme/scheme-context";
import { ApplicationState } from "src/store";
import { changeTitle } from "src/store/route/actions";
import * as schemeActions from "src/store/schemes/actions";
import { SchemesState } from "src/store/schemes/types";
import Account from "src/views/account/Account";
import Dashboard from "src/views/dashboard/Dashboard";
import SchemeList from "src/views/scheme-list/SchemeList";
import SchemeDetail from "src/views/SchemeDetail/SchemeDetail";
import NavPane from "../NavPane/NavPane";
import TabBar from "../TabBar/TabBar";

interface DispatchProps {
    fetchSchemes: () => any; 
}

interface UserAppState {
    title: string;
    backButtonEnabled: boolean,
    mobile: boolean
}

class UserApp extends React.Component<
    { schemesState: SchemesState } & DispatchProps & RouteComponentProps<{}>,
    UserAppState
> {
    public state = { title: "", backButtonEnabled: false, mobile: false };

    private resizeSubscription: Subscription;

    private navLinks = [
        { name: "Home", to: "/dashboard" },
        { name: "Programme", to: "/schemes" },
        { name: "Profil", to: "/account" }
    ];
    // private setTitleWithContext = this.setTitle.bind(this);

    constructor(
        props: { schemesState: SchemesState } & DispatchProps & RouteComponentProps<{}>
    ) {
        super(props);
        this.props.fetchSchemes();
        this.setTitle = this.setTitle.bind(this);
        this.setBackButtonState = this.setBackButtonState.bind(this);
        const resizeStream = fromEvent(window, "resize").pipe(
            debounceTime(100),
            map(() => window.innerWidth)
        );
        this.resizeSubscription = resizeStream.subscribe((width: number) => {
            const mobile = width < 600;
            if (this.state.mobile !== mobile) {
                this.setState({mobile})
            }
        })
        window.dispatchEvent(new Event('resize'))    
    }

    public componentWillUnmount() {
        this.resizeSubscription.unsubscribe();
    }

    public render() {
        return (
            <React.Fragment>
                {/* <ResponsiveCssNav navLinks={this.navLinks} /> */}
                {/* <ResponsiveNav
                mobileNav={<TabBar navLinks={this.navLinks} />}
                desktopNav={<NavPane navLinks={this.navLinks} />}
            /> */}
                <NavPane
                    // backButton={this.state.backButtonEnabled} // tslint:disable-next-line:jsx-no-lambda
                    goBackHandler={() => this.props.history.goBack()} // 
                    // title={this.state.title}
                    navLinks={this.state.mobile ? undefined : this.navLinks}
                />
                {/* <TitleContext.Provider value={this.setTitle} > */}
                <SchemeContext.Provider value={this.props.schemesState}>
                    <Switch>
                        <Route
                            path="/dashboard" // tslint:disable-next-line:jsx-no-lambda
                            render={props =>
                                this.setChildrenPageProps(Dashboard, props)
                            }
                        />
                        <Route
                            path="/schemes"
                            exact // tslint:disable-next-line:jsx-no-lambda
                            render={props =>
                                this.setChildrenPageProps(SchemeList, props)
                            }
                        />
                        <Route
                            path="/schemes/:id"
                            exact // tslint:disable-next-line:jsx-no-lambda
                            render={props =>
                                this.setChildrenPageProps(SchemeDetail, props)
                            }
                        />
                        <Route
                            path="/account" // tslint:disable-next-line:jsx-no-lambda
                            render={props =>
                                this.setChildrenPageProps(Account, props)
                            }
                        />
                        <Redirect from="/" to="/dashboard" />
                    </Switch>
                </SchemeContext.Provider>
                {/* </TitleContext.Provider> */}
                {this.state.mobile && <TabBar navLinks={this.navLinks} />}
            </React.Fragment>
        );
    }

    public shouldComponentUpdate(nextProps: any) {
        console.log('userApp Props', nextProps);
        return true;
    }

    // private setTitleHandlerProp(Component: any) {
    //     return () => <Component titleHandler={this.setTitle} backButtonEnableHandler={this.setBackButtonState} />;
    // }
    private setChildrenPageProps(Component: any, props: any) {
        return (
            <Component
                titleHandler={this.setTitle}
                backButtonEnableHandler={this.setBackButtonState}
                {...props}
            />
        );
    }

    // public shouldComponentUpdate(nextProps: { schemeState: SchemesState } & DispatchProps ) {
    //     console.log('nextprops ', nextProps);
    //     console.log('props ', this.props);
    //     console.log('comparisson ', this.props.schemeState !== nextProps.schemeState);

    //     return this.props.schemeState !== nextProps.schemeState;
    // }

    private setTitle(title: string) {
        if (this.state.title !== title) {
            this.setState({ title });
        }
    }
    private setBackButtonState(enabled: boolean = true) {
        if (this.state.backButtonEnabled !== enabled) {
            this.setState({ backButtonEnabled: enabled });
        }
    }
}

const mapStateToProps = ({ schemesState }: ApplicationState) => ({
    schemesState
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    fetchSchemes: () => dispatch(schemeActions.fetchRequest()),
    setTitle: (title: string) => dispatch(changeTitle(title))
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter
)(UserApp);
