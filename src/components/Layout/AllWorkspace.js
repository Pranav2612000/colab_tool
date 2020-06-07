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
          console.log(err.response.data.msg);
          if(err.response.data.msg === "Token is not valid") {
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
      var results = [];
      var listsInContext = [];
      console.log('redesplaying lists');
      if(board.list == undefined) {
        return (
          <></>   //<h1></h1>
        )
      }
      for(var i = 0; i < board.list.length; i++) {
        board.list[i]["in_context"] = false;
        for(var j = 0; j < board.list[i].cards.length;j++) {
          board.list[i].cards[j]['in_context'] = false;
        }
      }
      if(searcher != undefined && searchText != '') {
        listsInContext = searcher.search(searchText);
      }
      if(listsInContext.length > 0) {
        listsInContext.forEach((list, index) => {
          //If list matches add the list_title to result.
          if(list.title.toUpperCase().includes(searchText.toUpperCase())) {
            list["in_context"] = true;
          } else {
            //Else search each card to find the card in
            //context and add its title to result.
            list["in_context"] = false;
            if(list.cards.length > 0) {
              list.cards.forEach((card, ind) => {
                if(card.title.toUpperCase().includes(searchText.toUpperCase())) {
                  card["in_context"] = true;
                  return;
                }
                if(card.due_date.toUpperCase().includes(searchText.toUpperCase())) {
                  card["in_context"] = true;
                  return;
                }
                if(card.text.toUpperCase().includes(searchText.toUpperCase())) {
                  card["in_context"] = true;
                  return;
                }
              });
            }
          }
        });
        console.log(results);
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
