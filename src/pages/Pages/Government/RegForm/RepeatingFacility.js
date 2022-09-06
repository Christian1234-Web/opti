// ** React Imports
import { useState, useContext } from 'react'
import { Store } from '../../../../services/store';
import { request } from '../../../../services/utilities';
import { Row, Col, Form, Label, Input } from 'reactstrap'

const RepeatingFacility = ({ facility, addFacility, name_facility, setName_facility, facility_id, userId, refreshUpdate, switchFacilityBtn, setSwitchFacilityBtn, practiceId }) => {
    const store = useContext(Store);
    let [read_only] = store.read_only;
    // const [name, setName] = useState('');
    // ** State
    const [count, setCount] = useState(1)


    const newFacility = () => {
        const facilityData = { name: name_facility }
        if (name_facility !== '') {
            addFacility(facilityData);
        }
        setName_facility('');
    }
    const newFacilityHttp = () => {
        const data = { name: name_facility, practiceId: practiceId.id }
        if (name_facility === '') {
            return
        }
        try {
            const url = `practices/facilities/create?senderid=${userId}`;
            const rs = request(url, 'POST', true, data);
            // console.log(rs);
            refreshUpdate();
        }
        catch (err) {
            console.log(err);
        }
    }
    const cancelFacilityUpdate = () => {
        setCount(count + 1);
        setName_facility('');
        setSwitchFacilityBtn(false);
    }

    const updateFacility = async () => {
        const data = { name: name_facility }
        const url = `practices/facility/${facility_id}?senderid=${userId}`;
        // console.log(data, url);
        try {
            const rs = await request(url, 'PATCH', true, data);
            // console.log(rs);
            setCount(count + 1);
            cancelFacilityUpdate();
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
                    <p className='text-dark fw-bold'>LIST MAJOR FACILITIES AVAILABLE IN YOUR PRACTICE:</p>
                    {switchFacilityBtn === true ? <div>
                        <button type="button" className="btn mx-2 bg-danger text-white" disabled={read_only} onClick={() => cancelFacilityUpdate()}> Cancel</button>
                        <button type="button" className="btn" style={{ background: ' rgb(0, 58, 3)', color: '#fff', borderColor: '1px solid rgb(0,58,3)' }} disabled={read_only} onClick={() => updateFacility()}> Update</button>
                    </div> :
                        <>{practiceId !== null ?
                            <button type="button" className="btn mx-2" style={{ background: ' rgb(0, 58, 3)', color: '#fff', borderColor: '1px solid rgb(0,58,3)' }} disabled={read_only} onClick={() => newFacilityHttp()}> Add </button>
                            : <button type="button" className="btn mx-2" style={{ background: ' rgb(0, 58, 3)', color: '#fff', borderColor: '1px solid rgb(0,58,3)' }} disabled={read_only} onClick={() => newFacility()}> Add </button>
                        }</>
                    }

                </div>

                <Row className='justify-content-between align-items-center'>
                    <Col md={12} className='mb-md-0 mb-3'>
                        <Label className='form-label' for={`item-name-${1}`}>
                            Facility Name
                        </Label>
                        <Input type='text' id={`item-name-${1}`}
                            value={name_facility} onChange={(e) => setName_facility(e.target.value)}
                            placeholder='Enter facility name' />
                    </Col>

                    {/* <hr /> */}
                </Row>
            </Form>
        </>
    )
}

export default RepeatingFacility
