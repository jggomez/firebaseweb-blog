$(() => {

	$('.tooltipped').tooltip({ delay: 50 });
	$('.modal').modal();

	firebase.initializeApp(varConfig);

	const post = new Post();
	post.consultarTodosPost();

	firebase.auth().onAuthStateChanged(user => {
		if (user) {
			$('#btnInicioSesion').text("Salir");
		}
		else {
			$('#btnInicioSesion').text("Iniciar Sesión");
		}
	});


	$('#btnInicioSesion').click(() => {
		const user = firebase.auth().currentUser;
		if (user) {
			$('#btnInicioSesion').text("Iniciar Sesión");
			return firebase.auth().signOut().then(() => {
				$('#avatar').attr("src", "imagenes/usuario.png");
				Materialize.toast(`SignOut correcto`, 4000);
			}).catch(function (error) {
				Materialize.toast(`Error al realizar SignOut => ${error}`, 4000);
			});
		}

		$('#modalRegistro').modal('open');
	});

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
		else {
			Materialize.toast(`Debes estar autenticado para ver tus posts`, 4000);
		}
	});

});	