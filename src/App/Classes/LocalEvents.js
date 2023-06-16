export class LocalEvent {

    title;
    description;
    latitude;
    longitude;
    dateStart;
    dateFinish;

    constructor(dataJSON) {
        this.title = dataJSON.title;
        this.description = dataJSON.description;
        this.latitude = dataJSON.latitude;
        this.longitude = dataJSON.longitude;
        this.dateStart = dataJSON.dateStart;
        this.dateFinish = dataJSON.dateFinish;
    }
}