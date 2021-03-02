import React, { useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
} from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

import { Button } from 'react-bootstrap';
import Modal from './components/Modal';

import MarkerService from './services/MarkerService';

import "@reach/combobox/styles.css";
import mapStyles from "./mapStyles";

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
  lat: -3.71846,
  lng: -38.541672,
};

const markerService = new MarkerService();

export default function App() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  const [loadedData, setLoadedData] = React.useState(false);
  const [markers, setMarkers] = React.useState([]);
  const [selected, setSelected] = React.useState(null);

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  const [ modalShow, setModalShow ] = React.useState(false);

  function updateMarker(markerObj){
    setSelected(markerObj);
    setModalShow(true);
  }

  React.useEffect(() => {
    async function getMarkers() {
        if (!isLoaded) {
            try {
                const response = await markerService.getMarkers();
          
                if (response) {
                   await setMarkers(response.data);
                   setLoadedData(true);
                }
            }
            catch (error) {
                alert(error)
            }
        }     
    }
    getMarkers();
  }, [markers])


  if (loadError) return "Error";
  if (!isLoaded) return "Carregando...";

  return (
    <div>
      <h1 styles={{color: 'white'}}>
        Join Challenge
      </h1>

      <Locate panTo={panTo} />
      <Search panTo={panTo} />

      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        options={options}
        // onClick={onMapClick}
        onLoad={onMapLoad}
      >
        { loadedData ?
          markers.map((marker) => (
            <Marker
              key={`${marker.latitude}-${marker.longitude}`}
              position={{ lat: parseFloat(marker.latitude), lng: parseFloat(marker.longitude) }}
              onClick={() => updateMarker(marker)}
              icon={{
                url: `/marker.svg`,
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(15, 15),
                scaledSize: new window.google.maps.Size(30, 30),
              }}
            />
          )) : null
        }

        {selected ? (
          <Modal show={modalShow} onHide={() => setModalShow(false)} markerData={selected}/>
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

function Search({ panTo }) {
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

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();


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
  }

  function closeModal(){
    setModalShow(false)
  }

  return (
    <div className="search">
      <Modal show={modalShow} onHide={() => closeModal()} markerData={null}/>
      <Button onClick={() => createMarker()}>Novo Alvo</Button>
    </div>
  );
}
