import React, { useCallback, useEffect, useState } from 'react';
import { Container } from 'reactstrap';
import EmailToolbar from './EmailToolbar';
import CommentbarOptician from './CommentbarOptician';
import CommentbarOptometrist from './CommentbarOptometrist';
import CommentbarFacility from './CommentbarFacility';
import CommentbarIndexing from './CommentbarIndexing';

import { request } from '../../../../services/utilities';
import { Link } from "react-router-dom";
import { Modal, ModalBody, ModalHeader, Label, Input, Progress, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import FeatherIcon from 'feather-icons-react';


//SimpleBar
import SimpleBar from "simplebar-react";

//import images
import image2 from "../../../../assets/images/users/avatar-2.jpg";


const MailInbox = ({ user }) => {
    const [messages, setMessages] = useState([]);
    const [modal, setModal] = useState(false);
    const [show, setShow] = useState(false);
    const [body, setBody] = useState('');
    const [subject, setSubject] = useState('');
    const [type, setType] = useState(null);
    const [selectedType, setSelectedType] = useState(null);

    const [id, setId] = useState(null);

    const toggle = () => {
        console.log(user);
        if (modal) {
            setModal(false);
        } else {
            setModal(true);
        }
    };

    const fetchPractice = (e) => {
        setSelectedType(e);

        if (e === 'practices') {
            setType(user.practices);
        }
        if (e === 'internship') {
            if (user.internship !== null) {
                let x = new Array(user.internship);
                setType(x);
            }
        }
        if (e === 'training') {
            if (user.training !== null) {
                let x = new Array(user.training);
                setType(x);
            }
        }
        if (e === 'optician') {
            if (user.optician !== null) {
                let x = new Array(user.optician);
                setType(x);
            }
        }
        if (e === 'optometrist') {
            if (user.optometrist !== null) {
                let x = new Array(user.optometrist);
                setType(x);
            }
        }
        if (e === 'indexing') {
            if (user.indexing !== null) {
                let x = new Array(user.indexing);
                setType(x);
            }

        }
    }
    const createTicket = async () => {
        const data = {
            subject, body, practiceId: selectedType === 'practices' ? id : null, opticianId: selectedType === 'optician' ? id : null,
            optometristId: selectedType === 'optometrist' ? id : null, trainingId: selectedType === 'training' ? id : null,
            internshipId: selectedType === 'internship' ? id : null, indexingId: selectedType === 'indexing' ? id : null
        };
        try {
            const url = `tickets/create?senderId=${user?.id}`
            const rs = await request(url, 'POST', true, data);
            fetchTickets();
            setModal(false);
        } catch (err) {
            console.log(err);
        }
    }
    const fetchTickets = useCallback(async () => {
        try {
            const url = `tickets/?id=&ticketId=&userId=${user?.id}`;
            const rs = await request(url, 'GET', true);
            setMessages(rs.data);
        } catch (err) {
            console.log(err)
        }
    }, [user?.id]);

    useEffect(() => {
        fetchTickets();
    }, [fetchTickets]);
    return (
        <React.Fragment>
            <Modal id="composemodal" className="modal-lg" isOpen={modal} toggle={toggle} centered>
                <ModalHeader className="p-3 bg-light" toggle={toggle}>
                    New Message
                </ModalHeader>
                <ModalBody>
                    <div>
                        <div className="row">
                            <div className="col-xl-6">
                                <Label htmlFor="phonenumberInput" className="form-label">Practice Type
                                </Label>
                                <select className="form-select mb-3" onChange={e => fetchPractice(e.target.value)}>
                                    <option >Select Practice Type </option>
                                    <option value='practices'>Facility</option>
                                    <option value="optician">Optician</option>
                                    <option value="optometrist">Optometrist</option>
                                    <option value="internship">Internship</option>
                                    <option value="training">Training</option>
                                </select>
                            </div>
                            <div className="col-xl-6">
                                <Label htmlFor="phonenumberInput" className="form-label">Practice </Label>
                                <select className="form-select mb-3" onChange={e => setId(parseInt(e.target.value))}>
                                    <option >Select Practice  </option>
                                    {type?.map(e => {
                                        return (
                                            <option key={e.id} value={e.id}>{e.name + ' --- ' + e.id || user.firstName + user.surname + ' --- ' + e.id}</option>
                                        )
                                    })}

                                </select>
                            </div>
                        </div>

                        <div className="mb-3">
                            <Input type="text" className="form-control" value={subject} onChange={e => setSubject(e.target.value)} placeholder="Subject" />
                        </div>

                        <div className="ck-editor-reverse">
                            <textarea style={{ height: '300px', width: '100%', border: '1px solid #e6e9ec' }} value={body} onChange={e => setBody(e.target.value)} />

                        </div>
                    </div>
                </ModalBody>
                <div className="modal-footer">
                    <button
                        type="button"
                        className="btn btn-ghost-danger"
                        onClick={() => {
                            setModal(false);
                        }}
                    >
                        Discard
                    </button>

                    <button
                        type="button"
                        className="btn btn-success"
                        onClick={() => {
                            createTicket();
                        }}
                    >
                        Send
                    </button>

                </div>
            </Modal>
            <div className=" pt-4">
                <Container fluid>
                    {/* <MetaTags>
                        <title>Mailbox | Velzon - React Admin & Dashboard </title>
                    </MetaTags> */}
                    <div className="email-wrapper d-lg-flex gap-1 mx-n4 mt-n4 p-1">
                        {/* <EmailSidebar messages={messages} userId={user?.id} fetchTickets={fetchTickets} /> */}
                        <div className="email-menu-sidebar">
                            <div className="p-4 d-flex flex-column h-100">
                                <div className="pb-4 border-bottom border-bottom-dashed">
                                    <button
                                        type="button"
                                        className="btn btn-danger w-100"
                                        data-bs-toggle="modal"
                                        data-bs-target="#composemodal"
                                        onClick={() => {
                                            setModal(true);
                                        }}
                                    >
                                        <FeatherIcon icon="plus-circle" className="icon-xs me-1 icon-dual-light" />

                                        Compose
                                    </button>
                                </div>

                                <SimpleBar
                                    className="mx-n4 px-4 email-menu-sidebar-scroll"
                                    data-simplebar
                                >
                                    <div className="mail-list mt-3">
                                        <Link to="#messages" className="active" onClick={() => setShow(false)}>
                                            <i className="ri-inbox-archive-fill me-3 align-middle fw-medium"></i>{" "}
                                            Inbox{" "}
                                            <span className="badge badge-soft-success ms-auto  ">{messages.length}</span>
                                        </Link>
                                        <h5 className="fs-12 text-uppercase text-muted mb-3">Admin</h5>
                                        <Link to="#comments" className="active" onClick={() => setShow(true)}>
                                            <i className="ri-inbox-archive-fill me-3 align-middle fw-medium"></i>{" "}
                                            Comment
                                        </Link>
                                    </div>

                                    <div className="border-top border-top-dashed pt-3 mt-3">

                                        <h5 className="fs-12 text-uppercase text-muted mb-3">Chat</h5>

                                        <div className="mt-2 vstack gap-3">
                                            <Link to="#" className="d-flex align-items-center">
                                                <div className="flex-shrink-0 me-2 avatar-xs">
                                                    <img
                                                        className="img-fluid rounded-circle"
                                                        src={image2}
                                                        alt=""
                                                    />
                                                </div>

                                                <div className="flex-grow-1 chat-user-box overflow-hidden">
                                                    <h5 className="fs-13 text-truncate mb-0">Admin</h5>
                                                    <small className="text-muted text-truncate mb-0">
                                                        Hello ! send a message?
                                                    </small>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                </SimpleBar>
                            </div>
                        </div>
                        <div className='w-100'>
                            {show === true && user?.type === 'optician' ? <> <CommentbarOptician messages={user} userId={user?.id} />
                            </> : show === true && user?.type === 'optometrist' ? <> <CommentbarOptometrist messages={user} userId={user?.id} />
                            </> : show === true && user?.type === 'facility' ? <> <CommentbarFacility messages={user} userId={user?.id} />
                            </> : show === true && user?.type === 'indexing' ? <> <CommentbarIndexing messages={user} userId={user?.id} />
                            </> : <><EmailToolbar messages={messages} userId={user?.id} /></>}
                        </div>

                    </div>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default MailInbox;