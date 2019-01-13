import { ToggleButton, UlightThemeTypes } from '@dvll/ulight-react';
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import FormField from 'src/components/DynamicFormField/FormField';
import { ApplicationState } from 'src/store';
import { changeTheme } from 'src/store/app/actions';

export interface UserAppSettingsProps {
    themeId: UlightThemeTypes;
    changeTheme: (themeId: UlightThemeTypes) => void;
}

class UserAppSettings extends React.Component<UserAppSettingsProps, {}> {
    constructor(props: UserAppSettingsProps) {
        super(props);
    }

    public render() {
        return (
            <form>
                <FormField labelName="Design auswählen">
                    <span>Dunkles Design verwenden </span>
                    <ToggleButton
                        checked={this.props.themeId === UlightThemeTypes.DARK}
                        // tslint:disable-next-line:jsx-no-lambda
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
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserAppSettings);
