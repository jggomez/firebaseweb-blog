$(() => {
  $('.tooltipped').tooltip({ delay: 50 })
  $('.modal').modal()

  // Adicionar el service worker
  navigator.serviceWorker
    .register('notificaciones-sw.js')
    .then(registro => {
      console.log('Service Worker registrado')
      firebase.messaging().useServiceWorker(registro)
    })
    .catch(error =>
      console.error(`Error al registrar el Service Worker : ${error}`)
    )

  firebase.initializeApp(varConfig)

  const messaging = firebase.messaging()

  // LLave publica
  messaging.usePublicVapidKey(
    'BOfZkXQy0zQhD8YMga2HKrmZM8tHFRTRjAO-nULxzwUcL-l-yZdrO01HzASr7NkmFDVMhDV_J4udyF0gz6bO014'
  )

  // Solicitar permisos para las notificaciones
  messaging
    .requestPermission()
    .then(() => {
      console.log('Notification permission granted.')
      // TODO(developer): Retrieve an Instance ID token for use with FCM.
      // ...
    })
    .catch(function (err) {
      console.error(`No se dio el permiso para la notificación => ${err}`)
    })

  // Recibir las notificaciones cuando el usuario esta foreground
  messaging.onMessage(payload => {
    Materialize.toast(`Nuevo Post ha sido creado`, 4000)
  })

  // Recibir las notificaciones cuando el usuario esta background
  messaging.onTokenRefresh(() => {
    messaging
      .getToken()
      .then(refreshedToken => {
        console.log('Token refreshed.')
        console.log(refreshedToken)
      })
      .catch(err => {
        console.log(`No es posible recuperar el token actualizado => ${err}`)
      })
  })

  // Inicializa el listening real time
  const post = new Post()
  post.consultarTodosPost();

  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      $('#btnInicioSesion').text('Salir')
      if (user.photoURL) {
        $('#avatar').attr('src', user.photoURL)
      } else {
        $('#avatar').attr('src', 'imagenes/usuario_auth.png')
      }
    } else {
      $('#btnInicioSesion').text('Iniciar Sesión')
      $('#avatar').attr('src', 'imagenes/usuario.png')
    }
  })

  $('#btnInicioSesion').click(() => {
    const user = firebase.auth().currentUser
    if (user) {
      $('#btnInicioSesion').text('Iniciar Sesión')
      return firebase
        .auth()
        .signOut()
        .then(() => {
          $('#avatar').attr('src', 'imagenes/usuario.png')
          Materialize.toast(`SignOut correcto`, 4000)
        })
        .catch(function (error) {
          Materialize.toast(`Error al realizar SignOut => ${error}`, 4000)
        })
    }

    $('#emailSesion').val('')
    $('#passwordSesion').val('')
    $('#modalSesion').modal('open')
  })

  $('#avatar').click(() => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        $('#avatar').attr('src', 'imagenes/usuario.png')
        Materialize.toast(`SignOut correcto`, 4000)
      })
      .catch(function (error) {
        Materialize.toast(`Error al realizar SignOut => ${error}`, 4000)
      })
  })

  $('#btnTodoPost').click(() => {
    $('#tituloPost').text('Posts de la Comunidad')
    const post = new Post()
    post.consultarTodosPost()
  })

  $('#btnMisPost').click(() => {
    const user = firebase.auth().currentUser
    if (user) {
      const post = new Post()
      post.consultarPostxUsuario(user.email)
      $('#tituloPost').text('Mis Posts')
    } else {
      Materialize.toast(`Debes estar autenticado para ver tus posts`, 4000)
    }
  })
})
