import * as React from "react";

export interface FilterBarItemProps {
    time: Date;
}

class FilterBarItem extends React.Component<FilterBarItemProps, {}> {

    constructor(props: FilterBarItemProps) {
        super(props);
    }

    public render() {
        return (
            <div />
        );
    }
}

export default FilterBarItem;
