import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './Select.scss';

class Select extends Component {
    render() {
        return (
            <div>

            </div>
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
