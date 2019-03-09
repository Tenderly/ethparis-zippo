import React, {Component} from 'react';
import classNames from 'classnames';
import Moment from 'moment';

import "./ActionLogs.scss";

class ActionLogs extends Component {
    constructor(props) {
        super(props);

        this.state = {
            logsLoaded: false,
            logs: [
                {
                    level: 'info',
                    type: 'initial_message',
                    timestamp: new Moment("2019-03-09T16:30:25"),
                    data: {
                        message: 'Deployed contract Calculator.sol to 0x6B6220677b93E8fc9dC3ffE582E481B7A56c79a9',
                        details: '',
                    },
                },
                {
                    level: 'info',
                    type: 'transaction',
                    timestamp: new Moment("2019-03-09T16:31:17"),
                    data: {
                        message: '',
                        details: '',
                    },
                },
                {
                    level: 'info',
                    type: 'new_version',
                    timestamp: new Moment("2019-03-09T16:31:49"),
                    data: {
                        message: 'Deployed contract Calculator.sol to 0x4cb5442e13a7b269328f490a75d65aa4ca2883cb',
                        details: '',
                    },
                },
                {
                    level: 'info',
                    type: 'transaction',
                    timestamp: new Moment("2019-03-09T16:32:03"),
                    data: {
                        message: '',
                        details: '',
                    },
                },
                {
                    level: 'error',
                    type: 'compile_failed',
                    timestamp: new Moment("2019-03-09T16:33:41"),
                    data: {
                        message: 'Error trying to compile contract Calculator.sol',
                        details: '',
                    },
                },
            ],
        };
    }

    getLogEntryClass = (log) => {
        if (log.level === 'error') {
            return 'Error';
        }

        return '';
    };

    render() {
        const {logs} = this.state;

        return (
            <div className="ActionLogs">
                <div className="LogsHeader">
                    <div className="ConnectionInformation">
                        Connected to RPC: <span className="Network">Ganache (http://localhost:8545)</span>
                    </div>
                </div>
                <div className="LogsContent">
                    <div className="LogsWrapper">
                        {logs.map(log => <div className={classNames(
                            "LogEntry",
                            this.getLogEntryClass(log),
                        )} key={log.timestamp}>
                            <div className="BasicInfo">
                                <div className="LogLevel">{log.level}</div>
                                <div className="LogTimestamp">{log.timestamp.format('YYYY-MM-DD hh:mm:ss')}</div>
                            </div>
                            <div className="LogDetails">
                                <div className="MainMessage">
                                    <span className="LogType">[{log.type}]</span>
                                    <span>{log.data.message}</span>
                                </div>
                                <div className="DetailedMessage">{log.data.details}</div>
                            </div>
                        </div>)}
                    </div>
                </div>
            </div>
        );
    }
}

export default ActionLogs;
