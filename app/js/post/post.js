
class Post {

    constructor() {
        this.db = firebase.firestore();
        const settings = { timestampsInSnapshots: true };
        this.db.settings(settings);
    }

    crearPost(emailUser, titulo, descripcion, imagenLink, videoLink) {
        console.log(videoLink);
        return this.db.collection("posts").add({
            autor: emailUser,
            titulo: titulo,
            descripcion: descripcion,
            imagenLink: imagenLink,
            videoLink: videoLink
        }).then(refDoc => {
            console.log(`Id del post => ${refDoc.id}`)
        }).catch(error => {
            console.error(`Error adicionando doc => ${error}`)
        });

    }

    consultarTodosPost() {
        return this.db.collection("posts")
            .onSnapshot(querySnapshot => {
                $('#posts').empty();
                querySnapshot.forEach(post => {

                    let postHtml = this.obtenerPostTemplate(
                        post.data().autor,
                        post.data().titulo,
                        post.data().descripcion,
                        post.data().videoLink,
                        post.data().imagenLink
                    );

                    $('#posts').append(
                        postHtml
                    )

                });

            });
    }

    consultarPostxUsuario(emailUser) {
        $('#posts').empty();

        return this.db.collection("posts")
            .where("autor", "==", emailUser)
            .onSnapshot(querySnapshot => {
                querySnapshot.forEach(post => {

                    let postHtml = this.obtenerPostTemplate(
                        post.data().autor,
                        post.data().titulo,
                        post.data().descripcion,
                        post.data().videoLink,
                        post.data().imagenLink
                    );

                    $('#posts').append(
                        postHtml
                    )

                });

            });
    }

    obtenerPostTemplate(autor, titulo, descripcion, videoLink, imagenLink) {
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
            <div class="post-footer">
                <div class="post-footer-autor">
                    Autor: ${autor}
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
                <div class="post-footer">
                    <div class="post-footer-autor">
                        Autor: ${autor}
                    </div>
                </div>
            </article>`
    }

}