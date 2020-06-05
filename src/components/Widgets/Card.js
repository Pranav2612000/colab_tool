import React from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';

const getCardStyles = () => {
    return {
        "background-color": "white",
        "border-color":"#454547",
        "margin-left" : 0,
        "margin-right": 0,
        "padding": "0.25rem",
    }
}
const getCardTitleStyles = () => {
    return {
        "margin-bottom": 0,
        "color":"black",
        "font-family":"Open Sans",
        "border-bottom": '2px blue solid'
    }
}
const getCardTextStyles = () => {
    return {
        "margin-bottom": 0,
        "color":"black"
    }
}
const ListCard = (props) => {
  return (
    <div>
        <Card body  outline color="#717175" style={getCardStyles()}>
          <CardTitle style={getCardTitleStyles()}><b>{props.title}</b></CardTitle>
          <CardText style={getCardTextStyles()}>{props.text}</CardText>
          <Button style={{backgroundColor:"#d92139",fontFamily:"Open Sans",}}  >More</Button>
        </Card>
    </div>
  );
};
export default ListCard;