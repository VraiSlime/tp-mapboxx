export class DummyControl {
    map;
    container;

    onAdd( map ) {
        this.map = map;
        /*
            <div class="mapboxgl-ctrl mapboxgl-ctrl-group">
                <button type="button">
                    <span class="mapboxgl-ctrl-icon">🤡</span>
                </button>
            </div>
        */
        this.container = document.createElement('div');
        this.container.classList.add( 'mapboxgl-ctrl', 'mapboxgl-ctrl-group');
        this.container.innerHTML = '<div <button type="button" style="border-radius: 4px;" class="map-control-clown"><span>Actualiser ↻</span></button></div>';

        this.container.children[0].addEventListener( 'click', this.handlerDummyClick.bind(this) );

        return this.container;
    }

    onRemove() {
        // Nettoyage
        this.container.removeEventListener( this.handlerDummyClick ); // Suppression des écouteurs
        this.container.remove(); // Suppression de l'élément de l'arbre DOM
        this.container = undefined; // Suppression de la référence (pour que Garbage collector vide la mémoire)
        this.map = undefined; // Suppression la référence
    }

    handlerDummyClick() {
        // console.log( this.container.textContent );
        location.reload();
    }
}