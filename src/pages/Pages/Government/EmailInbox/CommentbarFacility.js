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



const CommentToolbar = ({ messages, userId }) => {
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

    const showMessage = async i => {
        let item = messages?.practices[i]
        setMessage(item);
        toggleRightCanvas();
    }

    return (
        <React.Fragment>
            <div className="email-content">
                <div className="p-4 pb-0">
                    <div className="border-bottom border-bottom-dashed">
                        <Row className="align-items-center mt-3">
                            <Col>
                                <ul className="nav nav-tabs nav-tabs-custom nav-success gap-1 text-center border-bottom-0" role="tablist">
                                    <NavItem className='d-flex justify-content-between w-100'>
                                        <NavLink className="fw-semibold active" href="#">
                                            <i className="ri-inbox-fill align-bottom d-inline-block"></i>
                                            <span className="ms-1 d-none d-sm-inline-block">Primary</span>
                                        </NavLink>
                                        <NavLink className="fw-semibold active" href="#">
                                            <i className="ri-inbox-fill align-bottom d-inline-block"></i>
                                            <span className="ms-1 d-none d-sm-inline-block">Comments</span>
                                        </NavLink>
                                    </NavItem>
                                </ul>
                            </Col>
                            <div className="col-auto">
                                {/* <div className="text-muted">1- {messages.length}</div> */}
                            </div>
                        </Row>
                    </div>

                    <SimpleBar className="message-list-content mx-n4 px-4 message-list-scroll">
                        <ul className="message-list">
                            {messages?.practices?.map((e, i) => {
                                return (
                                    <li className='unread' key={i}>
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
                                            <Link to="#" className="title text-capitalize">{new Date(e.createdAt).toDateString()}</Link>
                                        </div>
                                        <div className="col-mail col-mail-2" onClick={() => showMessage(i)}>
                                            <Link to="#" className="subject text-capitalize"> {<span className={"badge me-2 bg-"}></span>} <span className="teaser text-capitalize">{e.name} Id:{e.id}</span>
                                            </Link>
                                            <div className="date">{new Date(e?.createdAt).toLocaleDateString()}</div>
                                        </div>
                                    </li>
                                )
                            })}
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
                            {message?.sd_comment === null ? '' : <div>
                                <div className="accordion accordion-flush">
                                    <div className="accordion-item border-dashed">
                                        <div className="accordion-header">
                                            <div className="text-muted fs-12">{new Date(message?.sd_comment?.createdAt).toDateString()}</div>
                                            <a role="button" href='/#' className="btn w-100 text-start px-0 bg-transparent shadow-none collapsed" id={`email-collapse${message?.sd_comment?.id}`}>
                                                <div className="d-flex align-items-center text-muted">
                                                    <div className="flex-shrink-0 avatar-xs me-3">
                                                        <img src={avatar3} alt="" className="img-fluid rounded-circle" />
                                                    </div>
                                                    <div className="flex-grow-1 overflow-hidden">
                                                        <h5 className="fs-14 text-truncate mb-0 text-capitalize">Service Desk</h5>
                                                        <div className="text-truncate fs-12">to:  me</div>
                                                    </div>
                                                    <div className="flex-shrink-0 align-self-start">
                                                        <div className="text-muted fs-12">{new Date(message?.sd_comment?.createdAt).toLocaleDateString()}</div>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>

                                        <UncontrolledCollapse toggler={`email-collapse${message?.sd_comment?.id}`} className="accordion-collapse collapse">
                                            <div className="accordion-body text-body px-0">
                                                <div>
                                                    {/* <p>{e?.subject},</p> */}
                                                    <p>{message?.sd_comment?.note}
                                                    </p>
                                                </div>
                                            </div>
                                        </UncontrolledCollapse>
                                    </div>
                                </div>
                            </div>}
                            {message?.hod_comment === null ? '' : <div>
                                <div className="accordion accordion-flush">
                                    <div className="accordion-item border-dashed">
                                        <div className="accordion-header">
                                            <div className="text-muted fs-12">{new Date(message?.hod_comment?.createdAt).toDateString()}</div>
                                            <a role="button" href='/#' className="btn w-100 text-start px-0 bg-transparent shadow-none collapsed" id={`email-collapse${message?.hod_comment?.id}`}>
                                                <div className="d-flex align-items-center text-muted">
                                                    <div className="flex-shrink-0 avatar-xs me-3">
                                                        <img src={avatar3} alt="" className="img-fluid rounded-circle" />
                                                    </div>
                                                    <div className="flex-grow-1 overflow-hidden">
                                                        <h5 className="fs-14 text-truncate mb-0 text-capitalize">Head Of Department</h5>
                                                        <div className="text-truncate fs-12">to:  me</div>
                                                    </div>
                                                    <div className="flex-shrink-0 align-self-start">
                                                        <div className="text-muted fs-12">{new Date(message?.hod_comment?.createdAt).toLocaleDateString()}</div>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>

                                        <UncontrolledCollapse toggler={`email-collapse${message?.hod_comment?.id}`} className="accordion-collapse collapse">
                                            <div className="accordion-body text-body px-0">
                                                <div>
                                                    {/* <p>{e?.subject},</p> */}
                                                    <p>{message?.hod_comment?.note}
                                                    </p>
                                                </div>
                                            </div>
                                        </UncontrolledCollapse>
                                    </div>
                                </div>
                            </div>}
                            {message?.odorbn_admin === null ? '' : <div>
                                <div className="accordion accordion-flush">
                                    <div className="accordion-item border-dashed">
                                        <div className="accordion-header">
                                            <div className="text-muted fs-12">{new Date(message?.odorbn_admin?.createdAt).toDateString()}</div>
                                            <a role="button" href='/#' className="btn w-100 text-start px-0 bg-transparent shadow-none collapsed" id={`email-collapse${message?.odorbn_admin?.id}`}>
                                                <div className="d-flex align-items-center text-muted">
                                                    <div className="flex-shrink-0 avatar-xs me-3">
                                                        <img src={avatar3} alt="" className="img-fluid rounded-circle" />
                                                    </div>
                                                    <div className="flex-grow-1 overflow-hidden">
                                                        <h5 className="fs-14 text-truncate mb-0 text-capitalize">Head Of Department</h5>
                                                        <div className="text-truncate fs-12">to:  me</div>
                                                    </div>
                                                    <div className="flex-shrink-0 align-self-start">
                                                        <div className="text-muted fs-12">{new Date(message?.odorbn_admin?.createdAt).toLocaleDateString()}</div>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>

                                        <UncontrolledCollapse toggler={`email-collapse${message?.odorbn_admin?.id}`} className="accordion-collapse collapse">
                                            <div className="accordion-body text-body px-0">
                                                <div>
                                                    {/* <p>{e?.subject},</p> */}
                                                    <p>{message?.odorbn_admin?.note}
                                                    </p>
                                                </div>
                                            </div>
                                        </UncontrolledCollapse>
                                    </div>
                                </div>
                            </div>}
                        </SimpleBar>
                    </OffcanvasBody>

                </Offcanvas>
            </div>

        </React.Fragment>
    );
};

export default CommentToolbar;