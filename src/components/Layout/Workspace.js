import React,{useState} from 'react';
import Draggable , {DraggableCore} from 'react-draggable';
import List from "../Widgets/List";
import ReactDOM from "react-dom";
import {Container, Row, Col} from 'reactstrap';
import DraggableList from '../Widgets/DraggableList';
const Workspace = props => {
    const [isDraggable, setIsDraggable] = useState(false);
    function preventListDrag() {
        console.log("preventing");
        setIsDraggable(!isDraggable);
    }
    function onDragStop(e) {
        console.log(e);
    }
    return (
        <div id="pad">
            <span>
                <DraggableList id="1" x={0} y={0}/>
                <DraggableList id="2" x={150} y={250}/>
                <DraggableList id="3" x={700} y={0}/>
                {/*
              <Row>
                <Col>
                  List 1
                  {isDraggable ? (
                    <Draggable><div><List dragCallback={preventListDrag}></List></div></Draggable>
                  ) 
                  : 
                  (
                    <List dragCallback={preventListDrag}/>
                  )}
                </Col>
                <Col>
                  List 2
                </Col>
              </Row>
                  */}
            </span>
        </div>
    );
}
export default Workspace;