import React, {Component} from 'react';

import './Header.scss';

import ZippoLogo from '../../Images/ColoredDarkZippoLogo.svg';

class Header extends Component {
    render() {
        return (
            <div className="Header">
                <div className="MainWrapper">
                    <div className="LogoWrapper">
                        <img src={ZippoLogo} height={44} alt=""/>
                    </div>
                </div>
                <div className="ActionsWrapper">
                </div>
            </div>
        );
    }
}

export default Header;
