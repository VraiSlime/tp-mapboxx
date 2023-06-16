import mapboxgl from 'mapbox-gl';
import { LocalStorageService } from './LocalStorageService';
import { LocalEvent } from './LocalEvents';

const STORAGE_KEY = 'my-events';

export class AddMarker {
  localEventStorage;
  arrLocalEvent = [];

  eventTitle;
  eventDescription;
  eventStartDate;
  eventFinishDate;
  eventLat;
  eventLng;
  eventSubmit;
  form;
  value;
  map;

  constructor(map) {
    this.map = map;
    if (this.form) {
      this.form.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this.handlerNewEvent();
      });
    }
  }

  start() {
    this.eventLat = document.getElementById('lat');
    this.eventLng = document.getElementById('lng');
    this.eventTitle = document.getElementById('title');
    this.eventDescription = document.getElementById('description');
    this.eventStartDate = document.getElementById('start-date');
    this.eventFinishDate = document.getElementById('finish-date');
    this.eventSubmit = document.getElementById('submit-button');
    this.form = document.getElementById('my-form');
    this.localEventStorage = new LocalStorageService(STORAGE_KEY);



    let dataJson = this.localEventStorage.getJSON();
    console.log(dataJson);
    if (dataJson === null || dataJson[0].title  === "") {
      return;
    }
    for (let i of dataJson) {
      this.arrLocalEvent.push(new LocalEvent(i));
    }
    this.render();
  
    const submitButton = document.getElementById('submit-button');
    submitButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      this.addMarker();
    });

  }
  

  handlerNewEvent() {
    const strTitle = this.eventTitle.value;
    console.log(this.eventTitle);
    const strDescription = this.eventDescription.value;
    const strEventLat = this.eventLat.value;
    const strEventLng = this.eventLng.value;
    const strEventStartDate = this.eventStartDate.value;
    const strEventFinishDate = this.eventFinishDate.value;

    const newEventLocal = {
      title: strTitle,
      description: strDescription,
      latitude: strEventLat,
      longitude: strEventLng,
      dateStart: strEventStartDate,
      dateFinish: strEventFinishDate,
    };

    this.arrLocalEvent.push(new LocalEvent(newEventLocal));

    this.render();

    this.localEventStorage.setJSON(this.arrLocalEvent);
  }

  addMarkerToMap(localEvent) {
    let colorOfMarker = '';
    const startDate = new Date(localEvent.dateStart).getTime();
    const endDate = new Date(localEvent.dateFinish).getTime();
    const dateNow = new Date().getTime();

    if (startDate > dateNow && startDate > dateNow + 3 * 24 * 60 * 60 * 1000) {
      colorOfMarker = 'green';
    }
    if (startDate > dateNow && startDate < dateNow + 3 * 24 * 60 * 60 * 1000) {
      colorOfMarker = 'orange';
    }
    if (endDate < dateNow) {
      colorOfMarker = 'red';
    }

    const marker = new mapboxgl.Marker({
      color: colorOfMarker,
    });
    marker.setLngLat({
        lng: localEvent.longitude,
        lat: localEvent.latitude,
      });
      

    const popup = new mapboxgl.Popup();
    popup.setHTML(
      '' +
        `<h2>${localEvent.title}</h2>` +
        `<p>${localEvent.description}</p>` +
        `<p><strong>Start:</strong> ${formatDateTime(localEvent.dateStart)}</p>` +
        `<p><strong>Finish:</strong> ${formatDateTime(localEvent.dateFinish)}</p>`
    );

    marker.setPopup(popup);
    marker.addTo(this.map);
  }

  render() {
    this.arrLocalEvent.forEach((localEvent) => {
      console.log(localEvent)
      this.addMarkerToMap(localEvent);
    });
  }

  addMarker() {
    const title = this.eventTitle.value;
    const description = this.eventDescription.value;
    const dateStart = this.eventStartDate.value;
    const dateFinish = this.eventFinishDate.value;
    const lat = parseFloat(this.eventLat.value);
    const lng = parseFloat(this.eventLng.value);
    const marker = new mapboxgl.Marker()
      .setLngLat([lng, lat])
      .setPopup(new mapboxgl.Popup().setHTML(`
        <h2>${title}</h2>
        <p>${description}</p>
        <p><strong>Start:</strong> ${formatDateTime(dateStart)}</p>
        <p><strong>Finish:</strong> ${formatDateTime(dateFinish)}</p>
        `))
      .addTo(this.map);
  }
}
function formatDateTime(date) {
  const formattedDate = new Date(date).toLocaleDateString("fr-FR");
  const formattedTime = new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  return `${formattedDate} ${formattedTime}`;
}