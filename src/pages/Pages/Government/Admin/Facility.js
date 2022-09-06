import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { request } from '../../../../services/utilities';
import { USER_COOKIE } from '../../../../services/constants';
import SSRStorage from '../../../../services/storage';
import { LoaderGrow } from '../../../AdvanceUi/Loader/loader';
import { Store } from '../../../../services/store';
import ReactPaginate from "react-paginate";
import { Link } from 'react-router-dom';
import { Modal, Button, ModalHeader, ModalBody, ModalFooter, UncontrolledTooltip, Table } from 'reactstrap';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

// import {Loa}

function Facility() {

    const store = useContext(Store)
    const [loading, setLoading] = useState(false);
  
    const [comment, setComment] = useState(' ');
    const [idx, setIdx] = useState(null);
    const [adminType, setAdminType] = store.adminType;
    const [tab_one, setTab_one] = useState('');
    const [tab_two, setTab_two] = useState('');
    const [tab_three, setTab_three] = useState('');
    const isRenderRef = useRef();
    const [practices, setPractices] = useState([]);
    const [modal_list, setmodal_list] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [currentPage, setCurrentPage] = useState(1)
    const [meta, setMeta] = useState(null);
    const [count, setCount] = useState(1);



    function tog_list(id) {
        setIdx(id);
        setmodal_list(!modal_list);
        setComment('');
    }
    const handleError = () => {
        return MySwal.fire({
            title: 'Opps!',
            text: ' Something went wrong!',
            icon: 'error',
            showConfirmButton: false,
            timer: 2000
        })
    }

    const handleUpdateComment = () => {
        return MySwal.fire({
            title: 'Good job!',
            text: 'Comment Successful!',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500
        })
    }

    const handleAddComment = async () => {
        const user = await (new SSRStorage()).getItem(USER_COOKIE);
        const data = { practiceId: idx, note: comment }

        try {
            setLoading(true);
            setmodal_list(false);
            const url = `practices/approve?role=${user.type.trim()}&senderid=${user.id}`;
            const rs = await request(url, 'POST', true, data);
            setLoading(false);
            fetchPractices();
            handleUpdateComment();
            setmodal_list(false);
        }
        catch (err) {
            setLoading(false);
            setmodal_list(false);
            if (err.message) {
                return MySwal.fire({
                    title: 'Opps!',
                    text: `${err.message}`,
                    icon: 'warning',
                    showConfirmButton: false,
                    timer: 2000
                })
            }
            handleError();
            console.log(err);
        }
    }

    const fetchPractices = useCallback(async (page) => {
        setTab_two(' ');
        setTab_three(' ');
        setTab_one('text-success');

        const p = page || 1;
        const url = `practices?limit=10&page=${p}`;

        try {
            setLoading(true);
            const rs = await request(url, 'GET', true);
            setPractices(rs.data);
            setMeta(rs.paging);
            setCount(Math.ceil(rs.paging.total / rowsPerPage));
            setLoading(false);
        } catch (err) {
            setLoading(false);
            if (err.message === 'No record') {
                setPractices([]);
            } else {
                handleError();
            }
            console.log(err);

        }
    }, [rowsPerPage]);

    const fetchByCategory = async (page, type) => {
        const user = await (new SSRStorage()).getItem(USER_COOKIE);
        const p = page || 1;
        setTab_one('');
        if (type === 'approved') {
            setTab_two('text-success');
        } else {
            setTab_two('');
            setTab_three('text-success');
        }

        const url = `practices/${type}/all?limit=10&page=${p}&term=${user.type.trim()}`;
        try {
            setLoading(true);
            const rs = await request(url, 'GET', true);
            setPractices(rs.data);
            setMeta(rs.paging);
            setCount(Math.ceil(rs.paging.total / rowsPerPage));
            setLoading(false);
        } catch (err) {
            setLoading(false);
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
    };

    const searchPractice = async e => {
        const data = { payload: e }
        try {
            const url = `search/practices`;
            const rs = await request(url, 'POST', true, data);
            setPractices(rs.data.practice);

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
        fetchPractices();
    }, [fetchPractices]);

    const renderFacility = practices.map((e, i) => {
        if (practices.length > 0) {
            return (
                <tr key={i}>
                    <th scope="row"><Link to="#" className="fw-medium">{e.id}</Link></th>
                    <td>
                        {e.createdBy}

                    </td>
                    <td>{new Date(e.createdAt).toDateString()}</td>
                    <td>$2,300</td>

                    <td>{e.status !== "Approved" ? <span className="ri-close-circle-line align-middle text-danger"><span className='text-dark mx-1'>{e.status}</span></span> :
                        <span className="ri-checkbox-circle-line align-middle text-success"><span className='mx-1'>{e.status}</span></span>
                    }
                    </td>
                    <td>{e.isApprovedBySD === false ? 'Awaiting Approval' : 'Approved'}</td>
                    <td>{e.isApprovedByHOD === false ? 'Awaiting Approval' : 'Approved'}</td>
                    <td>{e.isApprovedByAdmin === false ? 'Awaiting Approval' : 'Approved'}</td>
                    <td>
                        <div className="hstack  flex-wrap">
                            <button href="#" type="button" className="btn btn-ghost-secondary btn-icon btn-sm fs-16"
                                id="Tooltip1"><i className="ri-edit-2-line"
                                    onClick={() => tog_list(e.id)}
                                ></i></button>

                            {/* <button type="button" className="btn btn-ghost-secondary btn-icon btn-sm fs-16" id="Tooltip2">
                                <i onClick={() => handleUpdateFacility(e, e.id)}
                                    className="ri-download-2-line fs-17 lh-1 align-middle"></i>
                            </button> */}
                            <Link to={`/admin-dashboard-fi/${`practice`}/${e.id}`} className="link-success btn-icon btn-sm" id="Tooltip3"><i className="ri-compass-3-line fs-16"></i></Link>

                        </div>
                        <UncontrolledTooltip placement="top" target="Tooltip1"> Comment & Approve </UncontrolledTooltip>
                        {/* <UncontrolledTooltip placement="top" target="Tooltip2">Approve  </UncontrolledTooltip> */}
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


    const handlePagination = page => {
        fetchPractices(page.selected + 1)
        setCurrentPage(page.selected + 1)
    }
    // const count = Number((meta.total / rowsPerPage).toFixed(0))

    return (
        <>
            <div className="row">
                <>{loading === true ? <LoaderGrow /> : ''}</>
                <div className="col-xl-12">
                    <div className="card">
                        <div className="card-header align-items-center d-flex">
                            <h4 className="card-title mb-0 flex-grow-1">Registered Facilities</h4>
                            <div className="form-group m-0">
                                <div className="input-group">
                                    <input type="text" className="form-control" onChange={e => searchPractice(e.target.value)}
                                        placeholder="Search by practice or user name..."
                                        aria-label="Recipient's username" />
                                    <button className="btn btn-primary" type="button"><i
                                        className="mdi mdi-magnify"></i></button>
                                </div>
                            </div>
                            <div className="flex-shrink-0">
                                <div className="">

                                    <Link className={`mx-3 ${tab_one}`} to="#" onClick={() => fetchPractices()}>All</Link>
                                    <Link className={`mx-3 ${tab_two}`} to="#" onClick={() => fetchByCategory(1, 'approved')}>Approved</Link>
                                    <Link className={`mx-3 ${tab_three}`} to="#" onClick={() => fetchByCategory(1, 'unapproved')}>Pending</Link>
                                </div>
                            </div>
                        </div>
                        <div className="card-body pt-0">
                            <Table>
                                <thead>
                                    <tr>
                                        <th scope="col">Practice Id</th>
                                        <th scope="col">Customer</th>
                                        <th scope="col">Date</th>
                                        <th scope="col">Invoice</th>
                                        <th scope="col">User Status</th>
                                        <th scope="col">S.D Approval</th>
                                        <th scope="col">H.O.D Approval</th>
                                        <th scope="col">Admin Approval</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody ref={isRenderRef} style={{ display: '' }}>{renderFacility}</tbody>
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
                                        {practices.length}
                                    </span>
                                        {/* of <span className="fw-semibold">125</span> */}
                                        {/* Results */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal isOpen={modal_list} toggle={() => { tog_list(); }} centered >
                <ModalHeader className="bg-light p-3">
                    Make Comment and Approve
                    {/* <Button type="button" onClick={() => { setmodal_list(false); }} className="btn-close" aria-label="Close" >
                    </Button> */}
                </ModalHeader>
                <form>
                    <ModalBody>
                        <div className="mb-3">
                            {/* <label htmlFor="customername-field" className="form-label">C</label> */}
                            <textarea type="text" style={{ height: "20rem" }} id="customername-field" className="form-control"
                                value={comment} onChange={e => setComment(e.target.value)}
                                placeholder="Enter comment" required />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <div className="hstack gap-2 justify-content-end">
                            <button type="button" className="btn btn-light" onClick={() => setmodal_list(false)}>Close</button>
                            <button type="button" className="btn btn-success" id="edit-btn" onClick={() => handleAddComment()}>Approve</button>
                        </div>
                    </ModalFooter>
                </form>
            </Modal>
        </>
    )
}

export default Facility