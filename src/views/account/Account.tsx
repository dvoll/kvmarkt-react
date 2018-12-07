import { BaseHeading, BaseLabel } from "@dvll/ulight-react";
import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import PageLayout from "src/components/layout/PageLayout/PageLayout";
import { changeTitle, disableBackButton } from "src/store/route/actions";

export interface AccountProps {
    time?: Date;
}

interface DispatchProps {
    setTitle: (title: any) => void;
    disableBackButton: () => void;
}

const Account: React.SFC<AccountProps & DispatchProps> = props => {
    props.setTitle('Profil');
    return (
        <PageLayout>
            <BaseLabel name="Profil" />
            <BaseHeading level={1}>Einstellungen</BaseHeading>
        </PageLayout>
    );
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
    setTitle: (title: any) => dispatch(changeTitle(title)),
    disableBackButton: () => dispatch(disableBackButton())
});

export default connect(null, mapDispatchToProps)(Account);
