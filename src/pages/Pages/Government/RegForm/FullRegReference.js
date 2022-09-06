// ** React Imports
import { useState, useContext } from 'react'
import { Store } from '../../../../services/store';
import { request } from '../../../../services/utilities';
// ** Custom Components
// ** Reactstrap Imports
import { Row, Col, Card, CardHeader, CardBody, Form, Label, Input, Button } from 'reactstrap';

const FullRegReference = (props) => {
    const store = useContext(Store);
    const [read_only_optician, setRead_only_optician] = store.read_only_optician;
    const [count, setCount] = useState(1);

    const newReference = () => {
        const referenceData = { refereeName: props.name_referee, refereeAddress: props.address_referee, refereeOccupation: props.occupation_referee, refereePhone: props.phoneE_referee }
        if (props.name_referee !== '') {
            props.addReference(referenceData);
        }
        props.setName_referee('');
        props.setAddress_referee('');
        props.setOccupation_referee('');
        props.setPhoneE_referee('');
    }

    const newReferenceHttp = () => {

        const data = {
            refereeName: props.name_referee, refereeAddress: props.address_referee, refereeOccupation: props.occupation_referee,
            refereePhone: props.phoneE_referee, opticianId: props.oneOptician.id
        }
        if (props.name_referee === '') {
            return
        }
        try {
            const url = `referees/create?senderid=${props.userId}`;
            const rs = request(url, 'POST', true, data);
            // console.log(rs);
            props.refreshUpdate();
        }
        catch (err) {
            console.log(err);
        }
    }
    const cancelRefereeUpdate = () => {
        setCount(count + 1);
        props.setName_referee('');
        props.setAddress_referee('');
        props.setOccupation_referee('');
        props.setPhoneE_referee('');
        props.setSwitchRefereeBtn(false);
    }

    const updateReferee = async () => {
        const data = { refereeName: props.name_referee, refereeAddress: props.address_referee, refereeOccupation: props.occupation_referee, refereePhone: props.phoneE_referee }
        const url = `optometrists/referee/${props.referee_id}?senderid=${props.userId}`;
        // console.log(data, url);
        try {
            const rs = await request(url, 'PATCH', true, data);
            // console.log(rs);
            setCount(count + 1);
            cancelRefereeUpdate();
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
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <p className='text-dark fw-bold'>PART D: REFEREES:</p>
                    {props.switchRefereeBtn === true ? <div>
                        <button type="button" className="btn mx-2 bg-danger text-white" disabled={read_only_optician} onClick={() => cancelRefereeUpdate()}> Cancel</button>
                        <button type="button" className="btn" style={{ background: ' rgb(0, 58, 3)', color: '#fff', borderColor: '1px solid rgb(0,58,3)' }} disabled={read_only_optician} onClick={() => updateReferee()}> Update</button>
                    </div> :
                        <>{props.oneOptician !== null ?
                            <button type="button" className="btn mx-2" style={{ background: ' rgb(0, 58, 3)', color: '#fff', borderColor: '1px solid rgb(0,58,3)' }} disabled={read_only_optician} onClick={() => newReferenceHttp()}> Add </button>
                            : <button type="button" className="btn mx-2" style={{ background: ' rgb(0, 58, 3)', color: '#fff', borderColor: '1px solid rgb(0,58,3)' }} disabled={read_only_optician} onClick={() => newReference()}> Add </button>
                        }</>
                    }
                </div>

                <Row className='justify-content-between align-items-center'>
                    <Col md={6} className='mb-md-0 mb-3'>
                        <Label className='form-label' for={`item-name-${1}`}>
                            Name
                        </Label>
                        <Input type='text' id={`item-name-${1}`}
                            value={props.name_referee} onChange={(e) => props.setName_referee(e.target.value)}
                            placeholder='Enter name' />
                    </Col>
                    <Col md={6} className='mb-md-0 mb-3'>
                        <Label className='form-label' for={`item-name-${1}`}>
                            Full Address
                        </Label>
                        <Input type='text' id={`item-name-${1}`}
                            value={props.address_referee} onChange={(e) => props.setAddress_referee(e.target.value)}
                            placeholder=' Enter full address' />
                    </Col>
                    <Col md={6} className='mb-md-0 mt-3'>
                        <Label className='form-label' for={`item-name-${1}`}>
                            Occupation
                        </Label>
                        <Input type='text' id={`item-name-${1}`}
                            value={props.occupation_referee} onChange={(e) => props.setOccupation_referee(e.target.value)}
                            placeholder='Enter occupation' />
                    </Col>
                    <Col md={6} className='mb-md-0 mt-3'>
                        <Label className='form-label' for={`item-name-${1}`}>
                            Phone Number / Email
                        </Label>
                        <Input type='text' id={`item-name-${1}`}
                            value={props.phoneE_referee} onChange={(e) => props.setPhoneE_referee(e.target.value)}
                            placeholder='Enter phone / email' />
                    </Col>

                </Row>
            </Form>
        </>
    )
}

export default FullRegReference
