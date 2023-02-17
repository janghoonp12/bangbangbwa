import axios from 'axios';
import { OpenVidu } from 'openvidu-browser';
import React, { Component } from 'react';
import UserVideoComponent from '../component/openvidu/UserVideoComponent';
import styled from 'styled-components';
import throttle from '../utils/Throttle';
import watchers from '../assets/eye.png';
import BroadcastButtonModal from '../component/common/ui/BroadcastButtonModal';
import { connect } from 'react-redux';
import { DeleteBroadcastAsync } from '../reducers/broadcastSlice';


const OPENVIDU_SERVER_URL = 'https://i8a405.p.ssafy.io:8086';
const OPENVIDU_SERVER_SECRET = 'A405';
const mapStateToProps = (state) => ({
  me: state.userSlice.me,
  watchingBroadCast: state.broadcastSlice.watchingBroadCast,
})

const mapDispatchToProps = dispatch => ({
  DeleteBroadcastAsync: id => dispatch(DeleteBroadcastAsync(id))
});

class Openvidu extends Component {
  
    constructor(props) {
        super(props);

        this.state = {
            myTitle : "",
            mySessionId: 'SessionA',
            myUserName: 'Participant1',
            session: undefined,
            mainStreamManager: undefined,
            publisher: undefined,
            subscribers: [],
            chat: "",
            isDrag: false,
            startX: 0,
            toilet: 0,
            drainage: 0,
            sink: 0,
            light: 0,
            view: 0,
            mold: 0,
            mediaStream: null,
            myTrack: null,
            chattings: [],
            selectedDevice: null,
            camera: 1,
            camDevices: [],
            countToilet() {
              return `변기: ${this.toilet}`
            },
            countDrainage() {
              return `배수구: ${this.drainage}`
            },
            countSink() {
              return `싱크대: ${this.sink}`
            },
            countLight() {
              return `채광: ${this.light}`
            },
            countView() {
              return `전망: ${this.view}`
            },
            countMold() {
              return `곰팡이: ${this.mold}`
            },        
        };
        this.scrollRef = React.createRef();
        this.handleChangeMyTitle = this.handleChangeMyTitle.bind(this);
        this.joinSession = this.joinSession.bind(this);
        this.leaveSession = this.leaveSession.bind(this);
        this.leaveSessionHost = this.leaveSessionHost.bind(this);
        this.handleChangeSessionId = this.handleChangeSessionId.bind(this);
        this.handleChangeUserName = this.handleChangeUserName.bind(this);
        this.handleMainVideoStream = this.handleMainVideoStream.bind(this);
        this.onbeforeunload = this.onbeforeunload.bind(this);
    }

    getCameras() {
      const OV = new OpenVidu();
      OV.getDevices().then(devices => {
        let videoDevices = devices.filter(dev => dev.kind==='videoinput')
        console.log(videoDevices)
        this.setState({camDevices: videoDevices}, ()=> {console.log(this.state.camDevices)})
        
      })
    }

    componentDidMount() {
        window.addEventListener('beforeunload', this.onbeforeunload);
        this.getCameras()

        const { me } = this.props;
        const { watchingBroadCast } = this.props;

        if (me) {
          this.handleChangeUserName(me.nickname)
        } else {
          this.handleChangeUserName("Guest")
        }
        console.log(watchingBroadCast)
        this.handleChangeMyTitle(watchingBroadCast.broadcastTitle)
        this.handleChangeSessionId(watchingBroadCast.broadcastRoomId)
        
        this.joinSession()
    }

    componentWillUnmount() {
        window.removeEventListener('beforeunload', this.onbeforeunload);
    }

    onbeforeunload(event) {
        this.leaveSession();
        this.leaveSessionHost();
    }

    handleChangeMyTitle(value) {
      this.setState({
          myTitle: value,
      });
  }

    handleChangeSessionId(value) {
        this.setState({
            mySessionId: value,
        });
    }

    handleChangeUserName(value) {
        this.setState({
            myUserName: value
        });
    }

    handleMainVideoStream(stream) {
        if (this.state.mainStreamManager !== stream) {
            this.setState({
                mainStreamManager: stream
            });
        }
    }

