import React, {Component} from 'react';

import './Header.scss';

import ZippoLogo from '../../Images/ColoredDarkZippoLogo.svg';
import Button from "../Button/Button";
import Icon from "../Icon/Icon";

class Header extends Component {
    render() {
        return (
            <div className="Header">
                <div className="MainWrapper">
                    <div className="LogoWrapper">
                        <img src={ZippoLogo} height={40} alt=""/>
                    </div>
                </div>
                <div className="ActionsWrapper">
                    <Button>
                        <Icon icon="refresh-cw"/>
                        <span>Sync</span>
                    </Button>
                </div>
            </div>
        );
    }
}

export default Header;
