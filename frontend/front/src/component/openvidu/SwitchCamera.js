import React, { useState, useEffect } from 'react';
import { OpenVidu } from 'openvidu-browser';

const SwitchCamera = () => {
  const [session, setSession] = useState(null);
  const [publisher, setPublisher] = useState(null);
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);

  useEffect(() => {
    const OV = new OpenVidu();

    OV.getDevices().then(devices => {
      setDevices(devices);
    });

    setSession(OV.initSession());
  }, []);

  useEffect(() => {
    if (!session) {
      return;
    }

    session.connect()
      .then(() => {
        setPublisher(
          session.publish(
            selectedDevice ? { videoSource: selectedDevice.deviceId } : null
          )
        );
      })
      .catch(error => console.error(error));
  }, [session, selectedDevice]);

  const handleCameraSwitch = device => {
    setSelectedDevice(device);
    publisher.switchVideoSource(device.deviceId);
  };

  return (
    <div>
      <h2>Available Cameras</h2>
      <ul>
        {devices.map(device => (
          <li key={device.deviceId}>
            <button onClick={() => handleCameraSwitch(device)}>
              Switch to {device.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SwitchCamera;