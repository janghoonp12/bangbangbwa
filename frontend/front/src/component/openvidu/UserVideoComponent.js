import React, { Component } from 'react';
import OpenViduVideoComponent from './OvVideo';
import './UserVideo.css';
import styled from 'styled-components';
import redDot from '../../assets/reddot.png';

const SP = styled.p`
  margin-bottom: 0px;
  color: black;
`;

const SImg = styled.img`
  width: 10px;
  height: 10px;
  padding-bottom: 5%;
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
                        {/* <div><SP>{this.getNicknameTag()}</SP></div> */}
                        <div style={{ backgroundColor: "rgba(255, 255, 255, 0.4)"}}><SP><SImg src={redDot} alt="이미지"/> Live</SP></div>
                    </div>
                ) : null}
            </div>
        );
    }
}

