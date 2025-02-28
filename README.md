starwarsapiconnection!

He resuelto este problema sirviéndome de la documentación que nos dieron a lo largo del curso. He enfrentado los típicos problemas (o ya me han ocurrido dos veces seguidas, así que estimo que serán típicos), como por ejemplo tener que haber hecho modificaciones en postgres:

Modificaciones en PostgreSQL
 Cambio del método de autenticación

PostgreSQL estaba configurado para usar autenticación peer, lo que impedía la conexión con contraseña.
Se modificó el archivo pg_hba.conf para cambiar peer por md5, permitiendo autenticación con contraseña.
 Actualización de la contraseña del usuario postgres

Se estableció una nueva contraseña con:
sql
Copy
Edit
ALTER USER postgres WITH PASSWORD '1234';
 Reinicio del servicio PostgreSQL

Aplicamos los cambios reiniciando el servicio con:
sh
Copy
Edit
sudo systemctl restart postgresql
Efectos de estas modificaciones
-Ahora el backend puede conectarse a la base de datos con usuario y contraseña.
-Cualquier otra conexión a PostgreSQL también requerirá autenticación con contraseña.


Algunos datos de utilidad para examinar el trabajo son:

nombre de la base de datos: starwars-database
usuario: el que viene por defecto, postgres.
contraseña: 1234

Puedes utilizar httpie (o curl, o postman, lo que te apetezca) para examinar las llamadas y ver si todo va como es debido. Te paso algunas llamadas para facilitarte el trabajo:

http localhost:3000/api/movies/tt0086190  <--- para ver los datos de una peli con un id en particular
http localhost:3000/api/movies <--- para ver todas las pelis de star wars
http POST localhost:3000/api/movies imdbID="tt0086190" <--- con esto metes una peli en concreto en la database
http localhost:3000/api/saved-movies <--- así vemos las que tenemos guardadas en la base de datos
http DELETE localhost:3000/api/movies imdbID="tt0086190" <--- como es de esperar, la borra de la database


He tenido bastantes dolores de cabeza con react porque frontend no es lo mío pero poco a poco voy aprendiendo a ver los errores y a leer documentación.


Aquí tienes una sección para las instrucciones de ejecución que puedes añadir al README, utilizando el `package.json` que me proporcionaste:

---

Ejecución del proyecto
1. Clona este repositorio
bash
Copy
Edit
git clone <URL_del_repositorio>
cd starwarsapiconnection
2. Instala las dependencias
Asegúrate de tener Node.js y npm instalados en tu máquina. Luego, ejecuta:

bash
Copy
Edit
npm install
3. Inicia el backend y el frontend
Este proyecto tiene dos partes: el backend y el frontend. Puedes iniciar ambos con el siguiente comando:

bash
Copy
Edit
npm run start
Esto ejecutará ambos servidores:

Backend: El servidor de Express se ejecutará con nodemon en el directorio backend, escuchando en el puerto por defecto.
Frontend: El frontend se ejecutará usando el build de Vite en el directorio frontend con el comando vite preview.
4. Ejecutar solo backend o frontend (opcional)
Si prefieres iniciar solo el backend o el frontend por separado, puedes usar los siguientes comandos:

Backend:

bash
Copy
Edit
npm run start:backend
Frontend (usando el build generado por Vite):

bash
Copy
Edit
npm run start:frontend
Generar el build del frontend (si aún no se ha hecho):

bash
Copy
Edit
npm run build:frontend