    deleteSubscriber(streamManager) {
        let subscribers = this.state.subscribers;
        let index = subscribers.indexOf(streamManager, 0);
        if (index > -1) {
            subscribers.splice(index, 1);
            this.setState({
                subscribers: subscribers,
            });
        }
    }
    
    // 채팅 기능
    chatAxios() {
      axios
          .post(OPENVIDU_SERVER_URL + '/openvidu/api/signal',
              {
                  "session": `${this.state.mySessionId}`,
                  "to": [],
                  "type":"MY_TYPE",
                  "data":`${this.state.myUserName}: ${this.state.chat}`
              },
              {
                  headers: {
                      Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
                      'Content-Type': 'application/json'
                  },
                  withCredentials: false
              }
          )
          .then((response) => {
              console.log('Send Message Success', response);
              this.setState({chat:""})
          })
          .catch((response) => {
              console.log('Send Message Fail', response)
          })
    }

    endAxios() {
      axios
          .post(OPENVIDU_SERVER_URL + '/openvidu/api/signal',
              {
                  "session": `${this.state.mySessionId}`,
                  "to": [],
                  "type":"MY_TYPE",
                  "data":"system: 방송이 종료되었습니다."
              },
              {
                  headers: {
                      Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
                      'Content-Type': 'application/json'
                  },
                  withCredentials: false
              }
          )
          .then((response) => {
              console.log('Send Message Success', response);
              this.setState({chat:""})
          })
          .catch((response) => {
              console.log('Send Message Fail', response)
          })
    }

    // 버튼 axios
    toiletAxios() {
      axios
        .post(OPENVIDU_SERVER_URL + '/openvidu/api/signal',
          {
            "session": `${this.state.mySessionId}`,
            "to": [],
            "type":"MY_TYPE",
            "data":"###toilet###"
          },
          {
            headers: {
              Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
              'Content-Type': 'application/json'
            },
            withCredentials: false
          }
        )
        .then((response) => {
          console.log('Send Message Success', response);
        })
        .catch((response) => {
          console.log('Send Message Fail', response)
        })
    }

    toiletClearAxios() {
      axios
        .post(OPENVIDU_SERVER_URL + '/openvidu/api/signal',
          {
            "session": `${this.state.mySessionId}`,
            "to": [],
            "type":"MY_TYPE",
            "data":"@@@toilet@@@"
          },
          {
            headers: {
              Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
              'Content-Type': 'application/json'
            },
            withCredentials: false
          }
        )
        .then((response) => {
          console.log('Send Message Success', response);
        })
        .catch((response) => {
          console.log('Send Message Fail', response)
        })
    }

    drainageAxios() {
      axios
        .post(OPENVIDU_SERVER_URL + '/openvidu/api/signal',
          {
            "session": `${this.state.mySessionId}`,
            "to": [],
            "type":"MY_TYPE",
            "data":"###drainage###"
          },
          {
            headers: {
              Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
              'Content-Type': 'application/json'
            },
            withCredentials: false
          }
        )
        .then((response) => {
          console.log('Send Message Success', response);
        })
        .catch((response) => {
          console.log('Send Message Fail', response)
        })
    }

    drainageClearAxios() {
      axios
        .post(OPENVIDU_SERVER_URL + '/openvidu/api/signal',
          {
            "session": `${this.state.mySessionId}`,
            "to": [],
            "type":"MY_TYPE",
            "data":"@@@drainage@@@"
          },
          {
            headers: {
              Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
              'Content-Type': 'application/json'
            },
            withCredentials: false
          }
        )
        .then((response) => {
          console.log('Send Message Success', response);
        })
        .catch((response) => {
          console.log('Send Message Fail', response)
        })
    }

    sinkAxios() {
      axios
        .post(OPENVIDU_SERVER_URL + '/openvidu/api/signal',
          {
            "session": `${this.state.mySessionId}`,
            "to": [],
            "type":"MY_TYPE",
            "data":"###sink###"
          },
          {
            headers: {
              Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
              'Content-Type': 'application/json'
            },
            withCredentials: false
          }
        )
        .then((response) => {
          console.log('Send Message Success', response);
        })
        .catch((response) => {
          console.log('Send Message Fail', response)
        })
    }

