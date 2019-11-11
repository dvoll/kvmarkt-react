import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import PageLayout from 'src/components/Layout/PageLayout/PageLayout';
import withTitle from 'src/components/Layout/PageLayout/withTitleComponent';
import SchemeDetail from 'src/container/SchemeDetail/SchemeDetail';
import { SchemeContext } from 'src/scheme/scheme-context';
import { WithTitleHandlerProps } from '../dashboard/Dashboard';

export interface SchemeDetailProps {
    schemeId?: number;
}

class SchemeDetailPage extends React.Component<
    SchemeDetailProps & RouteComponentProps<{ id: string }> & WithTitleHandlerProps,
    {}
> {
    constructor(props: SchemeDetailProps & RouteComponentProps<{ id: string }> & WithTitleHandlerProps) {
        super(props);
    }

    public componentDidMount() {
        // this.props.titleHandler('');
        // this.props.backButtonEnableHandler(true);
    }

    public render() {
        const propSchemeId = this.props.match.params.id;
        return (
            <PageLayout maxWidth={540}>
                <SchemeContext.Consumer>
                    {schemes => {
                        const scheme = schemes.data.find(s => s.id === +propSchemeId);
                        return scheme ? <SchemeDetail scheme={scheme} /> : null;
                    }}
                </SchemeContext.Consumer>
            </PageLayout>
        );
    }
}

export default withTitle('', true)(SchemeDetailPage);
