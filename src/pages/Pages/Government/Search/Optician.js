import React, { useCallback, useEffect, useRef, useState } from 'react'
import { request } from '../../../../services/utilities';
import { USER_COOKIE } from '../../../../services/constants';
import SSRStorage from '../../../../services/storage';
import { LoaderGrow } from '../../../AdvanceUi/Loader/loader';
import ReactPaginate from "react-paginate";
import { Link } from 'react-router-dom';
import classnames from "classnames";
import { Modal, Button, ModalHeader, ModalBody, ModalFooter, Nav, UncontrolledTooltip, Col, TabContent, TabPane, NavItem, NavLink, Table, Row } from 'reactstrap';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

// import {Loa}

function Optician() {

    const [loading, setLoading] = useState(false);

    const [comment, setComment] = useState('');
    const [arrayLength, setArrayLength] = useState('0');
    const [searchArray, setSearchArray] = useState([]);
    const isRenderSearch = useRef();

    const [opticians, setOpticians] = useState([]);
    const isRenderRef = useRef();
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [currentPage, setCurrentPage] = useState(1)
    const [meta, setMeta] = useState(null);
    const [count, setCount] = useState(1);
    const [customverticalTab, setcustomverticalTab] = useState("1");


    const customtoggleVertical = (tab) => {
        if (customverticalTab !== tab) {
            setcustomverticalTab(tab);
        }
    };

    const handleError = () => {
        return MySwal.fire({
            title: 'Sorry!',
            text: ' Failed to fetch optician please try again later!',
            icon: 'error',
            showConfirmButton: false,
            timer: 2000
        })
    }


    const fetchOpticians = useCallback(async (page) => {
        const p = page || 1;
        const url = `opticians?limit=10&page=${p}`;
        try {
            setLoading(true);
            const rs = await request(url, 'GET', true);
            isRenderSearch.current.style.display = 'none';
            isRenderRef.current.style.display = '';
            setOpticians(rs.data);
            setArrayLength(rs.paging.total)
            setMeta(rs.paging);
            setCount(Math.ceil(rs.paging.total / rowsPerPage));
            setLoading(false);
        } catch (err) {
            setLoading(false);
            if (err.message === 'No record') {
                setOpticians([]);
            } else {
                handleError();
            }
            console.log(err);
        }
    }, [rowsPerPage])

    const searchOptician = async (e) => {
        const data = { payload: e }
        try {
            const url = `search/opticians`;
            const rs = await request(url, 'POST', true, data);
            setSearchArray(rs.data.optician);
            setArrayLength(rs.data.optician.length);
            isRenderRef.current.style.display = 'none';
            isRenderSearch.current.style.display = '';
        } catch (err) {
            if (err.message === 'No record') {
                return MySwal.fire({
                    title: 'Sorry!',
                    text: `${err.message}`,
                    icon: 'warning',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
            handleError();
            console.log(err);
        }
    }

    useEffect(() => {
        fetchOpticians();
    }, [fetchOpticians]);


    const renderOptician = opticians.map((e, i) => {
        if (opticians.length > 0) {
            return (
                <tr key={i}>
                    <th scope="row"><Link to="#" className="fw-medium">{e.id || '--'}</Link></th>
                    {e.user !== null ? <td>{e.user?.firstName} {e.user.surname}</td> : <td>{e.i_name} </td>}
                    <td>{new Date(e.createdAt).toDateString()}</td>
                    <td>$2,300</td>
                    <td>{e.status !== "Approved" ? <span className="ri-close-circle-line align-middle text-danger"><span className='text-dark mx-1'>{e.status}</span></span> :
                        <span className="ri-checkbox-circle-line align-middle text-success"><span className='mx-1'>{e.status}</span></span>
                    }
                    </td>
                    <td>{e.isApprovedByAdmin === null ? 'Awaiting Approval' : e.isApprovedByAdmin === false ? 'Disapproved' : 'Approved'}</td>
                    <td>
                        <div className={e.userId === null ? 'hstack flex-wrap d-none' : 'hstack flex-wrap'}>
                            <Link to={`/search-dashboard/view/${`optician`}/${e.user?.id}`} className="link-success btn-icon btn-sm" id="Tooltip3"><i className="ri-compass-3-line fs-16"></i></Link>

                        </div>
                        <UncontrolledTooltip placement="top" target="Tooltip3">View Details  </UncontrolledTooltip>

                    </td >
                </tr >
            )
        } else if (opticians.length > !0) {
            return (
                <div className="text-danger text-center"> No record </div>
            )
        }
    });
    const renderBySearch = searchArray.map((e, i) => {
        if (searchArray.length > 0) {
            return (
                <tr key={i}>
                    <th scope="row"><Link to="#" className="fw-medium">{e.id}</Link></th>
                    <td>{e.createdBy || e.i_name}</td>
                    <td>{new Date(e.createdAt).toDateString()}</td>
                    <td>$2,300</td>
                    <td>{e.status !== "Approved" ?
                        <span className="ri-close-circle-line align-middle text-danger"><span className='text-dark mx-1'>{e.status}</span></span> :
                        <span className="ri-checkbox-circle-line align-middle text-success"><span className='mx-1'>{e.status}</span></span>
                    }
                    </td>
                    <td>{e.isApprovedByAdmin === null ? 'Awaiting Approval' : e.isApprovedByAdmin === false ? 'Disapproved' : 'Approved'}</td>
                    <td>
                        <div className={e.userId === null ? 'hstack flex-wrap d-none' : 'hstack flex-wrap'}>
                            <Link to={`/search-dashboard/view/${`optician`}/${e.userId}`} className="link-success btn-icon btn-sm" id="Tooltip3"><i className="ri-compass-3-line fs-16"></i></Link>
                        </div>
                        <UncontrolledTooltip placement="top" target="Tooltip3">View Details  </UncontrolledTooltip>
                    </td >
                </tr >
            )
        } else {
            return (
                <div className="text-danger text-center"> No record </div>
            )
        }
    })
    const handlePagination = page => {
        fetchOpticians(page.selected + 1);
        setCurrentPage(page.selected + 1);
    }
    return (
        <>
            <div className="row">
                <>{loading === true ? <LoaderGrow /> : ''}</>

                <Col lg={12}>
                    <div className="col-xl-12">
                        <div className="card">
                            <Row className='align-items-center'>
                                <Col>
                                    <h4 className="card-title mb-0 ">Registered Opticians </h4>
                                </Col>
                                <Col lg={10}>
                                    <div className="form-group m-0 mx-3" style={{ width: '98%' }}>
                                        <div className="input-group">
                                            <input type="text" className="form-control" onChange={e => searchOptician(e.target.value)}
                                                placeholder="Search by  user name..."
                                                aria-label="Recipient's username" />
                                            <button className="btn btn-primary" type="button"><i
                                                className="mdi mdi-magnify"></i></button>
                                        </div>
                                    </div>
                                </Col>
                            </Row>

                            <div className="card-body pt-4 table-responsive">

                                <Table className="align-middle table-nowrap mb-0">
                                    <thead>
                                        <tr>
                                            <th scope="col">Optician ID</th>
                                            <th scope="col">Username</th>
                                            <th scope="col">Registered Date</th>
                                            <th scope="col">Invoice</th>
                                            <th scope="col">User Status</th>
                                            <th scope="col">Approval</th>
                                            <th scope="col">License History</th>

                                        </tr>
                                    </thead>
                                    <tbody ref={isRenderRef} style={{ display: '' }}>{renderOptician}</tbody>
                                    <tbody ref={isRenderSearch} style={{ display: 'none' }}>{renderBySearch}</tbody>
                                </Table>
                                <div>
                                    <ReactPaginate
                                        nextLabel='Next'
                                        breakLabel='...'
                                        previousLabel='Prev'
                                        pageCount={count}
                                        activeClassName='active'
                                        breakClassName='page-item'
                                        pageClassName={'page-item'}
                                        breakLinkClassName='page-link'
                                        nextLinkClassName={'page-link'}
                                        pageLinkClassName={'page-link'}
                                        nextClassName={'page-item next'}
                                        previousLinkClassName={'page-link'}
                                        previousClassName={'page-item prev'}
                                        onPageChange={page => handlePagination(page)}
                                        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
                                        containerClassName={'pagination react-paginate justify-content-end p-1'}
                                    />
                                </div>
                                <div className="align-items-center mt-2 row g-3 text-center text-sm-start">
                                    <div className="col-sm">
                                        <div className="text-muted">Available Results <span className="fw-semibold">
                                            {arrayLength}
                                        </span>
                                            {/* of <span className="fw-semibold">125</span> */}
                                            {/* Results */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
            </div>
        </>
    )
}

export default Optician