    sinkClearAxios() {
      axios
        .post(OPENVIDU_SERVER_URL + '/openvidu/api/signal',
          {
            "session": `${this.state.mySessionId}`,
            "to": [],
            "type":"MY_TYPE",
            "data":"@@@sink@@@"
          },
          {
            headers: {
              Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
              'Content-Type': 'application/json'
            },
            withCredentials: false
          }
        )
        .then((response) => {
          console.log('Send Message Success', response);
        })
        .catch((response) => {
          console.log('Send Message Fail', response)
        })
    }

    lightAxios() {
      axios
        .post(OPENVIDU_SERVER_URL + '/openvidu/api/signal',
          {
            "session": `${this.state.mySessionId}`,
            "to": [],
            "type":"MY_TYPE",
            "data":"###light###"
          },
          {
            headers: {
              Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
              'Content-Type': 'application/json'
            },
            withCredentials: false
          }
        )
        .then((response) => {
          console.log('Send Message Success', response);
        })
        .catch((response) => {
          console.log('Send Message Fail', response)
        })
    }

    lightClearAxios() {
      axios
        .post(OPENVIDU_SERVER_URL + '/openvidu/api/signal',
          {
            "session": `${this.state.mySessionId}`,
            "to": [],
            "type":"MY_TYPE",
            "data":"@@@light@@@"
          },
          {
            headers: {
              Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
              'Content-Type': 'application/json'
            },
            withCredentials: false
          }
        )
        .then((response) => {
          console.log('Send Message Success', response);
        })
        .catch((response) => {
          console.log('Send Message Fail', response)
        })
    }

    viewAxios() {
      axios
        .post(OPENVIDU_SERVER_URL + '/openvidu/api/signal',
          {
            "session": `${this.state.mySessionId}`,
            "to": [],
            "type":"MY_TYPE",
            "data":"###view###"
          },
          {
            headers: {
              Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
              'Content-Type': 'application/json'
            },
            withCredentials: false
          }
        )
        .then((response) => {
          console.log('Send Message Success', response);
        })
        .catch((response) => {
          console.log('Send Message Fail', response)
        })
    }

    viewClearAxios() {
      axios
        .post(OPENVIDU_SERVER_URL + '/openvidu/api/signal',
          {
            "session": `${this.state.mySessionId}`,
            "to": [],
            "type":"MY_TYPE",
            "data":"@@@view@@@"
          },
          {
            headers: {
              Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
              'Content-Type': 'application/json'
            },
            withCredentials: false
          }
        )
        .then((response) => {
          console.log('Send Message Success', response);
        })
        .catch((response) => {
          console.log('Send Message Fail', response)
        })
    }

    moldAxios() {
      axios
        .post(OPENVIDU_SERVER_URL + '/openvidu/api/signal',
          {
            "session": `${this.state.mySessionId}`,
            "to": [],
            "type":"MY_TYPE",
            "data":"###mold###"
          },
          {
            headers: {
              Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
              'Content-Type': 'application/json'
            },
            withCredentials: false
          }
        )
        .then((response) => {
          console.log('Send Message Success', response);
        })
        .catch((response) => {
          console.log('Send Message Fail', response)
        })
    }

    moldClearAxios() {
      axios
        .post(OPENVIDU_SERVER_URL + '/openvidu/api/signal',
          {
            "session": `${this.state.mySessionId}`,
            "to": [],
            "type":"MY_TYPE",
            "data":"@@@mold@@@"
          },
          {
            headers: {
              Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
              'Content-Type': 'application/json'
            },
            withCredentials: false
          }
        )
        .then((response) => {
          console.log('Send Message Success', response);
        })
        .catch((response) => {
          console.log('Send Message Fail', response)
        })
    }

    onChange = (e) => {
      this.setState({chat:e.target.value})
    }

    activeEnter = (e) => {
      if (e.key === 'Enter') {
        this.chatAxios()
      }
    }



