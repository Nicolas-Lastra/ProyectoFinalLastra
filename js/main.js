// Persistencia de datos

const url = '../json/data.json'

async function cargarDatosFetch() {
    try {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error(`Estatus HTTP ${response.status}`)
        }

        const data = await response.json()
        cursos = data.cursos
        alumnos = data.alumnos
        profesores = data.profesores
        principal()

    } catch (error) {
        mostrarToast(`Error al cargar los datos.\n${error}`, 4000, "error")
    }
}

function guardarDatos() {
    localStorage.setItem('alumnos', JSON.stringify(alumnos))
    localStorage.setItem('profesores', JSON.stringify(profesores))
}

function cargarDatos() {
    const alumnosLS = localStorage.getItem('alumnos')
    const profesoresLS = localStorage.getItem('profesores')

    if (alumnosLS && profesoresLS) {
        alumnos = JSON.parse(alumnosLS)
        profesores = JSON.parse(profesoresLS)
    } else {
        guardarDatos()
    }
}

// Funciones de creación y asignación

function crearPersona() {

    const form = document.getElementById('c-form')

    form.addEventListener('submit', (e) => {

        e.preventDefault()

        const nombre = document.getElementById('c-nombre').value.trim()
        const edad = parseInt(document.getElementById('c-edad').value)
        const curso = document.getElementById('c-curso').value

        const rolSeleccionado = document.querySelector('input[name="rol"]:checked')
        let rol = rolSeleccionado ? rolSeleccionado.value : null

        if (!soloLetras(nombre)) {
            mostrarToast('Ingrese solo letras en nombre', 3000, "error")
            return
        }

        if (!esNumeroEnteroPositivo(edad)) {
            mostrarToast('Ingrese una edad válida', 3000, "error")
            return
        }

        if (rol === null) {
            mostrarToast('Rol no seleccionado', 3000, "error")
            return
        }

        if (rol === 'c-alumno') {
            rol = 'Alumno'
        } else {
            rol = 'Profesor'
        }

        asignarPersona(nombre, edad, rol, curso)

    })

}

function asignarPersona(nombre, edad, rol, curso) {

    const persona = {
        nombre: nombre,
        edad: edad,
        rol: rol,
        curso: curso,
        id: (alumnos.length + profesores.length + 1)
    }

    const lista = rol === 'Alumno' ? alumnos : profesores

    const yaExiste = lista.some(persona =>
        persona.nombre === nombre &&
        persona.edad === edad &&
        persona.curso === curso &&
        persona.rol === rol
    )

    if (yaExiste) {
        mostrarToast("La persona ya existe", 3000, "error")
        return
    }

    if (persona.rol === 'Alumno') {
        alumnos.push(persona)
        mostrarToast("¡Alumno creado con éxito!")
        guardarDatos()
    } else {
        profesores.push(persona)
        mostrarToast("Profesor creado con éxito!")
        guardarDatos()
    }

}

function modificarPersona() {

    const form = document.getElementById('m-form')

    form.addEventListener('submit', (e) => {

        e.preventDefault()

        // Búsqueda por ID

        const id = parseInt(document.getElementById('m-id').value)

        if (!esNumeroEnteroPositivo(id) || id === 0) {
            mostrarToast("Ingrese una ID válida", 3000, "error")
            return
        }

        const rolSeleccionado = document.querySelector('input[name="m-rol"]:checked')
        let rol = rolSeleccionado ? rolSeleccionado.value : null

        if (rol === null) {
            mostrarToast('Rol no seleccionado', 3000, "error")
            return
        }

        if (rol === 'm-alumno') {
            rol = 'Alumno'
        }
        if (rol === 'm-profesor') {
            rol = 'Profesor'
        }

        const resultado = buscarPorId(id, rol)
        const persona = resultado.persona
        const index = resultado.index
        const lista = resultado.lista

        if (!persona) {
            mostrarToast(`El ${rol} con ID ${id} no se ha encontrado. Ingrese una ID correctamente asociada con el rol.`, 4000, "error")
            return
        }

        // Campos modificados

        const nombre = document.getElementById('m-nombre').value.trim()
        const edad = parseInt(document.getElementById('m-edad').value)
        const curso = document.getElementById('m-curso').value

        if (!soloLetras(nombre)) {
            mostrarToast('Ingrese solo letras en nombre', 3000, "error")
            return
        }

        if (!esNumeroEnteroPositivo(edad)) {
            mostrarToast('Ingrese una edad válida', 3000, "error")
            return
        }

        // Cambio en la lista correspondiente

        lista[index].nombre = nombre
        lista[index].edad = edad
        lista[index].curso = curso

        guardarDatos()
        mostrarToast(`${rol} con ID ${id} ha sido modificado(a)`, 3000, "info")
    })
}

// Funciones para mostrar información

function listarPersonas(listaPersonas, idContenedor) {

    if (listaPersonas.length === 0) {
        mostrarToast('No existen personas registradas en esta categoría.', 3000, "error")
        return
    }

    const contenedor = document.getElementById(idContenedor)

    if (!contenedor) {
        mostrarToast(`No se encontró elemento en el dom con id: ${idContenedor}`, 3000, "error")
        return
    }

    const cuerpoTabla = contenedor.querySelector('tbody')

    if (!cuerpoTabla) {
        mostrarToast(`No se encontró elemento <tbody> con id: ${idContenedor}`, 3000, "error")
        return
    }

    cuerpoTabla.innerHTML = ''

    listaPersonas.forEach(persona => {

        const fila = document.createElement('tr')

        const tdNombre = document.createElement('td')
        tdNombre.textContent = persona.nombre

        const tdEdad = document.createElement('td')
        tdEdad.textContent = persona.edad

        const tdCurso = document.createElement('td')
        tdCurso.textContent = persona.curso

        const tdId = document.createElement('td')
        tdId.textContent = persona.id

        fila.appendChild(tdId)
        fila.appendChild(tdNombre)
        fila.appendChild(tdEdad)
        fila.appendChild(tdCurso)
        cuerpoTabla.appendChild(fila)
    })

    mostrarToast('¡Lista cargada con éxito!')
}

