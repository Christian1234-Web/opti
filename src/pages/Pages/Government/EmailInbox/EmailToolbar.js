import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { mailbox } from './mailbox';
import { Col, UncontrolledAlert, NavItem, NavLink, Offcanvas, OffcanvasBody, Row, UncontrolledDropdown, UncontrolledTooltip, UncontrolledCollapse, ButtonGroup, Button, UncontrolledButtonDropdown, Alert } from 'reactstrap';

//SimpleBar
import SimpleBar from "simplebar-react";

// Rating
import Rating from "react-rating";
import { request } from '../../../../services/utilities';

// Import Images
import avatar1 from "../../../../assets/images/users/avatar-1.jpg";
import avatar3 from "../../../../assets/images/users/avatar-3.jpg";

import img2 from "../../../../assets/images/small/img-2.jpg";
import img6 from "../../../../assets/images/small/img-6.jpg";
import { USER_COOKIE } from '../../../../services/constants';
import { Store } from '../../../../services/store';



const EmailToolbar = ({ messages, userId }) => {
    const store = useContext(Store);
    const [username, setUsername] = store.username;
    const [isRight, setIsRight] = useState(false);
    const [message, setMessage] = useState([]);
    const [ticketId, setTicketId] = useState('');
    const [response, setResponse] = useState('');
    const [show, setShow] = useState(false)

    const toggleRightCanvas = () => {
        setIsRight(!isRight);
    };

    const showMessage = async id => {
        try {
            const url = `tickets/?id=&ticketId=${id}&userId=${userId}`;
            const rs = await request(url, 'GET', true);
            // console.log(rs);
            setMessage(rs.data);
            setTicketId(id);
            toggleRightCanvas();
        } catch (err) {
            console.log(err);
        }
    }

    const sendResponse = async () => {
        const data = { body: response };
        try {
            const url = `tickets/response?senderId=${userId}&ticketId=${ticketId}`;
            const rs = await request(url, 'POST', true, data);
            // console.log(rs);
            setShow(true);
            setResponse('');
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <React.Fragment>
            <div className="email-content">
                <div className="p-4 pb-0">
                    <div className="border-bottom border-bottom-dashed">
                        <Row className="align-items-center mt-3">
                            <Col>
                                <ul className="nav nav-tabs nav-tabs-custom nav-success gap-1 text-center border-bottom-0" role="tablist">
                                    <NavItem>
                                        <NavLink className="fw-semibold active" href="#">
                                            <i className="ri-inbox-fill align-bottom d-inline-block"></i>
                                            <span className="ms-1 d-none d-sm-inline-block">Primary</span>
                                        </NavLink>
                                    </NavItem>
                                </ul>
                            </Col>
                            <div className="col-auto">
                                <div className="text-muted">1- {messages.length}</div>
                            </div>
                        </Row>
                    </div>

                    <SimpleBar className="message-list-content mx-n4 px-4 message-list-scroll">
                        <ul className="message-list">
                            {messages.map((item, key) => (
                                <li className={item.unread ? "unread" : null} key={key}>
                                    <div className="col-mail col-mail-1">
                                        {/* <div className="form-check checkbox-wrapper-mail fs-14">
                                                <input className="form-check-input" type="checkbox" value="" id={item.forId} />
                                                <label className="form-check-label" htmlFor={item.forId}></label>
                                            </div> */}
                                        <button type="button" className="btn avatar-xs p-0 favourite-btn fs-15 active">
                                            <Rating
                                                stop={1}
                                                emptySymbol="ri-star-fill text-muted"
                                                fullSymbol="ri-star-fill text-warning "
                                            />
                                        </button>
                                        <Link to="#" className="title text-capitalize">{item.createdBy}</Link>
                                    </div>
                                    <div className="col-mail col-mail-2" onClick={() => showMessage(item.ticketId)}>
                                        <Link to="#" className="subject text-capitalize"> {item.badge ? <span className={"badge me-2 bg-" + item.badgeClass}>{item.badge}</span> : null} {item.subject} - <span className="teaser text-capitalize">{item.body}...</span>
                                        </Link>
                                        <div className="date">{new Date(item.createdAt).toLocaleDateString()}</div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </SimpleBar>
                </div>
            </div>

            <div className="email-detail-content">
                <Offcanvas isOpen={isRight} direction="end" id="offcanvasRight" >
                    <OffcanvasBody className="overflow-hidden">
                        <div className="pb-4 border-bottom border-bottom-dashed">
                            <Row>
                                <Col>
                                    <div className="">
                                        <button type="button" className="btn btn-soft-danger btn-icon btn-sm fs-16 close-btn-email" onClick={toggleRightCanvas}>
                                            <i className="ri-close-fill align-bottom"></i>
                                        </button>
                                    </div>
                                </Col>
                                <Col className="col-auto">
                                    <div className="hstack gap-sm-1 align-items-center flex-wrap email-topbar-link">
                                        <button type="button" className="btn btn-ghost-secondary btn-icon btn-sm fs-16 favourite-btn active">
                                            <Rating
                                                stop={1}
                                                emptySymbol="ri-star-fill text-warning align-bottom"
                                                fullSymbol="ri-star-fill text-muted align-bottom"
                                            />
                                        </button>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <SimpleBar className="mx-n4 px-4 email-detail-content-scroll" style={{ height: "100vh" }}>
                            <div className="mt-4 mb-3">
                                <h5 className="fw-bold text-capitalize">New updates for {username}</h5>
                            </div>
                            {message?.map((e, i) => {
                                return (
                                    <div key={i}>
                                        <div className="accordion accordion-flush">
                                            <div className="accordion-item border-dashed">
                                                <div className="accordion-header">
                                                    <a role="button" href='/#' className="btn w-100 text-start px-0 bg-transparent shadow-none collapsed" id={`email-collapse${i}`}>
                                                        <div className="d-flex align-items-center text-muted">
                                                            <div className="flex-shrink-0 avatar-xs me-3">
                                                                <img src={avatar3} alt="" className="img-fluid rounded-circle" />
                                                            </div>
                                                            <div className="flex-grow-1 overflow-hidden">
                                                                <h5 className="fs-14 text-truncate mb-0 text-capitalize">{e?.createdBy}</h5>
                                                                <div className="text-truncate fs-12">to: {e.userId === userId ? 'admin' : 'me'}</div>
                                                            </div>
                                                            <div className="flex-shrink-0 align-self-start">
                                                                <div className="text-muted fs-12">{new Date(e?.createdAt).toLocaleDateString()}</div>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>  

                                                <UncontrolledCollapse toggler={`email-collapse${i}`} className="accordion-collapse collapse">
                                                    <div className="accordion-body text-body px-0">
                                                        <div>
                                                            <p>{e?.subject},</p>
                                                            <p>{e?.body}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </UncontrolledCollapse>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </SimpleBar>
                    </OffcanvasBody>
                    <div className="mt-auto p-4">
                        {show ? <UncontrolledAlert color='success'>
                            Message Sent
                        </UncontrolledAlert> : ''}
                        <form className="mt-2">
                            <div>
                                <label htmlFor="exampleFormControlTextarea1" className="form-label">Reply :</label>
                                <textarea className="form-control border-bottom-0 rounded-top rounded-0 border" value={response} onChange={e => setResponse(e.target.value)} id="exampleFormControlTextarea1" rows="3" placeholder="Enter message"></textarea>
                                <div className="bg-light px-2 py-1 rouned-bottom border">
                                    <Row>
                                        <Col>

                                        </Col>
                                        <Col className="col-auto">
                                            <Button color="success" type='button' onClick={() => sendResponse()} className="btn-sm"><i className="ri-send-plane-2-fill align-bottom" /></Button>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </form>
                    </div>
                </Offcanvas>
            </div>

        </React.Fragment>
    );
};

export default EmailToolbar;