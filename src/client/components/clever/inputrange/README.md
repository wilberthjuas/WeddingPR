# Checkbox

## Requisitos



## Props

- [x] minValue **Number**
- [x] maxValue **Number**
- [x] value **Number**
- [x] linercolor **Object {active:'#F26193',inactive:'#dbdbdb'}**
- [x] identify **Bool (true)**
- [x] _onChange **function (x)=>{ this.handleChange(x) }**


```
Nota: Los marcados son los que siempre deben ir definidos para una mejor funcionalidad
```

## Ejemplo Implementacion
Este apartado es unicamente informativo, no indica que de forma obligada se deba seguir la misma forma de nombrar, agregar y utilizar el componente.


Importacion:
```javascript
import InputRange from "../../components/clever/inputrange/index";
```

Constructor:
```javascript
constructor() {
    super();
    this.state = {
    };
    this.handleChange = this.handleChange.bind(this);
}
```

En la funcion de implementacion se abtiene el valor del rango en la que se encuentra posicionado.
```javascript
// Funcion de componente donde se obtiene la posicion
handleChange(Data){
    console.log(Data);
}
```

Render
```javascript
render() {
    return (
        <div style={{ padding: "10rem 1rem" }}>
            <InputRange
                minValue={0}
                maxValue={3}
                value={2}
                linercolor={{active:'#F26193',inactive:'#dbdbdb'}}
                identify={true}
                _onChange={(x)=>{ this.handleChange(x) }}
            />
        </div>
    );
}
```