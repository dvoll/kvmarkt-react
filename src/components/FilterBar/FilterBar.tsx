import * as React from "react";

export interface FilterBarProps {
    items?: any
}

class FilterBar extends React.Component<FilterBarProps, {}> {

    constructor(props: FilterBarProps) {
        super(props);
    }

    public render() {
        return (
            <div className="FilterBar">
                <div>
                    <label>Kategorie</label>
                    <select>
                        <option value="">Bitte wählen</option>
                    </select>
                </div>
            </div>
        );
    }
}

export default FilterBar;
