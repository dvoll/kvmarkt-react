import { BaseHeading, BaseLabel } from "@dvll/ulight-react";
import * as React from "react";
import ItemGrid from "src/components/ItemGrid/ItemGrid";
import PageLayout from "src/components/layout/PageLayout/PageLayout";
import SchemeForm from "src/components/SchemeForm/SchemeForm";
import { SchemeContext } from "src/scheme/scheme-context";
import SchemeCard from "src/scheme/SchemeCard/SchemeCard";
import { Scheme } from "src/store/schemes/types";
// import PageLayout from "src/components/layout/PageLayout/PageLayout";
// import { Scheme } from "src/scheme";
// import SchemeCard from "src/scheme/SchemeCard/SchemeCard";
// import { schemes } from "src/scheme/schemes.mock";

class SchemeList extends React.Component<{}, { shouldSchemeRender: boolean}> {

    public state = { shouldSchemeRender: false}

    public componentDidMount() {
        this.setState({ shouldSchemeRender: true });
        // setTimeout( () => {
        //     this.setState({ shouldSchemeRender: true });
        // }, 1)
    }

    public render() {
        return <PageLayout>
            <BaseLabel name="Alle Programme" />
            <BaseHeading level={1}>Finde hier dein nächstes Programm</BaseHeading>
            <SchemeForm />
            {this.state.shouldSchemeRender ? 
                <SchemeContext.Consumer>
                    {schemesState => {
                        return  <ItemGrid items={schemesState.data.slice(0, 12)} mapping={this.schemeMapping} />
                    }}
                </SchemeContext.Consumer> : null }
        </PageLayout>;
    }

    private schemeMapping(scheme: Scheme) {
        return (
            <SchemeCard
                key={scheme.id}
                scheme={scheme}
            />
        );
    }
}

export default SchemeList;
