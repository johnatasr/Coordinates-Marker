import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import MarkerService from '../services/MarkerService';
import ValidationPayload from '../validators/PayloadValidator';
import DatePicker from "react-datepicker";
import format from "date-fns/format";
import "react-datepicker/dist/react-datepicker.css";


function ModalCentered(props) {
    const markerService = new MarkerService();
    const [marker, setMarker] = React.useState(props.markerData);

    const [nome, setNome] = React.useState(null);
    const [latitude, setLatitude] = React.useState(null);
    const [longitude, setLongitude] = React.useState(null);
    const [exp, setExp] = React.useState(new Date());

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
                const response = await markerService.createMarker(payload)
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

    function closeModal(){
        setMarker(null);
        props.onHide();
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
            {marker ?
                <h4>Atualizar Alvo</h4>
                :
                <h4>Novo Alvo</h4>
            }
            
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Nome</Form.Label>
                    { marker != null ? 
                        <Form.Control type="text" placeholder="Entre com o nome"  onChange={e => setNome(e.target.value)} value={marker.nome} /> 
                        :
                        <Form.Control type="text" placeholder="Entre com o nome"  onChange={e => setNome(e.target.value)} />   
                    }
                    
                    <Form.Text className="text-muted">
                    Esse nome será usado na localização do mapa
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Latitude</Form.Label>
                    { marker != null ?
                        <Form.Control type="text" placeholder="Entre com a latitude" value={marker.latitude}  onChange={e => setLatitude(e.target.value)} />
                        :
                        <Form.Control type="text" placeholder="Entre com a latitude" onChange={e => setLatitude(e.target.value)} />
                    }
                    <Form.Text className="text-muted">
                    Deve ser apenas números
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Longitude</Form.Label>
                    { marker != null ?
                        <Form.Control type="text" placeholder="Entre com a latitude" value={marker.latitude}  onChange={e => setLatitude(e.target.value)} />
                        :
                        <Form.Control type="text" placeholder="Entre com a latitude" onChange={e => setLongitude(e.target.value)} />
                    }
                    <Form.Text className="text-muted">
                    Deve ser apenas números
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Data de expiração</Form.Label>
                    <div style={{marginLeft: 10}}>
                        <DatePicker selected={new Date()} 
                                    onChange={(date)=>setExp(format(date, "yyyy-MM-dd", { awareOfUnicodeTokens: true }))}
                                    dateFormat="yyyy-MM-dd"/>
                    </div>    
                </Form.Group>
                {marker === null ?
                    <Button onClick={() => createMarker()} variant="primary" type="submit">
                        Salvar
                    </Button>
                    :
                    <Button onClick={() => updateMarker(marker)} variant="primary" type="submit">
                        Salvar
                    </Button>
                }
            </Form> 
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => closeModal()}>Fechar</Button>
        </Modal.Footer>
      </Modal>
    );
  }
export default ModalCentered;