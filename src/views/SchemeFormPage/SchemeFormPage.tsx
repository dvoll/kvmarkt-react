import { BaseButton, BaseFormLabel, BaseHeading, BaseInput, ThemeContext } from "@dvll/ulight-react";
import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import DynamicFormField, { DynamicFormInputTypes } from "src/components/DynamicFormField/DynamicFormField";
import PageLayout from "src/components/layout/PageLayout/PageLayout";
import RoundedCard from "src/components/RoundedCard/RoundedCard";
import SchemeTextEditor from "src/container/SchemeTextEditor/SchemeTextEditor";
import { ApplicationState } from "src/store";
import CategoryStateObject, { SchemeCategory } from "src/store/scheme-categories/index.generic";

interface SchemeFormPageState {
    title: string;
}
export interface SchemeFormPageProps {
    categories?: SchemeCategory[],
    loadCategories?: () => any
}


class SchemeFormPage extends React.Component<SchemeFormPageProps, SchemeFormPageState> {

    constructor(props: SchemeFormPageProps) {
        super(props);
        this.state = { 
            title: ''
        };
        this.submitForm = this.submitForm.bind(this);
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
        return <PageLayout>
            <BaseButton onClick={this.props.loadCategories}>Load Categories</BaseButton>
            <form onSubmit={this.submitForm} >
                <ThemeContext.Consumer>
                    {theme => {
                        const styles = {
                            // ["--accent-rgb" as any]: theme.accent,
                            ["--foreground-rgb" as any]: theme.foreground,
                            ["--secondary-rgb" as any]: theme.secondary,
                            ["--background-rgb" as any]: theme.background,
                            ["--background-accent-rgb" as any]: theme.backgroundAccent,
                            // ...props.style
                        };
                        const accentColor = `rgba(${theme.accent}, 1)`;
                    return <React.Fragment>
                        <RoundedCard style={{ ...styles, display: 'flex', flexDirection: 'column'} }>
                            <BaseHeading level={1}>
                                <span style={{ color: accentColor }}>
                                    1.
                                </span> Infos
                            </BaseHeading>
                            <BaseFormLabel htmlFor='title'>Überschrift</BaseFormLabel>
                            <BaseInput type="text" name="title" />
                            <DynamicFormField type={DynamicFormInputTypes.TEXT} labelname="Überschrift #d"  />
                            <BaseFormLabel htmlFor='category'>Kategorie</BaseFormLabel>
                            <select defaultValue='0'>
                                <option value={0}>Auswählen...</option>
                                <option value={1}>Geländespiel</option>
                                <option value={2}>Quiz</option>
                                <option value={3}>Bibelarbeit</option>
                            </select>
                            <DynamicFormField type={DynamicFormInputTypes.SELECT} labelname="Kategorie #d" items={[
                                {value: 0, name: 'Auswählen...'},
                                {value: 1, name: 'Geländespiel'},
                                {value: 2, name: 'Quiz'},
                                {value: 3, name: 'Bibel'},
                            ]} />
                        </RoundedCard>
                        <RoundedCard style={styles}>
                            <BaseHeading level={1}>
                                <span style={{ color: accentColor }}>
                                    2.
                                </span> Inhalt
                            </BaseHeading>
                            <SchemeTextEditor text="<h1>Eine Überschrift</h1>" />
                        </RoundedCard>
                    </React.Fragment>;
                    }}
                </ThemeContext.Consumer>
            </form>
        </PageLayout>
    }

    private submitForm() {
        // TODO
    }
}

const mapStateToProps = ({categoriesState}: ApplicationState) => {
    return {categories: categoriesState.data}
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        loadCategories: () => dispatch(CategoryStateObject.fetchRequest())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SchemeFormPage);
