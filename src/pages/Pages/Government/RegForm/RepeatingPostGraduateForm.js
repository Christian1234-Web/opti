// ** React Imports
import { useContext, useEffect, useState } from 'react'
// ** Custom Components
import { Store } from '../../../../services/store';
// ** Reactstrap Imports
import { Row, Col, Form, Label, Input } from 'reactstrap';
import { request } from '../../../../services/utilities';
import Flatpickr from "react-flatpickr";

const RepeatingPostGraduateForm = (props) => {
    const store = useContext(Store);
    const [read_only_optician, setRead_only_optician] = store.read_only_optician;
    const [count, setCount] = useState(1);

    const newPostGraduate = () => {
        const post_graduateData = { institutionName: props.name_post_graduate, supervisorName: props.hod_post_graduate, startDate: new Date(props.from_post_graduate).toUTCString(), endDate: new Date(props.to_post_graduate).toUTCString() }
        if (props.name_post_graduate !== '') {
            props.addPostGraduate(post_graduateData);
        }
        props.setName_post_graduate('');
        props.setHod_post_graduate('');
        props.setFrom_post_graduate('');
        props.setTo_post_graduate('');
    }
    const newPostGraduateHttp = () => {
        const data = {
            institutionName: props.name_post_graduate, supervisorName: props.hod_post_graduate, startDate: new Date(props.from_post_graduate).toUTCString(),
            endDate: new Date(props.to_post_graduate).toUTCString(), opticianId: props.oneOptician.id
        }

        if (props.name_post_graduate === '') {
            return
        }
        try {
            const url = `certifications/create?senderid=${props.userId}`;
            const rs = request(url, 'POST', true, data);
            // console.log(rs);
            props.refreshUpdate();
        }
        catch (err) {
            console.log(err);
        }
    }

    const cancelPostGraduateUpdate = () => {
        setCount(count + 1);
        props.setName_post_graduate('');
        props.setHod_post_graduate('');
        props.setFrom_post_graduate('');
        props.setTo_post_graduate('');
        props.switchPostGraduateBtn(false);
    }

    const updatePostGraduate = async () => {
        const data = { institutionName: props.name_post_graduate, supervisorName: props.hod_post_graduate, startDate: new Date(props.from_post_graduate).toUTCString(), endDate: new Date(props.to_post_graduate).toUTCString() }
        const url = `optometrists/certification/${props.post_graduate_id}?senderid=${props.userId}`;
        // console.log(data, url);
        try {
            const rs = await request(url, 'PATCH', true, data);
            // console.log(rs);
            setCount(count + 1);
            cancelPostGraduateUpdate();
            props.refreshUpdate();
            alert('update successful');
        } catch (err) {
            alert('opps something went wrong');

            console.log(err);
        }
    }

    return (
        <>
            <Form>
                <div className='mt-4' style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <p className='fw-bold text-dark'>PART C: TRAINING:</p>
                    <p className='fw-bold text-dark'>POST GRADUATE TRAINING/EXPERIENCE - INTERNSHIP/NYSC/ADDITIONAL QUALIFICATIONS:</p>
                    {props.switchPostGraduateBtn === true ? <div>
                        <button type="button" className="btn mx-2 bg-danger text-white" disabled={read_only_optician} onClick={() => cancelPostGraduateUpdate()}> Cancel</button>
                        <button type="button" className="btn" style={{ background: ' rgb(0, 58, 3)', color: '#fff', borderColor: '1px solid rgb(0,58,3)' }} disabled={read_only_optician} onClick={() => updatePostGraduate()}> Update</button>
                    </div> :
                        <>{props.oneOptician !== null ?
                            <button type="button" className="btn mx-2" style={{ background: ' rgb(0, 58, 3)', color: '#fff', borderColor: '1px solid rgb(0,58,3)' }} disabled={read_only_optician} onClick={() => newPostGraduateHttp()}> Add </button>
                            : <button type="button" className="btn mx-2" style={{ background: ' rgb(0, 58, 3)', color: '#fff', borderColor: '1px solid rgb(0,58,3)' }} disabled={read_only_optician} onClick={() => newPostGraduate()}> Add </button>
                        }</>
                    }
                </div>

                <Row className='justify-content-between align-items-center'>
                    <Col md={6} className='mb-md-0 mb-3'>
                        <Label className='form-label' for={`item-name-${1}`}>
                            Name of Institution/Establishment
                        </Label>
                        <Input type='text' id={`item-name-${1}`}
                            value={props.name_post_graduate} onChange={(e) => props.setName_post_graduate(e.target.value)}
                            placeholder='Enter name of institution' />
                    </Col>
                    <Col md={6} className='mb-md-0 mb-3'>
                        <Label className='form-label' for={`item-name-${1}`}>
                            Name of Supervisor/Hod
                        </Label>
                        <Input type='text' id={`item-name-${1}`}
                            value={props.hod_post_graduate} onChange={(e) => props.setHod_post_graduate(e.target.value)}
                            placeholder='Enter name of supervisor/hod' />
                    </Col>
                    <Col md={6} className='mb-md-0 mt-3'>
                        <Label className='form-label' for={`item-name-${1}`}>
                            Period Cover From
                        </Label>
                        <Flatpickr
                            className="form-control"
                            options={{
                                dateFormat: "d M, Y"
                            }}
                            value={props.from_post_graduate} onChange={(e) => props.setFrom_post_graduate(e)}
                        />

                    </Col>
                    <Col md={6} className='mb-md-0 mt-3'>
                        <Label className='form-label' for={`item-name-${1}`}>
                            Period Cover To
                        </Label>
                        <Flatpickr
                            className="form-control"
                            options={{
                                dateFormat: "d M, Y"
                            }}
                            value={props.to_post_graduate} onChange={(e) => props.setTo_post_graduate(e)}
                        />
                    </Col>
                    {/* <hr /> */}
                </Row>
            </Form>
        </>
    )
}

export default RepeatingPostGraduateForm
