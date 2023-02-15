import React, { useState, useEffect } from 'react';
import { OpenVidu } from 'openvidu-browser';

function SwitchCamera(props) {
  // let { publisher, session } = props;
  // const [session, setSession] = useState(null);
  // const [publisher, setPublisher] = useState(null);
  // const [devices, setDevices] = useState([]);
  // const [selectedDevice, setSelectedDevice] = useState(null);

  let camDevices = props;
  const OV = new OpenVidu();

  OV.getDevices().then(devices => {
    let videoDevices = devices.filter(dev=>dev.kind==='videoinput')
    camDevices = videoDevices
    // console.log(camDevices)
    return camDevices;
  });

  // console.log(camDevices)

  // useEffect(() => {
  //   const OV = new OpenVidu();

  //   OV.getDevices().then(devices => {
  //     let videoDevices = devices.filter(dev=>dev.kind==='videoinput')  
  //     // this.setState({ devices: videoDevices });
  //     // setDevices(videoDevices);
  //     camDevices = videoDevices
  //   });
  //   // console.log(this.state.devices)
  
  //   // setSession(OV.initSession());
  // }, []);

  // useEffect(() => {
  //   if (!session) {
  //     return;
  //   }

  //   session.connect()
  //     .then(() => {
  //       setPublisher(
  //         session.publish(
  //           selectedDevice ? { videoSource: selectedDevice.deviceId } : null
  //         )
  //       );
  //     })
  //     .catch(error => console.error(error));
  // }, [session, selectedDevice]);

  // const handleCameraSwitch = device => {
  //   console.log(devices)
  //   setSelectedDevice(device);
  //   publisher.switchVideoSource(device.deviceId);
  // };

  // return (
  //   <div>
  //     <h2>Available Cameras</h2>
  //     <ul>
  //       {devices.map(device => (
  //         <li key={device.deviceId}>
  //           <button onClick={() => handleCameraSwitch(device)}>
  //             Switch to {device.label}
  //           </button>
  //         </li>
  //       ))}
  //     </ul>
  //   </div>
  //   );
  // return camDevices;
};

export default SwitchCamera;