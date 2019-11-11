import { BaseButton, BaseHeading, BaseLabel, Input } from '@dvll/ulight-react';
import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Dispatch } from 'redux';
import FormField from 'src/components/DynamicFormField/FormField';
import PageLayout from 'src/components/Layout/PageLayout/PageLayout';
import { ApplicationState } from 'src/store';
import { login } from 'src/store/auth/actions';
import { AuthState } from 'src/store/auth/types';

interface State {
    username: string;
    password: string;
}
interface Props {
    login: (username: string, password: string) => void;
    authState: AuthState;
}

enum InputFieldNames {
    USERNAME = 'username',
    PASSWORD = 'password',
}

class Login extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { password: '', username: '' };
        // this.props.login();
        // this.handleEmailChange = this.handleEmailChange.bind(this);
        // this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleFormInput = this.handleFormInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    public handleEmailChange(event: any) {
        this.setState({ username: event.target.value });
    }
    public handlePasswordChange(event: any) {
        this.setState({ password: event.target.value });
    }

    public render() {
        const { username, password } = this.state;
        return (
            <React.Fragment>
                {this.props.authState.data.authenticated && <Redirect to="/dashboard" />}
                <PageLayout>
                    <BaseLabel name="" />
                    <BaseHeading level={1}>Anmelden</BaseHeading>
                    <form onSubmit={this.handleSubmit}>
                        <FormField labelName="E-Mail Adresse" id={InputFieldNames.USERNAME}>
                            <Input type={'email'} value={username} onChange={this.handleFormInput} />
                        </FormField>
                        <FormField labelName="Passwort" id={InputFieldNames.PASSWORD}>
                            <Input type={'password'} value={password} onChange={this.handleFormInput} />
                        </FormField>
                        <BaseButton type="submit">Login</BaseButton>
                    </form>
                    {/* <br />
                Email
                <input type="text" onInput={this.handleEmailChange} />
                <br />
                password
                <input type="text" onInput={this.handlePasswordChange} />
                <br /> */}
                    {/* tslint:disable-next-line:jsx-no-lambda */}
                    {/* <BaseButton title="Login" onClick={() => this.props.login(this.state.username, this.state.password)} /> */}
                    {/* <br />
                <Link to="/dashboard">Dashboard </Link> */}
                    <br />
                    Logged in: {this.props.authState.data.authenticated ? 'yes' : 'no'}
                    <br />
                    {this.props.authState.loading && 'Loading'}
                </PageLayout>
            </React.Fragment>
        );
    }

    private handleFormInput(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        // @ts-ignore
        this.setState({ [name]: value });
    }

    private handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        this.props.login(this.state.username, this.state.password);
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
    login: (username: string, password: string) => dispatch(login(username, password)),
});

const mapStateToProps = ({ authState }: ApplicationState) => ({
    authState,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);
