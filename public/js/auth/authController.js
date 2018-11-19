$(() => {

    const objAutenticacion = new Autenticacion();

    $("#authFB").click(() => objAutenticacion.authCuentaFacebook());

    $("#btnRegistroEmail").click(() => {
        const nombres = $('#nombreContactoReg').val();
        const email = $('#emailContactoReg').val();
        const password = $('#passwordReg').val();
        objAutenticacion.crearCuentaEmailPass(email, password, nombres);
    });

    $("#btnInicioEmail").click(() => {
        const email = $('#emailSesion').val();
        const password = $('#passwordSesion').val();
        objAutenticacion.autEmailPass(email, password);
    });

    $("#authGoogle").click(() => objAutenticacion.authCuentaGoogle());

    $("#authTwitter").click(() => objAutenticacion.authCuentaTwitter());

    $('#btnRegistrarse').click(() => {
        $('#modalSesion').modal('close');
        $('#modalRegistro').modal('open');
    });

    $('#btnIniciarSesion').click(() => {
        $('#modalRegistro').modal('close');
        $('#modalSesion').modal('open');
    });

});