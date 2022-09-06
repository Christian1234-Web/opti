import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { request } from '../../../../services/utilities';
import { USER_COOKIE } from '../../../../services/constants';
import SSRStorage from '../../../../services/storage';
import { LoaderGrow } from '../../../AdvanceUi/Loader/loader';
import { Store } from '../../../../services/store';
import HeaderIndex from '../Admin/Layout';

import ReactPaginate from "react-paginate";
import { Link, useParams } from 'react-router-dom';
import { Modal, Button, ModalHeader, ModalBody, ModalFooter, UncontrolledTooltip, Table, Row, Col } from 'reactstrap';
import Swal from 'sweetalert2';
import logoLight from "../../../../assets/images/odorbnlogo.png";

import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

// import {Loa}

function ViewPractice() {

    const store = useContext(Store)
    const [loading, setLoading] = useState(false);

    const [practices, setPractices] = useState([]);
    const [viewOp, setViewOp] = useState(null);

    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [currentPage, setCurrentPage] = useState(1)
    const [meta, setMeta] = useState(null);
    const [count, setCount] = useState(1);


    const handleError = () => {
        return MySwal.fire({
            title: 'Sorry!',
            text: ' Failed to fetch facilities!',
            icon: 'error',
            showConfirmButton: false,
            timer: 2000
        })
    }

    const id = useParams();
    const type = useParams();


    const fetchPractices = useCallback(async (page) => {

        const p = page || 1;
        const url = `users/${id.id}?limit=10&page=${p}`;

        try {
            setLoading(true);
            const rs = await request(url, 'GET', true);
            if (rs.data.type === 'practice') {
                setPractices(rs.data);
            } else {
                setViewOp(rs.data)
            }
            // setMeta(rs.paging);
            // setCount(Math.ceil(rs.paging.total / rowsPerPage));
            setLoading(false);
            // console.log(rs);
            // console.log(viewOp);

        } catch (err) {
            setLoading(false);
            if (err.message === 'No record') {
                setPractices([]);
                setViewOp([]);
            } else {
                handleError();
            }
            console.log(err);
        }
    }, [id.id]);

    useEffect(() => {
        fetchPractices();
    }, [fetchPractices]);



    const handlePagination = page => {
        fetchPractices(page.selected + 1)
        setCurrentPage(page.selected + 1)
    }
    // const count = Number((meta.total / rowsPerPage).toFixed(0))
    const renderFacility = practices.map((e, i) => {
        if (practices.length > 0) {
            return (
                <tr key={i}>
                    <th scope="row"><Link to="#" className="fw-medium">{i}</Link></th>
                    <td>  {e.name} </td>
                    <td>{new Date(e.createdAt).toDateString()}</td>
                    <td>{e.status !== "Approved" ? <span className="ri-close-circle-line align-middle text-danger"><span className='text-dark mx-1'>{e.status}</span></span> :
                        <span className="ri-checkbox-circle-line align-middle text-success"><span className='mx-1'>{e.status}</span></span>
                    }
                    </td>
                    <td>{e.isApprovedByAdmin === false ? 'false' : 'true'}</td>
                    <td>{e.isApprovedByAdmin === false ? 'Awaiting Approval' : 'Approved'}</td>
                </tr >
            )
        } else {
            return (
                <div className="text-danger text-center"> No record </div>
            )
        }
    });
    return (
        <>
            <div className='w-100'>
                <HeaderIndex />
            </div>
            <div className="page-content mt-5">
                <div className="container-fluid p-5">
                    <div className="row">
                        <>{loading === true ? <LoaderGrow /> : ''}</>

                        <div className="align-items-start card bg-primary">
                            <div className="col-sm-8 w-100">
                                <div className="p-3 row justify-content-between">
                                    <Col>
                                        {viewOp !== null && practices !== null ? <p className="fs-16 lh-base text-white fw-semibold"> License History For {type.type === 'practice' ? <>{practices.firstName || 'George'} {practices.surname || 'Web'} </>
                                            : <>{viewOp.firstName || 'George'} {viewOp.surname || 'Web'}</>} with id. no. {type.type === 'practice' ? <>{practices.id || ''}</> : <>{viewOp.id || ''}
                                            </>} 
                                        </p> : ''}
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
                        <div className="col-xl-12">
                            <div className="card">
                                <Row className='align-items-center'>
                                    <Col>
                                        <h4 className="card-title mb-0 text-capitalize p-4">Registered {type.type}</h4>

                                    </Col>
                                </Row>

                                <div className="card-body pt-4 table-responsive">
                                    <Table>
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                {type.type === 'practice' ? <th scope="col">Practice Name</th> : ''}
                                                <th scope="col">Registered Date</th>
                                                <th scope="col">User Status</th>
                                                <th scope="col">Is Recommended</th>
                                                <th scope="col">Approval</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {viewOp !== null && practices !== null ?
                                                <>   {type.type === 'practice' ? <renderFacility />
                                                    : type.type === 'optician' ? <tr>
                                                        <th scope="row"><Link to="#" className="fw-medium">{`1`}</Link></th>
                                                        <td>{new Date(viewOp.optician.createdAt).toDateString()}</td>
                                                        <td>{viewOp.optician.status !== "Approved" ? <span className="ri-close-circle-line align-middle text-danger"><span className='text-dark mx-1'>{viewOp.optician.status}</span></span> :
                                                            <span className="ri-checkbox-circle-line align-middle text-success"><span className='mx-1'>{viewOp.optician.status}</span></span>
                                                        }
                                                        </td>
                                                        <td>{viewOp.optician.isApprovedByAdmin === false ? 'False' : 'True'}</td>
                                                        <td>{viewOp.optician.isApprovedByAdmin === false ? 'Awaiting Approval' : 'Approved'}</td>
                                                    </tr > : <tr>
                                                        <th scope="row"><Link to="#" className="fw-medium">{`1`}</Link></th>
                                                        <td>{new Date(viewOp.optometrist.createdAt).toDateString()}</td>
                                                        <td>{viewOp.optometrist.status !== "Approved" ? <span className="ri-close-circle-line align-middle text-danger"><span className='text-dark mx-1'>{viewOp.optometrist.status}</span></span> :
                                                            <span className="ri-checkbox-circle-line align-middle text-success"><span className='mx-1'>{viewOp.optometrist.status}</span></span>
                                                        }
                                                        </td>
                                                        <td>{viewOp.optometrist.isApprovedByAdmin === false ? 'False' : 'True'}</td>
                                                        <td>{viewOp.optometrist.isApprovedByAdmin === false ? 'Awaiting Approval' : 'Approved'}</td>
                                                    </tr >
                                                }</> : ''}
                                        </tbody>
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
                                                {practices.length || '1'}
                                            </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default ViewPractice;