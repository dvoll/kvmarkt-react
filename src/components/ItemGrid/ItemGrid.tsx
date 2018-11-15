import * as React from "react";
// import PageLayout from "src/components/layout/PageLayout/PageLayout";
// import { Scheme } from "src/scheme";
// import SchemeCard from "src/scheme/SchemeCard/SchemeCard";
// import { schemes } from "src/scheme/schemes.mock";
type T = any;
interface ItemGridProps {
    items: T[];
    mapping: (item: T) => React.ReactNode;
}

class ItemGrid extends React.Component<ItemGridProps, {}> {
    public render() {
        const {items, mapping} = this.props;
        return (
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill,  minmax(290px, 1fr))",
                    gridGap: 10,
                    justifyContent: "center",
                    justifyItems: "center",
                    alignItems: "center"
                }}
            >
                { items.map(mapping) }
                {/* {this.props.items ? this.props.items : this.props.children} */}
            </div>
        );
    }

    public shouldComponentUpdate(nextProps: any) {
        return this.props !== nextProps;
    }
}

export default ItemGrid;
