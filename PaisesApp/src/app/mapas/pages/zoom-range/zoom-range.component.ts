import {AfterViewInit,Component,ElementRef,OnDestroy,ViewChild,} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [
    `
      .mapa-container {
        height: 100%;
        width: 100%;
      }

      .row {
        cursor: pointer;
        position: fixed;
        border-radius: 4px;
        bottom: 50px;
        padding: 10px;
        left: 20px;
        background-color: white;
        z-index: 999;
        transition: 300ms ease-in;
        width: 480px;
      }

    `,
  ],
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('mapa') DivMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomValue: number = 10;
  center: [ number, number] = [-98.89375829803016, 19.25976170774038];

  constructor() {}
  ngOnDestroy(): void {
    this.mapa.off('zoom', () => {} );
    this.mapa.off('zoomend', () => {} );
    this.mapa.off('move', () => {} );
  }

  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.DivMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomValue,
    });

    this.mapa.on('zoom', () => {
      this.zoomValue = this.mapa.getZoom();
    });

    this.mapa.on('zoomend', () => {
      if(this.mapa.getZoom() > 18) {
        this.mapa.zoomTo(18);
      }
    });

    this.mapa.on('move', () => {
      const {lng,lat} = this.mapa.getCenter();
      this.center = [lng, lat];
    })

  }

  zoomIn() {
    this.mapa.zoomIn();
  }

  zoomOut() {
    this.mapa.zoomOut();
  }

  zoomChange(valor: string) {    
    this.mapa.zoomTo(Number(valor));
  }
}
