importScripts('https://www.gstatic.com/firebasejs/5.5.8/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/5.5.8/firebase-messaging.js')

firebase.initializeApp({
  projectId: 'blogeekplatzi',
  messagingSenderId: '599742887877'
})

const messaging = firebase.messaging()

messaging.setBackgroundMessageHandler(payload => {
  const tituloNotificacion = 'Ya tenemos un nuevo Post'
  const opcionesNotificacion = {
    body: payload.data.titulo,
    icon: 'icons/icon_new_post.png',
    click_action: 'https://blogeekplatzi.firebaseapp.com'
  }

  return self.registration.showNotification(
    tituloNotificacion,
    opcionesNotificacion
  )
})
