import { ThemeContext } from '@dvll/ulight-react';
import * as React from 'react';
import ReactQuill from 'react-quill';

// import 'react-quill/dist/quill.snow.css';
import './SchemeTextEditor.css';

// interface SchemeTextEditorState {
//     text: string;
// }
export interface SchemeTextEditorProps
    extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    text?: string;
    // value: string;
    // onChange: (value: string) => void;
}

class SchemeTextEditor extends React.Component<SchemeTextEditorProps, {}> {
    constructor(props: SchemeTextEditorProps) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    public render() {
        const value = this.props.value as string;
        return (
            <ThemeContext.Consumer>
                {theme => (
                    <ReactQuill
                        onBlur={this.handleBlur}
                        key={'editor' + this.props.id}
                        value={value}
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

    private handleChange(value: string) {
        const ev: any = {
            target: {},
        };
        ev.target.id = this.props.id || '';
        ev.target.value = value;
        this.props.onChange && this.props.onChange(ev);
    }

    private handleBlur(value: any) {
        const ev: any = {};
        this.props.onBlur && this.props.onBlur(ev);
    }
}

export default SchemeTextEditor;
