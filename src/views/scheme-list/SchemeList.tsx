import { BaseHeading, BaseLabel } from "@dvll/ulight-react";
import * as React from "react";
import ItemGrid from "src/components/ItemGrid/ItemGrid";
import PageLayout from "src/components/layout/PageLayout/PageLayout";
import SchemeForm from "src/components/SchemeForm/SchemeForm";
import { SchemeContext } from "src/scheme/scheme-context";
import SchemeCard from "src/scheme/SchemeCard/SchemeCard";
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
            {this.state.shouldSchemeRender ? <React.Suspense fallback={<div>
                            Loading...
                        </div>}>
                    <ItemGrid>
                        <SchemeContext.Consumer>
                            {schemesState => {
                                return schemesState.data.map(
                                    scheme => {
                                        return (
                                            <SchemeCard
                                                key={scheme.id}
                                                scheme={scheme}
                                            />
                                        );
                                    }
                                );
                            }}
                        </SchemeContext.Consumer>
                    </ItemGrid>
                </React.Suspense> : <div>Loading...</div>}
            {/*tslint:disable-next-line:jsx-no-lambda */}
        </PageLayout>;
    }
}

export default SchemeList;
