import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { changeTitle, disableBackButton, enableBackButton } from "src/store/route/actions";

const withTitle = (componentTitle: string, backButtonEnabled: boolean = false) => {
    return (Component: any) => {
        const mapDispatchToProps = (dispatch: Dispatch) => ({
            setTitle: (title: string) => dispatch(changeTitle(title)),
            enableBackButton: () => dispatch(enableBackButton()),
            disableBackButton: () => dispatch(disableBackButton()),
        });
        const titleHoc =  class extends React.Component<any, {}> {
            public componentDidMount() {
                this.props.setTitle(componentTitle);
                backButtonEnabled ? this.props.enableBackButton() : this.props.disableBackButton();
            }

            public render() {
                return <Component {...this.props} />;
            }
        };
        return connect( null, mapDispatchToProps )(titleHoc);
    };
}

export default withTitle;