    async getMedia() {
      let newPublisher = this.OV.initPublisher(undefined, {
        audioSource: undefined, // The source of audio. If undefined default microphone
        videoSource: this.state.camDevices[this.state.camDevices.length-1].deviceId, // The source of video. If undefined default webcam
        publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
        publishVideo: true, // Whether you want to start publishing with your video enabled or not
        resolution: '640x480', // The resolution of your video
        frameRate: 30, // The frame rate of your video
        insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
        mirror: false, // Whether to mirror your local video or not
      });
      this.setState({
        publisher: newPublisher,
        mainStreamManager: newPublisher,
        camera: this.state.camDevices.length,
      })     
    }

    async getMedia2() {
      let newPublisher = this.OV.initPublisher(undefined, {
        audioSource: undefined, // The source of audio. If undefined default microphone
        videoSource: this.state.camDevices[0].deviceId, // The source of video. If undefined default webcam
        publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
        publishVideo: true, // Whether you want to start publishing with your video enabled or not
        resolution: '640x480', // The resolution of your video
        frameRate: 30, // The frame rate of your video
        insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
        mirror: true, // Whether to mirror your local video or not
      });
      this.setState({
        publisher: newPublisher,
        mainStreamManager: newPublisher,
        camera: 1,
      })
    }

    toggleCamera = () => {
      if (this.state.camDevices.length !== this.state.camera) {
        this.getMedia()
        console.log("change into nextcam")
      } else {
        this.getMedia2()
        console.log("return to defaultcam")
      }
    }

    joinSession() {
        // --- 1) Get an OpenVidu object ---

        this.OV = new OpenVidu();

        
        // --- 2) Init a session ---

        this.setState(
            {
                session: this.OV.initSession(),
            },
            () => {
                var mySession = this.state.session;

                // --- 3) Specify the actions when events take place in the session ---

                // On every new Stream received...
                mySession.on('streamCreated', (event) => {
                    // Subscribe to the Stream to receive it. Second parameter is undefined
                    // so OpenVidu doesn't create an HTML video by its own
                    var subscriber = mySession.subscribe(event.stream, undefined);
                    var subscribers = this.state.subscribers;
                    subscribers.push(subscriber);
                    console.log(event)

                    // Update the state with the new subscribers
                    this.setState({
                        subscribers: subscribers,
                    });
                });

                // On every Stream destroyed...
                mySession.on('streamDestroyed', (event) => {

                    // Remove the stream from 'subscribers' array
                    this.deleteSubscriber(event.stream.streamManager);
                });

                // On every asynchronous exception...
                mySession.on('exception', (exception) => {
                    console.warn(exception);
                });

                // --- 4) Connect to the session with a valid user token ---

                // 'getToken' method is simulating what your server-side should do.
                // 'token' parameter should be retrieved and returned by your own backend
                this.getToken().then((token) => {
                    // First param is the token got from OpenVidu Server. Second param can be retrieved by every user on event
                    // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
                    mySession
                        .connect(
                            token,
                            { clientData: this.state.myUserName },
                        )
                        .then(() => {

                            // --- 5) Get your own camera stream ---

                            // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
                            // element: we will manage it on our own) and with the desired properties
                            let publisher = this.OV.initPublisher(undefined, {
                                audioSource: undefined, // The source of audio. If undefined default microphone
                                videoSource: undefined, // The source of video. If undefined default webcam
                                publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
                                publishVideo: true, // Whether you want to start publishing with your video enabled or not
                                resolution: '640x480', // The resolution of your video
                                frameRate: 30, // The frame rate of your video
                                insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
                                mirror: true, // Whether to mirror your local video or not
                            });

                            // --- 6) Publish your stream ---

                            mySession.publish(publisher);
                            // Set the main video in the page to display our webcam and store our Publisher
                            if (this.state.subscribers.length === 0) {
                              this.setState({
                                myUserName: this.state.myUserName,
                                mainStreamManager: publisher,
                                publisher: publisher,
                               });
                              
                            } else {
                              console.log(this.state.subscribers)
                              this.setState({
                                publisher: publisher,
                              })
                              for (let i=0; i<this.state.subscribers.length; i++) {
                                if (this.state.subscribers[i].stream.connection.remoteOptions.metadata.includes('broker_')) {
                                  this.setState({
                                    mainStreamManager: this.state.subscribers[i]
                                  })
                                  console.log("이밑을봐라")
                                  console.log(this.state.subscribers[i])
                                } 
                              }                              
                            }                           
                        })
                        .catch((error) => {
                            console.log('There was an error connecting to the session:', error.code, error.message);
                        });
                });

                mySession.on('publisherStartSpeaking', (event) => {
                  console.log('User ' + event.connection.connectionId + ' start speaking');
                });

                mySession.on('publisherStopSpeaking', (event) => {
                  console.log('User ' + event.connection.connectionId + ' stop speaking');
                });

                // 채팅
                mySession.on('signal', (event) => {
                  if (event.data === "###toilet###") {
                    console.log('Recieved toilet', event.data);
                    this.setState({toilet:this.state.toilet+1})
                  } else if (event.data === "###drainage###") {
                    console.log('Recieved drainage', event.data);
                    this.setState({drainage:this.state.drainage+1})
                  } else if (event.data === "###sink###") {
                    console.log('Recieved sink', event.data);
                    this.setState({sink:this.state.sink+1})
                  } else if (event.data === "###light###") {
                    console.log('Recieved light', event.data);
                    this.setState({light:this.state.light+1})
                  } else if (event.data === "###view###") {
                    console.log('Recieved view', event.data);
                    this.setState({view:this.state.view+1})
                  } else if (event.data === "###mold###") {
                    console.log('Recieved mold', event.data);
                    this.setState({mold:this.state.mold+1})
                  } else if (event.data === "@@@toilet@@@") {
                    console.log('Recieved toilet', event.data);
                    this.setState({toilet:0})
                  } else if (event.data === "@@@drainage@@@") {
                    console.log('Recieved drainage', event.data);
                    this.setState({drainage:0})
                  } else if (event.data === "@@@sink@@@") {
                    console.log('Recieved sink', event.data);
                    this.setState({sink:0})
                  } else if (event.data === "@@@light@@@") {
                    console.log('Recieved light', event.data);
                    this.setState({light:0})
                  } else if (event.data === "@@@view@@@") {
                    console.log('Recieved view', event.data);
                    this.setState({view:0})
                  } else if (event.data === "@@@mold@@@") {
                    console.log('Recieved mold', event.data);
                    this.setState({mold:0})
                  }
                   else {
                    console.log('Received message', event.data);
                    var newchattings = this.state.chattings
                    newchattings.unshift(event.data);
                    this.setState({chattings: newchattings})
                  }
                  
                });
            },
        );
        this.OV.getDevices().then(devices => {
          this.setState({devices: devices});
          console.log("겟디바이스성공")
          console.log(this.state.devices)
        }).catch((error) => {
          console.log(error);
        })
    }

