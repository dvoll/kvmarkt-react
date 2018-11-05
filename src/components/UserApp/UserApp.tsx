import * as React from "react";
import { Redirect, Route, Switch } from "react-router";
import Dashboard from "src/views/dashboard/Dashboard";
import SchemeList from "src/views/scheme-list/SchemeList";
import NavPane from "../NavPane/NavPane";
import ResponsiveNav from "../ResponsiveNav/ResponsiveNav";
import TabBar from "../TabBar/TabBar";

interface State {
    time: Date;
}
interface Props {
    time: Date;
}

class UserApp extends React.Component<Props, State> {

    private navLinks = [
        { name: "Home", to: "/dashboard" },
        { name: "Programme", to: "/schemes" }
    ];

    constructor(props: Props) {
        super(props);
        this.state = { time: new Date() };
    }


    public render() {
        return (
            <React.Fragment>
                <ResponsiveNav
                    mobileNav={<TabBar navLinks={this.navLinks} />}
                    desktopNav={<NavPane navLinks={this.navLinks} />}
                />
                <Switch>
                    <Route path="/dashboard" component={Dashboard} />
                    <Route path="/schemes" component={SchemeList} />
                    <Redirect from="/" to="/dashboard" />
                </Switch>
            </React.Fragment>
        );
    }
}

export default UserApp;
