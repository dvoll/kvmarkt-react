import { ThemeContext } from '@dvll/ulight-react';
import * as React from 'react';
import ReactQuill from 'react-quill';

// import 'react-quill/dist/quill.snow.css';
import './SchemeTextEditor.css';

interface SchemeTextEditorState {
    text: string;
}
export interface SchemeTextEditorProps {
    text?: string;
}

class SchemeTextEditor extends React.Component<SchemeTextEditorProps, SchemeTextEditorState> {
    constructor(props: SchemeTextEditorProps) {
        super(props);
        this.state = { text: this.props.text || '' }; // You can also pass a Quill Delta here
        this.handleChange = this.handleChange.bind(this);
    }

    public handleChange(value: string) {
        this.setState({ text: value });
    }

    public render() {
        return (
            <ThemeContext.Consumer>
                {theme => (
                    <ReactQuill
                        value={this.state.text}
                        onChange={this.handleChange}
                        style={{
                            ['--foreground-light-rgb' as any]: theme.foregroundLight,
                            ['--foreground-rgb' as any]: theme.foreground,
                            ['--background-accent-rgb' as any]: theme.backgroundAccent,
                            ['--background-rgb' as any]: theme.background,
                        }}
                    />
                )}
            </ThemeContext.Consumer>
        );
    }
}

export default SchemeTextEditor;
