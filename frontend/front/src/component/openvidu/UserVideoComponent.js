import React, { Component } from 'react';
import OpenViduVideoComponent from './OvVideo';
import './UserVideo.css';
import styled from 'styled-components';


const SP = styled.p`
  margin-bottom: 0px;
`;

export default class UserVideoComponent extends Component {

    getNicknameTag() {
        // Gets the nickName of the user
        return JSON.parse(this.props.streamManager.stream.connection.data).clientData;
    }

    render() {
        return (
            <div>
                {this.props.streamManager !== undefined ? (
                    <div className="streamcomponent">
                        <OpenViduVideoComponent streamManager={this.props.streamManager} />
                        <div><SP>{this.getNicknameTag()}</SP></div>
                    </div>
                ) : null}
            </div>
        );
    }
}

