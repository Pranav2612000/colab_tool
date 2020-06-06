import React,{useState, useEffect} from 'react';
import axios from 'axios';
import Draggable , {DraggableCore} from 'react-draggable';
import List from "../Widgets/List";
import {Spinner} from 'react-bootstrap';
import ReactDOM from "react-dom";
import {Container, Row, Col, ModalFooter, Modal, ModalBody, ModalHeader, Form, FormGroup, Input, Button, Label} from 'reactstrap';
import url from '../../links';
import { ProgressBar } from 'react-bootstrap';

const DraggableList = props => {
    const {className} = props;
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const [isDraggable, setIsDraggable] = useState(false);
    const [cardTitle, setCardTitle] = useState('');
    const [cardText, setCardText] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [pos, setPos] = useState({
        x : props.x,
        y: props.y 
    });
    const [loading,setLoading]=useState(false);
    const [trans,setTrans] = useState({
        x: 50,
        y: 50,
    });

    /* Update the position when props.x & props.y changes. */
    useEffect(() => {
        setPos({
            x: props.x,
            y: props.y
        });
    }, [props.x,props.y]);

    console.log("Reloaded");

  /*
    useEffect(() => {
        const fetchData = async () => {
            if(props.boards == undefined) {
                return;
            }
            let lists = props.boards.list;
            let cards;
            if(lists == undefined) {
                cards = [];
            } else {
                for(var i = 0;i < lists.length; i++) {
                    if(lists[i] == props.title) {
                        cards = lists[i];
                    break;
                    }
                }
            }
            console.log(cards);
        };
        fetchData();
    });
  */
    /*
    if(isDraggable == true) {
        const el_name = "dragzone" + props.id;
        let el = document.getElementById(el_name);
        let el_props = el.getBoundingClientRect(); 
        console.log(el_props);
    }
    if(props.boards == undefined) {
      return;
    }
    let lists = props.boards.list;
    let cards;
    if(lists == undefined) {
      cards = [];
    } else {
      for(var i = 0;i < lists.length; i++) {
        if(lists[i] == props.title) {
          cards = lists[i];
          break;
        }
      }
    }
    console.log(cards);
    */
    const addCard = async () => {
        let prev_cards;
        let prev_list;
        let new_list;
        let new_card = {
            title: cardTitle,
            text: cardText,
            due_date: dueDate,
            attachement: null
        };
        setLoading(true)
        /* Iterate through all lists of the board to find the list
        *  to be modified. */
       console.log("add Card fun")
       console.log(props.board.list);
        for(var i = 0; i < props.board.list.length; i++) {
            if(props.board.list[i].title == props.title) {
                prev_list = props.board.list[i];
                break;
            }
        }
        

        if(prev_list.length == 0) {
            console.log("List not found.");
            return;
        }

        /* Add the new card to the cards of the list. */
        console.log(prev_list.cards);
        console.log(new_card.title);
        var check = -1;
        for(var i = 0;i<prev_list.cards.length;i++){
          if(prev_list.cards[i].title == new_card.title){
            check = i;
            break;
          }
        }
        console.log("chech in Addcard: ",check);
        if(check != -1){
          alert("card already exists");
          return;
        }
        prev_cards = prev_list.cards;
        prev_cards.push(new_card);

        /* Send the new card data to the server. */
        let reqData = {
            users: props.board.usernames,
            boardname: props.board.boardname,
            board_list: props.board.list,
            boardcolor: props.board.boardcolor, 
        };
        console.log(reqData);

        await axios.post(url + "board/addboard/",reqData, {
          headers: {'colab-tool-token': localStorage.getItem("colab-tool-token")},
          body: reqData
        })
        .then(res => {
          console.log(res);
          setLoading(false)
          toggle();
        })
        .catch(err => {
          console.log(err);
        })
        console.log("end");
        return;
    }

    /* get the CSS being used for the list.*/
    const getStyle = () => {
        return ({
        width: 300,
        top: pos.y,
        left: pos.x,
        color: "red",
        position: "absolute",
        //transform: "translate(" + 0 + "," + 0 + ")"
        });
    };

    /* executes when 'M' button pressed. */
    function toggleListDrag() {
        /* pressed when draging was enabled, to stop dragging. */
        if(isDraggable == true) {
          /*
            // Get transform style of current list.
            let el_name = "dragzone" + props.id 
            let el = document.getElementById(el_name)
            let trans_str = el.style.transform;

            // Get x,y parameters of transform, to identify
            // where the element was moved and update trans
            let p1 = trans_str.split("(")[1];
            let x, y;
            if(p1 != undefined) {
              x = p1.split(",")[0];
            } else {
              x = 0;
            }
            let p2 = p1.split(",")[1]; 
            if(p2 != undefined) {
              y = p2.split(")")[0];
            } else {
              y = 0;
            }
            let trans_obj = {
                x: x,
                y: y
            }
          */

            // Get transform style of current list.
            let el_name = "dragzone" + props.id 
            let el = document.getElementById(el_name)

            /* Get Current position of element. */
            let el_props = el.getBoundingClientRect(); 
            let pos_obj = {
                x: el_props.x,
                y: el_props.y -120 //Magic number- obtained using trial & error method.
            }
            setPos(pos_obj);

            /* Iterate through all lists of the board to find the list
             *  to be modified. */
            let prev_list = [];
            for(var i = 0; i < props.board.list.length; i++) {
                if(props.board.list[i].title == props.title) {
                    prev_list = props.board.list[i];
                    break;
                }
            }
            if(prev_list.length == 0) {
                console.log("List not found.");
                return;
            }
            prev_list.pos = {
                X: el_props.x,
                Y: el_props.y - 120
            };

            /* send request to update the position in database. */
            let reqData = {
                users: props.board.usernames,
                boardname: props.board.boardname,
                board_list: props.board.list, 
                boardcolor: props.board.boardcolor,
            };
            console.log(reqData);
            axios.post(url + "board/addboard/",reqData, {
            headers: {'colab-tool-token': localStorage.getItem("colab-tool-token")},
            body: reqData
            })
            .then(res => {
              console.log(res);
            })
            .catch(err => {
              console.log(err);
            })
            console.log("end");
        }

        //Toggle draggable property.
        setIsDraggable(!isDraggable);
        console.log(pos);
    }
  
    /* Function called when dragging is stopped. */
    function onDragStop(e) {
        console.log(pos);
    }

    /* Function called when dragging is started. */
    function onStart(e) {
        
        /* Select the element being dragged. */
        let el_name = "dragzone" + props.id;
        let el = document.getElementById(el_name);

        /* Select its transform property.*/
        let trans_str = el.style.transform;

      /*
        if(trans_str != "translate(0px)") {
          let p1 = trans_str.split("(")[1];
          let x = p1.split(",")[0];
          let p2 = p1.split(",")[1]; 
          let y = p2.split(")")[0];
        }
      */
        let trans_obj = {
            x: trans.x,
            y: trans.y
        }
        console.log(trans_obj);
        //document.getElementById(el_name).style.transform = trans_obj;
    }

    return (
        <span style={{backgroundColor:"white"}} id="spanned">
                    {/*<Draggable bounds={"#pad"} onStop={onDragStop} onStart={onStart}>*/}
                  {isDraggable ? (
                    <Draggable  bounds={"#pad"} onStop={onDragStop}>
                        <div style={{backgroundColor:"white"}} id={"dragzone" + props.id} style={getStyle()}>
                            <List cards={props.cards} dragCallback={toggleListDrag} innerdrag={true} title={props.title} cards={props.cards} board={props.board} addCardCallback={toggle}></List>
                        </div>
                    </Draggable>
                  ) 
                  : 
                  (
                    <div id={"dragzone" + props.id} style={getStyle()}>
                        <List cards={props.cards} dragCallback={toggleListDrag} innerdrag={false} title={props.title} cards={props.cards} board={props.board} addCardCallback={toggle}></List>
                    </div>
                  )}
            
          {/* Modal to add new cards. */}
                <Modal isOpen={modal} toggle={toggle} className={className}>
                    <Form>
                    <ModalHeader toggle={toggle}>Add Card</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                        <Label for="cardname">Card Title:</Label>
                        <Input
                            type="text"
                            name="card_title"
                            id="card_title"
                            placeholder="Enter card title "
                            value={cardTitle}
                            onChange={e => setCardTitle(e.target.value)}
                        />
                        </FormGroup>
                        <FormGroup>
                        <Label for="cardtext">Card Text:</Label>
                        <Input
                            type="text"
                            name="card_text"
                            id="card_text"
                            placeholder="Enter card text "
                            value={cardText}
                            onChange={e => setCardText(e.target.value)}
                        />
                        </FormGroup>
                        <FormGroup>
                            <Label for="due_date">Due Date</Label>
                            <Input
                                type="date"
                                name="due_date"
                                id="due_date"
                                value={dueDate}
                                onChange={e => setDueDate(e.target.value)}
                            />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={addCard}>
                        {loading?(
            <Spinner animation="border" />
        ) : (
            <span>Confirm</span>
        )}
                        </Button>{' '}
                        <Button color="secondary" onClick={toggle}>
                        Cancel
                        </Button>
                    </ModalFooter>
                    </Form>
                </Modal>
        </span>
    );
}
export default DraggableList;
