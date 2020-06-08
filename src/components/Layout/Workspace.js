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
    const [board,setBoard] = useState({});
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
        await axios.post(url + "board/getboarddata/",reqData, {
          headers: {'colab-tool-token': localStorage.getItem("colab-tool-token")},
          body: reqData
        })
        .then(res => {
          console.log(res.data);
          setBoard(res.data);
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
    },[props.boardname]);
  
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
        board_list: board.list,
        boardcolor: board.boardcolor,  
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
      var results = [];
      var listsInContext = [];
      console.log('redesplaying lists');
      console.log(board.list);
      if(board.list == undefined) {
        return (
            <span style={{fontFamily:'CrossHatcherD', fontSize: '250%'}}>No Lists Added. Press the icon at the top right to add lists</span>
        )
      }
      if(board.list.length == 0) {
        return (
            <span style={{fontFamily:'CrossHatcherD', fontSize: '250%'}}>No Lists Added. Press the icon at the top right to add lists</span>
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
        lists.push(
          <DraggableList id={i} x={board.list[i].pos.X} y={board.list[i].pos.Y} title={board.list[i].title} cards={board.list[i].cards} board={board} in_context={board.list[i]["in_context"]}></DraggableList>
        )
      }
      return lists;
    }

    return (
        <div style={{height:"90vh "}} >
          <Header  id = 'header2' title={props.boardname} creator={props.creator} board={board} searchText={searchText} setSearchText={setSearchText}/>
          
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
