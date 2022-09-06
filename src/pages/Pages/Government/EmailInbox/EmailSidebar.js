import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Modal, ModalBody, ModalHeader, Label, Input, Progress, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import FeatherIcon from 'feather-icons-react';


//SimpleBar
import SimpleBar from "simplebar-react";

//import images
import image2 from "../../../../assets/images/users/avatar-2.jpg";
import image4 from "../../../../assets/images/users/avatar-4.jpg";
import image3 from "../../../../assets/images/users/avatar-3.jpg";
import image5 from "../../../../assets/images/users/avatar-5.jpg";
import { request } from "../../../../services/utilities";



const EmailSidebar = ({ messages, userId, fetchTickets }) => {
  const [modal, setModal] = useState(false);
  const [body, setBody] = useState('');
  const [subject, setSubject] = useState('');

  const toggle = () => {
    if (modal) {
      setModal(false);
    } else {
      setModal(true);
    }
  };

  const createTicket = async () => {
    const data = { subject, body };
    try {
      const url = `tickets/create?senderId=${userId}`
      const rs = await request(url, 'POST', true, data);
      fetchTickets();
      setModal(false);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <React.Fragment>
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
              <Link to="#" className="active">
                <i className="ri-inbox-archive-fill me-3 align-middle fw-medium"></i>{" "}
                Inbox{" "}
                <span className="badge badge-soft-success ms-auto  ">{messages.length}</span>
              </Link>
              {/* <Link to="#">
                <i className="ri-send-plane-2-fill me-3 align-middle fw-medium"></i>{" "}
                Sent
              </Link> */}
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
                <select className="form-select mb-3">
                  <option >Select Practice Type </option>
                  <option value='Male'>Facility</option>
                  <option value="Female">Optician</option>
                  <option value="Female">Optometrist</option>
                  <option value="Female">Internship</option>
                  <option value="Female">Training</option>
                </select>
              </div>
              <div className="col-xl-6">
                <Label htmlFor="phonenumberInput" className="form-label">Practice Type
                </Label>
                <select className="form-select mb-3">
                  <option >Select Practice Type </option>
                  <option value='Male'>Facility</option>
                  <option value="Female">Optician</option>
                  <option value="Female">Optometrist</option>
                  <option value="Female">Internship</option>
                  <option value="Female">Training</option>
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
    </React.Fragment>
  );
};

export default EmailSidebar;
