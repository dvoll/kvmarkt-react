import {
    BaseButton,
    BaseHeading,
    BaseIcon,
    BaseLabel
} from "@dvll/ulight-react";
import * as React from "react";
import BaseLink from "src/components/BaseLink/BaseLink";
import PageLayout from "src/components/layout/PageLayout/PageLayout";
import withTitle from "src/components/layout/PageLayout/withTitleComponent";

export interface WithTitleHandlerProps {
    titleHandler: any;
    backButtonEnableHandler: any;
}

class Dashboard extends React.Component<WithTitleHandlerProps, {}> {

    public componentDidMount() {
        // this.props.titleHandler('Dashboard');
    }

    public render() {
        return (
            <PageLayout className="Dashboard">
                <BaseLabel name="Label" />
                <BaseHeading level={1}>Heading</BaseHeading>
                <p>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                    diam nonumy eirmod tempor invidunt ut labore et dolore magna
                    aliquyam erat, sed diam voluptua. At vero eos et accusam et
                    justo duo dolores et ea rebum. Stet clita kasd gubergren, no
                    sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem
                    ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                    nonumy eirmod tempor invidunt ut labore et dolore magna
                    aliquyam erat, sed diam voluptua. At vero eos et accusam et
                    justo duo dolores et ea rebum. Stet clita kasd gubergren, no
                    sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem
                    ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                    nonumy eirmod tempor invidunt ut labore et dolore magna
                    aliquyam erat, sed diam voluptua. At vero eos et accusam et
                    justo duo dolores et ea rebum. Stet clita kasd gubergren, no
                    sea takimata sanctus est Lorem ipsum dolor sit amet. Duis
                    autem vel eum iriure dolor in hendrerit in vulputate velit
                    esse molestie consequat, vel illum dolore eu feugiat nulla
                    facilisis at vero eros et accumsan et iusto odio dignissim
                    qui blandit praesent luptatum zzril delenit augue duis
                    dolore te feugait nulla facilisi. Lorem ipsum dolor sit
                    amet, consectetuer adipiscing elit, sed diam nonummy nibh
                    euismod tincidunt ut laoreet dolore magna aliquam erat
                    volutpat.
                </p>
                <p>
                    Ut wisi enim ad minim veniam, quis nostrud exerci tation
                    ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
                    consequat. Duis autem vel eum iriure dolor in hendrerit in
                    vulputate velit esse molestie consequat, vel illum dolore eu
                    feugiat nulla facilisis at vero eros et accumsan et iusto
                    odio dignissim qui blandit praesent luptatum zzril delenit
                    augue duis dolore te feugait nulla facilisi.
                </p>
                <p>
                    <BaseButton
                        title="Speichern und veröffentlichen"
                        icon="bench"
                    />
                    em ipsum dolor sit amet, consetetur sadipscing elitr, sed
                    diam nonumy{" "}
                    <BaseLink to="/schemes">
                        <BaseIcon
                            style={{ height: 13 }}
                            iconName="arrow-right"
                        />
                        <span>vulputate</span>
                    </BaseLink>{" "}
                    eirmod tempor invidunt ut labore et dolore magna aliquyam
                    erat, sed diam voluptua. At vero eos et accusam et justo duo
                    dolores et ea rebum. Stet clita kasd gubergren, no sea
                    takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum
                    dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
                    eirmod tempor invidunt ut labore et dolore magna aliquyam
                    erat, sed diam voluptua. At vero eos et accusam et justo duo
                    dolores et ea rebum. Stet clita kasd gubergren, no sea
                    takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum
                    dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
                    eirmod tempor invidunt ut labore et dolore magna aliquyam
                    erat, sed diam voluptua. At vero eos et accusam et justo duo
                    dolores et ea rebum. Stet clita kasd gubergren, no sea
                    takimata sanctus est Lorem ipsum dolor sit amet.
                </p>
                <p>
                    Duis autem vel eum iriure dolor in hendrerit in vulputate
                    velit esse molestie consequat, vel illum dolore eu feugiat
                    nulla facilisis at vero eros et accumsan et iusto odio
                    dignissim qui blandit praesent luptatum zzril delenit augue
                    duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit
                    amet, consectetuer adipiscing elit, sed diam nonummy nibh
                    euismod tincidunt ut laoreet dolore magna aliquam erat
                    volutpat. Ut wisi enim ad minim veniam, qui.
                </p>
                <br />
                <BaseLink to="/schemes">
                    <BaseIcon style={{ height: 13 }} iconName="gear" />
                    <span>Link</span>
                </BaseLink>
                <br />
                <BaseLink to="/schemes">
                    <BaseIcon style={{ height: 13 }} iconName="lock" />
                    <span>Link</span>
                </BaseLink>
                <br />
                <br />
                <BaseLink to="/schemes">
                    <BaseIcon style={{ height: 13 }} iconName="arrow-right" />
                    <span>Neues Programm</span>
                </BaseLink>
                <br />
                <BaseLink to="/schemes">
                    <BaseIcon style={{ height: 13 }} iconName="arrow-right" />
                    <span>Alle Programme</span>
                </BaseLink>
                <br />
                <BaseButton title="Speichern und veröffentlichen" icon="gear" />
                <BaseButton title="Speichern und veröffentlichen" icon="gear">
                    Speichern und veröffentlichen
                </BaseButton>
                <BaseLabel name="Label" />
                <BaseButton title="Speichern und veröffentlichen" icon="lock" />
            </PageLayout>
        );
    }
}

export default withTitle(Dashboard, 'Dashboard');