    leaveSession() {

        // --- 7) Leave the session by calling 'disconnect' method over the Session object ---

        const mySession = this.state.session;

        if (mySession) {
            mySession.disconnect();
        }

        // Empty all properties...
        this.OV = null;
        this.setState({
            session: undefined,
            subscribers: [],
            mySessionId: 'SessionA',
            myUserName: 'Participant' + Math.floor(Math.random() * 100),
            mainStreamManager: undefined,
            publisher: undefined,
            chattings: [],
        });

    }

    leaveSessionHost() {
      const { watchingBroadCast, DeleteBroadcastAsync } = this.props;
      DeleteBroadcastAsync(watchingBroadCast.broadcastId)
      // --- 7) Leave the session by calling 'disconnect' method over the Session object ---
      this.endAxios()
      const mySession = this.state.session;

      if (mySession) {
          mySession.disconnect();
      }

      // Empty all properties...
      this.OV = null;
      this.setState({
          session: undefined,
          subscribers: [],
          mySessionId: 'SessionA',
          myUserName: 'Participant' + Math.floor(Math.random() * 100),
          mainStreamManager: undefined,
          publisher: undefined,
          chattings: [],
      });

  }

    onDragStart = (e) => {
      e.preventDefault();
      this.setState({
        isDrag: true,
        startX: e.pageX + this.scrollRef.current.scrollLeft
      })
    };

    onDragEnd = () => {
      this.setState({
        isDrag: false,
      })
    };
    
