import React, {Component} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import OutsideClickHandler from 'react-outside-click-handler'

import './Select.scss';

class Select extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
        };
    }

    toggleDropdown = () => {
        const {disabled} = this.props;
        const {open} = this.state;

        if (disabled) {
            return;
        }

        this.setState({
            open: !open,
        });
    };

    closeDropdown = () => {
        this.setState({
            open: false,
        });
    };

    handleSelect = (option) => {
        const {field, disabled, onChange} = this.props;

        if (disabled) {
            return;
        }

        onChange(option.name, field);

        this.closeDropdown();
    };

    render() {
        const {options, disabled, value, label, placeholder} = this.props;
        const {open} = this.state;

        return (
            <OutsideClickHandler onOutsideClick={this.closeDropdown}>
                <div className={classNames(
                    "Select",
                    {
                        "Disabled": disabled,
                        "Open": open,
                    }
                )}>
                    <div className="Label" onClick={this.toggleDropdown}>{label}</div>
                    <div className="CurrentSelection" onClick={this.toggleDropdown}>
                        {!!value && <span>{value}</span>}
                        {!value && <span>{placeholder || 'Select an option'}</span>}
                    </div>
                    <div className="SelectDropdown">
                        {!!options.length && options.map(option => <div className="DropdownOption" key={option.name} onClick={() => this.handleSelect(option)}>
                            {option.name}
                        </div>)}
                        {!options.length && <div className="DropdownEmpty">
                            <span>No options</span>
                        </div>}
                    </div>
                </div>
            </OutsideClickHandler>
        );
    }
}

Select.propTypes = {
    onChange: PropTypes.func.isRequired,
    field: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    value: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
};

export default Select;
