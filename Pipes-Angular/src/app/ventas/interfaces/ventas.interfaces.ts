

export enum Genero {
    'Rock', 'Pop', 'Electronica', 'Rap'
}

export enum Calificacion {
    'Muy Malo', 'Malo', 'Regular', 'Bueno', 'Muy Bueno', 'Masterpiece'
}

export interface Reseña {
    grupo: string;
    album: string;
    genero: Genero;
    calificacion: Calificacion;
}