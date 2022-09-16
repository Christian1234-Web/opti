import React, { useCallback, useEffect, useState } from 'react'
import { Label, Col, Row, Input, Modal, ModalBody, Table, ModalHeader, UncontrolledTooltip } from 'reactstrap';
import { Link } from 'react-router-dom';
import { request } from '../../../../services/utilities';
import ReactPaginate from "react-paginate";
import Repeater from './repeater/RepeatingForm'
import { LoaderGrow } from '../../../AdvanceUi/Loader/loader';
const BoardNumber = () => {

    const [modal, setModal] = useState(false);
    const [number, setNumber] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [meta, setMeta] = useState(null);
    const [count, setCount] = useState(1);
    const [board, setBoard] = useState([]);
    const boardArr = []

    const toggle = () => {
        if (modal) {
            setModal(false);
        } else {
            setModal(true);
        }
    };

    const handlePagination = page => {
        fetchBoardNumber(page.selected + 1)
        setCurrentPage(page.selected + 1)
    }
    const createBoardNumber = async () => {
        setLoading(true);
        const data = boardArr;
        try {
            const url = `boards/create`;
            const rs = await request(url, 'POST', true, data);
            setModal(false);
            fetchBoardNumber();
            setLoading(false);
        } catch (err) {
            setLoading(false);
            console.log(err);
        }
    };
    const deleteNumber = async (id) => {
        if (window.confirm('Are you sure')) {
            try {
                const url = `boards/delete/${id}`;
                const rs = await request(url, 'DELETE', true);
                fetchBoardNumber();
            } catch (err) {
                console.log(err);
            }
        }
    }

    const fetchBoardNumber = useCallback(async (page) => {
        const p = page || 1;

        try {
            const url = `boards/all?page=${p}&limit=10`;
            const rs = await request(url, 'GET', true);
            setBoard(rs.data);
            setMeta(rs.paging);
            setCount(Math.ceil(rs.paging.total / rowsPerPage));
        } catch (err) {
            console.log(err);
        }
    }, [rowsPerPage]);

    useEffect(() => {
        fetchBoardNumber();
    }, fetchBoardNumber)
    return (
        <div>
            <>{loading === true ? <LoaderGrow /> : ''}</>
            <Modal id="composemodal" className="modal-lg" isOpen={modal} toggle={toggle} centered>
                <ModalHeader className="p-3 bg-light" toggle={toggle}>
                    Add Board Number
                </ModalHeader>
                <ModalBody>
                    <Col md={12} >
                        <Repeater boardArr={boardArr} />
                    </Col>
                </ModalBody>
                <div className="modal-footer">
                    <button
                        type="button"
                        className="btn btn-ghost-danger"
                        onClick={() => {
                            setModal(false);
                        }}
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => {
                            createBoardNumber();
                        }}
                    >
                        Add
                    </button>

                </div>
            </Modal>

            <div>
                <div className='d-flex justify-content-between'>
                    <div>

                    </div>
                    <div className="form-group m-0 ">
                        <div className="input-group">
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => {
                                    setModal(true);
                                }}
                            >
                                Add Board Number
                            </button>

                        </div>
                    </div>
                </div>
                <Table>
                    <thead>
                        <tr>
                            <th scope="col"> Id</th>
                            <th scope="col">Number</th>
                            <th scope="col">Date</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {board?.map((e, i) => {
                            return (
                                <tr key={i}>
                                    <th scope="row"><Link to="#" className="fw-medium">{e.id}</Link></th>
                                    <td>{e.number}</td>
                                    <td>{new Date(e.createdAt).toDateString()}</td>
                                    <td>
                                        <div className="hstack  flex-wrap">
                                            <button onClick={() => deleteNumber(e.id)} type="button" className="btn btn-ghost-secondary btn-icon btn-sm fs-16"
                                                id="Tooltip1"><i className="ri-delete-bin-line"></i></button>
                                        </div>
                                    </td >
                                </tr >
                            )
                        })}
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
                            {board.length}
                        </span>
                            {/* of <span className="fw-semibold">125</span> */}
                            {/* Results */}
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default BoardNumber