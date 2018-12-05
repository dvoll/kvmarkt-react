import * as React from "react";

import './FlexItemRow.css';

export interface FlexItemRowProps {
    items?: JSX.Element[];
    style?: React.CSSProperties;
    className?: string;
}

class FlexItemRow extends React.Component<FlexItemRowProps, {}> {

    constructor(props: FlexItemRowProps) {
        super(props);
    }

    public render() {
        const style: React.CSSProperties = {
            ...this.props.style
        }
        return (
            <div style={style} className={'FlexItemRow-container ' + this.props.className} >
                {this.props.items}
                 {this.props.children}
            </div>
        );
    }
}

export default FlexItemRow;
