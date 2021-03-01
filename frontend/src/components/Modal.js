import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import MarkerService from '../services/MarkerService';
import ValidationPayload from '../validators/PayloadValidator';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function ModalCentered(props) {
    const markerService = new MarkerService();
    const [marker, setMarker] = React.useState(null);

    const [nome, setNome] = React.useState(null);
    const [latitude, setLatitude] = React.useState(null);
    const [longitude, setLongitude] = React.useState(null);
    const [exp, setExp] = React.useState(new Date());


    if(props.markerData){
        setMarker(props.markerData)
    }

    async function createMarker(){
        try{
            let payload = {
                nome: nome,
                latitude: latitude,
                longitude: longitude,
                expiracao: exp
            }

            let valid = ValidationPayload(payload)
            
            if(valid){
                const response = await markerService.updateMarker(marker)
            } else {
                throw ErrorEvent
            }
        
        } catch(err){
            alert(err)
        }
    }

    async function updateMarker(marker){
        try{
            const response = await markerService.updateMarker(marker)
            return
        } catch(err){
            alert(err)
        }
    }

    async function deleteMarker(id){
        try{
            const response = await markerService.deleteMarker(id)
            return
        } catch(err){
            alert(err)
        }
    }

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
            { marker != null ?
                <>
                    <h4>Atualizar Alvo</h4>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control type="email" placeholder="Entre com o nome" value={marker.nome} />
                            <Form.Text className="text-muted">
                            Esse nome será usado na localização do mapa
                            </Form.Text>
                        </Form.Group>
        
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Latitude</Form.Label>
                            <Form.Control type="email" placeholder="Entre com a latitude" value={marker.latitude}  />
                            <Form.Text className="text-muted">
                            Deve ser apenas números
                            </Form.Text>
                        </Form.Group>
        
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Longitude</Form.Label>
                            <Form.Control type="email" placeholder="Entre com a longitude" value={marker.longitude} />
                            <Form.Text className="text-muted">
                            Deve ser apenas números
                            </Form.Text>
                        </Form.Group>
        
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Data de expiração</Form.Label>
                            <div style={{marginLeft: 10}}>
                                <DatePicker selected={marker.expiracao} onChange={date => setExp(date)} />
                            </div>    
                        </Form.Group>
                        <Button onClick={() => updateMarker(marker)} variant="primary" type="submit">
                            Salvar
                        </Button>
                    </Form> 
                </>
                :
                <>
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
                            <Form.Control type="email" placeholder="Entre com a latitude" onChange={e => setLatitude(e.target.value)} />
                            <Form.Text className="text-muted">
                            Deve ser apenas números
                            </Form.Text>
                        </Form.Group>
        
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Longitude</Form.Label>
                            <Form.Control type="email" placeholder="Entre com a longitude" onChange={e => setLongitude(e.target.value)} />
                            <Form.Text className="text-muted">
                            Deve ser apenas números
                            </Form.Text>
                        </Form.Group>
        
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Data de expiração</Form.Label>
                            <div style={{marginLeft: 10}}>
                                <DatePicker selected={exp} onChange={date => setExp(date)} />
                            </div>    
                        </Form.Group>
                        <Button onClick={() => createMarker()} variant="primary" type="submit">
                            Salvar
                        </Button>
                    </Form>
                </>  
            }
          
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Fechar</Button>
        </Modal.Footer>
      </Modal>
    );
  }
export default ModalCentered;