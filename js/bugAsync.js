function obtenerUsuario(id) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let usuario;
            if (id === 1) {
                usuario = { id: 1, nombre: 'John Doe' };
            }
            resolve(usuario);
        }, 2000);
    });
}

obtenerUsuario(1)
    .then(usuario => {
        console.log(usuario);
    });
