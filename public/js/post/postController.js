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
    const imagenLink = sessionStorage.getItem('imgNewPost') == 'null'
      ? null
      : sessionStorage.getItem('imgNewPost')

    post
      .crearPost(
        user.uid,
        user.email,
        titulo,
        descripcion,
        imagenLink,
        videoLink
      )
      .then(resp => {
        Materialize.toast(`Post creado correctamente`, 4000)
        $('.modal').modal('close')
      })
      .catch(err => {
        Materialize.toast(`Error => ${err}`, 4000)
      })
  })

  $('#btnUploadFile').on('change', e => {
    const user = firebase.auth().currentUser

    if (user == null) {
      Materialize.toast(`Para crear el post debes estar autenticado`, 4000)
      return
    }

    const file = e.target.files[0]
    const refStorage = firebase
      .storage()
      .ref(`imgsPosts/${user.uid}/${file.name}`)
    const task = refStorage.put(file)

    task.on(
      'state_changed',
      snapshot => {
        var porcentaje = snapshot.bytesTransferred / snapshot.totalBytes * 100
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
            sessionStorage.setItem('imgNewPost', downloadURL)
          })
          .catch(err =>
            Materialize.toast(`Error obteniendo downloadURL = > ${err}`, 4000)
          )
      }
    )
  })
})
