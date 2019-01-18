import { BaseHeading, BaseLabel } from '@dvll/ulight-react';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import PageLayout from 'src/components/layout/PageLayout/PageLayout';
import LoadingSpinner from 'src/components/LoadingSpinner/LoadingSpinner';
import SchemeForm from 'src/container/SchemeForm/SchemeForm';
import { SchemeContext } from 'src/scheme/scheme-context';
import { FetchDataTypeState } from 'src/store/generic/index.class';
import { Place, SchemePlaceContext } from 'src/store/places';
import { SchemeCategory, SchemeCategoryContext } from 'src/store/scheme-categories/index.generic';
import { Scheme } from 'src/store/schemes/types';

export interface SchemeEditPageProps extends RouteComponentProps<{ id: string }> {
    // time: Date;
}

class SchemeEditPage extends React.Component<SchemeEditPageProps, {}> {
    constructor(props: SchemeEditPageProps) {
        super(props);
    }

    public render() {
        const propSchemeId = this.props.match.params.id;
        return (
            <PageLayout>
                <BaseLabel name="Programm bearbeiten" />
                <BaseHeading level={1}>Ändere dein Programm</BaseHeading>
                {/* <p>Hier kannst du dein eigenens Programm dieser Sammlung hinzufügen.</p> */}
                {/* tslint:disable-next-line:jsx-no-lambda */}
                <SchemeContext.Consumer>
                    {schemes => {
                        if (schemes.loading) {
                            return <LoadingSpinner isLoading={true} height={120} />;
                        }
                        // ? have to check for undefiend?
                        if (schemes.errors) {
                            return <p>Es gab einen Fehler beim Laden des Programms.</p>;
                        }
                        const scheme = schemes.data.find(s => s.id === +propSchemeId);
                        return (
                            <SchemeCategoryContext.Consumer>
                                {categoriesState => {
                                    return (
                                        <SchemePlaceContext.Consumer>
                                            {placeState => {
                                                return this.content(scheme, placeState, categoriesState);
                                            }}
                                        </SchemePlaceContext.Consumer>
                                    );
                                }}
                            </SchemeCategoryContext.Consumer>
                        );
                    }}
                </SchemeContext.Consumer>
                <br />
                <br />
            </PageLayout>
        );
    }

    private content(
        scheme: Scheme | undefined,
        placeState: FetchDataTypeState<Place>,
        categoryState: FetchDataTypeState<SchemeCategory>
    ) {
        return (
            <SchemeForm
                scheme={scheme}
                placesState={placeState}
                categoriesState={categoryState}
                // tslint:disable-next-line:jsx-no-lambda
                submitForm={() => null}
            />
        );
    }
}

export default SchemeEditPage;
