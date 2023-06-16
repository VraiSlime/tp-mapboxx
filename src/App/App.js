//importer la config de mapbox
import config from '../../app.config.exemple.json';
//importer la librairie mapbox
import mapboxgl from 'mapbox-gl';
//importer style de bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
//importer les script de bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
//importer le style de mapbox
import 'mapbox-gl/dist/mapbox-gl.css';
import {AddMarker} from './Classes/Marker';

//en dernier importer le fichier css
import '../assets/style.css';
import Maps from "./Classes/Maps";

class App {

    value;
    map;
    mapsClass;


      start() {
        console.log('App démarrée...');
        mapboxgl.accessToken = config.apis.mapbox_gl.api_key;

        this.mapsClass = new Maps();
        this.loadDom();
        this.map = this.mapsClass.mapInit();
        this.mapsClass.navigationControl();
        this.mapsClass.geolocalisationControl();
        this.mapsClass.DummyControl();
          this.mapsClass.ClearStorageControl();
          this.mapsClass.getCoordinates();
        this.addMarker = new AddMarker(this.map);
        this.addMarker.start();


        // Déplacez le code suivant en dehors de la boucle for
        const submitButton = document.getElementById('submit-button');
        submitButton.addEventListener('click', (evt) => {
          evt.preventDefault();
          this.addMarker.handlerNewEvent();
          this.addMarker.addMarker();
        });


      }
      


    loadDom(){
        //****************MAP*************** */
        this.elDivMap = document.createElement('div');
        this.elDivMap.id = 'map';

        document.body.append(this.elDivMap);
        // Création de l'élément div avec l'id "main-map"
        const mainMapDiv = document.createElement('div');
        mainMapDiv.id = 'main-map';
        
        const sidePanelDiv = document.createElement('div');
        sidePanelDiv.className = 'side-panel';
        
        const containerDiv = document.createElement('div');
        containerDiv.className = 'container';
        
        const formElement = document.createElement('form'); // Utilisez l'élément 'form' au lieu de 'my-form'
        formElement.setAttribute('novalidate', '');
        formElement.className = 'form';
        
        const fields = [
          { label: 'Titre de l\'événement', type: 'text', id: 'title', name: 'title', placeholder: 'Votre évènement' },
          { label: 'Description', type: 'textarea', id: 'description', name: 'description', placeholder: 'Décrit ton évènement ici', style: 'height:200px' },
          { label: 'Longitude', type: 'number', id: 'lng', name: 'lng', placeholder: 'Longitude' },
          { label: 'Latitude', type: 'text', id: 'lat', name: 'lat', placeholder: 'Latitude' },
          { label: 'Date de début', type: 'datetime-local', id: 'start-date', name: 'start-date', placeholder: 'Date de début' },
          { label: 'Date de fin', type: 'datetime-local', id: 'finish-date', name: 'finish-date', placeholder: 'Date de fin' }
        ];
        
        fields.forEach(field => {
          const { label, type, id, name, placeholder, style, disabled } = field;
        
          const rowDiv = document.createElement('div');
          rowDiv.className = 'row';
        
          const labelDiv = document.createElement('div');
          labelDiv.className = 'col-25';
          const labelElement = document.createElement('label');
          labelElement.setAttribute('for', id);
          labelElement.textContent = label;
          labelDiv.appendChild(labelElement);
        
          const inputDiv = document.createElement('div');
          inputDiv.className = 'col-75';
          const inputElement = (type === 'textarea') ? document.createElement('textarea') : document.createElement('input');
          inputElement.setAttribute('type', type);
          inputElement.id = id;
          inputElement.name = name;
          inputElement.placeholder = placeholder;
          if (style) {
            inputElement.setAttribute('style', style);
          }
          if (disabled) {
            inputElement.disabled = true;
          }
          inputDiv.appendChild(inputElement);
        
          rowDiv.appendChild(labelDiv);
          rowDiv.appendChild(inputDiv);
          formElement.appendChild(rowDiv);
        });
        
        const submitInput = document.createElement('input');
        submitInput.setAttribute('type', 'submit');
        submitInput.value = 'Enregistrer';
        submitInput.id = 'submit-button';
        formElement.id = 'my-form';
        
        const submitRowDiv = document.createElement('div');
        submitRowDiv.className = 'row';
        submitRowDiv.appendChild(submitInput);
        formElement.appendChild(submitRowDiv);
        
        containerDiv.appendChild(formElement);
        sidePanelDiv.appendChild(containerDiv);
        document.body.appendChild(mainMapDiv);
        document.body.appendChild(sidePanelDiv);
        
        
}

}


const app = new App();

export default app;