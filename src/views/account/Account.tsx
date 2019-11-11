import { BaseHeading, BaseLabel } from '@dvll/ulight-react';
import * as React from 'react';
import PageLayout from 'src/components/Layout/PageLayout/PageLayout';
import withTitle from 'src/components/Layout/PageLayout/withTitleComponent';
import UserAppSettings from 'src/container/UserAppSettings/UserAppSettings';

// export interface AccountProps {
//     // time?: Date;
// }

const Account: React.SFC<{}> = props => {
    // props.setTitle('Profil');
    return (
        <PageLayout>
            <BaseLabel name="Profil" />
            <BaseHeading level={1}>Einstellungen</BaseHeading>
            <UserAppSettings />
        </PageLayout>
    );
};

// const mapDispatchToProps = (dispatch: Dispatch) => ({
//     setTitle: (title: any) => dispatch(changeTitle(title)),
//     disableBackButton: () => dispatch(disableBackButton()),
// });

export default withTitle('Profil + Einstellungen')(Account);
