const sendEmail = async (contactData) => {

  const rawResponse = await fetch('/functions/mail.php', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    body: Object.entries(contactData).map(([k,v])=>{return k+'='+v}).join('&')
  })
  const content = await rawResponse.json()

  console.log(content)

}

const initCotizar = () => {
  // Obtener el formulario del DOM
  var formulario = document.getElementById('formCotizar') // Reemplaza 'miFormulario' con el ID de tu formulario

  // Agregar un evento al formulario cuando se envíe
  formulario.addEventListener('submit', function (event) {
    event.preventDefault() // Evitar que se envíe el formulario de manera predeterminada

    if (!formulario.checkVisibility()) {
      return false
    }

    // Obtener los valores de los campos del formulario
    var nombre = formulario.elements['nombre'].value
    var email = formulario.elements['email'].value
    var telefono = formulario.elements['telefono'].value
    var loteo = formulario.elements['loteo'].value
    var mensaje = formulario.elements['mensaje'].value

    // Crear un objeto de datos con los valores del formulario
    var contactData = {
      "nombre": nombre,
      "email": email,
      "telefono": telefono,
      "loteo": loteo,
      "mensaje": mensaje
    }
    
    sendEmail(contactData)


  })
}

export default initCotizar