function listarCursos(lista) {

    const cuerpoTabla = document.getElementById("tabla-cursos-body")
    cuerpoTabla.innerHTML = ''

    lista.forEach(curso => {
        const fila = document.createElement('tr')
        const tdNombre = document.createElement('td')
        tdNombre.textContent = curso
        fila.appendChild(tdNombre)
        cuerpoTabla.appendChild(fila)
    });

    mostrarToast('¡Cursos cargados con éxito!')
}

function buscarPorId(id, rol) {

    const lista = rol === 'Alumno' ? alumnos : profesores;

    const persona = lista.find(p => p.id === id)

    const index = lista.findIndex(p => p.id === id)

    return {
        persona: persona,
        index: index,
        lista: lista
    }
}

function mostrarPorId() {

    const form = document.getElementById('b-form')

    form.addEventListener('submit', (e) => {

        e.preventDefault()

        const id = parseInt(document.getElementById('b-id').value)

        if (!esNumeroEnteroPositivo(id) || id === 0) {
            mostrarToast("Ingrese una ID válida", 3000, "error")
            return
        }

        const rolSeleccionado = document.querySelector('input[name="b-rol"]:checked')
        let rol = rolSeleccionado ? rolSeleccionado.value : null

        if (rol === null) {
            mostrarToast('Rol no seleccionado', 3000, "error")
            return
        }

        if (rol === 'b-alumno') {
            rol = 'Alumno'
        }
        if (rol === 'b-profesor') {
            rol = 'Profesor'
        }

        const persona = buscarPorId(id, rol).persona
        const cuerpoTabla = document.getElementById('tabla-buscar-id-body')

        cuerpoTabla.innerHTML = ''

        if (!persona) {
            mostrarToast(`El ${rol} con ID ${id} no se ha encontrado. Ingrese una ID correctamente asociada con el rol.`, 4000, "error")
            return
        }

        const fila = document.createElement('tr')

        const tdNombre = document.createElement('td')
        tdNombre.textContent = persona.nombre

        const tdEdad = document.createElement('td')
        tdEdad.textContent = persona.edad

        const tdCurso = document.createElement('td')
        tdCurso.textContent = persona.curso

        const tdId = document.createElement('td')
        tdId.textContent = persona.id

        fila.appendChild(tdId)
        fila.appendChild(tdNombre)
        fila.appendChild(tdEdad)
        fila.appendChild(tdCurso)
        cuerpoTabla.appendChild(fila)

        mostrarToast('¡Persona encontrada!')

    })
}

// Funciones de verificación
function soloLetras(cadena) {
    return /^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+(\s[a-zA-ZáéíóúÁÉÍÓÚñÑ]+)*$/.test(cadena.trim());
}

function esNumeroEnteroPositivo(valor) {
    const numero = Number(valor);
    return !isNaN(numero) && numero >= 0 && Number.isInteger(numero);
}

function mostrarToast(mensaje, duracion = 3000, icon = 'success') {

    if (icon == "error") {
        Swal.fire({
            toast: true,
            position: 'bottom-end',
            title: mensaje,
            timer: duracion,
            icon: "error",
            showConfirmButton: false
        })
    }

    if (icon == 'success') {
        Swal.fire({
            toast: true,
            position: 'bottom-end',
            title: mensaje,
            timer: duracion,
            icon: "success",
            showConfirmButton: false
        })
    }

    if (icon == 'info') {
        Swal.fire({
            toast: true,
            position: 'bottom-end',
            title: mensaje,
            timer: duracion,
            icon: "info",
            showConfirmButton: false
        })
    }

}

// Funcionalidades Extras

function desplegar() {

    const botonesDesplegar = document.getElementsByClassName("btn-desplegar")
    const botonesArray = Array.from(botonesDesplegar)

    botonesArray.forEach(boton => {

        boton.addEventListener('click', () => {

            const contenedor = boton.parentElement.parentElement
            const seccionDesplegable = contenedor.nextElementSibling
            if (seccionDesplegable && seccionDesplegable.classList.contains('desplegable')) {
                seccionDesplegable.classList.toggle('oculto')
            }
        })
    })
}

function refresh() {
    const btnsRefresh = document.getElementsByClassName("btn-refresh")
    const btnsRefreshArray = Array.from(btnsRefresh)

    btnsRefreshArray.forEach(boton => {

        boton.addEventListener('click', () => {

            const contenedor = boton.parentElement.parentElement.parentElement

            switch (contenedor.id) {
                case "seccion-alumnos":
                    listarPersonas(alumnos, "seccion-alumnos")
                    break
                case "seccion-profesores":
                    listarPersonas(profesores, "seccion-profesores")
                    break
                case "seccion-cursos":
                    listarCursos(cursos)
                    break
                default:
                    mostrarToast('No hay elementos a refrescar', 3000, "info")
                    break
            }

        })
    })

}

// Principal

function principal() {
    cargarDatos()
    desplegar()
    refresh()
    crearPersona()
    modificarPersona()
    mostrarPorId()
}

cargarDatosFetch()