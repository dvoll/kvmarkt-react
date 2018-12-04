import * as React from "react";

const withTitle = (Component: any, title: string) => {
    return class extends React.Component<any, {}> {

        public componentDidMount() {
            this.props.titleHandler(title);
        }

        public componentDidUpdate() {
            this.props.titleHandler(title);
        }

        public render() {
            return <Component {...this.props} />;
        }

    }
}

export default withTitle;