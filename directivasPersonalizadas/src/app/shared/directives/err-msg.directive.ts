import { Directive, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[err-Msg]'
})
export class ErrMsgDirective implements OnInit, OnChanges{

  htmlElement: ElementRef<HTMLElement>;
  private _color: string = 'red';
  private _nombre: string =  'Este campo es obligatorio';

  @Input() set color( valor: string) {
    // this.htmlElement.nativeElement.style.color = valor;
    this._color = valor;
    this.setColor();
  }

  @Input() set nombre( valor: string) {
    // this.htmlElement.nativeElement.innerText = valor;
    this._nombre = valor;
    this.setMensaje();
    
  }  

  constructor(private el:   ElementRef<HTMLElement>) {
    this.htmlElement = el;
  }

  ngOnInit(): void {
    this.setColor();
    this.setMensaje();
    this.setClass();
  }

  ngOnChanges(changes: SimpleChanges): void {
 
  }

  setColor(): void {
    this.htmlElement.nativeElement.style.color = this._color; 
  }

  setMensaje(): void {
    this.htmlElement.nativeElement.innerText= this._nombre;
  }

  setClass(): void {
    this.htmlElement.nativeElement.classList.add('form-text');
  }

}
