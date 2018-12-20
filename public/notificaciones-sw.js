importScripts('https://www.gstatic.com/firebasejs/5.5.8/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/5.5.8/firebase-messaging.js')

firebase.initializeApp({
  projectId: 'blogeekplatzi',
  messagingSenderId: '599742887877'
})

const messaging = firebase.messaging()

// Función que se ejecuta en background para recibir las notificaciones
messaging.setBackgroundMessageHandler(payload => {
  let tituloNotificacion
  let opcionesNotificacion

  if (payload.data.tipo === "" || payload.data.tipo === undefined) {
    tituloNotificacion = 'Ya tenemos un nuevo post'
    opcionesNotificacion = {
      body: payload.data.titulo,
      icon: 'icons/icon_new_post.png',
      image: 'imagenes/logo.png',
      actions: [
        {
          title: 'Ver Post',
          action: 'verpost',
          icon: 'icons/icon_new_post.png'
        }
      ]
    }
  } else if (
    payload.data.tipo === 'notvalidacionimagen' ||
    payload.data.tipo === 'nottodospostsemana'
  ) {
    tituloNotificacion = payload.data.titulo
    opcionesNotificacion = {
      body: payload.data.descripcion,
      icon: 'icons/icon_new_post.png',
      image: 'imagenes/logo.png'
    }
  }

  return self.registration.showNotification(
    tituloNotificacion,
    opcionesNotificacion
  )
})

self.addEventListener('notificationclick', event => {
  if (event.action == 'verpost') {
    clients.openWindow('https://blogeekplatzi.firebaseapp.com/posts')
  }
})
