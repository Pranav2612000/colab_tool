import React,{useState, useEffect} from 'react';
import axios from 'axios';
import Header from "../Layout/Header";
import List from "../Widgets/List";
import ReactDOM from "react-dom";
import {Container, Row, Col} from 'reactstrap';
import { withRouter } from "react-router-dom";
import DraggableList from '../Widgets/DraggableList';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import FuzzySearch from 'fuzzy-search';
import url from "../../links";
import $ from 'jquery';
//import { blue } from '@material-ui/core/colors';

const Workspace = props => {
    const [isDraggable, setIsDraggable] = useState(false);
    const [boards,setBoards] = useState({});
    const [cards, setCards] = useState();
    const [loadingDone, setLoadingDone] = useState(false);
    const [searchText, setSearchText] = useState("");
    var [searcher, setSearcher] = useState();
    var lists = [];

    /* Fetch Board Data when board changes. */
    useEffect(() => {
      const fetchData = async () => {
        var reqData = {
          creator: props.creator,
          boardname: props.boardname
        };
        var history = props.history;
        await axios.post(url + "board/allboarddata/",{}, {
          headers: {'colab-tool-token': localStorage.getItem("colab-tool-token")},
          body: reqData
        })
        .then(res => {
          console.log(res.data);
          setBoards(res.data);
          setLoadingDone(true);
          var new_searcher = new FuzzySearch(
            res.data.list,
            ['title','cards.title','cards.text','cards.due_date'],
            {
              caseSensitive: false,
            }
          );
          setSearcher(new_searcher);
        })
        .catch(err => {
          console.log(err.response);
          if(err.response && err.response.data && err.response.data.msg === "Token is not valid") {
            history.push('/login');       
          }
        })
      };
      fetchData();
    },[]);
  
    /* Called when the search string changes. */
    /*
    useEffect(() => {
      console.log(searchText);
    },[searchText]);
    */

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
      return;
    }

    function displayLists() {
      var allLists = [];
      boards.forEach((board, index) => {
      console.log('redesplaying lists');
      if(board.list == undefined) {
        return (
          <></>   //<h1></h1>
        )
      }
      console.log(board.list);
      for(var i = 0; i < board.list.length; i++) {
        allLists.push(
          <DraggableList id={i} x={board.list[i].pos.X} y={board.list[i].pos.Y} title={board.list[i].title} cards={board.list[i].cards} board={board} in_context={board.list[i]["in_context"]}></DraggableList>
        )
      }
        //allLists.push(lists);
      });
      return allLists;
    }

    return (
        <div style={{height:"90vh "}} >
          <DragDropContext onBeforeCapture={onBeforeCapture} onDragEnd={onDragEnd}>
            <div id="pad">
                  {loadingDone && displayLists()
                  }
            </div>
          </DragDropContext>
        </div>
    );
}
export default withRouter(Workspace);
