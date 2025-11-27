Trabajo React To do list

Aclaración: El nombre de la carpeta no es "to do list" porque estuve ocupado ayudando en la preparacion para un evento el fin de semana, por lo que cree una practica mientras miraba el archivo de teoria y hacia las 
demos, no sabia si terminaria a tiempo por lo que simplemente cambie la demo y use este para el trabajo.

Implementaciones:
Implemente el custom hook permite que el estado se guarde automáticamente en localStorage.
De esta forma, si el usuario recarga la página, las tareas siguen ahí.
Lo uso tambien para llevar un historial de las tareas ya terminadas con las fechas en las que fueron terminadas, agregando a task el "completedAt" como un apartado extra

Funcionamiento:

Lee inicialmente desde localStorage usando la key indicada.
Si hay datos guardados, los convierte desde JSON.
Cada vez que el estado cambia, se vuelve a guardar en localStorage.

Agregue animaciones simples para cuando se completan o se agregan tareas y algo de color y forma a los botones.
---En principio queria hacer algo más lindo pero ya me llevaria demasiado

El texto de los botones cambia al pasar de una lista a otra y se tachan las tareas ya completadas
