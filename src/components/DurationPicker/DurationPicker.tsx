import { Input } from '@dvll/ulight-react';
import * as React from 'react';

import './DurationPicker.css';

export interface DurationPickerProps
    extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    // time: Date;
    minutes: number;
    hours: number;
}

class DurationPicker extends React.PureComponent<DurationPickerProps, {}> {
    constructor(props: DurationPickerProps) {
        super(props);
        this.changeHandler = this.changeHandler.bind(this);
    }

    public render() {
        const props = this.props;

        return (
            <div className={'DurationPicker'}>
                <Input
                    id={props.id + 'input1'}
                    name={props.id + 'input1'}
                    value={props.hours}
                    onChange={this.changeHandler}
                    className="DurationPickerInput"
                    type="number"
                />
                <label htmlFor={props.id + 'input1'}>
                    Stunde<span style={{ visibility: props.hours === 1 ? 'hidden' : 'visible' }}>n</span>
                </label>
                <Input
                    id={props.id + 'input2'}
                    name={props.id + 'input2'}
                    value={props.minutes}
                    onChange={this.changeHandler}
                    className="DurationPickerInput"
                    type="number"
                />
                <label htmlFor={props.id + 'input2'}>
                    Minute<span style={{ visibility: props.minutes === 1 ? 'hidden' : 'visible' }}>n</span>
                </label>
            </div>
        );
    }

    private changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
        const ev = { ...event } as React.ChangeEvent<any>;
        ev.target.id = this.props.id || '';
        ev.target.minutes = this.props.minutes;
        ev.target.hours = this.props.hours;
        if (event.target.name === this.props.id + 'input1') {
            const hours = +event.target.value;
            // // const count = Math.floor(hours / 12);
            // if (hours > 24) {
            //     hours = hours === 25 && this.props.hours === 24 ? 0 : hours % 10;
            // } else if (hours < 0) {
            //     hours = hours === -1 ? 24 : 0;
            // }
            // ev.target.hours = hours;
            ev.target.hours = this.getConformIntervallValue(this.props.hours, hours, 0, 24);
        } else {
            const minutes = +event.target.value;
            // // minutes = minutes % 10;
            // if (minutes > 59) {
            //     minutes = minutes % 10;
            // } else if (minutes < 0) {
            //     minutes = minutes === -1 ? 59 : 0;
            // }

            // let minutes = +event.target.value;
            // if (minutes > 59) {
            //     minutes = minutes === 60 && this.props.minutes === 59 ? 0 : minutes % 10;
            // } else if (minutes < 0) {
            //     minutes = minutes === -1 ? 24 : 0;
            // }
            ev.target.minutes = this.getConformIntervallValue(this.props.minutes, minutes, 0, 59);
        }
        ev.target.value = ev.target.hours + '' + ev.target.minutes;
        this.props.onChange && this.props.onChange(ev);
    }

    private getConformIntervallValue(oldValue: number, newValue: number, min: number, max: number): number {
        if (newValue === min - 1) {
            return max;
        }
        if (newValue < min) {
            return -newValue;
        }
        if (newValue === max + 1 && oldValue === max) {
            return 0;
        }
        if (newValue > max) {
            return newValue % 10;
        }
        return newValue;
    }
}

export default DurationPicker;
