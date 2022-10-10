# Pendientes

**Importante:** Para visualizar correctamente este *.md* se recomienda un visualizador de MarkDown o bien, copiar todo este file y pegar en: [StackEdit](https://stackedit.io/app#)

### Take the Next Step
- Se refactorizó, liberando el hilo de trabajo en el index.js Wizard, para Step contiene lógica separada y controlada por el *state* *"mounted"*
- ``// @state: mounted: { Boolean } - Prop opcional``
- Este puede determinar cuando un ``<step />`` está "listo" y montado en pantalla.
- Para el cambio de pantallas se invoca a la función ``setData('currentStep', getData('getData('currentStep' + 1)) `` para cambiar entre ``<steps /> `` y este es renderizado en base al ``children[currentStep]`` en Wizard/index.js
- La animaciones son tratadas en SASS correspondiente:
	- Clases:  animated, animated-fast, animated-fastly, fadeOut, slideInRightFade, slideInRight
- Terminar los estilos en general, sobre todo en el Step 5 con los **Checkbox** de los Resorts
- Eliminar error: *"Cannot read property 'offsetWidth' of null"* causado por algún comportamiento de Range Slider.


### Lazy images en home
- Los componentes con la prop ***lazy*** permiten la carga de imágenes diferidas gracias al componente: [react-lazy-progressive-image](https://www.npmjs.com/package/react-lazy-progressive-image)
``
// @param: lazy: { Boolean } - Prop opcional
``
``
<Component lazy = { true  } />
``
- Se requieren todas las imágenes en un peso extremadamente ligero tipo "thumbnail", para ser sobrescritas por el imagen real, solo se aplicaron para ``<Planingslider /> ``

### SEO
- Implementar Open Graph Tags para ``public.html``
- Implementar Twitter Cards de ser requerido
- Actualizar [React Helmet v6](https://github.com/nfl/react-helmet) cuando se encuentre disponible, ya que la versión "estable" actual, requiere sideEffects que muestran warning en consola en desarrollo causados por ``willReciveProps``.
- **Opcional**: 
	- Implementar [React Snap](https://github.com/stereobooster/react-snap), un generador de sitios estáticos, funciona con ``hidrate`` de React, carga un HTML inicial al instante y después hidrata la página cuando React haya sido descargado y ejecutado.
	- No requiere configuración adicional, leer la documentación, pero requiere que todos los enlaces se encuentren correctamente apuntados.
	- Probado por mi (Sergio), funciona perfecto para sitios Web que tiene una carga excesiva de componentes,  ideal para Weddings.
	- Configurar adecuadamente ``robots.txt`` y generar ``sitemap.xml``