    // 최좌측이면 움직이고 있는 마우스의 X좌표가 곧 startX좌표
    // 최우측이면 움직이고 있는 마우스의 X좌표에 현재 스크롤된 길이 scrollLeft를 더해 설정
    onDragMove = (e) => {
      if (this.state.isDrag) {
        const { scrollWidth, clientWidth, scrollLeft } = this.scrollRef.current;
        
        this.scrollRef.current.scrollLeft = this.state.startX - e.pageX;
        
        if (scrollLeft === 0) {
          this.setState({
            startX: e.pageX,
          })
        } else if (scrollWidth <= clientWidth + scrollLeft) {
          this.setState({
            startX: e.pageX + scrollLeft,
          })
        }
      }
    };
    
    btnActive(btnName) {
      const target = document.getElementById(btnName)
      target.disabled = false;
    }

    btnDeactive(btnName) {
      const target = document.getElementById(btnName)
      target.disabled = true;
    }

    onClickToilet = () => {
      this.toiletAxios()
      this.btnDeactive('toilet')
      setTimeout(() => {
      this.btnActive('toilet')
      }, 10000)
    }

    onClickDrainage = () => {
      this.drainageAxios()
      this.btnDeactive('drainage')
      setTimeout(() => {
      this.btnActive('drainage')
      }, 10000)
    }

    onClickSink = () => {
      this.sinkAxios()
      this.btnDeactive('sink')
      setTimeout(() => {
      this.btnActive('sink')
      }, 10000)
    }

    onClickLight = () => {
      this.lightAxios()
      this.btnDeactive('light')
      setTimeout(() => {
      this.btnActive('light')
      }, 10000)
    }

    onClickView = () => {
      this.viewAxios()
      this.btnDeactive('view')
      setTimeout(() => {
      this.btnActive('view')
      }, 10000)
    }

    onClickMold = () => {
      this.moldAxios()
      this.btnDeactive('mold')
      setTimeout(() => {
      this.btnActive('mold')
      }, 10000)
    }

    onClickToiletClear = () => {
      this.toiletClearAxios()
    }

    onClickDrainageClear = () => {
      this.drainageClearAxios()
    }

    onClickSinkClear = () => {
      this.sinkClearAxios()
    }

    onClickLightClear = () => {
      this.lightClearAxios()
    }

    onClickViewClear = () => {
      this.viewClearAxios()
    }

    onClickMoldClear = () => {
      this.moldClearAxios()
    }

