const crearCatalogo = () => {
    const catalogo = [];
    let cancionesPorDefecto = false;

    const agregarNombre = () => {
        let nombre;
        while(!nombre) {
            nombre = prompt('Ingresa el nombre de la canción: ');
        }
        return nombre;
    };

    const agregarAutor = () => {
        let autor;
        while(!autor) {
            autor = prompt('Ingresa el nombre del autor la canción: ');
        }
        return autor;
    };

    const agregarGenero = () => {
        let genero;
        while(!genero) {
            genero = prompt('Ingresa el género de la canción: ');
        }
        return genero;
    };

    const agregarDuracion = () => {
        let total = 0;
        let minutos = 0;
        let segundos = 0;
        while(!total) {
            alert('Ingresa la duración de la canción.\nPrimero los minutos y luego los segundos.');
            while(!minutos || isNaN(minutos)) {
                minutos = prompt('Minutos: ');
            }
            while(!segundos || isNaN(segundos)) {
                segundos = prompt('Segundos: ');
            }
            total = parseInt(minutos) * 60 + parseInt(segundos);
        }
        return { total: total, minutos: minutos, segundos: segundos };
    };

    const agregarCancion = () => {
        const nombre = agregarNombre();
        const autor = agregarAutor();
        const genero = agregarGenero();
        const duracion = agregarDuracion();
        
        const nuevaCancion = {
            nombre: nombre,
            autor: autor,
            genero: genero,
            duracion: duracion
        };
        catalogo.push(nuevaCancion);
    };

    const listarCanciones = () => {
        let mensaje = 'Aún no existen canciones en el catálogo.';
        if (catalogo.length > 0) {
            mensaje = 'Catálogo de canciones:\n';
            mensaje += catalogo
                .map(cancion => `- ${cancion.nombre} - by ${cancion.autor} - ${cancion.genero} - ${cancion.duracion.minutos}:${cancion.duracion.segundos}\n`)
                .join('');
        }
        alert(mensaje);
    };

    const buscarCancionesPorGenero = (terminoDeBusqueda) => {
        let mensaje = `No existen canciones con un género musical que contenga el término de búsqueda "${terminoDeBusqueda}".`;
        const cancionesPorGenero = catalogo.filter(cancion => cancion.genero.toLocaleLowerCase().includes(terminoDeBusqueda.toLocaleLowerCase()));
        if (cancionesPorGenero.length > 0) {
            mensaje = `Canciones cuyo género musical contienen el término de búsqueda "${terminoDeBusqueda}" :\n`;
            mensaje += cancionesPorGenero
                .map(cancion => `- ${cancion.nombre} - by ${cancion.autor} - ${cancion.genero} - ${cancion.duracion.minutos}:${cancion.duracion.segundos}\n`)
                .join('');
        }
        alert(mensaje);
    };

    const calcularPromedioDuracion = () => {
        let promedio = 0;
        let minutos = 0;
        let segundos = 0;
        if (catalogo.length > 0) {
            const suma = catalogo.reduce((acum, cancion) => acum + cancion.duracion.total, 0);
            promedio = (suma / catalogo.length).toFixed(2);
            minutos = Math.trunc(promedio / 60);
            segundos = Math.trunc(promedio - (minutos * 60));
        }
        alert(`El promedio de la duración de todas las canciones en el catálogo es de ${minutos} minutos y ${segundos} segundos (o de ${promedio} segundos, para ser más exactos).`);
    };

    const crearCancionesPorDefecto = () => {
        if (!cancionesPorDefecto) {
            const canciones = [
                { nombre: `A monster only you can't see`, autor: `Sonata Arctica`, genero: `Metal`, duracion: { total: 356, minutos: 5, segundos: 56 } },
                { nombre: `Milonga del marinero y el capitán`, autor: `Los Rodríguez`, genero: `Milonga`, duracion: { total: 206, minutos: 3, segundos: 26 } },
                { nombre: `Guerras perdidas`, autor: `Bacilos`, genero: `Tropipop`, duracion: { total: 226, minutos: 3, segundos: 46 } },
                { nombre: `Como enamoraban antes`, autor: `Fonseca`, genero: `Tropipop`, duracion: { total: 196, minutos: 3, segundos: 16 } },
                { nombre: `Acuérdate de mí`, autor: `Saratoga`, genero: `Metal`, duracion: { total: 280, minutos: 4, segundos: 40 } },
            ];
            
            canciones.forEach(cancion => {
                catalogo.push(cancion);
            });
            cancionesPorDefecto = true;
            alert('Se añadieron correctamente las canciones por defecto.');
        } else {
            alert('Las canciones por defecto ya fueron añadidas antes.');
        }
        
    };

    return { agregarCancion, listarCanciones, buscarCancionesPorGenero, calcularPromedioDuracion, crearCancionesPorDefecto };
};

const main = () => {
    const mensajeInvalido = 'La opción ingresada es inválida. Selecciona una opción válida (1 a 6).';
    const { agregarCancion, listarCanciones, buscarCancionesPorGenero, calcularPromedioDuracion, crearCancionesPorDefecto } = crearCatalogo();

    let opcion = 2;
    while(opcion != 6) {
        opcion = prompt(`
            ¡Bienvenido a tu catálogo musical!
            Elige una opción del menú para comenzar:
            1. Agregar canción.
            2. Listar canciones.
            3. Buscar canciones por género.
            4. Calcular promedio de duración.
            5. Crear canciones por defecto.
            6. Salir.
        `);
    
        if (opcion === null) {
            break;
        }
        
        if (isNaN(opcion)) {
            alert(mensajeInvalido);
            continue;
        }
    
        switch (parseInt(opcion)) {
            case 1:
                agregarCancion();
                break;
            
            case 2:
                listarCanciones();
                break;

            case 3:
                const terminoDeBusqueda = prompt('¿Por cuál género musical deseas filtrar?');
                buscarCancionesPorGenero(terminoDeBusqueda);
                break;

            case 4:
                calcularPromedioDuracion();
                break;
            
            case 5:
                crearCancionesPorDefecto();
                break;
    
            case 6:
                break;
        
            default:
                alert(mensajeInvalido)
                break;
        }
    }
};

document.getElementById('startBtn').onclick = main;
