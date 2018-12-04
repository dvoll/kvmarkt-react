import * as React from "react";
import FilterBar from "src/components/FilterBar/FilterBar";

interface SchemeFilterBarState {
    time: Date;
}
export interface  SchemeFilterBarProps {
    items?: any
}

class SchemeFilterBar extends React.Component<SchemeFilterBarProps, SchemeFilterBarState> {

    constructor(props: SchemeFilterBarProps) {
        super(props);
        this.state = { time: new Date()};
    }

    public render() {
        return (
            <div>
                <FilterBar />
            </div>
        );
    }
}

export default SchemeFilterBar;
