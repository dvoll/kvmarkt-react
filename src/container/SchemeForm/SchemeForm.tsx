import { BaseButton, Input, Select, SelectOption, TextArea } from '@dvll/ulight-react';
import * as React from 'react';
import { connect } from 'react-redux';
import DurationPicker from 'src/components/DurationPicker/DurationPicker';
import { DynamicFormInputTypes } from 'src/components/DynamicFormField/DynamicFormField';
import FormField from 'src/components/DynamicFormField/FormField';
import LoadingSpinner from 'src/components/LoadingSpinner/LoadingSpinner';
import { ApplicationState } from 'src/store';
import { FetchDataTypeState } from 'src/store/generic/index.class';
import { Place } from 'src/store/places';
import { SchemeCategory } from 'src/store/scheme-categories/index.generic';
import { Scheme } from 'src/store/schemes/types';
import SchemeTextEditor from '../SchemeTextEditor/SchemeTextEditor';

interface SchemeFormState extends Scheme {
    forceErrors: boolean;
    places: string[];
}

// interface DispatchProps {
//     addScheme: (scheme: Scheme) => any;
//     load: () => any;
// }

interface SchemeFormProps {
    scheme?: Scheme;
    // categories?: SchemeCategory[];
    submitForm: (scheme: Scheme) => void;
    categoriesState: FetchDataTypeState<SchemeCategory>;
    placesState: FetchDataTypeState<Place>;
}

enum InputFieldNames {
    TITLE = 'title',
    CATEGORY = 'category',
    PLACES = 'places',
    DESCRIPTION = 'description',
    CONTENT = 'content',
    DURATION = 'duration',
}

class SchemeForm extends React.Component<SchemeFormProps, SchemeFormState> {
    public readonly state: SchemeFormState = {
        id: 0,
        title: '',
        description: 'Deine Beschreibung',
        content: '<h1>Deine Überschrift</h1><p>Dein <strong>Inhalt</strong>!</p>',
        ageStart: -1,
        ageEnd: -1,
        author: -1,
        category: -1,
        place: -1,
        places: [],
        duration: { hours: 0, minutes: 5 },
        forceErrors: false,
    };

    // private UlightCard = withUlightTheme(RoundedCard);

