import * as React from "react";
// import PageLayout from "src/components/layout/PageLayout/PageLayout";
// import { Scheme } from "src/scheme";
// import SchemeCard from "src/scheme/SchemeCard/SchemeCard";
// import { schemes } from "src/scheme/schemes.mock";

interface ItemGridProps {
    items?: React.ReactNode;
}

class ItemGrid extends React.Component<ItemGridProps, {}> {
    public render() {
        return (
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, max-content)",
                    justifyContent: "center",
                    justifyItems: "center",
                    alignItems: "center"
                }}
            >
                {this.props.items ? this.props.items : this.props.children}
            </div>
        );
    }

    public shouldComponentUpdate(nextProps: any) {
        if (this.props.items) {
            return this.props.items !== nextProps.items;
        }
        return this.props.children !== nextProps.children;
    }
}

export default ItemGrid;
