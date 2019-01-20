import { ActionIconButton, BaseHeading, BaseIcon, BaseLabel, Button } from '@dvll/ulight-react';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import BaseLink from 'src/components/BaseLink/BaseLink';
import PageLayout from 'src/components/layout/PageLayout/PageLayout';
import withTitle from 'src/components/layout/PageLayout/withTitleComponent';
import { SchemeContext } from 'src/scheme/scheme-context';
import { Scheme } from 'src/store/schemes/types';
import { WithTitleHandlerProps } from '../dashboard/Dashboard';

export interface SchemeDetailProps {
    schemeId?: number;
}

class SchemeDetail extends React.Component<
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
                        return scheme ? this.schemeRender(scheme) : null;
                    }}
                </SchemeContext.Consumer>
            </PageLayout>
        );
    }

    private schemeRender(scheme: Scheme) {
        return (
            <React.Fragment>
                {/* <BaseLabel name={scheme.categoryName || ''} /> */}
                <BaseHeading level={1} style={{ fontSize: '1.5rem', textAlign: 'center' }}>
                    {scheme.title}
                </BaseHeading>
                <BaseLabel
                    style={{
                        // fontSize: '0.rem',
                        textAlign: 'center',
                        letterSpacing: 'normal',
                        textTransform: 'none',
                    }}
                >
                    von Max Mustermann
                </BaseLabel>
                <p>Info Badges</p>
                <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
                    <BaseLabel>Orte: </BaseLabel>
                    <Button>großer Raum</Button>
                    <Button>Wald</Button>
                </div>
                <p>{scheme.description}</p>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <ActionIconButton actionLabel={'Mag ich'}>
                        <BaseIcon iconName="heart-outline" />
                    </ActionIconButton>
                    <ActionIconButton
                        actionLabel={
                            <React.Fragment>
                                Drucken/
                                <br />
                                PDF speichern
                            </React.Fragment>
                        }
                    >
                        <BaseIcon iconName="printer" />
                    </ActionIconButton>
                    <ActionIconButton actionLabel={'Teilen'}>
                        <BaseIcon iconName="share" />
                    </ActionIconButton>
                </div>
                <p dangerouslySetInnerHTML={{ __html: scheme.content || '' }} />
                <BaseLink to={`${scheme.id}/edit`}>Bearbeiten</BaseLink>
            </React.Fragment>
        );
    }
}

export default withTitle('', true)(SchemeDetail);
