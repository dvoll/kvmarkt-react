import { BaseButton, ToggleButton, UlightThemeTypes } from '@dvll/ulight-react';
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import FormField from 'src/components/DynamicFormField/FormField';
import { ApplicationState } from 'src/store';
import { changeTheme } from 'src/store/app/actions';
import { logout } from 'src/store/auth/actions';

export interface UserAppSettingsProps {
    themeId: UlightThemeTypes;
    changeTheme: (themeId: UlightThemeTypes) => void;
    logout: () => void;
}

class UserAppSettings extends React.Component<UserAppSettingsProps, {}> {
    constructor(props: UserAppSettingsProps) {
        super(props);
    }

    public render() {
        return (
            <form>
                <FormField labelName="Abmelden" description="Melde dich von diesem Browser ab.">
                    {/* tslint:disable-next-line:jsx-no-lambda */}
                    <BaseButton type="button" onClick={() => this.props.logout()}>
                        Abmelden
                    </BaseButton>
                </FormField>
                <FormField
                    labelName="Design auswählen"
                    description="Wähle hier zwischen einem hellen oder dunklem Erscheinungsbild (nur dieser Browser)."
                >
                    <span>Dunkles Design verwenden </span>
                    <ToggleButton
                        checked={this.props.themeId === UlightThemeTypes.DARK} // tslint:disable-next-line:jsx-no-lambda
                        onChange={(event: React.ChangeEvent<any>) =>
                            this.props.changeTheme(
                                event.target.checked ? UlightThemeTypes.DARK : UlightThemeTypes.LIGHT
                            )
                        }
                        checkedText="AN"
                    >
                        AUS
                    </ToggleButton>
                </FormField>
            </form>
        );
    }
}

const mapStateToProps = ({ appState }: ApplicationState) => ({
    themeId: appState.theme,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    changeTheme: (themeId: UlightThemeTypes) => dispatch(changeTheme(themeId)),
    logout: () => dispatch(logout()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserAppSettings);
