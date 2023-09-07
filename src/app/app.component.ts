import {Component, Renderer2} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PublicacionesService} from "./publicaciones.service";
import {Meta, Title} from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Pagina titulo';
  imagen = '';
  description = 'publicaciones la descripciones';

  constructor(
    private renderer: Renderer2,
    private meta: Meta,
    private titleService: Title,
    private route: ActivatedRoute,
    private _publicaciones: PublicacionesService,
  ) { }

  ngOnInit() {
    // Obtén los parámetros de consulta
    this.route.queryParams.subscribe((params) => {
      const parametro1 = params['parametro1'];

      // Verifica si el parámetro1 está presente
      if (parametro1) {
        console.log('parametro1', parametro1);

        this._publicaciones.obtenerDatos(parametro1).subscribe((data) => {
          // Maneja los datos recibidos de la API
          console.log(data);
          this.title = data.titulo;
          this.imagen = data.imagen;
          this.description = data.descripcion;
          this.titleService.setTitle(this.title);
          this.meta.updateTag({ name: 'og:description', content: this.description });
          this.cambiarFavicon(this.imagen);
          // La llamada a la API solo se realiza si parametro1 está presente
        });
      }
    });
  }

  cambiarFavicon(nuevaRuta: string) {
    const head = document.getElementsByTagName('head')[0];
    const links = head.getElementsByTagName('link');

    for (let i = 0; i < links.length; i++) {
      const link = links[i];
      if (link.getAttribute('rel') === 'icon') {
        this.renderer.setAttribute(link, 'href', nuevaRuta);
        break; // Detener el bucle después de cambiar la URL del favicon
      }
    }
  }

}
