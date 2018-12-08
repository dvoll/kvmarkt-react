import { BaseButton } from "@dvll/ulight-react";
import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Dispatch } from "redux";
import { ApplicationState } from "src/store";
import { login } from "src/store/auth/actions";
import { AuthState } from "src/store/auth/types";

interface State {
    username: string;
    password: string;
}
interface Props {
    login: (username: string, password: string) => void;
    authState: AuthState
}

class Login extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = { password: '', username: ''};
        // this.props.login(); 
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    public handleEmailChange(event: any) {
        this.setState({username: event.target.value})
    }
    public handlePasswordChange(event: any) {
        this.setState({password: event.target.value})
    }

    public render() {
        return <div>
                LOGIN
                <br />
                Email
                <input type="text" onInput={this.handleEmailChange} />
                <br />
                password
                <input type="text" onInput={this.handlePasswordChange} />
                <br />
                {/* tslint:disable-next-line:jsx-no-lambda */}
                <BaseButton title="Login" onClick={() => this.props.login(this.state.username, this.state.password)} />
                <br />
                <Link to="/dashboard">Dashboard </Link>
                <br />
                Logged in: {this.props.authState.data.authenticated ? "yes" : "no"}
                <br />
                {this.props.authState.loading && "Loading"}
            </div>;
        }
    }
    
const mapDispatchToProps = (dispatch: Dispatch) => ({
    login: (username: string, password: string) => dispatch(login(username, password))
});

const mapStateToProps = ({ authState }: ApplicationState) => ({
    authState
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
