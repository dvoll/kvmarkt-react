import * as React from "react";

interface Props {
    time: Date;
}

class SchemeList extends React.Component<Props, {}> {

    constructor(props: Props) {
        super(props);
    }

    public render() {
        return (
            <div>Schemes</div>
        );
    }
}

export default SchemeList;
