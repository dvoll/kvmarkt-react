import {
    BaseButton,
    BaseHeading,
    BaseIcon,
    BaseLabel
} from "@dvll/ulight-react";
import * as React from "react";
import BaseLink from "src/components/BaseLink";

interface Props {
    time: Date;
}

class Dashboard extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
    }

    public render() {
        return (
            <div className="Dashboard">
                <BaseLabel name="Label" />
                <BaseHeading level={1}>Heading</BaseHeading>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua. At vero eos et accusam et
                justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum
                dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
                eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
                sed diam voluptua. At vero eos et accusam et justo duo dolores
                et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus
                est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
                consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                invidunt ut labore et dolore magna aliquyam erat, sed diam
                voluptua. At vero eos et accusam et justo duo dolores et ea
                rebum. Stet clita kasd gubergren, no sea takimata sanctus est
                Lorem ipsum dolor sit amet. Duis autem vel eum iriure dolor in
                hendrerit in vulputate velit esse molestie consequat, vel illum
                dolore eu feugiat nulla facilisis at vero eros et accumsan et
                iusto odio dignissim qui blandit praesent luptatum zzril delenit
                augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor
                sit amet, consectetuer adipiscing elit, sed diam nonummy nibh
                euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
                Ut wisi enim ad minim veniam, quis nostrud exerci tation
                ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
                consequat. Duis autem vel eum iriure dolor in hendrerit in
                vulputate velit esse molestie consequat, vel illum dolore eu
                feugiat nulla facilisis at vero eros et accumsan et iusto odio
                dignissim qui blandit praesent luptatum zzril delenit augue duis
                dolore te feugait nulla facilisi.
                <BaseButton name="Speichern und veröffentlichen" icon="bench" />
                em ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                nonumy{" "}
                <BaseLink to="/schemes">
                    <BaseIcon style={{ height: 13 }} iconName="arrow-right" />
                    <span>vulputate</span>
                </BaseLink>{" "}
                eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
                sed diam voluptua. At vero eos et accusam et justo duo dolores
                et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus
                est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
                consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                invidunt ut labore et dolore magna aliquyam erat, sed diam
                voluptua. At vero eos et accusam et justo duo dolores et ea
                rebum. Stet clita kasd gubergren, no sea takimata sanctus est
                Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
                consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                invidunt ut labore et dolore magna aliquyam erat, sed diam
                voluptua. At vero eos et accusam et justo duo dolores et ea
                rebum. Stet clita kasd gubergren, no sea takimata sanctus est
                Lorem ipsum dolor sit amet. Duis autem vel eum iriure dolor in
                hendrerit in vulputate velit esse molestie consequat, vel illum
                dolore eu feugiat nulla facilisis at vero eros et accumsan et
                iusto odio dignissim qui blandit praesent luptatum zzril delenit
                augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor
                sit amet, consectetuer adipiscing elit, sed diam nonummy nibh
                euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
                Ut wisi enim ad minim veniam, qui
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
                <BaseButton name="Speichern und veröffentlichen" icon="gear" />
                <BaseLabel name="Label" />
                <BaseButton name="Speichern und veröffentlichen" icon="lock" />
            </div>
        );
    }
}

export default Dashboard;
