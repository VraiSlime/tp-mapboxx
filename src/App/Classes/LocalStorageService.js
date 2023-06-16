/**
 * Gestion du LocalStorage du navigateur
 */
export class LocalStorageService {
    storageKey;

    constructor( key ) {
        this.storageKey = key;
    }

    set( value ) {
        localStorage.setItem( this.storageKey, value );
    }

    get() {
        return localStorage.getItem( this.storageKey );
    }

    clear() {
        localStorage.removeItem( this.storageKey );
    }

    setJSON( json ) {
        this.set( JSON.stringify( json ) );
    }

    getJSON() {
        try {
            return JSON.parse( this.get() );
        }
        catch(e) {
            this.clear(e);
            return null;
        }
    }
}