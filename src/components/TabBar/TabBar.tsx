import * as React from "react";

interface Props {
    navLinks: Array<{ name: string, to: string, iconName?: string }>;
}

class TabBar extends React.Component<Props, {}> {

    constructor(props: Props) {
        super(props);
    }

    public render() {
        return (
            <div/>
        );
    }
}

export default TabBar;
