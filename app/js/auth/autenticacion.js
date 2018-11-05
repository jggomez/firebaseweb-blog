$(() => {

    class Autenticacion {

        constructor() {

        }        

        authEmailPass() {

            const email = $("#emailContactoReg").val();
            const pass = $("#passwordReg").val();
            const nombres = $("#nombreContactoReg").val();

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

        authGoogle(){
            const provider = new firebase.auth.GoogleAuthProvider();
            //this.authRedes(provider);

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

        authFacebook() {
            const provider = new firebase.auth.FacebookAuthProvider();
            //this.authRedes(provider)

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
           // TODO: Crear auth con twitter
        }
        
    }

    const objAutenticacion = new Autenticacion();

    $("#authFB").click(objAutenticacion.authFacebook);
    $("#authTwitter").click(objAutenticacion.authTwitter);
    $("#btnRegistroEmail").click(objAutenticacion.authEmailPass);
    $("#authGoogle").click(objAutenticacion.authGoogle);

});
