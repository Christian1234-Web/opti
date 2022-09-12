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

function Optometrist() {

    const [loading, setLoading] = useState(false);

    const [searchArray, setSearchArray] = useState([]);
    const isRenderSearch = useRef();
    const [optometrists, setOptometrists] = useState([]);
    const isRenderRef = useRef();
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [arrayLength, setArrayLength] = useState('0')
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
            text: ' Failed to fetch optometrist please try again later!',
            icon: 'error',
            showConfirmButton: false,
            timer: 2000
        })
    }


    const fetchOptometrists = useCallback(async (page) => {

        const p = page || 1;
        const url = `optometrists?limit=5&page=${p}`;

        try {
            setLoading(true);
            const rs = await request(url, 'GET', true);
            isRenderSearch.current.style.display = 'none';
            isRenderRef.current.style.display = '';
            setOptometrists(rs.data);
            setArrayLength(rs.data.length);
            setMeta(rs.paging);
            setCount(Math.ceil(rs.paging.total / rowsPerPage));
            setLoading(false);
        } catch (err) {
            setLoading(false);
            if (err.message === 'No record') {
                setOptometrists([]);
            } else {
                handleError();
            }
            console.log(err);
        }
    }, [rowsPerPage]);

    const searchOptometrist = async (e) => {
        // console.log(e, 'kkkk')
        const data = { payload: e }
        try {
            const url = `search/optometrists`;
            const rs = await request(url, 'POST', true, data);
            // console.log(rs);
            setSearchArray(rs.data.optometrist);
            setArrayLength(rs.data.optometrist.length);
            isRenderRef.current.style.display = 'none';
            isRenderSearch.current.style.display = '';
        } catch (err) {
            // setLoading(false);
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

    const renderOptometrist = optometrists.map((e, i) => {
        if (optometrists.length > 0) {
            return (
                <tr key={i}>
                    <th scope="row"><Link to="#" className="fw-medium">{e.id}</Link></th>
                    <td>{e.user.firstName} {e.user.surname}</td>
                    <td>{new Date(e.createdAt).toDateString()}</td>
                    <td>$2,300</td>
                    <td>
                        {e.status !== "Approved" ? <span className="ri-close-circle-line align-middle text-danger"><span className='text-dark mx-1'>{e.status}</span></span> :
                            <span className="ri-checkbox-circle-line align-middle text-success"><span className='mx-1'>{e.status}</span></span>
                        }
                    </td>
                    <td>{e.isApprovedByAdmin === false ? 'Awaiting Approval' : 'Approved'}</td>
                    <td>
                        <div className={e.user.id === null ? 'hstack flex-wrap d-none' : 'hstack flex-wrap'}>
                            <Link to={`/search-dashboard/view/${`optometrist`}/${e.user.id}`} className="link-success btn-icon btn-sm" id="Tooltip3"><i className="ri-compass-3-line fs-16"></i></Link>

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
    });

    const renderBySearch = searchArray.map((e, i) => {
        if (searchArray.length > 0) {
            return (
                <tr key={i}>
                    <th scope="row"><Link to="#" className="fw-medium">{e.id}</Link></th>
                    <td>{e.createdBy}</td>
                    <td>{new Date(e.createdAt).toDateString()}</td>
                    <td>$2,300</td>
                    <td>{e.status !== "Approved" ?
                        <span className="ri-close-circle-line align-middle text-danger"><span className='text-dark mx-1'>{e.status}</span></span> :
                        <span className="ri-checkbox-circle-line align-middle text-success"><span className='mx-1'>{e.status}</span></span>
                    }
                    </td>
                    <td>{e.isApprovedByAdmin === false ? 'Awaiting Approval' : 'Approved'}</td>
                    <td>
                        <div className={e.userId === null ? 'hstack flex-wrap d-none' : 'hstack flex-wrap'}>
                            <Link to={`/search-dashboard/view/${`optometrist`}/${e.userId}`} className="link-success btn-icon btn-sm" id="Tooltip3"><i className="ri-compass-3-line fs-16"></i></Link>

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
        fetchOptometrists(page.selected + 1)
        setCurrentPage(page.selected + 1)
    }
    useEffect(() => {
        fetchOptometrists();
    }, [fetchOptometrists]);
    return (
        <>
            <div className="row">
                <>{loading === true ? <LoaderGrow /> : ''}</>
                <Col lg={12}>
                    <div className="col-xl-12">
                        <div className="card">
                            <Row className='align-items-center'>
                                <Col>
                                    <h4 className="card-title mb-0 mx-3 ">Registered Optometrists </h4>

                                </Col>

                                <Col lg={9}>
                                    <div className="form-group m-0" style={{ width: '98%' }}>
                                        <div className="input-group">
                                            <input type="text" className="form-control" onChange={e => searchOptometrist(e.target.value)}
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
                                            <th scope="col">Optometrist ID</th>
                                            <th scope="col">Username</th>
                                            <th scope="col">Registered Date</th>
                                            <th scope="col">Invoice</th>
                                            <th scope="col">User Status</th>
                                            <th scope="col">Approval</th>
                                            <th scope="col">License History</th>
                                        </tr>
                                    </thead>
                                    <tbody ref={isRenderRef} style={{ display: '' }}>{renderOptometrist}</tbody>
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

export default Optometrist