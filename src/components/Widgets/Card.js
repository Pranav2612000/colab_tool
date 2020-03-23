import React from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';

const getCardStyles = () => {
    return {
        "background-color": "white",
        "margin-left" : 0,
        "margin-right": 0,
        "padding": "0.25rem",
    }
}
const getCardTitleStyles = () => {
    return {
        "margin-bottom": 0,
        "border-bottom": '2px #17a2b8 solid'
    }
}
const getCardTextStyles = () => {
    return {
        "margin-bottom": 0
    }
}
const ListCard = (props) => {
  return (
    <div>
        <Card body  outline color="info" style={getCardStyles()}>
          <CardTitle style={getCardTitleStyles()}><b>{props.title}</b></CardTitle>
          <CardText style={getCardTextStyles()}>{props.text}</CardText>
          <Button>More</Button>
        </Card>
    </div>
  );
};
export default ListCard;