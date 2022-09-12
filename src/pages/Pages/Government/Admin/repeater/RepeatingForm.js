// ** React Imports
import { useState } from 'react'

// ** Icons Imports
import { X, Plus } from 'react-feather'

// ** Custom Components
import Repeater from './index'

// ** Reactstrap Imports
import { Row, Col, Card, CardHeader, CardBody, Form, Label, Input, Button } from 'reactstrap'

const RepeatingForm = ({ boardArr }) => {
  // ** State
  const [count, setCount] = useState(1)
  const [number, setNumber] = useState('');

  const increaseCount = () => {
    let item = boardArr.find(x => x.number === number);
    if (!item && number !== '') {
      let x = { number }
      boardArr.push(x);
      setCount(count + 1);
    }
  }

  const deleteForm = e => {
    e.target.closest('form').remove()
    // let x = e.target.closest('form')

    // console.log(x);
  }

  return (
    <Card>
      <CardHeader>
        <h4 className='card-title'>Repeating Forms</h4>
      </CardHeader>

      <CardBody>
        <Repeater count={count}>
          {i => (
            <Form key={i}>
              <Row >
                <Col md={5}>
                  <div className="mb-3">
                    <Label htmlFor="firstNameinput" className="form-label">Select Practice</Label>
                    <select id="ForminputState" className="form-select" data-choices data-choices-sorting="true" >
                      <option>Choose...</option>
                      <option>Optician</option>
                      <option>Optometrist</option>

                    </select>
                  </div>
                </Col>

                <Col md={5}>
                  <Label htmlFor="firstNameinput" className="form-label">Board Number</Label>

                  <Input type="text" className="form-control"
                    onChange={e => setNumber(e.target.value)}
                    placeholder="Enter your board number" id="firstNameinput" />
                </Col>
                <Col md={2}>
                  <Button type='button' color='danger' className='text-nowrap px-1 mt-4' onClick={deleteForm} outline>
                    <X size={14} className='me-50' />
                    <span>Delete</span>
                  </Button>
                </Col>
              </Row>
              <Col sm={12}>
                <hr />
              </Col>
            </Form>
          )}
        </Repeater>
        <Col xl={8}>
          <Button color='primary' onClick={increaseCount}>
            <Plus size={14} />
            <span className='align-middle ms-25'>Add New</span>
          </Button>
        </Col>
      </CardBody>
    </Card>
  )
}

export default RepeatingForm