    render() {
      const myTitle = this.state.myTitle
      
      let chatbox = this.state.chattings.map((chatting, index) => <SChatP index={index}>{chatting}</SChatP>)

      const delay = 10;
      const onThrottleDragMove = throttle(this.onDragMove, delay);

      let hostSub = this.state.subscribers.filter((sub) => sub.stream.connection.data.includes('host'))
      console.log(hostSub)

      return (
        <Wrapper>
          <Container className="container">

            {this.state.session !== undefined ? (
              <div id="session">
                <STitleDiv id="session-header">
                  <STitleP id="session-title">{myTitle}</STitleP>
                  <SWatchersP><SWatcherImg src={watchers} alt="시청자"/> {this.state.subscribers.length}</SWatchersP>
                  {this.state.myUserName.includes('broker_') ? (
                    <div>
                      <SButtonInput3
                        type="button"
                        id="toggleCamera"
                        onClick={this.toggleCamera}
                        value="화면전환"
                      />
                      <SButtonInput
                        type="button"
                        id="buttonLeaveSessionHost"
                        onClick={this.leaveSessionHost}
                        value="방송종료"
                      />
                    </div>
                  ) : (
                    <SButtonInput
                      type="button"
                      id="buttonLeaveSession"
                      onClick={this.leaveSession}
                      value="나가기"
                    />
                  )}
                </STitleDiv>
                {this.state.mainStreamManager !== undefined ? (
                  <SScreenDiv id="main-video" className="col-md-6">
                    <UserVideoComponent streamManager={this.state.mainStreamManager} />
                  </SScreenDiv>
                ) : (
                  <SLiveEndDiv>
                    <p>방송이 종료되었습니다.</p>
                  </SLiveEndDiv>
                )}
                
                {this.state.myUserName.includes('broker_') ? (
                  <SButtonLineDiv>
                    <div>
                      <BroadcastButtonModal />
                    </div>
                    <SButtonDiv
                      onMouseDown={this.onDragStart}
                      onMouseMove={this.state.isDrag ? onThrottleDragMove : null}
                      onMouseUp={this.onDragEnd}
                      onMouseLeave={this.onDragEnd}
                      ref={this.scrollRef}
                    >
                      <SButtonInput2 
                        type="button"
                        id="toilet"
                        value={this.state.countToilet()}
                        onClick={this.onClickToiletClear}
                      />
                      <SButtonInput2 
                        type="button"
                        id="drainage"
                        value={this.state.countDrainage()}
                        onClick={this.onClickDrainageClear}
                      />
                      <SButtonInput2 
                        type="button"
                        id="sink"
                        value={this.state.countSink()}
                        onClick={this.onClickSinkClear}
                      />
                      <SButtonInput2 
                        type="button"
                        id="light"
                        value={this.state.countLight()}
                        onClick={this.onClickLightClear}
                      />
                      <SButtonInput2 
                        type="button"
                        id="view"
                        value={this.state.countView()}
                        onClick={this.onClickViewClear}
                      />
                      <SButtonInput2 
                        type="button"
                        id="mold"
                        value={this.state.countMold()}
                        onClick={this.onClickMoldClear}
                      />
                    </SButtonDiv>
                  </SButtonLineDiv>
                ) : (
                  <SButtonLineDiv>
                    <div>
                      <BroadcastButtonModal />
                    </div>
                    <SButtonDiv
                      onMouseDown={this.onDragStart}
                      onMouseMove={this.state.isDrag ? onThrottleDragMove : null}
                      onMouseUp={this.onDragEnd}
                      onMouseLeave={this.onDragEnd}
                      ref={this.scrollRef}
                    >
                      <SButtonInput2 
                        type="button"
                        id="toilet"
                        value={this.state.countToilet()}
                        onClick={this.onClickToilet}
                      />
                      <SButtonInput2 
                        type="button"
                        id="drainage"
                        value={this.state.countDrainage()}
                        onClick={this.onClickDrainage}
                      />
                      <SButtonInput2 
                        type="button"
                        id="sink"
                        value={this.state.countSink()}
                        onClick={this.onClickSink}
                      />
                      <SButtonInput2 
                        type="button"
                        id="light"
                        value={this.state.countLight()}
                        onClick={this.onClickLight}
                      />
                      <SButtonInput2 
                        type="button"
                        id="view"
                        value={this.state.countView()}
                        onClick={this.onClickView}
                      />
                      <SButtonInput2 
                        type="button"
                        id="mold"
                        value={this.state.countMold()}
                        onClick={this.onClickMold}
                      />
                    </SButtonDiv>
                  </SButtonLineDiv>
                )}
                <SChatDiv>
                  <SChatAreaDiv>
                    
                    {chatbox}
                    
                  </SChatAreaDiv>
                </SChatDiv>
                <SInput type="text" value={this.state.chat} onChange={this.onChange} onKeyDown={(e) => this.activeEnter(e)} placeholder=" 내용을 입력하세요" />
              </div>
            ) : (
              <p>방송이 종료되었습니다.</p>
            )}
          </Container>          
        </Wrapper>
      );
    }

    /**
     * --------------------------
     * SERVER-SIDE RESPONSIBILITY
     * --------------------------
     * These methods retrieve the mandatory user token from OpenVidu Server.
     * This behavior MUST BE IN YOUR SERVER-SIDE IN PRODUCTION (by using
     * the API REST, openvidu-java-client or openvidu-node-client):
     *   1) Initialize a Session in OpenVidu Server	(POST /openvidu/api/sessions)
     *   2) Create a Connection in OpenVidu Server (POST /openvidu/api/sessions/<SESSION_ID>/connection)
     *   3) The Connection.token must be consumed in Session.connect() method
     */

    getToken() {
        return this.createSession(this.state.mySessionId).then((sessionId) => this.createToken(sessionId));
    }

