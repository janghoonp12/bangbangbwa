import React from "react";
import Card from 'react-bootstrap/Card'; 


function BroadcastListItem(props) {
    const { post, onClick } = props;
    return (
      <Card style={{ width: '15rem', marginLeft: '50px', cursor: 'pointer' }} onClick={onClick}>
        <Card.Img variant="top" src="logo192.png" alt="이미지" />
        <Card.Body>
          <Card.Title>{post.title}</Card.Title>
          <Card.Text>
            {post.type},
            {post.building_type},
            {post.manage_fee}
          </Card.Text>
        </Card.Body>
      </Card>
    )
}

export default BroadcastListItem;