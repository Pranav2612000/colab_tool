import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from 'axios';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Card from "../Widgets/Card.js";
import ListBar from "../Widgets/ListBar";
import url from "../../links"
import pin from '../../assets/images/pin.png';
import pin1 from '../../assets/images/pin1.png';
import {Button} from 'react-bootstrap'; 

// fake data generator
const getItems = count => {
  var data = Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k}`,
    content: `item ${k}`
  }));
  console.log(data);
  return data;
}

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  //padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  top: 0,
  left: 0,
  position: "relative",
  // change background colour if dragging
  //background: isDragging ? "lightgreen" : "white",

  // styles we need to apply on draggables
  ...draggableStyle
});


class App extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      items: getItems(2),
      cards: this.props.cards,
      draggable: true 
    };
    this.onDragEnd = this.onDragEnd.bind(this);
    this.onBeforeCapture = this.onBeforeCapture.bind(this);
    this.toggleDragging = this.toggleDragging.bind(this);
  }

  componentDidUpdate(prevProps) {
    if(this.props.cards != prevProps.cards) {
        this.setState({
            cards: this.props.cards
        });
        console.log(this.props.cards);
    }
  }
  getListStyle(isDraggingOver) {
    if(this.props.in_context) {
      return {
            background: '#fcc905',
            "border-radius": 10,
            padding: grid,
            //position: "relative",
            width: 300,
            'box-shadow': 'inset 0 0 10px black',
        }
    }
    return {
          background: isDraggingOver ? this.props.board.boardcolor : this.props.board.boardcolor ,
          "border-radius": 10,
          padding: grid,
          //position: "relative",
          width: 300,
          'box-shadow': '5px 5px grey',
      }
    };

  toggleDragging() {
      console.log("toogling");
      this.setState({
          draggable:!this.state.draggable
      })
      this.props.dragCallback();
  }
  onBeforeCapture(res) {
      console.log("here");
  }

  onDragEnd(result, e) {
    // dropped outside the list
    console.log(e);
    if (!result.destination) {
      return;
    }

    const cards = reorder(
      this.state.cards,
      result.source.index,
      result.destination.index
    );

    this.setState({
      cards
    });
  }

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    return (
  //    <DragDropContext onBeforeCapture={this.onBeforeCapture} onDragEnd={this.onDragEnd}>
        //<Droppable droppableId="droppable">
        <Droppable droppableId={this.props.title}>
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={this.getListStyle(snapshot.isDraggingOver)}
            >
              <img src={pin1} style={{height:'50px', position:'absolute', top:'-30px', right:'-30px', 'z-index':'5'}}/> 
              <ListBar title={this.props.title} moveCallback={this.toggleDragging} color={this.props.board.boardcolor} />
            {/*<div>{this.props.title}</div>*/}
            {/*<button onClick={this.toggleDragging}>Move</button>
            <button onClick={this.addCard}>AddCard</button>*/}
              {this.state.cards.map((item, index) => (
                <Draggable key={item.title} draggableId={item.title} index={index} isDragDisabled={this.props.innerdrag}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      //onClick={() => {alert("hello");}}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      <Card title={item.title} text={item.text} due_date={item.due_date} board = {this.props.board} ListTitle = {this.props.title} in_context={item["in_context"]}/>
                      {/*item.content*/}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
              <Button style={{border: '1px solid black', backgroundColor:'lightgreen'}} variant = "success" onClick= {this.props.addCardCallback}>
                        <i class="fa fa-plus" style={{color:"black"}} aria-hidden="true"></i>
              </Button>
              <Button style={{border: '1px solid black', backgroundColor:'red'}} variant = "success" onClick= {this.props.deleteList}>
                        <i class="fa fa-trash" style={{color:"black"}} aria-hidden="true"></i>
              </Button>
            </div>
          )}
        </Droppable>
      //</DragDropContext>
    );
  }
}

// Put the thing into the DOM!
export default App;
