import React from 'react';
import axios from 'axios';
import url from '../../links';
import { withRouter } from "react-router-dom";
import moment from 'moment';

import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';

const getCardStyles = (isSelected, due_date, due_time) => {
  console.log(due_time);
  console.log("get style card");
  console.log(isSelected);
  if (due_date <= moment().format("YYYY-MM-DD")) {
    if (due_time < moment().format("HH:mm")) {
      return {
        "background-color": "#FF0033",
        "background-image": "none",
        //"border-color":"#454547",
        "margin-left": 0,
        "margin-right": 0,
        "padding": "0.25rem",
        'box-shadow': 'inset 0 0 10px black',
        'opacity': 0.8,
      }
    }
  }
  if (isSelected) {
    return {
      "background-color": "#fcc905",
      "background-image": "none",
      //"border-color":"#454547",
      "margin-left": 0,
      "margin-right": 0,
      "padding": "0.25rem",
      'box-shadow': 'inset 0 0 10px black',
      'opacity': 0.8,
    }
  }
  return {
    /*"background-color": "rgba(255,255,255,0.9)",*/
    //"border-color":"#454547",
    "margin-left": 0,
    "margin-right": 0,
    "padding": "0.25rem",
  }
}
const getCardTitleStyles = () => {
  return {
    "margin-bottom": '3%',
    "margin-top": '2%',
    "font-size": '120%',
    "padding-bottom": '3%',
    "color": "black",
    /*"font-family":"CabinSketch-Bold",*/
    /*"font-family":"CabinSketch-Regular",*/
    "font-family": "CrosshatcherD",
    "border-bottom": '2px black solid'
  }
}
const getCardTextStyles = () => {
    return {
      /*"font-family":"CabinSketch-Bold",*/
        "font-family":"SaucerBB",
        "margin-bottom": 0,
        "color":"black",
        "font-size": "1.5vw",
        "text-align":"left",
        "padding-left":"10%",
    }
}

const deleteCard = (props) => {
  console.log("in delete card fun");
  console.log(props.title);
  console.log(props.board.list);
}

const ListCard = (props) => {
  console.log(props);
  const deleteCard = async () => {
    console.log("in delete card fun");
    console.log(props.title);
    console.log(props.board.list);
    let list = props.board.list;
    console.log(props.ListTitle);
    let listindex;
    props.board.list.forEach((element, i) => {
      if (element.title === props.ListTitle) {
        list = props.board.list[i];
        listindex = i;
        return;
      }

    });
    console.log(list);
    let index = -1;
    list.cards.forEach((element, i) => {
      if (element.title == props.title) {
        index = i;
        return;
      }
    })
    if (index === -1) {
      alert("Card doesnt exist");
      return;
    }
    else {
      list.cards.splice(index, 1);
      props.board.list[listindex] = list;
    }

    let reqData = {
      users: props.board.usernames,
      boardname: props.board.boardname,
      board_list: props.board.list,
      boardcolor: props.board.boardcolor,
    };
    var history = props.history;
    await axios.post(url + "board/addboard/", reqData, {
      headers: { 'colab-tool-token': localStorage.getItem("colab-tool-token") },
      body: reqData
    })
      .then(res => {
        history.push('/boards/' + props.board.boardname);
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      })

    console.log(props.board.list);
    console.log(props["in_context"]);
  }
  return (
    <div>
      <Card body outline color="#717175" style={getCardStyles(props["in_context"], props["due_date"], props["due_time"])}>
        <CardTitle style={getCardTitleStyles()}><b>{props.title}</b></CardTitle>
        <CardText style={getCardTextStyles()}>{props.text}</CardText>
        <div class='controls' style={{ textAlign: 'right' }}>
          <Button style={{ backgroundColor: "transparent", border: 'none' }}  ><i class='fa fa-expand-alt' style={{ color: 'black' }} /></Button>
          <Button onClick={deleteCard} style={{ backgroundColor: "transparent", border: "none" }}  ><i class='fa fa-trash' style={{ color: 'black' }} /></Button>
        </div>
      </Card>
    </div>
  );
};
export default withRouter(ListCard);
