class Post {
  constructor () {
    this.db = firebase.firestore()
    const settings = { timestampsInSnapshots: true }
    this.db.settings(settings)
  }

  crearPost (uid, emailUser, titulo, descripcion, videoLink, token) {
    return this.db.collection('posts').add({
      uid: uid,
      autor: emailUser,
      titulo: titulo,
      descripcion: descripcion,      
      videoLink: videoLink,
      fecha: firebase.firestore.FieldValue.serverTimestamp(),
      token: token,
      publicado: false
    })
  }

  consultarTodosPost () {
    return this.db
      .collection('posts')
      .where('publicado', '==', true)
      .orderBy('fecha', 'desc')
      .orderBy('titulo', 'asc')
      .onSnapshot(querySnapshot => {
        $('#posts').empty()
        if (querySnapshot.empty) {
          $('#posts').append(this.obtenerTemplatePostVacio())
        } else {
          querySnapshot.forEach(post => {
            let postHtml = this.obtenerPostTemplate(
              post.data().autor,
              post.data().titulo,
              post.data().descripcion,
              post.data().videoLink,
              post.data().imagenLink,
              post.data().fecha != null
                ? Utilidad.obtenerFecha(post.data().fecha.toDate())
                : null
            )

            $('#posts').append(postHtml)
          })
        }
      })
  }

  consultarPostxUsuario (emailUser) {
    return this.db
      .collection('posts')
      .orderBy('fecha', 'desc')
      .orderBy('titulo', 'asc')
      .where('autor', '==', emailUser)
      .where('publicado', '==', true)
      .onSnapshot(querySnapshot => {
        $('#posts').empty()
        if (querySnapshot.empty) {
          $('#posts').append(this.obtenerTemplatePostVacio())
        } else {
          querySnapshot.forEach(post => {
            const postHtml = this.obtenerPostTemplate(
              post.data().autor,
              post.data().titulo,
              post.data().descripcion,
              post.data().videoLink,
              post.data().imagenLink,
              post.data().fecha != null
                ? Utilidad.obtenerFecha(post.data().fecha.toDate())
                : null
            )

            $('#posts').append(postHtml)
          })
        }
      })
  }

  actualizarImagePost (idPost, imagenLink) {
    return this.db
      .collection('posts')
      .doc(idPost)
      .update({
        imagenLink: imagenLink
      })
  }

  actualizarEstadoPublicadoPost (idPost) {
    return this.db
      .collection('posts')
      .doc(idPost)
      .update({
        publicado: true
      })
  }

  subirImagenPost (file, uid, nombreArchivo, idPost) {
    const refStorage = firebase
      .storage()
      .ref(`imgsposts/${uid}/${nombreArchivo}`)
    const task = refStorage.put(file)

    return task.on(
      'state_changed',
      snapshot => {
        var porcentaje = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        $('.determinate').attr('style', `width: ${porcentaje}%`)
      },
      err => {
        Materialize.toast(`Error subiendo archivo = > ${err.message}`, 4000)
      },
      () => {
        task.snapshot.ref
          .getDownloadURL()
          .then(downloadURL => {
            console.log(downloadURL)
            this.actualizarImagePost(idPost, downloadURL)
            Materialize.toast(`Post creado correctamente`, 4000)
            $('.modal').modal('close')
          })
          .catch(err =>
            Materialize.toast(`Error obteniendo downloadURL = > ${err}`, 4000)
          )
      }
    )
  }

  obtenerTemplatePostVacio () {
    return `<article class="post">
      <div class="post-titulo">
          <h5>Crea el primer Post a la comunidad</h5>
      </div>
      <div class="post-calificacion">
          <a class="post-estrellita-llena" href="*"></a>
          <a class="post-estrellita-llena" href="*"></a>
          <a class="post-estrellita-llena" href="*"></a>
          <a class="post-estrellita-llena" href="*"></a>
          <a class="post-estrellita-vacia" href="*"></a>
      </div>
      <div class="post-video">
          <iframe type="text/html" width="500" height="385" src='https://www.youtube.com/embed/bTSWzddyL7E?ecver=2'
              frameborder="0"></iframe>
          </figure>
      </div>
      <div class="post-videolink">
          Video
      </div>
      <div class="post-descripcion">
          <p>Crea el primer Post a la comunidad</p>
      </div>
      <div class="post-footer container">         
      </div>
  </article>`
  }

  obtenerPostTemplate (
    autor,
    titulo,
    descripcion,
    videoLink,
    imagenLink,
    fecha
  ) {
    if (imagenLink) {
      return `<article class="post">
            <div class="post-titulo">
                <h5>${titulo}</h5>
            </div>
            <div class="post-calificacion">
                <a class="post-estrellita-llena" href="*"></a>
                <a class="post-estrellita-llena" href="*"></a>
                <a class="post-estrellita-llena" href="*"></a>
                <a class="post-estrellita-llena" href="*"></a>
                <a class="post-estrellita-vacia" href="*"></a>
            </div>
            <div class="post-video">                
                <img id="imgVideo" src='${imagenLink}' class="post-imagen-video" 
                    alt="Imagen Video">     
            </div>
            <div class="post-videolink">
                <a href="${videoLink}" target="blank">Ver Video</a>                            
            </div>
            <div class="post-descripcion">
                <p>${descripcion}</p>
            </div>
            <div class="post-footer container">
                <div class="row">
                    <div class="col m6">
                        Fecha: ${fecha}
                    </div>
                    <div class="col m6">
                        Autor: ${autor}
                    </div>        
                </div>
            </div>
        </article>`
    }

    return `<article class="post">
                <div class="post-titulo">
                    <h5>${titulo}</h5>
                </div>
                <div class="post-calificacion">
                    <a class="post-estrellita-llena" href="*"></a>
                    <a class="post-estrellita-llena" href="*"></a>
                    <a class="post-estrellita-llena" href="*"></a>
                    <a class="post-estrellita-llena" href="*"></a>
                    <a class="post-estrellita-vacia" href="*"></a>
                </div>
                <div class="post-video">
                    <iframe type="text/html" width="500" height="385" src='${videoLink}'
                        frameborder="0"></iframe>
                    </figure>
                </div>
                <div class="post-videolink">
                    Video
                </div>
                <div class="post-descripcion">
                    <p>${descripcion}</p>
                </div>
                <div class="post-footer container">
                    <div class="row">
                        <div class="col m6">
                            Fecha: ${fecha}
                        </div>
                        <div class="col m6">
                            Autor: ${autor}
                        </div>        
                    </div>
                </div>
            </article>`
  }
}
