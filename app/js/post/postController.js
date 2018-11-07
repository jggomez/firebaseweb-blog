$(() => {    

    $('#btnModalPost').click(() => {

        $('#tituloNewPost').val("");
        $('#descripcionNewPost').val("");
        $('#linkVideoNewPost').val("");

        const user = firebase.auth().currentUser;        

        if (user == null) {
            Materialize.toast(`Para crear el post debes estar autenticado`, 4000);
            return;
        }

        $('#modalPost').modal('open');
    });

    $('#btnRegistroPost').click(() => {

        const post = new Post();
        const user = firebase.auth().currentUser;

        if (user == null) {
            Materialize.toast(`Para crear el post debes estar autenticado`, 4000);
            return;
        }

        const titulo = $('#tituloNewPost').val();
        const descripcion = $('#descripcionNewPost').val();
        const videoLink = $('#linkVideoNewPost').val();

        post.crearPost(user.email, titulo, descripcion, null, videoLink)
            .then(resp => {
                Materialize.toast(`Post creado correctamente`, 4000);
                $('.modal').modal('close');
            })
            .catch(err => {
                Materialize.toast(`Error => ${err}`, 4000);
            });

    });

});	
