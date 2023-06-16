import mapboxgl from 'mapbox-gl';
import { DummyControl } from './DummyControl';
import { ClearStorageControl } from './ClearStorageControl';


export class Map{

    mainMap;
    eventLat;
    eventLng;
    value;


    constructor(mainMap){
       this.mainMap = mainMap;
    }

    mapInit(){
        this.mainMap = new mapboxgl.Map({
            container: 'main-map',
            style: 'mapbox://styles/mapbox/navigation-night-v1',
            zoom: 5.5,
            center: [2.4, 47.6],

        });
        return this.mainMap;
    }
    

    navigationControl(){
        const navControl = new mapboxgl.NavigationControl({
            visualizePitch: true
        });
        this.mainMap.addControl(navControl, 'bottom-right');
    }

    geolocalisationControl(){
        const geoLocControl = new mapboxgl.GeolocateControl({
            fitBoundsOptions: {
                zoom: 15
            },
            positionOptions: {
                enableHighAccuracy: true
            },
            showUserHeading: true,
            // trackUserLocation: true
        });
        this.mainMap.addControl(geoLocControl, 'top-left');
    }

    getCoordinates(){
        this.mainMap.on('click', (evt) => {
            const eventLat = document.getElementById("lat");
            const eventLng = document.getElementById("lng");
            if (eventLat && eventLng) {
                eventLat.value = evt.lngLat.lat.toString();
                eventLng.value = evt.lngLat.lng.toString();
            }
        });
    }



    DummyControl(){
    const dummyControl = new DummyControl();
         this.mainMap.addControl(dummyControl, 'top-left');
    }

    ClearStorageControl(){
        const clearStorageControl = new ClearStorageControl();
        this.mainMap.addControl(clearStorageControl, 'top-left');
    }

}

export default Map;