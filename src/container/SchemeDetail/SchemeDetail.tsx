import { ActionIconButton, BaseHeading, BaseIcon, BaseLabel, Button } from '@dvll/ulight-react';
import * as React from 'react';
import BaseLink from 'src/components/BaseLink/BaseLink';
import { Scheme } from 'src/store/schemes/types';

export interface SchemeDetailProps {
    scheme: Scheme;
}

class SchemeDetail extends React.Component<SchemeDetailProps, {}> {
    constructor(props: SchemeDetailProps) {
        super(props);
    }

    public render() {
        const { scheme } = this.props;
        return (
            <React.Fragment>
                {/* <BaseLabel name={scheme.categoryName || ''} /> */}
                <BaseHeading level={1} style={{ fontSize: '1.5rem', textAlign: 'center' }}>
                    {scheme.title}
                </BaseHeading>
                <BaseLabel noTransform style={{ textAlign: 'center' }}>
                    von Max Mustermann
                </BaseLabel>
                <InfoBadgesContainer
                    items={[
                        {
                            name: 'Alter',
                            content: (
                                <span>
                                    {scheme.ageStart} - {scheme.ageEnd}
                                </span>
                            ),
                        },
                        {
                            name: 'Dauer',
                            content: (
                                <span>
                                    {scheme.duration ? scheme.duration.hours + ':' + scheme.duration.minutes : ''}
                                </span>
                            ),
                        },
                        {
                            name: 'Kategorie',
                            content: (
                                <Button className={'Badge category-' + scheme.category}>{scheme.categoryName}</Button>
                            ),
                        },
                    ]}
                />
                <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
                    <BaseLabel>Orte: </BaseLabel>&nbsp;
                    <Button>großer Raum</Button>&nbsp;
                    <Button>Wald</Button>
                </div>
                <p style={{ lineHeight: '1.8rem', fontSize: '1.2rem' }}>{scheme.description}</p>
                <div style={{ display: 'flex', justifyContent: 'space-around', maxWidth: '450px', margin: '0 auto' }}>
                    <ActionIconButton style={{ minWidth: 100 }} actionLabel={'Mag ich'}>
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
                    <ActionIconButton style={{ minWidth: 100 }} actionLabel={'Teilen'}>
                        <BaseIcon iconName="share" />
                    </ActionIconButton>
                </div>
                <p
                    style={{ lineHeight: '1.8rem', fontSize: '1.1rem' }}
                    dangerouslySetInnerHTML={{ __html: scheme.content || '' }}
                />
                <BaseLink to={`${scheme.id}/edit`}>Bearbeiten</BaseLink>
            </React.Fragment>
        );
    }
}

interface InfoBadge {
    name: string;
    content: React.ReactNode;
}
interface InfoBadgesProps {
    items: InfoBadge[];
}

const InfoBadgesContainer: React.SFC<InfoBadgesProps> = ({ items }) => {
    const elements = items.map(item => (
        <React.Fragment key={item.name}>
            {item.content}
            <BaseLabel textSize="small">{item.name}</BaseLabel>
        </React.Fragment>
    ));
    return <div className="Kvmarkt-InfoBadesContainer">{elements}</div>;
};

export default SchemeDetail;
