import { BaseHeading, BaseLabel } from "@dvll/ulight-react";
import * as React from "react";
import PageLayout from "src/components/layout/PageLayout/PageLayout";

export interface AccountProps {
    time?: Date;
}

const Account: React.SFC<AccountProps> = (props) => {

    return (
        <PageLayout>
            <BaseLabel name="Profil" />
            <BaseHeading level={1} >Einstellungen</BaseHeading>
        </PageLayout>
    );
}

export default Account;
