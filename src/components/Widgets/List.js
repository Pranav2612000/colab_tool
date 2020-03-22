import React, { Component } from "react";
import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// fake data generator
const getItems = count =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k}`,
    content: `item ${k}`
  }));

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
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  top: 0,
  left: 0,
  position: "relative",
  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle
});


class App extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      items: getItems(4),
      draggable: true 
    };
    this.onDragEnd = this.onDragEnd.bind(this);
    this.onBeforeCapture = this.onBeforeCapture.bind(this);
    this.toggleDragging = this.toggleDragging.bind(this);
  }

  getListStyle(isDraggingOver) {
          return {
                background: isDraggingOver ? "lightblue" : "lightgrey",
                padding: grid,
                //position: "relative",
                width: 250,
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

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );

    this.setState({
      items
    });
  }

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    return (
      <DragDropContext onBeforeCapture={this.onBeforeCapture} onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={this.getListStyle(snapshot.isDraggingOver)}
            >
            <div>Title</div>
            <button onClick={this.toggleDragging}>Move</button>
              {this.state.items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index} isDragDisabled={this.props.innerdrag}>
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
                      {item.content}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

// Put the thing into the DOM!
export default App;