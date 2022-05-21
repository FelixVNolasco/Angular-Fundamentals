import { AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface customMarker {
  color: string;
  marker?: mapboxgl.Marker;
  centro?: [number, number];
}

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [
    `
      .mapa-container {
        height: 100%;
        width: 100%;
      }
      .list-group {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 99;
      }

      li {
        cursor: pointer;
      }
    `,
  ],
})
export class MarcadoresComponent implements AfterViewInit {
  @ViewChild('mapa') DivMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomValue: number = 5;
  center: [number, number] = [-98.89375829803016, 19.25976170774038];
  marcadores: customMarker[] = [];

  constructor() {}

  ngAfterViewInit() {
    this.mapa = new mapboxgl.Map({
      container: this.DivMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomValue,
    });
    this.readLocalStorage();
  }

  agregarMarcador() {

    const color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );

    const newMarker = new mapboxgl.Marker({
      draggable: true,
      color,
    })
      .setLngLat(this.center)
      .addTo(this.mapa);

    this.marcadores.push({
      color,
      marker: newMarker,
    });

    this.writeLocalStorage();

    newMarker.on('dragend', () => {
      this.writeLocalStorage();
    });

  }

  irMarcador(marcador: mapboxgl.Marker) {
    this.mapa.flyTo({
      center: marcador.getLngLat(),
      zoom: 15,
    });
  }

  writeLocalStorage() {
    const lngLatArray: customMarker[] = [];

    this.marcadores.forEach((m) => {
      const color = m.color;
      const { lng, lat } = m.marker!.getLngLat();
      lngLatArray.push({
        color,
        centro: [lng, lat],
      });
    });

    localStorage.setItem('markers', JSON.stringify(lngLatArray));
  }

  readLocalStorage() {
    if (!localStorage.getItem('markers')) {
      return;
    }

    const lngLatArr: customMarker[] = JSON.parse(
      localStorage.getItem('markers')!
    );

    lngLatArr.forEach( (m) => {
      const newMarker = new mapboxgl.Marker({
        color: m.color,
        draggable: true
      }).setLngLat(m.centro!).addTo(this.mapa);

      this.marcadores.push({
        marker: newMarker,
        color: m.color
      });

      newMarker.on('dragend', () => {
        this.writeLocalStorage();
      });

    })

  }

  borrarMarcador(i: number) {
    this.marcadores[i].marker?.remove();
    this.marcadores.splice(i, 1);
    this.writeLocalStorage();
  }
}
