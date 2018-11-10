import { BaseButton } from "@dvll/ulight-react";
import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { ApplicationState } from "src/store";
import { addRequest, fetchRequest } from "src/store/schemes/actions";
import { Scheme, SchemesState } from "src/store/schemes/types";

interface DispatchProps {
    addScheme: (scheme: Scheme) => any;
    load: () => any;
}

class SchemeForm extends React.Component<DispatchProps, {}> {
    private addSchemeBind = this.addScheme.bind(this);
    private load = this.props.load.bind(this);

    public addScheme() {
        this.props.addScheme({
            id: 0,
            title: 'Hinzugefügt',
            description: 'Hey',
            content: 'Inhalt',
            ageStart: 10,
            ageEnd: 12,
            author: 1,
            category: 1,
            place: 1
        })
    }


    public render() {
        return <React.Fragment>
                <BaseButton title="Add Scheme" onClick={this.addSchemeBind} />
                <BaseButton title="Load" onClick={this.load} />
            </React.Fragment>;
    }
}

// It's usually good practice to only include one context at a time in a connected component.
// Although if necessary, you can always include multiple contexts. Just make sure to
// separate them from each other to prevent prop conflicts.
const mapStateToProps = ({ schemeState }: ApplicationState) => ({
   
} as SchemesState)

// mapDispatchToProps is especially useful for constraining our actions to the connected component.
// You can access these via `this.props`.
const mapDispatchToProps = (dispatch: Dispatch) => ({
    addScheme: (scheme: Scheme) => dispatch(addRequest(scheme)),
    load: () => dispatch(fetchRequest())
});

// Now let's connect our component!
// With redux v4's improved typings, we can finally omit generics here.
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SchemeForm)
