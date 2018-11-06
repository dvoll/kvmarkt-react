import * as React from "react";
// import PageLayout from "src/components/layout/PageLayout/PageLayout";
// import { Scheme } from "src/scheme";
import SchemeCard from "src/scheme/SchemeCard/SchemeCard";
import { schemes } from "src/scheme/schemes.mock";

interface Props {
    time: Date;
}

class SchemeList extends React.Component<Props, {}> {

    private schemes = schemes;

    // private scheme: Scheme = {
    //     ageEnd: 13,
    //     ageStart: 8,
    //     author: 1,
    //     category: 2, 
    //     description: 'Das ist ein Programm mit einer Überschrift und einer dazugehörigen kurzen Beschreibung. Hier steht auch etwas zum  Thema des Programms.',
    //     id: 1,
    //     place: 1, 
    //     placeName: "Wald",
    //     status: 'published',
    //     title: 'Das ist ein Programm mit einer Überschrift',
    // }

    public render() {
        return <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, max-content)',
            justifyContent: 'center',
            justifyItems: 'center',
            alignItems: 'center'
            }}>

                <div>Schemes</div>
                { 
                    this.schemes.map( (scheme) => {
                        return <SchemeCard key={scheme.id} scheme={scheme} />
                    })
                }
                {/* <SchemeCard scheme={this.scheme} /> */}
            </div>;
    }
}

export default SchemeList;
