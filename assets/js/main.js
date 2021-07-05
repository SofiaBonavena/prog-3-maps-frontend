let markersAll = [] //
// Initialize and add the map
window.initMap = () => {
    //Centro del mapa
    const obelisco = { lat: -34.603544, lng: -58.381586 }; //esto es el centro!
    const map = new google.maps.Map(document.getElementById("map"), { //Creamos el mapa
        zoom: 15,
        center: obelisco,
        styles: styles,
        streetViewControl: false,
        fullscreenControl: false,
        mapTypeControlOptions: {
            mapTypeIds: []
        },
        zoomControlOptions: {
            position: google.maps.ControlPosition.RIGHT_CENTER
        }
    });
    fetchMarkers(map) //Agregamos los markers
    //Filtros
    const $filter = document.querySelectorAll('.handleFilter')
    $filter.forEach((filter) => {
        filter.addEventListener('click', () => {
            const filterQuery = filter.getAttribute("id"); //Traigo el query
            addMarkersFiltered(filterQuery, map) //Filtro markers
            console.log("se aplico el filtro", filter.innerHTML, filter.getAttribute("class"))
        })
    })
    //Reset de filtros
    const $filterReset = document.querySelector('.handleFilterReset')
    $filterReset.addEventListener('click', () => {
        markersAll.forEach((marker) => { //Limpiamos el mapa
            marker.setMap(null) //lo quitamos del mapa
        })
        markersAll.forEach((marker) => { //Agregamos los markers filtrados
            marker.setMap(map) //lo agregamos al mapa
        })
    })
}
const addMarkersFiltered = (filterQuery, map) => {
    markersAll.forEach((marker) => { //Limpiamos el mapa
        marker.setMap(null) //lo quitamos del mapa
        console.log("se aplico el filtro 2")
    })
    const markersFiltered = markersAll.filter((marker) => marker.customInfo === filterQuery) //Filtramos por query
    console.log("se aplico el filtro 3")
    markersFiltered.forEach((marker) => { //Agregamos los markers filtrados
        console.log("se aplico el filtro 4")
        marker.setMap(map) //lo agregamos al mapa
    })
    console.log("se aplico el filtro 5")
}
const fetchMarkers = async (map) => {
    try {
        const response = await fetch('assets/data/markers.json');
        const json = await response.json();
        console.log(json)
        json.forEach(marker => addMarker(map, marker))
    } catch (error) {
        console.log(error)
    }
}
const addMarker = (map, marker) => {
    const { nombre, descripcion, lat, lng, type } = marker
    //Iconos
    const icons = {
        'Abasto': 'assets/img/marker.svg',
        'Billinghurst': 'assets/img/marker.svg',
        'Caballito': 'assets/img/marker.svg',
        'Cabildo': 'assets/img/marker.svg',
        'Corrientes': 'assets/img/marker.svg',
        'Florida': 'assets/img/marker.svg',
        'Pueyrredon':'assets/img/marker.svg',
        'Alto Rosario': 'assets/img/marker.svg',
    }
    //MARKER
    const markerItem = new google.maps.Marker(
        {
            position: { lat: lat, lng: lng },
            map: map,
            icon: icons[type],
            customInfo: type
        }
    );
    markerItem.setMap(map);
    markersAll.push(markerItem); //lo agrego tambien al array de todos los markers
    //INFOWINDOW
    const contentString = `
    <div class="info_wrapper">
        <h2>${nombre}</h2>
        <h3>${type}</h3>
        <p>${descripcion}</p>
    </div>
    `
    const infoWindow = new google.maps.InfoWindow({
        content: contentString
    })
    markerItem.addListener('click', () => {
        infoWindow.open(map, markerItem)
    })
}