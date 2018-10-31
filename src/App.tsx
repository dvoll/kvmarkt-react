import * as React from "react";
import "./App.css";
import { Route } from "react-router-dom";
import logo from "./logo.svg";

interface State {
    time: Date;
}

class App extends React.Component<{}, State> {
    // private butonProps: ButtonProps = {};

    constructor(props: {}) {
        super(props);
        this.state = { time: new Date()};
    }

    public render() {
        return (
            <div />
        );
    }
}

export default App;
