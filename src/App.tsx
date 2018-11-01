
import * as React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import UserApp from "./components/UserApp/UserApp";
import Dashboard from "./views/dashboard/Dashboard";
import Login from "./views/login/Login";
// import logo from "./logo.svg";

interface State {
    time: Date;
}

class App extends React.Component<{}, State> {
    // private butonProps: ButtonProps = {};

    constructor(props: {}) {
        super(props); 
        this.state = { time: new Date()};
    }

    public render() {
        return (
            // <BrowserRouter>
                <React.Fragment>
                    <Switch>
                        <Route exact path="/login" component={Login}  />
                        <Route path="/admin" component={Dashboard}  />
                        <Route path="/" component={UserApp}  />
                        {/* <Redirect exact from="/" to="/dashboard" />  */}
                    </Switch>
                </React.Fragment>
            // </BrowserRouter>
        );
    }
}

export default App;
