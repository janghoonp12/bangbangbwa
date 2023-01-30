import React from "react";
import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router";
import logosample from "../../assets/logosample.png"


function NonLiveBroadcastListItem(props) {
  const data = props.data
  const navigate = useNavigate();
  const onClick = () => {
    navigate(`/broadcasts/${data.id}`)
  }

  return (
    <Card style={{ width: '15rem', marginLeft: '50px', cursor: 'pointer' }} onClick={onClick}>
      <Card.Img variant="top" src={logosample} alt="이미지" />
      <Card.Body>
        <Card.Title>{data.title}</Card.Title>
        <Card.Text>
          {data.type},
          {data.building_type},
          {data.manage_fee}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default NonLiveBroadcastListItem;