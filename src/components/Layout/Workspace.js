import React,{useState, useEffect} from 'react';
import axios from 'axios';
import Header from "../Layout/Header";
import List from "../Widgets/List";
import ReactDOM from "react-dom";
import {Container, Row, Col} from 'reactstrap';
import DraggableList from '../Widgets/DraggableList';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import url from "../../links";

const Workspace = props => {
    const [isDraggable, setIsDraggable] = useState(false);
    const [board,setBoard] = useState({});
    const [cards, setCards] = useState();
    const [loadingDone, setLoadingDone] = useState(false);
    var lists = [];

    /* Fetch Board Data when board changes. */
    useEffect(() => {
      const fetchData = async () => {
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
      };
      fetchData();
    },[props.boardname]);

    /* A little function to help us with reordering the result. */
    const reorder = (list, startIndex, endIndex) => {
      const result = Array.from(list);
      console.log(result);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);

      return result;
    };

    /* Function executed just before dragging starts. */
    function onBeforeCapture(res) {
      console.log('here');
    }

    /* Function executed when an object being dragged is dropped. */
    function onDragEnd(res, e) {
      var prevBoard = {...board};
      /* If dropped at an invalid destination, which doesn't allow drops. */
      if(!res.destination) {
        console.log('ending');
        return;
      }

      /* Get index of source and destination lists. */
      const source = res.source;
      const destination = res.destination;
      var sourceList = -1;
      var destList = -1;

      board.list.forEach((val, index) => {
        if(val.title == source.droppableId) {
          sourceList = index;
        }
        if(val.title == destination.droppableId) {
          destList = index;
        }
      });

      /* If drag & drop in the same list. */
      if(sourceList == destList) {
        var newBoard;
        newBoard = {...board};

        newBoard.list[destList].cards = reorder(
          board.list[destList].cards,
          res.source.index,
          res.destination.index
        );

        setBoard(newBoard);
      } else {
        var newBoard;
        var target;
        newBoard = {...board};
        target = newBoard.list[sourceList].cards[source.index];

        newBoard.list[sourceList].cards.splice(source.index, 1);
        newBoard.list[destList].cards.splice(destination.index, 0, target);
        setBoard(newBoard);
      }

      /* Send the updated card positions to the server. */
      /* should be replaced by a shorther request which just sends updated info,
       * instead of sending the whole board. */
      let reqData = { 
        users: board.usernames,
        boardname: board.boardname,
        board_list: board.list 
      };
      axios.post(url + "board/addboard/",reqData, {
        headers: {'colab-tool-token': localStorage.getItem("colab-tool-token")},
        body: reqData
      })
      .then(res => {
        console.log(res);
        console.log("Card Moved Successfully.");
      })
      .catch(err => {
        console.log(err);
        setBoard(prevBoard);
        console.log("Card Movement not updated in database");
      })
    }

    function displayLists() {
      if(board.list == undefined) {
        return (
          <></>   //<h1></h1>
        )
      }

      for(var i = 0; i < board.list.length; i++) {
        lists.push(
          <DraggableList id={i} x={board.list[i].pos.X} y={board.list[i].pos.Y} title={board.list[i].title} cards={board.list[i].cards} board={board}></DraggableList>
        )
      }
      return lists;
    }

    return (
        <div>
          <Header id = 'header2' title={props.boardname} creator={props.creator} board={board}/>
          <DragDropContext onBeforeCapture={onBeforeCapture} onDragEnd={onDragEnd}>
            <div id="pad">
                  {loadingDone && displayLists()
                  }
            </div>
          </DragDropContext>
        </div>
    );
}
export default Workspace;
