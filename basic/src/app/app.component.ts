import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
  Mi nombre es: {{Nombre}}
  <br>
  Mi edad es: {{Edad}}
  <br>

  {{LugarDeNacimiento}}
  <br>

  @if (Edad > 18) {
  <p>
  Soy mayor de edad
  </p>
  }

  `,
  styles: [],
})
export class AppComponent {
  title = 'basic';

  Nombre : String = "Starlyn";
  Edad : number = 20 ;
  Mayor : boolean = true;
  LugarDeNacimiento: String = "Santo Domingo";
}


