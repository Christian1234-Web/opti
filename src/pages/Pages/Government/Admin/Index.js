import React, { useState, useEffect, useContext } from 'react'
import { Card, CardBody, Col, Container, Nav, NavItem, NavLink, Row, TabContent, TabPane } from "reactstrap";
import { useHistory, Link } from 'react-router-dom';
import classnames from "classnames";
import Facility from './Facility';
import HeaderIndex from './Layout';
import Optician from './Optician';
import Optometrist from './Optometrist';
import Indexing from './Indexing';
import { TOKEN_COOKIE, USER_COOKIE } from '../../../../services/constants';
import SSRStorage from '../../../../services/storage';
import { Store } from '../../../../services/store';
import BoardNumber from './BoardNumber';
import Messages from './EmailInbox'
const storage = new SSRStorage();

function Index() {
    const store = useContext(Store);
    const [adminType, setAdminType] = store.adminType
    const [user_type, setUser_type] = store.user_type;
    const history = useHistory();
    const [cardHeaderTab, setcardHeaderTab] = useState("1");

    const cardHeaderToggle = (tab) => {
        if (cardHeaderTab !== tab) {
            setcardHeaderTab(tab);
        }
    };
    const checkUserType = async () => {
        const user = await (new SSRStorage()).getItem(USER_COOKIE);
        if (user === null) {
            history.push(`admin-login`);
            storage.removeItem(USER_COOKIE);
            storage.removeItem(TOKEN_COOKIE);
        }
        if (user.userType !== 'admin' && user.userType !== 'hod' && user.userType !== 'sd') {
            history.push(`/${`signin`}`);
            storage.removeItem(USER_COOKIE);
            storage.removeItem(TOKEN_COOKIE);
        }

    }
    setTimeout(checkUserType, 2000);
 
    return (
        <>
            <div className='w-100'>
                <HeaderIndex />
            </div>
            <Container>
                <div className="page-content mt-5">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                                    <h4 className="mb-sm-0">Admin</h4>

                                    <div className="page-title-right">
                                        <ol className="breadcrumb m-0">
                                            <li className="breadcrumb-item"><Link to="#">Dashboards</Link></li>
                                            <li className="breadcrumb-item active">CRM</li>
                                        </ol>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="row align-items-start card bg-primary">
                            <div className="col-sm-8">
                                <div className="p-3">
                                    <p className="fs-16 lh-base text-white">Welcome!<span className="fw-semibold text-uppercase"> {adminType}</span></p>

                                </div>
                            </div>
                            <div className="col-sm-4">

                            </div>
                        </div>
                        <Col xxl={12}>
                            {/* <h5 className="mb-3">Card Header Tabs</h5> */}
                            <Card>
                                <div className="card-header align-items-center d-flex">
                                    <div className="flex-grow-1 oveflow-hidden">
                                        {/* <p className="text-muted text-truncates mb-0">Use <code>card-header-tabs</code> class to create card header tabs.</p> */}
                                    </div>
                                    <div className="flex-shrink-0 ms-2">

                                        <Nav pills className="card-header-pills">
                                            <NavItem>
                                                <NavLink style={{ cursor: "pointer" }} className={classnames({ active: cardHeaderTab === "1", })} onClick={() => { cardHeaderToggle("1"); }} >
                                                    Indexings
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink style={{ cursor: "pointer" }} className={classnames({ active: cardHeaderTab === "2", })} onClick={() => { cardHeaderToggle("2"); }} >
                                                    Facilities
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink style={{ cursor: "pointer" }} className={classnames({ active: cardHeaderTab === "3", })} onClick={() => { cardHeaderToggle("3"); }} >
                                                    Dispensing Opticians
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink style={{ cursor: "pointer" }} className={classnames({ active: cardHeaderTab === "4", })} onClick={() => { cardHeaderToggle("4"); }} >
                                                    Optometrists
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink style={{ cursor: "pointer" }} className={classnames({ active: cardHeaderTab === "5", })} onClick={() => { cardHeaderToggle("5"); }} >
                                                    Board Number
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink style={{ cursor: "pointer" }} className={classnames({ active: cardHeaderTab === "6", })} onClick={() => { cardHeaderToggle("6"); }} >
                                                    Messages
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink style={{ cursor: "pointer" }} className={classnames({ active: cardHeaderTab === "7", })} onClick={() => { cardHeaderToggle("7"); }} >
                                                    Enquiries
                                                </NavLink>
                                            </NavItem>
                                        </Nav>

                                    </div>
                                </div>
                                <CardBody>
                                    <TabContent activeTab={cardHeaderTab} className="text-muted">
                                        <TabPane tabId="1" id="home2">
                                            <Indexing />
                                        </TabPane>
                                        <TabPane tabId="2" id="home2">
                                            <Facility />
                                        </TabPane>
                                        <TabPane tabId="3" id="profile2">
                                            <Optician />
                                        </TabPane>

                                        <TabPane tabId="4" id="messages2">
                                            <Optometrist />
                                        </TabPane>
                                        <TabPane tabId="5" id="messages2">
                                            <BoardNumber />
                                        </TabPane>
                                        <TabPane tabId="6" id="messages2">
                                            <Messages />
                                        </TabPane>
                                        <TabPane tabId="7" id="messages2">
                                            {/* <Optometrist /> */}
                                            Enquiries Section
                                        </TabPane>
                                    </TabContent>
                                </CardBody>
                            </Card>
                        </Col>

                    </div>
                </div>
            </Container>
        </>

    )
}

export default Index;