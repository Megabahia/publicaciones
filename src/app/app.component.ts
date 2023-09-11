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

  createPost(accessToken: string) {
    const post = {
      message: 'Esta es una publicación personalizada en Facebook creada con Angular',
      link: 'https://publicaciones-bigpuntos.netlify.app/',
      image: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.cleverfiles.com%2Fhowto%2Fwp-content%2Fuploads%2F2018%2F03%2Fminion.jpg&tbnid=Z7v8NJDak3uZLM&vet=12ahUKEwj8s6LQ6qKBAxVyuIkEHWaVBq8QMygDegQIARB6..i&imgrefurl=https%3A%2F%2Fwww.cleverfiles.com%2Fhowto%2Fes%2Fwhat-is-jpg.html&docid=QFlun1GxrAfScM&w=630&h=354&q=imagenes%20jpg&ved=2ahUKEwj8s6LQ6qKBAxVyuIkEHWaVBq8QMygDegQIARB6',
    };

    const apiKey = '86171b12f1316e4cd2725d683eda3336';

    fetch(`https://graph.facebook.com/v12.0/1234567890123456/feed`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(post)
    })
      .then(response => response.json())
      .then(data => console.log(data));
  }

}
