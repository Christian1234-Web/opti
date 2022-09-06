import React, { useState, Fragment } from 'react'
import classnames from "classnames";
import { Card, CardBody, Col, Container, Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import PracticeRegTwoOptician from './PracticeRegTwoOptician';
import WizardOptician from '../Intenship/WizardOptician';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


const MySwal = withReactContent(Swal);



function TabOptician(props) {

    const [customActiveTab, setcustomActiveTab] = useState("1");
    const toggleCustom = (tab) => {
        if (customActiveTab !== tab) {
            setcustomActiveTab(tab);
        }
    };
   
    return (
        <>
            <Col xxl={12}>
                <Card>
                    <CardBody>
                        <Nav tabs className="nav nav-tabs nav-tabs-custom nav-success nav-justified mb-3">
                            <NavItem>
                                <NavLink
                                    style={{ cursor: "pointer" }}
                                    className={classnames({
                                        active: customActiveTab === "1",
                                    })}
                                    onClick={() => {
                                        toggleCustom("1");
                                    }}
                                >
                                    Internship Posting Form
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    style={{ cursor: "pointer" }}
                                    className={classnames({
                                        active: customActiveTab === "2",
                                    })}
                                    onClick={() => {
                                        toggleCustom("2");
                                    }}
                                >
                                    Full Registration
                                </NavLink>
                            </NavItem>
                        </Nav>

                        <TabContent
                            activeTab={customActiveTab}
                            className="text-muted"
                        >
                            <TabPane tabId="1" id="home1">
                                <WizardOptician
                                    opticians={props.opticians}
                                    existPageOptician={props.existPageOptician}
                                    user={props.user}
                                    oneOptician={props.oneOptician}
                                    user_date_of_orientation_optician={props.user_date_of_orientation_optician}
                                    setUser_date_of_orientation_optician={props.setUser_date_of_orientation_optician}
                                    user_school_optician={props.user_school_optician}
                                    setUser_school_optician={props.setUser_school_optician}
                                    supervisor_first_name={props.supervisor_first_name}
                                    setSupervisor_first_name={props.setSupervisor_first_name}
                                    supervisor_middle_name={props.supervisor_middle_name}
                                    setSupervisor_middle_name={props.setSupervisor_middle_name}
                                    supervisor_last_name={props.supervisor_last_name}
                                    setSupervisor_last_name={props.setSupervisor_last_name}
                                    supervisor_email={props.supervisor_email}
                                    setSupervisor_email={props.setSupervisor_email}
                                    supervisor_board_no={props.supervisor_board_no}
                                    setSupervisor_board_no={props.setSupervisor_board_no}
                                    supervisor_date_of_resumption={props.supervisor_date_of_resumption}
                                    setSupervisor_date_of_resumption={props.setSupervisor_date_of_resumption}
                                    supervisor_phone={props.supervisor_phone}
                                    setSupervisor_phone={props.setSupervisor_phone}

                                    hospital_name={props.hospital_name}
                                    setHospital_name={props.setHospital_name}
                                    hospital_address={props.hospital_address}
                                    setHospital_address={props.setHospital_address}
                                    hospital_email={props.hospital_email}
                                    setHospital_email={props.setHospital_email}
                                    hospital_phone={props.hospital_phone}
                                    setHospital_phone={props.setHospital_phone}
                                />

                            </TabPane>
                            <TabPane tabId="2">
                                <PracticeRegTwoOptician
                                    opticians={props.opticians}
                                    existPageOptician={props.existPageOptician}
                                    oneOptician={props.oneOptician}
                                    id_means={props.id_means}
                                    setId_means={props.setId_means}
                                    id_no={props.id_no}
                                    setId_no={props.setId_no}
                                    user={props.user}
                                    opticianTraining={props.opticianTraining}
                                />

                            </TabPane>
                        </TabContent>
                    </CardBody>
                </Card>
            </Col>
        </>
    )
}

export default TabOptician;