
/*const Item = ({nombre, descripcion, type, lat, lng}) => {
    return (`
    <div class="listado_item">
                <ul>
                    <li>${nombre}</li>
                    <li>${descripcion}</li>
                    <li>${type}</li>
                    <li>${lat}</li>
                    <li>${lng}</li>
                </ul>
                <ul>
                    <li><button> EDITAR</button></li>
                    <li><button> ELIMINAR</button></li>
                </ul>
    </div>
    `)


}*/

const deleteItem = async (id) => {
    try {
        const response = await fetch(`https://prog-3-mapa-backend-nu.vercel.app/markers/${id}`, {
            method: 'DELETE'
        })
        const data = await response.json()
        fetchItems();
    } catch (error) {
        console.log(error)
    }
}

const fillForm = async id => {
    try {
        const response = await fetch(`https://prog-3-mapa-backend-nu.vercel.app/marker/${id}`)
        const data = await response.json()
        fetchItems();
    } catch (error) {
        console.log(error)
    }
    
}

const updateItem = async (id, data) => {
    try {
        const response = await fetch(`https://prog-3-mapa-backend-nu.vercel.app/markers/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data)
        })
        const dataUpdated = await response.json()
        getListItems();
    } catch (error) {
        console.log(error)
    }
}

const fetchItems = async () => {
    const $list = document.querySelector("#list")
    $list.innerHTML = null
    try {
        const response = await fetch('https://prog-3-mapa-backend-nu.vercel.app/marker ');
        const json = await response.json();
        json.forEach((marker) => { /*Creo toda la función que me trae los datos en el fetch*/

            const { _id, nombre, descripcion, type, lat, lng } = marker /*Hago el de-estructuring*/ 
            const item = ` 
            <div class="contenedor">
                <div class="cont_collapsible">
                    <button class="collapsible">- ${nombre}</button>
                                <ul  class="content">
                                    <li><p class="titulomarkers">Descripción:</p>${descripcion}</li>
                                    <li><p class="titulomarkers">Barrio:</p>${type}</li>
                                    <li><p class="titulomarkers">Latitud</p>${lat} </li>
                                    <li><p class="titulomarkers">Longitud</p>${lng}</li>
                                </ul>
                    
                </div>
                <div class="buttons">
                    <button data-id=${_id} class="edit">Editar</button>
                    <button data-id=${_id} class="delete">Eliminar</button>
                </div>
            </div>
                ` 
            
                $list.innerHTML += item; /*Esto es igual a '$list.innerHTML = $list.innerHTML + item;' Acá acumulo las entradas en el HTML interior de la lista*/

            const $editButtons = document.querySelectorAll('.edit') // Selecciono cada elemento edit/delete
            $editButtons.forEach(el => {
                el.addEventListener('click',(e)=>{ 
                    e.preventDefault(); 
                    console.log(el.dataset.id)
                    fuillFom
                })
            })
            const $deleteButtons = document.querySelectorAll('.delete')
            $deleteButtons.forEach(el => {
                el.addEventListener('click',(e)=>{
                    e.preventDefault(); // Evita el comportamiento default del elemento por ej un boton ser clikceable. 
                    console.log(el.dataset.id)
                    deleteItem(el.dataset.id)
                })
            })

            var i;
            const coll = document.querySelectorAll(".collapsible");
            for (i = 0; i < coll.length; i++) {
                coll[i].addEventListener("click", function () {
                    this.classList.toggle("active");
                    var content = this.nextElementSibling;
                    if (content.style.display === "block") {
                        content.style.display = "none"
                    } else {
                        content.style.display = "block"
                    } //Si está oculto (display:none;) lo hace aparecer (display:block) y viceversa
                });
            }
        })
    } catch (error) {
        console.log(error)
    }
}

const adminMain = () => {
    fetchItems()
}
adminMain()

$(document).ready(function () { //Ver ifica que la página se cargó con exito
   
 
    $("#form1").validate({ //Valida el form indicado, en este caso, #form1

        rules: { //Las reglas para que se mandé la entrada nueva. En este caso, todos los campos requieren que se llenen
            "nombre": {
                required: true
            },
            "type": {
                required: true
            },
            "descripcion": {
                required: true
            },
            "lat": {
                required: true
            },
            "lng": {
                required: true
            }
        },
        messages: { //Si, por lo menos, uno de los campos no se llenó, se pondra en display el mensaje correspondiente.

            "nombre": "Nombre invalido",
            "type": "Seleccioná una opcion",
            "descripcion": "Descripcion invalida",
            "lat": "Escribe una latitude",
            "lng": "Escribe una longitud"

        },
            submitHandler: function (form){

                $.ajax({
                    url: form.action,
                    type:form.method,
                    data:$(form).serialize(),
                    beforeSend:function(){ //Antes de mandarse, indica que está cargando (como el "loading..." de los videojuegos)
                        $('.respuesta_form').html('Esperaaa')
                    },
                    success :function (response){ //Una vez que se mandó en exito la entrada nueva, se pone en display el siguiente mensaje.
                        console.log(response)
                        $('.respuesta_form').html('Gracias ' + response.nombre + ' por tu mensaje')
                        //$('#list').html('');
                        fetchItems()
                    }
                })

            }


    })

});
