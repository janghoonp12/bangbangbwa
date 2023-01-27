import React from "react";
import Card from 'react-bootstrap/Card';
// import Button from 'react-bootstrap/Button';
import sample from '../../assets/logosample.png';
import { useNavigate } from "react-router-dom";


function RecentViewListItem(props) {
    const data = props.data;
    const navigate = useNavigate();

    // const deleteRecentView = () => {
      
    // }

    const onClick = () => {
      navigate(`/items/${data.id}`)
    }

    return (
      <Card style={{ width: '15rem', marginLeft: '50px', cursor: 'pointer' }} onClick={onClick}>
        <Card.Img variant="top" src={sample} alt="이미지" />
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

export default RecentViewListItem;