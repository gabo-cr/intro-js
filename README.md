# Bootcamp Keepcoding

## Módulo: Introducción a JavaScript

Este repositorio contiene las soluciones a los ejercicios de la práctica del módulo de Intro JS.

Para visualizar los resultados, se puede usar la extensión Live Server en VS Code. En `index.html` se deberá cambiar el "src" al archivo .js que se requiera.

Todos los archivos con las soluciones se encuentran dentro de la carpeta "js".

### Ejercicio 1

La solución está en el archivo **ejercicio1.js**. Los resultados se pueden ver en la consola.

### Ejercicio 2: Arreglar bug

La solución está en el archivo **bug.js**. Los resultados se pueden ver en la consola.

### Ejercicio 3: Transformaciones

La solución está en el archivo **transform.js**. Los resultados se pueden ver en la consola.

### Ejercicio 4: Arreglar bug de asincronía

La solución está en el archivo **bugAsync.js**. Los resultados se pueden ver en la consola.

### Ejercicio 5: Catálogo Musical

La solución está en el archivo **catalogoMusical.js**. Los resultados se pueden ver en un `alert`. Asimismo, los datos que se piden al usuario se reciben a través de un `prompt`.

En el `index.html` se colocó un botón para iniciar el programa. Al hacer click en el botón, se despliega un menú que acepta el número de la opción que se desea ejecutar.

Se añadió una opción extra para llenar el catálogo con unas cuantas canciones por defecto y permitir que las pruebas sean más rápidas. Es la opción "5. Crear canciones por defecto".

### Proyecto Wimblecode

La solución está en el archivo **wimblecode.js**. Los resultados se pueden ver en la consola.

#### Simulación

Por defecto, se ejecuta una simulación de un torneo con cuatro participantes.

Para iniciar el torneo, primero se crea un nuevo torneo, usando la función `createTournament(...playersNames)`. Después, se crean los primeros partidos aleatoriamente entre los cuatro jugadores, con el método `createMatches()`.

Finalmente, utilizando el método `start(verbose)` se ejecuta la simulación (el parámetro *verbose* es un boolean que indica si se desea mostrar el score en cada punto de cada jugador o si solo se desea mostrar el resultado final de cada partido).

```javascript
const tournament = createTournament('Alberto Casero', 'David Jiménez', 'Javier de Miguel', 'Eduardo Aguilar');
tournament.createMatches();
tournament.start(false); // Cambiar a true para ver el score punto a punto
```

#### Partido punto a punto

Para crear un partido fuera de un torneo, se puede, en primer lugar, crear un objeto de la clase Match, pasando como parámetros los nombres de los dos jugadores.

Luego, para añadir un punto a un jugador, se debe usar el método `pointWonBy(number, verbose)`, donde el parámetro *number* indica el número del jugador que ha marcado el punto (solo puede ser 1 o 2), y el parámetro *verbose* es opcional y es un boolean que indica si se desea mostrar quién ha ganado el punto en cada punto de cada jugador (por defecto, es false).

Por último, si se desea mostrar el resultado, se puede usar el método `getScore()` para visualizar por consola el resultado actual del partido.

```javascript
const match = new Match('Alberto Casero', 'Javier de Miguel');
match.pointWonBy(1, true);
match.getScore();
```
