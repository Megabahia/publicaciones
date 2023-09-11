import {Component, Inject, Renderer2} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {PublicacionesService} from "./publicaciones.service";
import {Meta, Title} from "@angular/platform-browser";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Pagina titulo';
  imagen = '';
  description = 'publicaciones la descripciones';
  url = '';

  constructor(
    private renderer: Renderer2,
    private meta: Meta,
    private titleService: Title,
    private _route: ActivatedRoute,
    private _publicaciones: PublicacionesService,
    @Inject(DOCUMENT) document: any
  ) {
    // Configurar las etiquetas SEO personalizadas para la página de Producto
    this.titleService.setTitle('Producto - Mi Tienda en Línea');
    this.meta.updateTag({ name: 'description', content: 'Descripción detallada del producto.' });
    this.meta.updateTag({ name: 'keywords', content: 'producto, descripción, detalles' });
    this.url = document.location;
    console.log(document.location.href);
  }

  ngOnInit() {
    // Obtén los parámetros de consulta
    this._route.queryParams.subscribe((params) => {
      const {id} = params;
      console.log('params', params)

      // Verifica si el parámetro1 está presente
      if (id) {
        console.log('id', id);

        this._publicaciones.obtenerDatos(id).subscribe((data) => {
          // Maneja los datos recibidos de la API
          console.log(data);
          this.title = data.titulo;
          this.imagen = data.imagen;
          this.description = data.descripcion;
          this.titleService.setTitle(this.title);
          this.meta.updateTag({ name: 'description', content: this.description });
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

  compartirEnFacebook() {
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=Holasssss`;
    window.open(facebookShareUrl, '_blank');
  }
}
