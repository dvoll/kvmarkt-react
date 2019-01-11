import { BaseButton, BaseHeading, BaseLabel } from '@dvll/ulight-react';
import * as React from 'react';
import { connect } from 'react-redux';
import { compose, Dispatch } from 'redux';
import PageLayout from 'src/components/layout/PageLayout/PageLayout';
import withTitle from 'src/components/layout/PageLayout/withTitleComponent';
import SchemeForm from 'src/container/SchemeForm/SchemeForm';
import { ApplicationState } from 'src/store';
import PlaceStateObject from 'src/store/places';
import CategoryStateObject, { SchemeCategory } from 'src/store/scheme-categories/index.generic';
import { Scheme } from 'src/store/schemes/types';

interface SchemeFormPageState {
    title: string;
    checkedValues: string[];
    radioValue: string;
}
export interface SchemeFormPageProps {
    categories?: SchemeCategory[];
    loadCategories?: () => any;
    loadPlaces?: () => any;
}

class SchemeFormPage extends React.Component<SchemeFormPageProps, SchemeFormPageState> {
    constructor(props: SchemeFormPageProps) {
        super(props);

        // this.submitForm = this.submitForm.bind(this);
    }

    public render() {
        return (
            <PageLayout>
                <BaseLabel name="Neues Programm" />
                <BaseHeading level={1}>Füge dein Programm hinzu</BaseHeading>
                <p>Hier kannst du dein eigenens Programm dieser Sammlung hinzufügen.</p>
                {/* tslint:disable-next-line:jsx-no-lambda */}
                <SchemeForm submitForm={(scheme: Scheme) => console.table(scheme)} />
                <br />
                <br />
                <BaseButton onClick={this.props.loadCategories}>Load Categories</BaseButton>
                <BaseButton onClick={this.props.loadPlaces}>Load Places</BaseButton>
            </PageLayout>
        );
    }

    // private submitForm() {
    //     // TODO
    // }
}

const mapStateToProps = ({ categoriesState }: ApplicationState) => {
    return { categories: categoriesState.data };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        loadCategories: () => dispatch(CategoryStateObject.fetchRequest()),
        loadPlaces: () => dispatch(PlaceStateObject.fetchRequest()),
    };
};

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    withTitle('Programm hinzufügen', true)
)(SchemeFormPage);
