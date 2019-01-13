import { getTheme, ThemeContext, UlightTheme, UlightThemeTypes } from '@dvll/ulight-react';
import * as React from 'react';
import { connect } from 'react-redux';
import { Route, RouteComponentProps, Switch, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import './App.css';
import UserApp from './components/UserApp/UserApp';
import { ApplicationState } from './store';
import { AuthState } from './store/auth/types';
import { privateRoute } from './utils';
import Dashboard from './views/dashboard/Dashboard';
import Login from './views/login/Login';
// import logo from "./logo.svg";

interface AppProps extends RouteComponentProps<{}> {
    themeType: UlightThemeTypes;
    authState: AuthState;
}

class App extends React.Component<AppProps, {}> {
    // private butonProps: ButtonProps = {};

    private theme: UlightTheme;

    constructor(props: AppProps) {
        super(props);
    }

    public componentDidMount() {
        this.setBodyStyle();
    }

    public shouldComponentUpdate(nextProps: {}) {
        console.log('Update App ', nextProps);
        return true;
    }

    public render() {
        this.theme = getTheme(this.props.themeType);
        this.setBodyStyle();
        return (
            // <BrowserRouter>
            <React.Fragment>
                <ThemeContext.Provider value={this.theme}>
                    <Switch>
                        <Route exact path="/login" component={Login} />
                        <Route path="/admin" component={Dashboard} />
                        {/* <Route path="/" component={UserApp} /> */}
                        {privateRoute(UserApp, this.props.authState.data.authenticated, '/')}
                        {/* <Redirect exact from="/" to="/dashboard" />  */}
                    </Switch>
                </ThemeContext.Provider>
            </React.Fragment>
            // </BrowserRouter>
        );
    }

    private setBodyStyle() {
        const body = document.getElementsByTagName('body').item(0);
        // tslint:disable-next-line:no-unused-expression
        if (body !== null) {
            body.style.setProperty('background-color', `rgb(${this.theme.background})`);
            body.style.setProperty('color', `rgb(${this.theme.foreground})`);
        }
    }
}

// export default App;

const mapStateToProps = ({ authState, appState }: ApplicationState) => ({
    authState,
    themeType: appState.theme,
});

// const mapDispatchToProps = (dispatch: Dispatch) => ({
//     fetchSchemes: () => dispatch(schemeActions.fetchRequest())
// });

export default compose(
    withRouter,
    connect(mapStateToProps)
    // mapDispatchToProps
)(App);
