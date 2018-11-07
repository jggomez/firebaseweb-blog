$(() => {

	$('.tooltipped').tooltip({ delay: 50 });
	$('.modal').modal();

	firebase.initializeApp(varConfig);

	const post = new Post();
	post.consultarTodosPost();

	$('#avatar').click(() => {
		firebase.auth().signOut().then(() => {
			$('#avatar').attr("src", "imagenes/usuario.png");
			Materialize.toast(`SignOut correcto`, 4000);
		}).catch(function (error) {
			Materialize.toast(`Error al realizar SignOut => ${error}`, 4000);
		});
	});

	$('#btnTodoPost').click(() => {
		const post = new Post();
		post.consultarTodosPost();
	});

	$('#btnMisPost').click(() => {
		const user = firebase.auth().currentUser;
		if (user) {
			const post = new Post();
			post.consultarPostxUsuario(user.email);
		}
	});	

});	