$(() => {
  $('#btnModalPost').click(() => {
    $('#tituloNewPost').val('')
    $('#descripcionNewPost').val('')
    $('#linkVideoNewPost').val('')
    $('#btnUploadFile').val('')
    $('.determinate').attr('style', `width: 0%`)
    sessionStorage.setItem('imgNewPost', null)

    const user = firebase.auth().currentUser

    if (user == null) {
      Materialize.toast(`Para crear el post debes estar autenticado`, 4000)
      return
    }

    $('#modalPost').modal('open')
  })

  $('#btnRegistroPost').click(() => {
    const post = new Post()
    const user = firebase.auth().currentUser

    if (user == null) {
      Materialize.toast(`Para crear el post debes estar autenticado`, 4000)
      return
    }

    const titulo = $('#tituloNewPost').val()
    const descripcion = $('#descripcionNewPost').val()
    const videoLink = $('#linkVideoNewPost').val()    
    const token = sessionStorage.getItem('token') || null

    post
      .crearPost(
        user.uid,
        user.email,
        titulo,
        descripcion,
        videoLink,
        token
      )
      .then(resp => {
        if ($('#btnUploadFile').prop('files')[0] !== undefined) {
          const uploadFile = $('#btnUploadFile').prop('files')[0]
          nombreArchivo = `${resp.id}.${uploadFile.name.split('.').pop()}`
          return post.subirImagenPost(
            uploadFile,
            user.uid,
            nombreArchivo,
            resp.id
          )
        } else {
          Materialize.toast(`Post creado correctamente`, 4000)
          $('.modal').modal('close')
          return post.actualizarEstadoPublicadoPost(resp.id)
        }
      })
      .catch(err => {
        console.error(`Error creando el post => ${err}`)
        Materialize.toast(`Error => ${err}`, 4000)
      })
  })
})
