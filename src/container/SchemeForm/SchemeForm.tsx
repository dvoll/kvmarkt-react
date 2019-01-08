import { BaseHeading, BaseInput, Select, SelectOption, ThemeContext, withUlightTheme } from '@dvll/ulight-react';
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { DynamicFormInputTypes } from 'src/components/DynamicFormField/DynamicFormField';
import FormField from 'src/components/DynamicFormField/FormField';
import RoundedCard from 'src/components/RoundedCard/RoundedCard';
import { ApplicationState } from 'src/store';
import { FetchDataTypeState } from 'src/store/generic/index.class';
import { SchemeCategory } from 'src/store/scheme-categories/index.generic';
import { addRequest, fetchRequest } from 'src/store/schemes/actions';
import { Scheme } from 'src/store/schemes/types';
import SchemeTextEditor from '../SchemeTextEditor/SchemeTextEditor';

interface SchemeFormState extends Scheme {
    places: string[];
}

interface DispatchProps {
    addScheme: (scheme: Scheme) => any;
    load: () => any;
}

interface SchemeFormProps extends DispatchProps {
    scheme?: Scheme;
    // categories?: SchemeCategory[];
    submitForm: (scheme: Scheme) => void;
    categoriesState: FetchDataTypeState<SchemeCategory>;
}

enum InputFieldNames {
    TITLE = 'title',
    CATEGORY = 'category',
    PLACES = 'places',
}

class SchemeForm extends React.Component<SchemeFormProps, SchemeFormState> {
    public readonly state: SchemeFormState = {
        id: 0,
        title: 'Hinzugefügt',
        description: 'Hey',
        content: 'Inhalt',
        ageStart: 10,
        ageEnd: 12,
        author: 1,
        category: 1,
        place: 1,
        places: ['1'],
    };

    private UlightCard = withUlightTheme(RoundedCard);

    constructor(props: SchemeFormProps) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFormInput = this.handleFormInput.bind(this);
    }

    // public addScheme() {
    //     this.props.addScheme({
    //         id: 0,
    //         title: 'Hinzugefügt',
    //         description: 'Hey',
    //         content: 'Inhalt',
    //         ageStart: 10,
    //         ageEnd: 12,
    //         author: 1,
    //         category: 1,
    //         place: 1,
    //     });
    // }

    public render() {
        const { category, places, title } = this.state;

        return (
            <form onSubmit={this.handleSubmit}>
                <ThemeContext.Consumer>
                    {theme => {
                        const accentColor = `rgba(${theme.accent}, 1)`;
                        return (
                            <React.Fragment>
                                <this.UlightCard
                                    name="rounded01"
                                    key="rounded01"
                                    style={{
                                        // ...styles,
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}
                                >
                                    <BaseHeading level={1}>
                                        <span style={{ color: accentColor }}>1.</span> Infos
                                    </BaseHeading>

                                    {this.titleInput(title)}
                                    {this.categorySelect(this.props.categoriesState, category)}
                                    {this.placeSelect(places)}
                                </this.UlightCard>
                                <this.UlightCard style={{}} key="rounded02">
                                    <BaseHeading level={1}>
                                        <span style={{ color: accentColor }}>2.</span> Inhalt
                                    </BaseHeading>
                                    {this.textEditor()}
                                </this.UlightCard>
                            </React.Fragment>
                        );
                    }}
                </ThemeContext.Consumer>
            </form>
        );
    }

    private textEditor() {
        return <SchemeTextEditor text="<h1>Eine Überschrift</h1>" />;
    }

    private categorySelect(categoriesState: FetchDataTypeState<SchemeCategory>, value: number) {
        return (
            <FormField labelName="Kategorie">
                {categoriesState.loading ? (
                    <span>lädt...</span>
                ) : (
                    <Select
                        key={InputFieldNames.CATEGORY}
                        id={InputFieldNames.CATEGORY}
                        name="category"
                        value={value}
                        /* tslint:disable-next-line:jsx-no-lambda */ onChange={this.handleFormInput}
                    >
                        {categoriesState.data.map(item => (
                            <SelectOption key={'category' + item.id} value={item.id}>
                                {item.name}
                            </SelectOption>
                        ))}
                    </Select>
                )}
            </FormField>
        );
    }
    private placeSelect(places: string[]) {
        return (
            <FormField labelName="Orte">
                <Select
                    id={InputFieldNames.PLACES}
                    multiple={true}
                    name="places"
                    value={places}
                    /* tslint:disable-next-line:jsx-no-lambda */ onChange={this.handleFormInput}
                >
                    <SelectOption value={3}>Garten</SelectOption>
                    <SelectOption value={2}>großer Raum</SelectOption>
                    <SelectOption value={1}>Sporthalle</SelectOption>
                </Select>
            </FormField>
        );
    }

    private titleInput(title: string) {
        return (
            // <BaseInput //                             </BaseFormLabel > //     Überschrift // <BaseFormLabel htmlFor = "title" >
            //     key="input12"
            //     type="text"
            //     name="title"
            //     value={title}
            //     onChange={this.handleFormInput}
            //     id={InputFieldNames.TITLE}
            // />
            <FormField labelName="Überschrift" id={InputFieldNames.TITLE}>
                <BaseInput type={DynamicFormInputTypes.TEXT} value={title} onChange={this.handleFormInput} />
            </FormField>
        );
    }

    private handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        this.props.submitForm(this.state);
    }
    private handleFormInput(event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) {
        const elementId = event.target.id;
        switch (elementId) {
            case InputFieldNames.TITLE:
                this.setState({ title: '' + event.target.value });
                break;
            case InputFieldNames.CATEGORY:
                const category = +(event.target.value as string | number);
                this.setState({ category, categoryName: this.props.categoriesState.data[category].name });
                // ,
                break;
            case InputFieldNames.PLACES:
                const tar = event.target as any;
                const places = tar.selectedOptions;
                console.log('places', places);
                this.setState({ place: +places[0], places });
                break;
            default:
        }
        // this.props.submitForm(this.state);
    }
}

// It's usually good practice to only include one context at a time in a connected component.
// Although if necessary, you can always include multiple contexts. Just make sure to
// separate them from each other to prevent prop conflicts.
const mapStateToProps = ({ categoriesState }: ApplicationState) => ({
    categoriesState,
});

// mapDispatchToProps is especially useful for constraining our actions to the connected component.
// You can access these via `this.props`.
const mapDispatchToProps = (dispatch: Dispatch) => ({
    addScheme: (scheme: Scheme) => dispatch(addRequest(scheme)),
    load: () => dispatch(fetchRequest()),
});

// Now let's connect our component!
// With redux v4's improved typings, we can finally omit generics here.
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SchemeForm);
