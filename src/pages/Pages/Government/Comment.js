import React, { useEffect, useRef, useState } from "react";
import {
    Container,
    Button,
    UncontrolledTooltip,
    Input,
    DropdownToggle,
    DropdownMenu,
    Dropdown,
    DropdownItem,
    Row,
    Col,
    Card,
    CardBody,
    UncontrolledDropdown
} from "reactstrap";
import MetaTags from 'react-meta-tags';
import { Link } from "react-router-dom";
import { isEmpty, map } from "lodash";
import SimpleBar from "simplebar-react";

//Import Icons
import FeatherIcon from "feather-icons-react";
//redux
import { useSelector, useDispatch } from "react-redux";


import avatar2 from "../../../assets/images/users/avatar-2.jpg";
import userDummayImage from "../../../assets/images/users/user-dummy-img.jpg";
// import avatar2 from "../../assets/images/users/avatar-2.jpg";
import avatar3 from "../../../assets/images/users/avatar-3.jpg";
import avatar4 from "../../../assets/images/users/avatar-4.jpg";
import avatar5 from "../../../assets/images/users/avatar-5.jpg";
import avatar6 from "../../../assets/images/users/avatar-6.jpg";
import avatar7 from "../../../assets/images/users/avatar-7.jpg";

import userImage from "../../../assets/images/users/multi-user.jpg";
//Import Scrollbar
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

