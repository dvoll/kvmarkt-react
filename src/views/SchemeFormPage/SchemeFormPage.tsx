import { BaseButton } from '@dvll/ulight-react';
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import PageLayout from 'src/components/layout/PageLayout/PageLayout';
import SchemeForm from 'src/container/SchemeForm/SchemeForm';
import { ApplicationState } from 'src/store';
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
}

class SchemeFormPage extends React.Component<SchemeFormPageProps, SchemeFormPageState> {
    constructor(props: SchemeFormPageProps) {
        super(props);

        // this.submitForm = this.submitForm.bind(this);
    }

    public render() {
        // const step1FormState =
        // {
        //     name: 'schemeForm',
        //     heading: 'Programm erstellen',
        //     groups: [
        //         {
        //             heading: 'Gruppenüberschrift',
        //             inputItems: [
        //                 {
        //                     type: DynamicFormInputTypes.TEXT,
        //                     labelName: 'Überschrift',
        //                     onChange: (event: React.ChangeEvent<HTMLInputElement>) => this.setState({title: event.target.value})
        //                 }
        //             ]
        //         }
        //     ]
        // };

        return (
            <PageLayout>
                <BaseButton onClick={this.props.loadCategories}>Load Categories</BaseButton>
                {/* tslint:disable-next-line:jsx-no-lambda */}
                <SchemeForm submitForm={(scheme: Scheme) => console.table(scheme)} />
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
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SchemeFormPage);
