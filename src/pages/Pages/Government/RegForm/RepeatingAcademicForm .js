// ** React Imports
import { useEffect, useContext } from 'react';
import { Store } from '../../../../services/store';
import { request } from '../../../../services/utilities';
import Flatpickr from "react-flatpickr";

// ** Reactstrap Imports
import { Row, Col, Form, Label, Input } from 'reactstrap'

const RepeatingAcademicForm = ({ academic_form, addAcademic, academic_index, name_academic, setName_academic, from_academic, setFrom_academic,
    to_academic, setTo_academic, grade_academic, setGrade_academic, switchAcademicBtn, setSwitchAcademicBtn, academic_id, userId, count, setCount, refreshUpdate, oneOptician
}) => {
    const store = useContext(Store);
    const [read_only_optician, setRead_only_optician] = store.read_only_optician;

    // ** State
    const newAcademic = () => {
        const academic_formData = { institutionName: name_academic, startDate: new Date(from_academic).toUTCString(), endDate: new Date(to_academic).toUTCString(), grade: grade_academic }
        if (name_academic !== '') {
            addAcademic(academic_formData);
        }
        setName_academic('');
        setGrade_academic('');
        setFrom_academic('');
        setTo_academic('');
    }
    const newAcademicHttp = () => {
        const data = [{
            institutionName: name_academic, startDate: new Date(from_academic).toUTCString(), endDate: new Date(to_academic).toUTCString(),
            grade: grade_academic, opticianId: oneOptician.id
        }]
        if (name_academic === '') {
            return
        }
        try {
            const url = `academics/create?senderid=${userId}`;
            const rs = request(url, 'POST', true, data);
            // console.log(rs);
            refreshUpdate();
        }
        catch (err) {
            console.log(err);
        }
    }
    const cancelAcademicUpdate = () => {
        setCount(count + 1);
        setName_academic('');
        setFrom_academic('');
        setTo_academic('');
        setGrade_academic('');
        setSwitchAcademicBtn(false);
    }

    const updateAcademic = async () => {
        const data = { institutionName: name_academic, startDate: new Date(from_academic).toUTCString(), endDate: new Date(to_academic).toUTCString(), grade: grade_academic }
        const url = `optometrists/academic/${academic_id}?senderid=${userId}`;
        // console.log(data, url);
        try {
            const rs = await request(url, 'PATCH', true, data);
            // console.log(rs);
            setCount(count + 1);
            cancelAcademicUpdate();
            refreshUpdate();
            alert('update successful');
        } catch (err) {
            alert('opps something went wrong');

            console.log(err);
        }
    }

    return (
        <>
            <Form>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <p className='fw-bold text-dark'>PART B: ACADEMIC RECORDS (PRIMARY TO TERTIARY):</p>
                    {switchAcademicBtn === true ? <div>
                        <button type="button" className="btn mx-2 bg-danger text-white" disabled={read_only_optician} onClick={() => cancelAcademicUpdate()}> Cancel</button>
                        <button type="button" className="btn" style={{ background: ' rgb(0, 58, 3)', color: '#fff', borderColor: '1px solid rgb(0,58,3)' }} disabled={read_only_optician} onClick={() => updateAcademic()}> Update</button>
                    </div> :
                        <>{oneOptician !== null ?
                            <button type="button" className="btn mx-2" style={{ background: ' rgb(0, 58, 3)', color: '#fff', borderColor: '1px solid rgb(0,58,3)' }} disabled={read_only_optician} onClick={() => newAcademicHttp()}> Add </button>
                            : <button type="button" className="btn mx-2" style={{ background: ' rgb(0, 58, 3)', color: '#fff', borderColor: '1px solid rgb(0,58,3)' }} disabled={read_only_optician} onClick={() => newAcademic()}> Add </button>
                        }</>
                    }


                </div>

                <Row className='justify-content-between align-items-center'>
                    <Col md={6} className='mb-md-0 mb-3'>
                        <Label className='form-label' for={`item-name-${1}`}>
                            Name of Institution
                        </Label>
                        <Input type='text' id={`item-name-${1}`}
                            value={name_academic} onChange={(e) => setName_academic(e.target.value)}
                            placeholder='Enter institution name' />
                    </Col>
                    <Col md={6} className='mb-md-0 mb-3'>
                        <Label className='form-label' for={`item-name-${1}`}>
                            Certificate Obtained and Grades
                        </Label>
                        <Input type='text' id={`item-name-${1}`}
                            value={grade_academic} onChange={(e) => setGrade_academic(e.target.value)}
                            placeholder='Enter certificate' />
                    </Col>
                    <Col md={6} className='mb-md-0 mt-3'>
                        <Label className='form-label' for={`item-name-${1}`}>
                            Date Attended From Month/Year
                        </Label>
                        <Flatpickr
                            className="form-control"
                            options={{
                                dateFormat: "d M, Y"
                            }}
                            value={from_academic} onChange={(e) => setFrom_academic(e)} />

                    </Col>
                    <Col md={6} className='mb-md-0 mt-3'>
                        <Label className='form-label' for={`item-name-${1}`}>
                            Date Attended To Month/Year
                        </Label>
                        <Flatpickr
                            className="form-control"
                            options={{
                                dateFormat: "d M, Y"
                            }}
                            value={to_academic} onChange={(e) => setTo_academic(e)} />
                    </Col>
                    {/* <hr /> */}
                </Row>
            </Form>
        </>
    )
}

export default RepeatingAcademicForm
