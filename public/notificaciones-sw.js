importScripts('https://www.gstatic.com/firebasejs/5.5.8/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/5.5.8/firebase-messaging.js')

firebase.initializeApp({
  messagingSenderId: '599742887877'
})

const messaging = firebase.messaging()

messaging.setBackgroundMessageHandler(payload => {

  const tituloNotificacion = 'Nuevo Post ha sido creado.'
  const opcionesNotificacion = {
    body: 'Hola, ya puedes ver un nuevo video Geek.',
    icon: 'icons/icon_new_post.png',
    click_action: 'https://blogeekplatzi.firebaseapp.com'
  }

  return self.registration.showNotification(
    tituloNotificacion,
    opcionesNotificacion
  )
})

messaging
  .getToken()
  .then(currentToken => {
    if (currentToken) {
      console.log('ID Token disponible.')
      console.log(currentToken)
      // sendTokenToServer(currentToken);
      // updateUIForPushEnabled(currentToken);
    } else {
      console.log(
        'ID Token no disponible. Solicita los permisos para obtener uno.'
      )
    }
  })
  .catch(err => {
    console.error(`Un error ocurrio al obtener el token. ${err}`)
    // showToken('Un error ocurrio al obtener el token. ', err);
    // setTokenSentToServer(false);
  })



