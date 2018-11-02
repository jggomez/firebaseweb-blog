$(() => {

    class Autenticacion {

        constructor() {

        }

        authEmailPass() {

            let email = $("#emailContactoReg").val();
            let pass = $("#passwordReg").val();
            let nombres = $("#nombreContactoReg").val();

            firebase.auth().createUserWithEmailAndPassword(email, pass).then((result) => {
            	console.log(result);

            	firebase.database().ref(`usuarios/${result.uid}`).set(
            		{
            			nombres : nombres          			
            		}
            	);

            	sessionStorage.setItem("nombre", nombres);
            	sessionStorage.setItem("uid", result.uid);
            	sessionStorage.setItem("email", email);

            	Materialize.toast(`Bienvenido ${nombres} !! `, 4000);

            	$('.modal').modal('close');

            }).catch((error) => {
				console.log(error);

				Materialize.toast(error.message, 4000);
            });

        }

        authFacebook() {

            let provider = new firebase.auth.FacebookAuthProvider();

            firebase.auth().signInWithPopup(provider).then((result) => {

                console.log(result);

                sessionStorage.setItem("nombre", result.user.displayName);
            	sessionStorage.setItem("uid", result.user.uid);
            	sessionStorage.setItem("email", result.user.email);
            	sessionStorage.setItem("imagePerfil", result.user.photoURL);

            	$("#avatar").attr("src", result.user.photoURL);

            	$('.modal').modal('close');

            	Materialize.toast(`Bienvenido ${result.user.displayName} !! `, 4000);

            }).catch((error) => {

                console.log(error);
                Materialize.toast(error.message, 4000);

            });

        }

        authTwitter() {

            let provider = new firebase.auth.TwitterAuthProvider();

            firebase.auth().signInWithPopup(provider).then((result) => {

                console.log(result);

                sessionStorage.setItem("nombre", result.user.displayName);
            	sessionStorage.setItem("uid", result.user.uid);
            	sessionStorage.setItem("email", result.user.email);
            	sessionStorage.setItem("imagePerfil", result.user.photoURL);

            	$("#avatar").attr("src", result.user.photoURL);

            	$('.modal').modal('close');

            	Materialize.toast(`Bienvenido ${result.user.displayName} !! `, 4000);

            }).catch((error) => {

                console.log(error);
                Materialize.toast(error.message, 4000);

            });

        }

    }

    const objAutenticacion = new Autenticacion();

    $("#authFB").click(objAutenticacion.authFacebook);
    $("#authTwitter").click(objAutenticacion.authTwitter);
    $("#btnRegistroEmail").click(objAutenticacion.authEmailPass);

});