const Comment = ({ user }) => {
    const ref = useRef();
    const dispatch = useDispatch();
    const [isInfoDetails, setIsInfoDetails] = useState(false);
    const [Chat_Box_Username, setChat_Box_Username] = useState("Admin");
    const [Chat_Box_Image, setChat_Box_Image] = useState(avatar2);
    const [currentRoomId, setCurrentRoomId] = useState(1);
    const [messageBox, setMessageBox] = useState(null);
    const [curMessage, setcurMessage] = useState("");
    const [search_Menu, setsearch_Menu] = useState(false);
    const [settings_Menu, setsettings_Menu] = useState(false);
    const [currentUser, setCurrentUser] = useState({
        name: "Henry Wells",
        isActive: true,
    });


    const chats = [
        {
            id: 1,
            roomId: 1,
            status: "offline",
            name: "Admin",
            image: avatar2,
            number: "+(256) 2451 8974",
            email: "lisaparker@gmail.com",
            location: "California, USA",
        },
        {
            id: 2,
            roomId: 2,
            status: "offline",
            name: "Frank Thomas",
            image: avatar3,
            number: "+(256) 2451 8974",
            email: "lisaparker@gmail.com",
            location: "California, USA",
            badge: 8,
        },
        {
            id: 3,
            roomId: 3,
            status: "offline",
            name: "Clifford Taylor",
            bgColor: "danger",
            number: "+(256) 2451 8974",
            email: "lisaparker@gmail.com",
            location: "California, USA",
        },
        {
            id: 4,
            roomId: 4,
            status: "offline",
            name: "Janette Caster",
            image: avatar4,
            number: "+(256) 2451 8974",
            email: "lisaparker@gmail.com",
            location: "California, USA",
        },
        {
            id: 5,
            roomId: 5,
            status: "offline",
            name: "Sarah Beattie",
            image: avatar5,
            number: "+(256) 2451 8974",
            email: "lisaparker@gmail.com",
            location: "California, USA",
            badge: 5,
        },
        {
            id: 6,
            roomId: 6,
            status: "offline",
            name: "Nellie Cornett",
            image: avatar6,
            number: "+(256) 2451 8974",
            email: "lisaparker@gmail.com",
            location: "California, USA",
            badge: 2,
        },
        {
            id: 7,
            roomId: 7,
            status: "offline",
            name: "Chris Kiernan",
            bgColor: "warning",
            number: "+(256) 2451 8974",
            email: "lisaparker@gmail.com",
            location: "California, USA",
        },
        {
            id: 8,
            roomId: 8,
            status: "offline",
            name: "Edith Evans",
            bgColor: "info",
            number: "+(256) 2451 8974",
            email: "lisaparker@gmail.com",
            location: "California, USA",
        },
        {
            id: 9,
            roomId: 9,
            status: "offline",
            name: "Joseph Siegel",
            image: avatar7,
            number: "+(256) 2451 8974",
            email: "lisaparker@gmail.com",
            location: "California, USA",
        },
    ];
    const messages = [
        {
            id: 1,
            roomId: 1,
            sender: "Admin",
            message: "Good morning 😊",
            createdAt: "09:07 am",
        },
        {
            id: 2,
            roomId: 1,
            sender: "Anna Adame",
            message: "Good morning, How are you? What about our next meeting?",
            createdAt: "09:08 am",
        },
        {
            id: 3,
            roomId: 1,
            sender: "Admin",
            message: "Yeah everything is fine. Our next meeting tomorrow at 10.00 AM",
            createdAt: "09:10 am",
        },
        {
            id: 4,
            roomId: 1,
            sender: "Admin",
            message:
                "Hey, I'm going to meet a friend of mine at the department store. I have to buy some presents for my parents 🎁.",
            createdAt: "09:10 am",
        },
        {
            id: 5,
            roomId: 1,
            sender: "Anna Adame",
            message: "Wow that's great",
            createdAt: "09:12 am",
        },
        {
            id: 6,
            roomId: 2,
            sender: "Frank Thomas",
            message: "Good morning 😊",
            createdAt: "09:07 am",
        },
        {
            id: 7,
            roomId: 3,
            sender: "Clifford Taylor",
            message: "Hello 😊",
            createdAt: "09:07 am",
        },
        {
            id: 8,
            roomId: 4,
            sender: "Janette Caster",
            message: "Good morning 😊",
            createdAt: "09:07 am",
        },
        {
            id: 9,
            roomId: 5,
            sender: "Sarah Beattie",
            message: "Hii 😊",
            createdAt: "09:07 am",
        },
        {
            id: 10,
            roomId: 6,
            sender: "Nellie Cornett",
            message: "Good morning 😊",
            createdAt: "09:07 am",
        },
        {
            id: 11,
            roomId: 7,
            sender: "Chris Kiernan",
            message: "How Are You 😊",
            createdAt: "09:07 am",
        },
        {
            id: 12,
            roomId: 8,
            sender: "Edith Evans",
            message: "Good morning 😊",
            createdAt: "09:07 am",
        },
        {
            id: 13,
            roomId: 9,
            sender: "Joseph Siegel",
            message: "Good morning 😊",
            createdAt: "09:07 am",
        },
    ];


    //Toggle Chat Box Menus
    const toggleSearch = () => {
        setsearch_Menu(!search_Menu);
    };

    //Info details offcanvas
    const toggleInfo = () => {
        setIsInfoDetails(!isInfoDetails);
    };

    const toggleSettings = () => {
        setsettings_Menu(!settings_Menu);
    };
    //   useEffect(() => {
    //     dispatch(onGetDirectContact());
    //     dispatch(onGetChannels());
    //     dispatch(getMessages(currentRoomId));
    //   }, [dispatch, currentRoomId]);

    useEffect(() => {
        // console.log(user);
        ref.current.recalculate();
    });


    //Use For Chat Box
    const userChatOpen = (id, name, status, roomId, image) => {
        setChat_Box_Username(name);
        setCurrentRoomId(roomId);
        setChat_Box_Image(image);
        // dispatch(getMessages(roomId));
    };
    const addMessage = (roomId, sender) => {
        const message = {
          id: Math.floor(Math.random() * 100),
          roomId,
          sender,
          message: curMessage,
          createdAt: new Date(),
        };
        setcurMessage("");
        // dispatch(onAddMessage(message));
        scrollToBottom(message);
      };
      const scrollToBottom = (message) => {
        if (message) {
          message.scrollTop = message.scrollHeight + 1000;
        }
      };
    
    
      const onKeyPress = (e) => {
        const { key, value } = e;
        if (key === "Enter") {
          setcurMessage(value);
          addMessage(currentRoomId, currentUser.name);
        }
      };

    return (
        <React.Fragment>
            <div className="p-2 h-75">
                <Container fluid>

                    <div className="chat-wrapper d-lg-flex gap-1 mx-n4 mt-n4 p-1 h-75">
                        <div className="chat-leftsidebar h-50">

                            <PerfectScrollbar
                                className="chat-room-list"
                            >
                                <div className="d-flex align-items-center px-4 mb-2 pt-4">
                                    <div className="flex-grow-1">
                                        <h4 className="mb-0 fs-11 text-muted text-uppercase">
                                            Messages
                                        </h4>
                                    </div>
                                </div>
                                <div className="chat-message-list">
                                    <ul
                                        className="list-unstyled chat-list chat-user-list"
                                        id="userList"
                                    >
                                        {(chats || []).map((chat) => (
                                            <li
                                                key={chat.id + chat.status}
                                                className={
                                                    currentRoomId === chat.roomId ? "active" : ""
                                                }
                                            >
                                                <Link
                                                    to="#"
                                                    onClick={(e) => {
                                                        userChatOpen(
                                                            chat.id,
                                                            chat.name,
                                                            chat.status,
                                                            chat.roomId,
                                                            chat.image
                                                        );
                                                    }}
                                                >
                                                    <div className="d-flex align-items-center">
                                                        <div className="flex-shrink-0 chat-user-img online align-self-center me-2 ms-0">
                                                            <div className="avatar-xxs">
                                                                {chat.image ? (
                                                                    <img
                                                                        src={chat.image}
                                                                        className="rounded-circle img-fluid userprofile"
                                                                        alt=""
                                                                    />
                                                                ) : (
                                                                    <div
                                                                        className={
                                                                            "avatar-title rounded-circle bg-" +
                                                                            chat.bgColor +
                                                                            " userprofile"
                                                                        }
                                                                    >
                                                                        {chat.name.charAt(0)}
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <span className="user-status"></span>
                                                        </div>
                                                        <div className="flex-grow-1 overflow-hidden">
                                                            <p className="text-truncate mb-0">{chat.name}</p>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                            </PerfectScrollbar>
                        </div>

                        <div className="user-chat w-100 h-50 overflow-hidden">
                            <div className="chat-content d-lg-flex">
                                <div className="w-100 overflow-hidden position-relative">
                                    <div className="position-relative">
                                        <div className="p-3 user-chat-topbar">
                                            <Row className="align-items-center">
                                                <Col sm={4} xs={8}>
                                                    <div className="d-flex align-items-center">
                                                        <div className="flex-shrink-0 d-block d-lg-none me-3">
                                                            <Link
                                                                to="#"
                                                                className="user-chat-remove fs-18 p-1"
                                                            >
                                                                <i className="ri-arrow-left-s-line align-bottom"></i>
                                                            </Link>
                                                        </div>
                                                        <div className="flex-grow-1 overflow-hidden">
                                                            <div className="d-flex align-items-center">
                                                                <div className="flex-shrink-0 chat-user-img online user-own-img align-self-center me-3 ms-0">
                                                                    {Chat_Box_Image === undefined ? (
                                                                        <img
                                                                            src={userDummayImage}
                                                                            className="rounded-circle avatar-xs"
                                                                            alt=""
                                                                        />
                                                                    ) : (
                                                                        <img
                                                                            src={Chat_Box_Image}
                                                                            className="rounded-circle avatar-xs"
                                                                            alt=""
                                                                        />
                                                                    )}
                                                                    <span className="user-status"></span>
                                                                </div>
                                                                <div className="flex-grow-1 overflow-hidden">
                                                                    <h5 className="text-truncate mb-0 fs-16">
                                                                        <a
                                                                            className="text-reset username"
                                                                            data-bs-toggle="offcanvas"
                                                                            href="#userProfileCanvasExample"
                                                                            aria-controls="userProfileCanvasExample"
                                                                        >
                                                                            {Chat_Box_Username}
                                                                        </a>
                                                                    </h5>
                                                                    <p className="text-truncate text-muted fs-14 mb-0 userStatus">
                                                                        <small>Online</small>
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Col>

                                            </Row>
                                        </div>

                                        <div className="position-relative" id="users-chat">
                                            <SimpleBar
                                                ref={ref}
                                                className="chat-conversation p-3 p-lg-4 "
                                                id="chat-conversation"
                                            >
                                                <ul
                                                    className="list-unstyled chat-conversation-list"
                                                    id="users-conversation"
                                                >
                                                    {messages &&
                                                        map(messages, (message, key) => (
                                                            <li
                                                                className={
                                                                    message.sender === Chat_Box_Username
                                                                        ? " chat-list left"
                                                                        : "chat-list right"
                                                                }
                                                                key={key}
                                                            >
                                                                <div className="conversation-list">
                                                                    {message.sender === Chat_Box_Username && (
                                                                        <div className="chat-avatar">
                                                                            {Chat_Box_Image === undefined ?
                                                                                <img
                                                                                    src={userDummayImage}
                                                                                    alt=""
                                                                                />
                                                                                :
                                                                                <img
                                                                                    src={Chat_Box_Image}
                                                                                    alt=""
                                                                                />
                                                                            }
                                                                        </div>
                                                                    )}

                                                                    <div className="user-chat-content">
                                                                        <div className="ctext-wrap">
                                                                            <div className="ctext-wrap-content">
                                                                                <p className="mb-0 ctext-content">
                                                                                    {message.message}
                                                                                </p>
                                                                            </div>
                                                                            <UncontrolledDropdown className="align-self-start message-box-drop">
                                                                                <DropdownToggle
                                                                                    href="#"
                                                                                    className="btn nav-btn"
                                                                                    tag="a"
                                                                                >
                                                                                    <i className="ri-more-2-fill"></i>
                                                                                </DropdownToggle>
                                                                                <DropdownMenu>
                                                                                    <DropdownItem href="#" className="reply-message">
                                                                                        <i className="ri-reply-line me-2 text-muted align-bottom"></i>
                                                                                        Reply
                                                                                    </DropdownItem>
                                                                                    <DropdownItem href="#">
                                                                                        <i className="ri-share-line me-2 text-muted align-bottom"></i>
                                                                                        Forward
                                                                                    </DropdownItem>
                                                                                    <DropdownItem href="#">
                                                                                        <i className="ri-file-copy-line me-2 text-muted align-bottom"></i>
                                                                                        Copy
                                                                                    </DropdownItem>
                                                                                    <DropdownItem href="#">
                                                                                        <i className="ri-bookmark-line me-2 text-muted align-bottom"></i>
                                                                                        Bookmark
                                                                                    </DropdownItem>
                                                                                    <DropdownItem href="#">
                                                                                        <i className="ri-delete-bin-5-line me-2 text-muted align-bottom"></i>
                                                                                        Delete
                                                                                    </DropdownItem>
                                                                                </DropdownMenu>
                                                                            </UncontrolledDropdown>
                                                                        </div>
                                                                        <div className="conversation-name">
                                                                            <small className="text-muted time">
                                                                                09:07 am
                                                                            </small>{" "}
                                                                            <span className="text-success check-message-icon">
                                                                                <i className="ri-check-double-line align-bottom"></i>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        ))}
                                                </ul>
                                            </SimpleBar>
                                            <div
                                                className="alert alert-warning alert-dismissible copyclipboard-alert px-4 fade show "
                                                id="copyClipBoard"
                                                role="alert"
                                            >
                                                Message copied
                                            </div>
                                        </div>

                                        <div className="chat-input-section p-3 p-lg-4">
                                            <form id="chatinput-form">
                                                <Row className="g-0 align-items-center">
                                                    <div className="col-auto">
                                                        <div className="chat-input-links me-2">
                                                            <div className="links-list-item">
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-link text-decoration-none emoji-btn"
                                                                    id="emoji-btn"
                                                                >
                                                                    <i className="bx bx-smile align-middle"></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col">
                                                        <div className="chat-input-feedback">
                                                            Please Enter a Message
                                                        </div>
                                                        <input
                                                            type="text"
                                                            value={curMessage}
                                                            onKeyPress={onKeyPress}
                                                            onChange={e => setcurMessage(e.target.value)}
                                                            className="form-control chat-input bg-light border-light"
                                                            id="chat-input"
                                                            placeholder="Type your message..."
                                                        />
                                                    </div>
                                                    <div className="col-auto">
                                                        <div className="chat-input-links ms-2">
                                                            <div className="links-list-item">
                                                                <Button
                                                                    type="button"
                                                                    color="success"
                                                                    onClick={() =>
                                                                        addMessage(currentRoomId, currentUser.name)
                                                                    }
                                                                    className="chat-send waves-effect waves-light"
                                                                >
                                                                    <i className="ri-send-plane-2-fill align-bottom"></i>
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Row>
                                            </form>
                                        </div>

                                        <div className="replyCard">
                                            <Card className="mb-0">
                                                <CardBody className="py-3">
                                                    <div className="replymessage-block mb-0 d-flex align-items-start">
                                                        <div className="flex-grow-1">
                                                            {/* <h5 className="conversation-name"></h5> */}
                                                            <p className="mb-0"></p>
                                                        </div>
                                                        <div className="flex-shrink-0">
                                                            <button
                                                                type="button"
                                                                id="close_toggle"
                                                                className="btn btn-sm btn-link mt-n2 me-n3 fs-18"
                                                            >
                                                                <i className="bx bx-x align-middle"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </CardBody>
                                            </Card>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default Comment;
