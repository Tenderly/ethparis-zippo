import React, {Component} from 'react';

import './Header.scss';

import ZippoLogo from '../../Images/DarkZippoLogo.svg';
import Button from "../Button/Button";

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
                        <span>Reload</span>
                    </Button>
                </div>
            </div>
        );
    }
}

export default Header;
