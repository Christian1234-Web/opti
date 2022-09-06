// ** React Imports
import { useState, useContext } from 'react'
import { Store } from '../../../../services/store'
import { request } from '../../../../services/utilities'
// ** Reactstrap Imports
import { Row, Col, Card, CardHeader, CardBody, Form, Label, Input, Button } from 'reactstrap'

const RepeatingForm = ({ director, addDirector, name_director, setName_director, address_director, setAddress_director, userId, director_id, refreshUpdate,
    switchDirectorBtn, setSwitchDirectorBtn, practiceId }) => {
    const store = useContext(Store);
    let [read_only] = store.read_only;


    // ** State
    const [count, setCount] = useState(1)
    const newDirector = () => {
        const directorData = { name: name_director, address: address_director }
        if (name_director !== '') {
            addDirector(directorData);
        }
        setName_director('');
        setAddress_director('');

    }
    const newDirectorHttp = () => {
        const data = { name: name_director, address: address_director, practiceId: practiceId.id }
        if (name_director === '') {
            return
        }
        try {
            const url = `practices/directors/create?senderid=${userId}`;
            const rs = request(url, 'POST', true, data);
            // console.log(rs);
            refreshUpdate();
        }
        catch (err) {
            console.log(err);
        }
    }
    const cancelDirectorUpdate = () => {
        setCount(count + 1);
        setName_director('');
        setAddress_director('');
        setSwitchDirectorBtn(false);
    }

    const updateDirector = async () => {
        const data = { name: name_director, address: address_director }
        const url = `practices/director/${director_id}?senderid=${userId}`;
        // console.log(data, url);
        try {
            const rs = await request(url, 'PATCH', true, data);
            // console.log(rs);
            setCount(count + 1);
            cancelDirectorUpdate();
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
                    <p className='text-dark fw-bold'>NAME AND ADDRESS OF DIRECTORS:</p>
                    {switchDirectorBtn === true ? <div>
                        <button type="button" className="btn mx-2 bg-danger text-white" disabled={read_only} onClick={() => cancelDirectorUpdate()}> Cancel</button>
                        <button type="button" className="btn" style={{ background: ' rgb(0, 58, 3)', color: '#fff', borderColor: '1px solid rgb(0,58,3)' }} disabled={read_only} onClick={() => updateDirector()}> Update</button>
                    </div> :
                        <>{practiceId !== null ?
                            <button type="button" className="btn mx-2" style={{ background: ' rgb(0, 58, 3)', color: '#fff', borderColor: '1px solid rgb(0,58,3)' }} disabled={read_only} onClick={() => newDirectorHttp()}> Add </button>
                            : <button type="button" className="btn mx-2" style={{ background: ' rgb(0, 58, 3)', color: '#fff', borderColor: '1px solid rgb(0,58,3)' }} disabled={read_only} onClick={() => newDirector()}> Add </button>
                        }</>
                    }
                </div>

                <Row className='justify-content-between align-items-center'>
                    <Col md={6} className='mb-md-0 mb-3'>
                        <Label className='form-label' for={`item-name-${1}`}>
                            Name of Director
                        </Label>
                        <Input type='text' id={`item-name-${1}`}
                            value={name_director} onChange={(e) => setName_director(e.target.value)}
                            placeholder='Name of director' />
                    </Col>
                    <Col md={6} className='mb-md-0 mb-3'>
                        <Label className='form-label' for={`item-name-${1}`}>
                            Address of Director
                        </Label>
                        <Input type='text' id={`item-name-${1}`}
                            value={address_director} onChange={(e) => setAddress_director(e.target.value)}
                            placeholder='Address of director' />
                    </Col>
                    {/* <hr /> */}
                </Row>
            </Form>

            {/* <Button className='btn-icon' color='primary' onClick={ newDirector}> */}
            {/* <Plus size={14} /> */}
            {/* <span className='align-middle ms-25'>Add </span> */}
            {/* </Button> */}
        </>
    )
}

export default RepeatingForm
