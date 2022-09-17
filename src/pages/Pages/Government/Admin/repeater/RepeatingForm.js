// ** React Imports
import { useState } from 'react'

// ** Icons Imports
import { X, Plus, Download } from 'react-feather'

// ** Custom Components
import Repeater from './index'

// ** Reactstrap Imports
import { Row, Col, Card, CardHeader, CardBody, Form, Label, Input, Button, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap'
import { request } from '../../../../../services/utilities'

const RepeatingForm = ({ boardArr }) => {
  // ** State
  const [count, setCount] = useState(1)
  const [number, setNumber] = useState('');
  const [type, setType] = useState('');


  const increaseCount = () => {
    let item = boardArr.find(x => x.number === number);
    if (!item && number !== '') {
      let x = { number: type + number }
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
      <CardBody>
        <Repeater count={count}>
          {i => (
            <Form key={i}>
              <Row >
                <Col md={5}>
                  <div className="mb-3">
                    <Label htmlFor="firstNameinput" className="form-label">Select Practice</Label>
                    <select id="ForminputState" className="form-select" onChange={e => setType(e.target.value)} data-choices data-choices-sorting="true" >
                      <option>Choose...</option>
                      <option value={'dop/'}>Optician</option>
                      <option value={'odorbn/'}>Optometrist</option>

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
        <Row className='justify-content-between'>
          <Col xl={4}>
            <Button color='primary' onClick={increaseCount}>
              <Plus size={14} />
            </Button>
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
}

export default RepeatingForm
