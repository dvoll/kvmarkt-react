import * as React from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router";
import { Dispatch } from "redux";
import { SchemeContext } from "src/scheme/scheme-context";
import { ApplicationState } from "src/store";
import * as schemeActions from "src/store/schemes/actions";
import { SchemesState } from "src/store/schemes/types";
import Dashboard from "src/views/dashboard/Dashboard";
import SchemeList from "src/views/scheme-list/SchemeList";
import SchemeDetail from "src/views/SchemeDetail/SchemeDetail";
import NavPane from "../NavPane/NavPane";
import ResponsiveNav from "../ResponsiveNav/ResponsiveNav";
import TabBar from "../TabBar/TabBar";

interface DispatchProps {
    fetchSchemes: () => any; 
}

class UserApp extends React.Component<{schemeState: SchemesState} & DispatchProps, {}> {

    private navLinks = [
        { name: "Home", to: "/dashboard" },
        { name: "Programme", to: "/schemes" }
    ];

    public componentDidMount() {
        this.props.fetchSchemes();
    }

    public render() {
        return (
            <React.Fragment>
                <ResponsiveNav
                    mobileNav={<TabBar navLinks={this.navLinks} />}
                    desktopNav={<NavPane navLinks={this.navLinks} />}
                />
                <SchemeContext.Provider value={this.props.schemeState} >
                    <Switch>
                        <Route path="/dashboard" component={Dashboard} />
                        <Route path="/schemes" exact component={SchemeList} />
                        <Route path="/schemes/:id" exact component={SchemeDetail} />
                        <Redirect from="/" to="/dashboard" />
                    </Switch>
                </SchemeContext.Provider>
            </React.Fragment>
        );
    }

    // public shouldComponentUpdate(nextProps: { schemeState: SchemesState } & DispatchProps ) {
    //     console.log('nextprops ', nextProps);
    //     console.log('props ', this.props);
    //     console.log('comparisson ', this.props.schemeState !== nextProps.schemeState);

    //     return this.props.schemeState !== nextProps.schemeState;
    // }
}

const mapStateToProps = ({ schemeState }: ApplicationState) => ({
    schemeState
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    fetchSchemes: () => dispatch(schemeActions.fetchRequest())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserApp)
