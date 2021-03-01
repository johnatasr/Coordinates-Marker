import React, { useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

import { Button } from 'react-bootstrap';
import Modal from './components/Modal';

import MarkerService from './services/MarkerService';

import { formatRelative } from "date-fns";

import "@reach/combobox/styles.css";
import mapStyles from "./mapStyles";
import { propTypes } from "react-bootstrap/esm/Image";

const libraries = ["places"];
const mapContainerStyle = {
  height: "100vh",
  width: "100vw",
};
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};
const center = {
  lat: 43.6532,
  lng: -79.3832,
};

const markerService = new MarkerService();

export default function App() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  const [markers, setMarkers] = React.useState([]);
  const [selected, setSelected] = React.useState(null);

  // const onMapClick = React.useCallback((e) => {
  //   setMarkers((current) => [
  //     ...current,
  //     {
  //       lat: e.latLng.lat(),
  //       lng: e.latLng.lng(),
  //       time: new Date(),
  //     },
  //   ]);
  // }, []);

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  async function updateMarker(marker){
    setSelected(marker)
  }

  React.useEffect(() => {
    async function getMarkers() {
        if (!isLoaded) {
            try {
                const response = await markerService.getMarkers();
          
                if (response) {
                   response.data.forEach(element => {
                    setMarkers((current) => [
                      ...current,
                      {
                        latitude: element.latitude,
                        longitude: element.longitude,
                        nome: element.nome,
                        id: element.id,
                        expiracao: element.expiracao
                      },
                    ]);
                   });
                }      
            }
            catch (error) {
                alert(error)
            }
        }     
    }
    getMarkers();
}, [])


  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
    <div>
      <h1 styles={{color: 'white'}}>
        Join Challenge
      </h1>

      <Locate panTo={panTo} />
      <Search panTo={panTo} markerData={selected}/>

      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        options={options}
        // onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {markers.map((marker) => (
          <Marker
            key={`${marker.latitude}-${marker.longitude}`}
            position={{ lat: marker.latitude, lng: marker.longitude }}
            onClick={() => updateMarker(marker)}
            icon={{
              url: `/bear.svg`,
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
              scaledSize: new window.google.maps.Size(30, 30),
            }}
          />
        ))}

        {selected ? (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div>
              <h2>
                <span role="img" aria-label="marcador">
                  🐻
                </span>{" "}
                Alert
              </h2>
              <p>Spotted {formatRelative(selected.time, new Date())}</p>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
  );
}

function Locate({ panTo }) {
  return (
    <button
      className="locate"
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          () => null
        );
      }}
    >
      <img src="/compass.svg" alt="compass" />
    </button>
  );
}

function Search({ panTo, markerData=null }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 43.6532, lng: () => -79.3832 },
      radius: 100 * 1000,
    },
  });

  const [ modalShow, setModalShow ] = React.useState(false);

  // https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

  if (markerData){
    setModalShow(true);
  }

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      panTo({ lat, lng });
    } catch (error) {
      console.log("😱 Error: ", error);
    }
  };

  function createMarker(){
    setModalShow(true)
    markerData = null;
  }

  return (
    <div className="search">
      <Modal show={modalShow} onHide={() => setModalShow(false)} markerData={markerData}/>
      <Button onClick={() => createMarker()} >Novo Alvo</Button>
    </div>
  );
}
