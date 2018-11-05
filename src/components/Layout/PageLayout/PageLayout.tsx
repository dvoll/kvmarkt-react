import * as React from "react";
import "./PageLayout.css";

interface Props {
    className?: string;
}

class PageLayout extends React.Component<Props, {}> {

    constructor(props: Props) {
        super(props);
    }

    public render() {
        return <main className={"PageLayout " + this.props.className }>
                {this.props.children}
            </main>;
    }
}

export default PageLayout;