    createSession(sessionId) {
        return new Promise((resolve, reject) => {
            var data = JSON.stringify({ customSessionId: sessionId });
            axios
                .post(OPENVIDU_SERVER_URL + '/openvidu/api/sessions', data, {
                    headers: {
                        Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
                        'Content-Type': 'application/json',
                    },
                    withCredentials: false
                })
                .then((response) => {
                    console.log('CREATE SESION', response);
                    resolve(response.data.id);
                })
                .catch((response) => {
                    var error = Object.assign({}, response);
                    if (error?.response?.status === 409) {
                        resolve(sessionId);
                    } else {
                        console.log(error);
                        console.warn(
                            'No connection to OpenVidu Server. This may be a certificate error at ' +
                            OPENVIDU_SERVER_URL,
                        );
                        if (
                            window.confirm(
                                'No connection to OpenVidu Server. This may be a certificate error at "' +
                                OPENVIDU_SERVER_URL +
                                '"\n\nClick OK to navigate and accept it. ' +
                                'If no certificate warning is shown, then check that your OpenVidu Server is up and running at "' +
                                OPENVIDU_SERVER_URL +
                                '"',
                            )
                        ) {
                            window.location.assign(OPENVIDU_SERVER_URL + '/accept-certificate');
                        }
                    }
                });
        });
    }

    createToken(sessionId) {
        return new Promise((resolve, reject) => {
            var data = {};
            axios
                .post(OPENVIDU_SERVER_URL + "/openvidu/api/sessions/" + sessionId + "/connection", data, {
                    headers: {
                        Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
                        'Content-Type': 'application/json',
                    },
                    withCredentials: false
                })
                .then((response) => {
                    console.log('TOKEN', response);
                    resolve(response.data.token);
                })
                .catch((error) => reject(error));
        });
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Openvidu);

const Wrapper = styled.div`
  display: flex;
  background-color: black;
`;

const Container = styled.div`
  width: 45vh;
  height: 90vh;
  background-color: white;
`;

const STitleDiv = styled.div`
  display: grid;
  grid-template-columns: 8fr 3fr 3fr;
  height: 5vh;
  padding-bottom: 6vh;
  align-items: center;
`;

const SScreenDiv = styled.div`
  width: 100%;
  height: 60vh;
  overflow: hidden;
`;

const SButtonLineDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 10fr;
  justify-content: center;
  align-items: center;
`;

const SButtonDiv = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    height: 5vh;
    align-items: flex-start;
    white-space: nowrap;
    flex-wrap: nowrap;
    overflow-x: auto;
    
    &::-webkit-scrollbar {
      display: none;
    }
`;

const SChatDiv = styled.div`
  display: grid;
  grid-direction: row;
  grid-template-row: 5fr 1fr;
  width: 100%;
  height: 14vh;
  border: 1px solid grey;
  margin-top: 1%;
`;

const SChatAreaDiv = styled.div`
  display: flex;
  overflow-y: auto;
  flex-direction: column-reverse;
  word-wrap: break-word;
  
`;

const SInput = styled.input`
  width: 100%;
  height: 4vh;
`;

const SChatP = styled.p`
  margin-bottom: 0px;
`;

const SButtonInput = styled.input`
  border-radius: 10px;
  margin-left: 10px;
  height: 60%;
  border: 0 solid black;
  background-color: red;
  color: white; 
`;

const SButtonInput2 = styled.input`
  border-radius: 10px;
  margin-left: 10px;
  height: 100%;
  border: 0 solid black;
  background-color: #F8EDE3;
  margin-bottom: 0px;
  margin-right:10px;
`;

const SButtonInput3 = styled.input`
  border-radius: 10px;
  margin-left: 10px;
  height: 60%;
  border: 0 solid black;
  background-color: green;
  color: white; 
`;

const SLiveEndDiv = styled.div`
  background-color: black;
`;

const STitleP = styled.p`
  margin-bottom: 0px;
  font-size: 1.5rem;
`;

const SWatchersP = styled.p`
  margin-bottom: 0px;
  font-size: 1rem;
`;

const SWatcherImg = styled.img`
  height: 1rem;
`;