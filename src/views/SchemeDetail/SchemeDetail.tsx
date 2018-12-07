import { BaseHeading, BaseLabel } from "@dvll/ulight-react";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import PageLayout from "src/components/layout/PageLayout/PageLayout";
import withTitle from "src/components/layout/PageLayout/withTitleComponent";
import { SchemeContext } from "src/scheme/scheme-context";
import { Scheme } from "src/store/schemes/types";
import { WithTitleHandlerProps } from "../dashboard/Dashboard";

export interface SchemeDetailProps {
    schemeId?: number;
}

class SchemeDetail extends React.Component<SchemeDetailProps & RouteComponentProps<{ id: string }> & WithTitleHandlerProps , {}> {

    constructor(props: SchemeDetailProps & RouteComponentProps<{ id: string }> & WithTitleHandlerProps) {
        super(props);
    }

    public componentDidMount() {
        // this.props.titleHandler('');
        this.props.backButtonEnableHandler(true);
    }

    public render() {
        const propSchemeId = this.props.match.params.id;
        return (
            <PageLayout>
                <SchemeContext.Consumer>
                    { schemes => {
                        const scheme = schemes.data.filter(s => s.id === +propSchemeId)[0];
                        return scheme ? this.schemeRender(scheme) : null;
                    }}
                </SchemeContext.Consumer>
            </PageLayout>
        );
    }

    private schemeRender(scheme: Scheme) {
        return <div>
            <BaseLabel name={scheme.categoryName || ''} />
            <BaseHeading level={2}>{scheme.title}</BaseHeading>
            <p>{scheme.description}</p>
            <p dangerouslySetInnerHTML={{'__html': scheme.content || ''}} />
        </div>
    }
}

export default withTitle('', true)(SchemeDetail);
