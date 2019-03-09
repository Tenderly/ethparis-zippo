import React from 'react';
import classNames from 'classnames';

import './style.scss';

const Icon = ({icon}) => (
    <i className={classNames(
        "ZippoIcon",
        `icon-${icon}`
    )}/>
);

export default Icon;
