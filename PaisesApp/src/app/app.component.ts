import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment';
import * as  mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  
  ngOnInit(): void {
    (mapboxgl as any).accessToken = environment.mapBoxToken;
  }
  
  
}