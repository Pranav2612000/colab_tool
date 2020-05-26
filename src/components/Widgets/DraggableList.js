import React,{useState, useEffect} from 'react';
import axios from 'axios';
import Draggable , {DraggableCore} from 'react-draggable';
import List from "../Widgets/List";
import ReactDOM from "react-dom";
import {Container, Row, Col, ModalFooter, Modal, ModalBody, ModalHeader, Form, FormGroup, Input, Button, Label} from 'reactstrap';
import url from '../../links';

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
    const [trans,setTrans] = useState({
        x: 50,
        y: 50,
    });
    useEffect(() => {
        setPos({
            x: props.x,
            y: props.y
        });
    }, [props.x,props.y]);
    console.log("Reloaded");
    console.log(trans);
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
            //index: ,
            title: cardTitle,
            text: cardText,
            due_date: dueDate,
            attachement: null
        };
        //console.log(props.title);
        //console.log(props.board);
        for(var i = 0; i < props.board.list.length; i++) {
            if(props.board.list[i].title == props.title) {
                prev_list = props.board.list[i];
                break;
            }
        }
        if(prev_list.length == 0) {
            console.log("Error");
            return;
        }
        prev_cards = prev_list.cards;
        prev_cards.push(new_card);
        //console.log(prev_list);
        let reqData = {
            users: props.board.usernames,
            boardname: props.board.boardname,
            board_list: props.board.list 
        };
        //console.log(props.board);
        console.log(reqData);
        await axios.post(url + "board/addboard/",reqData, {
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
        return;
    }
    const getStyle = () => {
        console.log(trans);
        return ({
        width: 300,
        top: pos.y,
        left: pos.x,
        color: "red",
        //transform: "translate(" + trans.x + "," + trans.y + ")",
        position: "absolute",
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
            let prev_list = [];
            for(var i = 0; i < props.board.list.length; i++) {
                if(props.board.list[i].title == props.title) {
                    prev_list = props.board.list[i];
                    break;
                }
            }
            if(prev_list.length == 0) {
                console.log("Error");
                return;
            }
            prev_list.pos = {
                X: el_props.x,
                Y: el_props.y - 120
            };
            let reqData = {
                users: props.board.usernames,
                boardname: props.board.boardname,
                board_list: props.board.list 
            };
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
            console.log(reqData);
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
        console.log(props.id);
        let el_name = "dragzone" + props.id;
        let el = document.getElementById(el_name);
        console.log(el);
            let trans_str = el.style.transform;
            console.log(trans_str);
            if(trans_str != "translate(0px)") {
              let p1 = trans_str.split("(")[1];
              let x = p1.split(",")[0];
              let p2 = p1.split(",")[1]; 
              let y = p2.split(")")[0];
            }
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
                            <List cards={props.cards} dragCallback={preventListDrag} innerdrag={true} title={props.title} cards={props.cards} board={props.board} addCardCallback={toggle}></List>
                        </div>
                    </Draggable>
                  ) 
                  : 
                  (
                    <div id={"dragzone" + props.id} style={getStyle()}>
                        <List cards={props.cards} dragCallback={preventListDrag} innerdrag={false} title={props.title} cards={props.cards} board={props.board} addCardCallback={toggle}></List>
                    </div>
                  )}
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
                        {/*
                        <FormGroup>
                        <Label for="exampleFile">Member Photo</Label>
                        <div>
                            <img
                            src={this.state.data.mem_photo}
                            alt="Member"
                            width="150px"
                            height="150px"
                            />
                            <br />
                            <FileBase64
                            multiple={false}
                            //onDone={files => set_mem_photo(files.base64)}
                            name="mem_photo"
                            onDone = {this.saveMemImage}
                            //onChange={this.saveImage}
                            />
                        </div>
                        </FormGroup>
                        */}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={addCard}>
                        Confirm
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
