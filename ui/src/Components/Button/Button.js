import React from 'react';
import classNames from 'classnames';

import './Button.scss';

const Button = ({onClick, disabled, children, color, size}) => (
    <button disabled={disabled} onClick={onClick} className={classNames(
        "Button",
        size,
        color,
    )}>
        {children}
    </button>
);

Button.defaultProps = {
    color: 'invisible',
    size: '',
};

export default Button;
