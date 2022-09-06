import React, { useState } from "react";
import { Link } from "react-router-dom";

//SimpleBar
import SimpleBar from "simplebar-react";

//import images
import image2 from "../../../../../assets/images/users/avatar-2.jpg";

const EmailSidebar = ({ messages, userId, fetchTickets }) => {
  const [modal, setModal] = useState(false);

  const toggle = () => {
    if (modal) {
      setModal(false);
    } else {
      setModal(true);
    }
  };

  return (
    <React.Fragment>
      <div className="email-menu-sidebar">
        <div className="p-4 d-flex flex-column h-100">
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
    </React.Fragment>
  );
};

export default EmailSidebar;
