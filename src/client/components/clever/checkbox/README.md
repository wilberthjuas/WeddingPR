# Checkbox

## Requisitos

Es Necesario implmentar el componente dentro de la clase `row` para que se organicen en la misma fila:

- Sin imagen

![Check sin imagen](https://user-images.githubusercontent.com/45366419/70912145-53aa6500-1fe1-11ea-901c-2c02e1ea230c.png)
![Captura de pantalla de 2019-12-16 09-38-34](https://user-images.githubusercontent.com/45366419/70915455-dc2c0400-1fe7-11ea-9731-17bc1e495e50.png)


- Con imagen

![Check con imagen](https://user-images.githubusercontent.com/45366419/70912241-8c4a3e80-1fe1-11ea-99bf-de793048d658.png)
![Captura de pantalla de 2019-12-16 09-38-27](https://user-images.githubusercontent.com/45366419/70915444-d504f600-1fe7-11ea-8989-75983eddcc07.png)



## Props

- [x] value **String ("")**
- [x] image_src  **String ("src/client/docs/img/weddings/desk/image_not_found.png")**
- [x] is_checked  **bool (false)**
- [x] _onClick  **function ((value,id,ref)=>{ `/* TODO */` }))**
- [ ] id  **String ("")**
- [ ] text_to_display  **String ("")**
- [ ] container_width  **String ("10rem")**
- [ ] container_height  **String ("10rem")**
- [ ] is_square  **bool (true)**
- [ ] has_image  **bool (true)**


```
Nota: Los marcados son los que siempre deben ir definidos para una mejor funcionalidad
```

## Ejemplo Implementacion
Este apartado es unicamente informativo, no indica que de forma obligada se deba seguir la misma forma de nombrar, agregar y utilizar el componente.


Importacion:
```javascript
import CheckboxButton from "../../components/clever/checkbox/index";
```

Constructor:
```javascript
constructor() {
    super();
    this.state = {
        // ...
        list_checked: [],
        // ...
    }
    // not required !
    // adding refs
    this.refe3 = React.createRef();
    this.refe4 = React.createRef();
    
    // adding component functions
    this.handleCheckbox = this.handleCheckbox.bind(this);
    // ...
}

```

En la funcion de implementacion puede agregarse la referencia siempre y cuando se haya decidido agregarlo, la referencia actuara como `this.ref3` o `this.ref4` dependiendo el caso de dónde se haya accionado el evendo
```javascript
// Funcion de componente donde se implementa
handleCheckbox(_value, _id, _component) {
    const who_is_checked = _component ? _component.current.value : _value ? _value : "";
    const list_checked = [...this.state.list_checked];
    if (list_checked.indexOf(who_is_checked) < 0) list_checked.push(who_is_checked);
    else list_checked.splice(list_checked.indexOf(who_is_checked), 1);
    this.setState({ list_checked });
}
```

Render
```javascript
render() {
    return(
        {/* ... */}
        <div className="row">
            <CheckboxButton
                onRef={this.refe3}
                _onClick={this.handleCheckbox}
                value={"Three"}
                image_src={
                    "https://searchengineland.com/figz/wp-content/seloads/2016/01/bing-new-logo-1920.jpg"
                }
                is_checked={this.state.list_checked.indexOf("Three") > -1}
                text_to_display="Text Lorem Ipsum Three"
            />
            <CheckboxButton
                onRef={this.refe4}
                _onClick={this.handleCheckbox}
                value={"Four"}
                is_checked={this.state.list_checked.indexOf("Four") > -1}
                text_to_display="No Image Four"
            />
        </div>
        {/* ... */}
    );
}
```