import { BaseButton, Input, Select, SelectOption, TextArea } from '@dvll/ulight-react';
import * as React from 'react';
import { connect } from 'react-redux';
import { Prompt } from 'react-router';
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
    // places: string[];
    touched: boolean;
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
    AGE_START = 'age-start',
    AGE_END = 'age-end',
}

class SchemeForm extends React.Component<SchemeFormProps, SchemeFormState> {
    public readonly state: SchemeFormState = {
        id: 0,
        title: '',
        description: 'Deine Beschreibung',
        content: '<h1>Deine Überschrift</h1><p>Dein <strong>Inhalt</strong>!</p>',
        ageStart: 7,
        ageEnd: 13,
        author: -1,
        category: -1,
        // place: -1,
        places: [],
        duration: { hours: 0, minutes: 5 },
        forceErrors: false,
        touched: false,
    };

    // private UlightCard = withUlightTheme(RoundedCard);

    constructor(props: SchemeFormProps) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFormInput = this.handleFormInput.bind(this);
    }

    public render() {
        const { category, places, title, description, content = '', ageStart, ageEnd } = this.state;
        return (
            <form onSubmit={this.handleSubmit}>
                <React.Fragment>
                    <Prompt
                        when={this.state.touched}
                        message="Noch wurden deine Änderungen nicht gespeichert. Trotzdem diese Seite verlassen?"
                    />
                    {this.titleInput(title)}
                    {this.descriptionInput(description)}
                    {this.categorySelect(this.props.categoriesState, category)}
                    {this.placeSelect(this.props.placesState, places)}
                    {this.ageInput(ageStart, ageEnd)}
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
    private placeErrorMessages(places: number[]): string[] {
        const errors: string[] = [];
        if (places.length === 0) {
            errors.push('Es muss mindestens ein Ort ausgewählt werden.');
        }
        return errors;
    }

    private placeSelect(placesState: FetchDataTypeState<Place>, places: number[]) {
        const stringPlaces = places.map(x => '' + x);
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
                        value={stringPlaces}
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

    //#region age input
    private ageErrorMessages(ageStart: number, ageEnd: number): string[] {
        const messages: string[] = [];
        if (ageStart < 0 || ageEnd < 0 || ageStart > 99) {
            messages.push('Das Alter muss im Bereich von 1 bis 99 sein. ');
        }
        if (ageStart >= ageEnd) {
            messages.push('Das maximale Alter muss größer sein als das Minimale.');
        }
        return messages;
    }

    private ageInput(ageStart: number, ageEnd: number) {
        return (
            <FormField
                labelName="Alter"
                errors={this.ageErrorMessages(ageStart, ageEnd)}
                showError={this.shouldShowErrors()}
            >
                <div className={'DurationPicker'}>
                    <label htmlFor={InputFieldNames.AGE_START}>von</label>
                    <Input
                        id={InputFieldNames.AGE_START}
                        name={InputFieldNames.AGE_START}
                        value={ageStart}
                        onChange={this.handleFormInput}
                        className="DurationPickerInput"
                        type="number"
                        min="1"
                        max="99"
                    />
                    <label htmlFor={InputFieldNames.AGE_END}>bis</label>
                    <Input
                        id={InputFieldNames.AGE_END}
                        name={InputFieldNames.AGE_END}
                        value={ageEnd}
                        onChange={this.handleFormInput}
                        className="DurationPickerInput"
                        type="number"
                        min="1"
                        max="99"
                    />
                </div>
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
        const anyEvent = event as React.ChangeEvent<any>;
        switch (elementId) {
            case InputFieldNames.TITLE:
                // event = event as React.ChangeEvent<HTMLInputElement>;
                this.setState({ title: '' + event.target.value, touched: true });
                break;
            case InputFieldNames.CATEGORY:
                // event = event as React.ChangeEvent<HTMLSelectElement>;
                const category = +(event.target.value as string | number);
                const categoryObject = this.props.categoriesState.data.find(cat => cat.id === category);
                const categoryName = categoryObject !== undefined ? categoryObject.name : '';
                this.setState({ category, categoryName, touched: true });
                break;
            case InputFieldNames.PLACES:
                // event = event as React.ChangeEvent<HTMLSelectElement>;
                const tar = event.target as any;
                const places = tar.selectedOptions;
                console.log('places', places);
                this.setState({ places, touched: true });
                break;
            case InputFieldNames.DESCRIPTION:
                event = event as React.ChangeEvent<HTMLSelectElement>;
                this.setState({ description: event.target.value, touched: true });
                break;
            case InputFieldNames.CONTENT:
                this.setState({ content: event.target.value, touched: true });
                break;
            case InputFieldNames.DURATION:
                const hours = anyEvent.target.hours;
                const minutes = anyEvent.target.minutes;
                this.setState({ duration: { hours, minutes }, touched: true });
                break;
            case InputFieldNames.AGE_START:
                const ageStart = +anyEvent.target.value;
                this.setState({ ageStart, touched: true });
                break;
            case InputFieldNames.AGE_END:
                const ageEnd = +anyEvent.target.value;
                this.setState({ ageEnd, touched: true });
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
