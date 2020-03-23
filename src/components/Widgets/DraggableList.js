import React,{useState} from 'react';
import Draggable , {DraggableCore} from 'react-draggable';
import List from "../Widgets/List";
import ReactDOM from "react-dom";
import {Container, Row, Col} from 'reactstrap';

const DraggableList = props => {
    const [isDraggable, setIsDraggable] = useState(false);
    const [pos, setPos] = useState({
        x : props.x,
        y: props.y 
    });
    const [trans,setTrans] = useState({
        x: 50,
        y: 50,
    });
    console.log("Reloaded");
    console.log(trans);
    /*
    if(isDraggable == true) {
        const el_name = "dragzone" + props.id;
        let el = document.getElementById(el_name);
        let el_props = el.getBoundingClientRect(); 
        console.log(el_props);
    }
    */
    const getStyle = () => {
        console.log(trans);
        return ({
        width: 250,
        top: pos.y,
        left: pos.x,
        position: "absolute",
        //transform: "translate(" + trans.x + "," + trans.y + ")"
        //transform: "translate(" + 0 + "," + 0 + ")"
        });
    };

    function preventListDrag() {
        if(isDraggable == true) {
            let el_name = "dragzone" + props.id 
            let el = document.getElementById(el_name)
            console.log(el.style.transform);
            let trans_str = el.style.transform;
            let p1 = trans_str.split("(")[1];
            let x = p1.split(",")[0];
            let p2 = p1.split(",")[1]; 
            let y = p2.split(")")[0];
            let trans_obj = {
                x: x,
                y: y
            }
            console.log(trans_obj);
            setTrans(trans_obj);
            let el_props = el.getBoundingClientRect(); 
            console.log(el_props);
            let pos_obj = {
                x: el_props.x,
                y: el_props.y -120
            }
            setPos(pos_obj);
            //get Transform that was applied
        }
        console.log("preventing");
        console.log(isDraggable);
        setIsDraggable(!isDraggable);
        console.log(pos);
    }
    function onDragStop(e) {
        console.log(pos);
    }
    function onStart(e) {
        let el_name = "dragzone" + props.id 
        let el = document.getElementById(el_name)
            let trans_str = el.style.transform;
            let p1 = trans_str.split("(")[1];
            let x = p1.split(",")[0];
            let p2 = p1.split(",")[1]; 
            let y = p2.split(")")[0];
            let trans_obj = {
                x: trans.x,
                y: trans.y
            }
            console.log(trans_obj);
        document.getElementById(el_name).style.transform = trans_obj;
    }
    console.log(pos);
    return (
        <span id="spanned">
                  {isDraggable ? (
                    <Draggable bounds={"#pad"} onStop={onDragStop} onStart={onStart}>
                        <div id={"dragzone" + props.id} style={getStyle()}>
                            <List dragCallback={preventListDrag} innerdrag={true} title={props.title} cards={props.cards} board={props.board}></List>
                        </div>
                    </Draggable>
                  ) 
                  : 
                  (
                    <div id={"dragzone" + props.id} style={getStyle()}>
                        <List dragCallback={preventListDrag} innerdrag={false} title={props.title} cards={props.cards} board={props.board}></List>
                    </div>
                  )}
        </span>
    );
}
export default DraggableList;