# entregable-final-JavaScript

Simulador interactivo para gestionar personas con roles en cursos. Entrega para el curso de JavaScript dictado por CoderHouse.

# Administrador de Cursos – Simulation Academy

Una aplicación web desarrollada con HTML, CSS, JavaScript y Bootstrap para gestionar alumnos y profesores asignados a distintos cursos. Este panel permite realizar operaciones básicas como listar, crear, modificar y buscar perfiles, con almacenamiento local en el navegador.

## 🎯 Funcionalidades principales

- **Listar alumnos, profesores y cursos** en secciones separadas y desplegables.
- **Crear perfiles** de alumno o profesor con asignación de curso y validación de datos.
- **Modificar información** existente por ID y tipo de rol.
- **Buscar personas por ID** de manera precisa.
- **Persistencia de datos** usando `localStorage` para mantener la información entre sesiones.
- **Interfaz amigable**, adaptable a distintos tamaños de pantalla con Bootstrap 5.

## 🚀 Cómo utilizar

1. **Clona o descarga el repositorio**.
2. Abre `index.html` en tu navegador.
3. Usa las distintas secciones:
   - En **Listar**, presiona el botón desplegable y luego “Refrescar” para cargar la información.
   - En **Crear Perfil**, llena los campos del formulario y selecciona un rol (Alumno o Profesor).
   - En **Modificar Perfil**, busca por ID y actualiza los datos.
   - En **Buscar por ID**, ingresa una ID válida y selecciona el rol para ver los detalles.

> ⚠️ Los datos se almacenan localmente en el navegador. Para restablecer la información, borra los datos desde las herramientas de desarrollo (`localStorage`).

## 📁 Estructura de archivos

- `index.html` – Página principal con la estructura de la aplicación.
- `css/styles.css` – Estilos personalizados.
- `js/data.js` – Datos iniciales precargados (alumnos, profesores y cursos).
- `js/main.js` – Lógica principal: manipulación DOM, eventos, validaciones y persistencia.

## 💡 Tecnologías usadas

- HTML5 / CSS3
- JavaScript
- Bootstrap 5
- Sweetalert2
- Almacenamiento `localStorage`

## 🧪 Mejoras posibles

- Agregar eliminación de perfiles.
- Exportar o importar datos.
- Agregar filtros por curso.
- Añadir autenticación para restringir acceso.