import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Input.scss';

class Input extends Component {
    handleInputChange = (event) => {
        const {disabled, onChange, field} = this.props;

        const newValue = event.target.value;

        if (onChange && !disabled) {
            onChange(newValue, field, event);
        }
    };

    render() {
        const {placeholder, field, value, label, disabled, className} = this.props;

        return (
            <div className={classNames(
                "InputWrapper",
                className,
                {"disabled": disabled,}
            )}>
                {!!label && <label htmlFor={`input-${field}`} className="InputLabel">{label}</label>}
                <input placeholder={placeholder} id={`input-${field}`} disabled={disabled} onChange={this.handleInputChange} type="text" className="Input" value={value || ''}/>
            </div>
        );
    }
}

Input.propTypes = {
    onChange: PropTypes.func.isRequired,
    field: PropTypes.string.isRequired,
    label: PropTypes.string,
    value: PropTypes.string,
    placeholder: PropTypes.string,
};

export default Input;
