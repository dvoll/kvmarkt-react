import * as React from "react";

interface State {
    time: Date;
}
interface Props {
    time: Date;
}

class Login extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = { time: new Date()};
    }

    public render() {
        return (
            <div>LOGIN</div>
        );
    }
}

export default Login;
