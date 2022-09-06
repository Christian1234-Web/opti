import React, { useState, useContext } from 'react'
import { Card, CardBody, Col, Container, Nav, NavItem, NavLink, Row, TabContent, TabPane } from "reactstrap";
import { useHistory, Link } from 'react-router-dom';
import classnames from "classnames";
import Facility from './Facility';
import HeaderIndex from '../Admin/Layout';
import Optician from './Optician';
import Optometrist from './Optometrist';
import SSRStorage from '../../../../services/storage';
import { Store } from '../../../../services/store';
import logoLight from "../../../../assets/images/odorbnlogo.png";
// import logoDark from "../../../../assets/images/odorbnlogowhite.png";

const storage = new SSRStorage();

function Index() {
    const store = useContext(Store);
    const [adminType, setAdminType] = store.adminType
    const history = useHistory();
    const [cardHeaderTab, setcardHeaderTab] = useState("1");
    const [name, setName] = useState("Facility");

    const d = new Date();
    const updated_year = d.getFullYear();

    
    const cardHeaderToggle = (tab) => {
        if (cardHeaderTab !== tab) {
            setcardHeaderTab(tab);
        }
    };
   
    
    return (
        <>
            <div className='w-100'>
                <HeaderIndex />
            </div>
            <div className="page-content mt-5">
                <div className="container-fluid p-5">
                    <div className="align-items-start card bg-primary">
                        <div className="col-sm-8 w-100">
                            <div className="p-3 row justify-content-between">
                                <Col>
                                    <p className="fs-16 lh-base text-white fw-semibold">{name} License Status Verification System!</p>
                                    <p className="fs-16 lh-base text-white">Any {name} that appears here is a Licensed {name} for the year {updated_year}</p>

                                </Col>
                                <Col lg={4}>
                                    <img
                                        src={logoLight}
                                        className="card-logo card-logo-dark"
                                        alt="logo dark"
                                        height="70"
                                        width='100%'
                                    />
                                    <img
                                        src={logoLight}
                                        className="card-logo card-logo-light"
                                        alt="logo light"
                                        height="70"
                                        width='100%'

                                    />
                                </Col>
                            </div>
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
                                            <NavLink style={{ cursor: "pointer" }} className={classnames({ active: cardHeaderTab === "1", })} onClick={() => { cardHeaderToggle("1"); setName('Facility') }} >
                                                Facilities
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink style={{ cursor: "pointer" }} className={classnames({ active: cardHeaderTab === "2", })} onClick={() => { cardHeaderToggle("2"); setName('Optician'); }} >
                                                Dispensing Opticians
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink style={{ cursor: "pointer" }} className={classnames({ active: cardHeaderTab === "3", })} onClick={() => { cardHeaderToggle("3"); setName('Optometrist'); }} >
                                                Optometrists
                                            </NavLink>
                                        </NavItem>
                                        {/* <NavItem>
                                                <NavLink style={{ cursor: "pointer" }} className={classnames({ active: cardHeaderTab === "5", })} onClick={() => { cardHeaderToggle("5"); }} >
                                                    Enquiries
                                                </NavLink>
                                            </NavItem> */}
                                    </Nav>

                                </div>
                            </div>
                            <CardBody>
                                <TabContent activeTab={cardHeaderTab} className="text-muted">

                                    <TabPane tabId="1" id="home2">
                                        <Facility />
                                    </TabPane>
                                    <TabPane tabId="2" id="profile2">
                                        <Optician />
                                    </TabPane>

                                    <TabPane tabId="3" id="messages2">
                                        <Optometrist />
                                    </TabPane>
                                    {/* <TabPane tabId="5" id="messages2">
                                            Enquiries Section
                                        </TabPane> */}
                                </TabContent>
                            </CardBody>
                        </Card>
                    </Col>

                </div>
            </div>
        </>

    )
}

export default Index;