    constructor(props: SchemeFormProps) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFormInput = this.handleFormInput.bind(this);
    }

    public render() {
        const { category, places, title, description, content = '' } = this.state;
        return (
            <form onSubmit={this.handleSubmit}>
                <React.Fragment>
                    {this.titleInput(title)}
                    {this.descriptionInput(description)}
                    {this.categorySelect(this.props.categoriesState, category)}
                    {this.placeSelect(this.props.placesState, places)}
                    {this.durationInput()}
                    {this.textEditor(content)}
                    <BaseButton type="submit">Absenden</BaseButton>
                </React.Fragment>
            </form>
        );
    }

    private shouldShowErrors() {
        return this.state.forceErrors ? true : 'touched';
    }

    //#region title input
    private titleErrorMessages(title: string): string[] {
        const errors: string[] = [];
        const min = 8;
        if (title.length < min) {
            errors.push(`Die Überschrift muss aus mindestens ${min} Zeichen bestehen.`);
        }
        return errors;
    }

    private titleInput(title: string) {
        return (
            <FormField
                labelName="Überschrift"
                id={InputFieldNames.TITLE}
                errors={this.titleErrorMessages(title)}
                showError={this.shouldShowErrors()}
            >
                <Input type={DynamicFormInputTypes.TEXT} value={title} onChange={this.handleFormInput} />
            </FormField>
        );
    }

    //#endregion

    //#region description input
    private descriptionErrorMessages(title: string): string[] {
        const errors: string[] = [];
        const min = 20;
        const max = 200;
        if (title.length < min) {
            errors.push(`Die Kurzbeschreibung muss aus mindestens ${min} Zeichen bestehen.`);
        }
        if (title.length > max) {
            errors.push(`Die Kurzbeschreibung darf aus höchstens ${max} Zeichen bestehen.`);
        }
        return errors;
    }

    private descriptionInput(description: string) {
        return (
            <FormField
                labelName="Kurzbeschreibung"
                id={InputFieldNames.DESCRIPTION}
                errors={this.descriptionErrorMessages(description)}
                showError={this.shouldShowErrors()}
            >
                <TextArea value={description} onChange={this.handleFormInput} />
            </FormField>
        );
    }
    //#endregion

    //#region category select
    private categoryErrorMessages(categoryId: number): string[] {
        const errors: string[] = [];
        if (categoryId === -1) {
            errors.push('Keine Kategorie gewählt.');
        }
        return errors;
    }
    private categorySelect(categoriesState: FetchDataTypeState<SchemeCategory>, value: number) {
        return (
            <FormField
                labelName="Kategorie"
                description="Wähle genau eine Kategorie, die am Besten zu deinem Programm passt."
                errors={this.categoryErrorMessages(value)}
                showError={this.shouldShowErrors()}
            >
                {categoriesState.loading ? (
                    <LoadingSpinner isLoading={true} height={80} />
                ) : (
                    <Select
                        key={InputFieldNames.CATEGORY}
                        id={InputFieldNames.CATEGORY}
                        name="category"
                        value={value}
                        onChange={this.handleFormInput}
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
    //#endregion

    //#region place select
    private placeErrorMessages(places: string[]): string[] {
        const errors: string[] = [];
        if (places.length === 0) {
            errors.push('Es muss mindestens ein Ort ausgewählt werden.');
        }
        return errors;
    }

    private placeSelect(placesState: FetchDataTypeState<Place>, places: string[]) {
        return (
            <FormField
                labelName="Orte"
                description="Wähle einen oder mehrere Orte, an denen sich dein Programm durchführen lässt."
                errors={this.placeErrorMessages(places)}
                showError={this.shouldShowErrors()}
            >
                {placesState.loading ? (
                    <LoadingSpinner isLoading={true} height={80} />
                ) : (
                    <Select
                        id={InputFieldNames.PLACES}
                        multiple={true}
                        name="places"
                        value={places}
                        onChange={this.handleFormInput}
                    >
                        {placesState.data.map(item => (
                            <SelectOption key={'place' + item.id} value={item.id}>
                                {item.name}
                            </SelectOption>
                        ))}
                    </Select>
                )}
            </FormField>
        );
    }
    //#endregion

    //#region duration input
    private durationInput() {
        return (
            <FormField labelName="Dauer">
                <DurationPicker
                    id={InputFieldNames.DURATION}
                    hours={this.state.duration.hours}
                    minutes={this.state.duration.minutes}
                    onChange={this.handleFormInput}
                />
            </FormField>
        );
    }
    //#endregion

    //#region content input
    private contentErrorMessages(content: string): string[] {
        const errors: string[] = [];
        const min = 50;
        if (content.length < min) {
            errors.push(`Die ausführliche Beschreibung muss aus mindestens ${min} Zeichen bestehen.`);
        }
        return errors;
    }

    private textEditor(content: string) {
        return (
            <FormField
                labelName="Ausführliche Beschreibung"
                id={InputFieldNames.CONTENT}
                errors={this.contentErrorMessages(content)}
                showError={this.shouldShowErrors()}
            >
                <SchemeTextEditor value={content} onChange={this.handleFormInput} />
            </FormField>
        );
    }
    //#endregion

    private handleFormInput(
        event:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLSelectElement>
            | React.ChangeEvent<HTMLTextAreaElement>
    ) {
        const elementId = event.target.id;
        switch (elementId) {
            case InputFieldNames.TITLE:
                // event = event as React.ChangeEvent<HTMLInputElement>;
                this.setState({ title: '' + event.target.value });
                break;
            case InputFieldNames.CATEGORY:
                // event = event as React.ChangeEvent<HTMLSelectElement>;
                const category = +(event.target.value as string | number);
                this.setState({ category, categoryName: this.props.categoriesState.data[category].name });
                break;
            case InputFieldNames.PLACES:
                // event = event as React.ChangeEvent<HTMLSelectElement>;
                const tar = event.target as any;
                const places = tar.selectedOptions;
                console.log('places', places);
                this.setState({ place: places[0] ? +places[0] : -1, places });
                break;
            case InputFieldNames.DESCRIPTION:
                event = event as React.ChangeEvent<HTMLSelectElement>;
                this.setState({ description: event.target.value });
                break;
            case InputFieldNames.CONTENT:
                this.setState({ content: event.target.value });
                break;
            case InputFieldNames.DURATION:
                const ev = event as React.ChangeEvent<any>;
                const hours = ev.target.hours;
                const minutes = ev.target.minutes;
                this.setState({ duration: { hours, minutes } });
                break;
            default:
        }
        // this.props.submitForm(this.state);
    }

    private handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        this.setState({ forceErrors: true });
        this.props.submitForm(this.state);
    }
}

// It's usually good practice to only include one context at a time in a connected component.
// Although if necessary, you can always include multiple contexts. Just make sure to
// separate them from each other to prevent prop conflicts.
const mapStateToProps = ({ categoriesState, placesState }: ApplicationState) => ({
    placesState,
    categoriesState,
});

// mapDispatchToProps is especially useful for constraining our actions to the connected component.
// You can access these via `this.props`.
// const mapDispatchToProps = (dispatch: Dispatch) => ({
//     addScheme: (scheme: Scheme) => dispatch(addRequest(scheme)),
//     load: () => dispatch(fetchRequest()),
// });

// Now let's connect our component!
// With redux v4's improved typings, we can finally omit generics here.
export default connect(mapStateToProps)(SchemeForm);
