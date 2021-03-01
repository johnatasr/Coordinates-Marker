import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function ModalCentered(props) {

    const [startDate, setStartDate] = React.useState(new Date());

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Join Challenge
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Novo Alvo</h4>
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control type="email" placeholder="Entre com o nome" />
                    <Form.Text className="text-muted">
                    Esse nome será usado na localização do mapa
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Latitude</Form.Label>
                    <Form.Control type="email" placeholder="Entre com a latitude" />
                    <Form.Text className="text-muted">
                    Deve ser apenas números
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Longetude</Form.Label>
                    <Form.Control type="email" placeholder="Entre com a longetude" />
                    <Form.Text className="text-muted">
                    Deve ser apenas números
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Data de expiração</Form.Label>
                    <div style={{marginLeft: 10}}>
                        <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
                    </div>    
                </Form.Group>
                <Button variant="primary" type="submit">
                    Salvar
                </Button>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Fechar</Button>
        </Modal.Footer>
      </Modal>
    );
  }
export default ModalCentered;