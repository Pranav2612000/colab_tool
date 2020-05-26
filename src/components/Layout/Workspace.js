import React,{useState, useEffect} from 'react';
import axios from 'axios';
import Header from "../Layout/Header";
import Draggable , {DraggableCore} from 'react-draggable';
import List from "../Widgets/List";
import ReactDOM from "react-dom";
import {Container, Row, Col} from 'reactstrap';
import DraggableList from '../Widgets/DraggableList';
import url from "../../links";
const Workspace = props => {
    const [isDraggable, setIsDraggable] = useState(false);
    const [board,setBoard] = useState({});
    const [loadingDone, setLoadingDone] = useState(false);
    useEffect(() => {
      const fetchData = async () => {
        console.log("fetching");
        var reqData = {
          creator: props.creator,
          boardname: props.boardname
        };
        await axios.post(url + "board/getboarddata/",reqData, {
          headers: {'colab-tool-token': localStorage.getItem("colab-tool-token")},
          body: reqData
        })
        .then(res => {
          console.log(res);
          setBoard(res.data);
          setLoadingDone(true);
        })
        .catch(err => {
          console.log(err);
        })
        console.log("end");
      };
      fetchData();
    },[props.boardname]);
    function preventListDrag() {
        console.log("preventing");
        setIsDraggable(!isDraggable);
    }
    function onDragStop(e) {
        console.log(e);
    }
    var lists = [];
    function displayLists() {
      console.log(board);
      if(board.list == undefined) {
        return (
          <h1></h1>
        )
      }
      for(var i = 0; i < board.list.length; i++) {
        lists.push(
          <DraggableList id={i} x={board.list[i].pos.X} y={board.list[i].pos.Y} title={board.list[i].title} cards={board.list[i].cards} board={board}></DraggableList>
        )
      }
      return lists;
      /*
      return (
              <span>
                <DraggableList id="1" x={0} y={0} list/>
                <DraggableList id="2" x={150} y={250}/>
                <DraggableList id="3" x={700} y={0}/>
              </span>
      )
      */
    }
    return (
        <div>
          <Header id = 'header2' title={props.boardname} creator={props.creator} board={board}/>
        <div id="pad">
              {loadingDone && displayLists()
              }
        </div></div>
    );
}
export default Workspace;
