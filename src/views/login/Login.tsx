import { BaseButton } from "@dvll/ulight-react";
import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Dispatch } from "redux";
import { ApplicationState } from "src/store";
import { login } from "src/store/auth/actions";
import { AuthState } from "src/store/auth/types";

interface State {
    time: Date;
}
interface Props {
    login: () => void;
    authState: AuthState
}

class Login extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = { time: new Date()};
        // this.props.login(); 
    }

    public render() {
        return (
            <div>LOGIN
                {/* tslint:disable-next-line:jsx-no-lambda */}
                <BaseButton title="Login" onClick={() => this.props.login()} />
                <br />
                <Link to="/dashboard" >Dashboard </Link>
                <br />
                Logged in: {this.props.authState.data.authenticated ? 'yes' : 'no'}
                <br />
                { this.props.authState.loading && 'Loading'}
            </div>
            );
        }
    }
    
const mapDispatchToProps = (dispatch: Dispatch) => ({
    login: () => dispatch(login())
});

const mapStateToProps = ({ authState }: ApplicationState) => ({
    authState
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
