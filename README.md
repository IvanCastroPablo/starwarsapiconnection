<p align="center">
  <h1>Starwars API Connection</h1>
</p>

<p align="center">
  <img src="https://i.postimg.cc/7YXRjz67/Screenshot-from-2025-02-28-21-46-12.png" alt="Imagen del proyecto" />
</p>


Una aplicación que se conecta con OMDB API para obtener todas las películas de Star Wars y almacenarlas (y eliminarlas) en una base de datos local y persistente. He resuelto esta prueba sirviéndome de la documentación y experiencia obtenida en el curso de Albañiles Digitales.

# Ejecución del proyecto

## 1. Clonar este repositorio

```bash
git clone https://github.com/IvanCastroPablo/starwarsapiconnection
cd starwarsapiconnection
```

## 2. Instalar las dependencias

Asegúrate de tener Node.js y npm instalados en tu máquina. Luego, ejecuta:

```bash
npm install
```

## 3. Iniciar el backend y el frontend

Este proyecto tiene dos partes: el backend y el frontend. Puedes iniciar ambos con el siguiente comando:

```bash
npm start
```

Esto ejecutará ambos servidores:

- **Backend**: El servidor de Express se ejecutará con `nodemon` en el directorio backend, escuchando en el puerto por defecto.
- **Frontend**: El frontend se ejecutará usando el build de Vite en el directorio frontend con `vite preview`.

## 4. Modificación de postgres (es posible que lo necesites)



Durante el desarrollo, enfrenté problemas con la autenticación en PostgreSQL, lo que requirió algunas modificaciones (modificaciones que es posible que tú también tengas que hacer para que la aplicación funcione apropiadamente):

### Cambio del método de autenticación

PostgreSQL estaba configurado para usar autenticación `peer`, lo que impedía la conexión con contraseña. Se modificó el archivo `pg_hba.conf` para cambiar `peer` por `md5`, permitiendo autenticación con contraseña.

### Actualización de la contraseña del usuario `postgres`

```sql
ALTER USER postgres WITH PASSWORD '1234';
```

### Reinicio del servicio PostgreSQL

```bash
sudo systemctl restart postgresql
```

### 🔹 Efectos de estas modificaciones

- Ahora el backend puede conectarse a la base de datos con usuario y contraseña.
- Cualquier otra conexión a PostgreSQL también requerirá autenticación con contraseña.

## 5. Ejecutar solo backend o frontend (opcional)

Si prefieres iniciar solo el backend o el frontend por separado, puedes usar los siguientes comandos:

- **Backend**:
  ```bash
  npm run start:backend
  ```
- **Frontend (usando el build generado por Vite)**:
  ```bash
  npm run start:frontend
  ```
- **Generar el build del frontend (si aún no se ha hecho)**:
  ```bash
  npm run build:frontend
  ```

## 6. Visitar la aplicación

Una vez hayas ejecutado todos los pasos necesarios, la propia consola del backend te proporcionará un link para visitar la página web de la aplicación. En caso de que no lo veas o tu consola deshabilite links, simplemente visita http://localhost:3000/movies

---



# Información de la base de datos

- **Nombre de la base de datos:** `starwars-database`
- **Usuario:** `postgres` (por defecto)
- **Contraseña:** `1234`

---

# Endpoints de la API

Puedes utilizar `httpie`, `curl` o `Postman` para probar las llamadas a la API. Aquí te dejo todas las llamadas:

- **Obtener detalles de una película con un ID específico:**
  ```bash
  http localhost:3000/api/movies/tt0086190
  ```
- **Obtener todas las películas de Star Wars:**
  ```bash
  http localhost:3000/api/movies
  ```
- **Agregar una película a la base de datos:**
  ```bash
  http POST localhost:3000/api/movies imdbID="tt0086190"
  ```
- **Ver las películas guardadas en la base de datos:**
  ```bash
  http localhost:3000/api/saved-movies
  ```
- **Eliminar una película de la base de datos:**
  ```bash
  http DELETE localhost:3000/api/movies imdbID="tt0086190"
  ```

---

# Desafíos

En el frontend, tuve algunos dolores de cabeza con React, ya que no es mi fuerte. Sin embargo, poco a poco fui aprendiendo a identificar errores y a leer documentación para solucionarlos.

En algunos momentos, me apoyé en inteligencia artificial para resolver problemas rápidos. Sin embargo, me he dado cuenta de que cada vez que recurro a ella, mi habilidad para programar tiende a empeorar, así que he intentado depender menos de estas herramientas a medida que avanzo.

---

## Conclusión

He dedicado bastante tiempo a esta prueba porque quería hacer las cosas bien y entender realmente cada parte del proyecto. No quería simplemente resolver el ejercicio, sino asegurarme de que comprendía lo que estaba haciendo y por qué lo estaba haciendo.

Estoy muy ilusionado por participar en las prácticas, ya que representan una gran oportunidad para seguir aprendiendo y mejorar como desarrollador. Espero que este proyecto refleje mi compromiso y mis ganas de crecer en este campo. ¡Gracias por tu tiempo! 

