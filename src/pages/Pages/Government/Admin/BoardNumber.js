import React, { useCallback, useEffect, useState } from 'react'
import { Label, Col, Row, Input, Modal, ModalBody, Table, ModalHeader, UncontrolledTooltip } from 'reactstrap';
import { Link } from 'react-router-dom';
import { request } from '../../../../services/utilities';


const BoardNumber = () => {

    const [modal, setModal] = useState(false);
    const [number, setNumber] = useState('');
    const [board, setBoard] = useState([]);
    const toggle = () => {
        if (modal) {
            setModal(false);
        } else {
            setModal(true);
        }
    };

    const createBoardNumber = async () => {
        const data = { number };
        try {
            const url = `boards/create`;
            const rs = await request(url, 'POST', true, data);
            console.log(rs);
            setModal(false);

        } catch (err) {
            console.log(err);
        }
    };
    const deleteNumber = async (id) => {
        if (window.confirm('Are you sure')) {
            try {
                const url = `boards/delete/${id}`;
                const rs = await request(url, 'DELETE', true);
                console.log(rs);
                fetchBoardNumber();
            } catch (err) {
                console.log(err);
            }
        }
    }
    const addInput = () => {
        let Input = document.getElementById('input');
        let clone = Input.find('hide').removeClass('hide');
        Input.find('table').append('clone');
    }
    const fetchBoardNumber = useCallback(async () => {
        try {
            const url = `boards/all?page=1&limit=10`;
            const rs = await request(url, 'GET', true);
            setBoard(rs.data);
            // console.log(rs);
        } catch (err) {
            console.log(err);
        }
    }, []);
    useEffect(() => {
        fetchBoardNumber();
    }, fetchBoardNumber)
    return (
        <div>
            <Modal id="composemodal" className="modal-lg" isOpen={modal} toggle={toggle} centered>
                <ModalHeader className="p-3 bg-light" toggle={toggle}>
                    Add Board Number
                </ModalHeader>
                <ModalBody>
                    <div id='input'>
                        <div className='table'>
                        <Col md={12}>
                            <div className="mb-3">
                                <Label htmlFor="firstNameinput" className="form-label">Board Number</Label>
                                <button onClick={() => addInput()} type="button" className="btn btn-ghost-secondary btn-icon btn-sm fs-16"
                                    id="Tooltip1"><i className="ri-delete-bin-line"></i></button>
                                <Input type="text" className="form-control" value={number} onChange={e => setNumber(e.target.value)} placeholder="Enter your board number" id="firstNameinput" />
                            </div>
                        </Col>
                        <Col md={12} className='hide'>
                            <Input type="text" className="form-control" value={number} onChange={e => setNumber(e.target.value)} placeholder="Enter your board number" id="firstNameinput" />
                        </Col>
                       </div>
                    </div>
                    {/* <Col md={12}>
                        <div className="mb-3">
                            <Label htmlFor="firstNameinput" className="form-label">Select Practice</Label>
                            <select id="ForminputState" className="form-select" data-choices data-choices-sorting="true" >
                                <option>Choose...</option>
                                <option>Optician</option>
                                <option>Optometrist</option>

                            </select>
                        </div>
                    </Col> */}

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
                            <th scope="col"> #</th>
                            <th scope="col">Number</th>
                            <th scope="col">Date</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {board?.map((e, i) => {
                            return (
                                <tr key={i}>
                                    <th scope="row"><Link to="#" className="fw-medium">{i + 1}</Link></th>
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
            </div>


        </div>
    )
}

export default BoardNumber