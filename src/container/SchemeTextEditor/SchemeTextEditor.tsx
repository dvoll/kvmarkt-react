import * as React from "react";
import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";

interface SchemeTextEditorState {
    text: string;
} 
export interface  SchemeTextEditorProps {
    text?: string;
}

class SchemeTextEditor extends React.Component<SchemeTextEditorProps, SchemeTextEditorState> {

    constructor(props: SchemeTextEditorProps) {
        super(props)
        this.state = { text: this.props.text || '' } // You can also pass a Quill Delta here
        this.handleChange = this.handleChange.bind(this)
    }

    public handleChange(value: string) {
        this.setState({ text: value })
    }

    public render() {
        return (
            <ReactQuill value={this.state.text} 
                onChange={this.handleChange} />
        )
    }
}

export default SchemeTextEditor;
