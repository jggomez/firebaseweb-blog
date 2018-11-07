
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
        this.db.collection("posts")
            .onSnapshot(querySnapshot => {
                $('#posts').empty();
                querySnapshot.forEach(post => {

                    let postHtml = `<article class="post">
                    <div class="post-titulo">
                        <h5>${post.data().titulo}</h5>
                    </div>
                    <div class="post-calificacion">
                        <a class="post-estrellita-llena" href="*"></a>
                        <a class="post-estrellita-llena" href="*"></a>
                        <a class="post-estrellita-llena" href="*"></a>
                        <a class="post-estrellita-llena" href="*"></a>
                        <a class="post-estrellita-vacia" href="*"></a>
                    </div>
                    <div class="post-video">
                        <iframe type="text/html" width="500" height="385" src='${post.data().videoLink}'
                            frameborder="0"></iframe>
                        </figure>
                    </div>
                    <div class="post-descripcion">
                        <p>${post.data().descripcion}</p>
                    </div>
                    <div class="post-footer">
                        <div class="post-footer-autor">
                            Autor: ${post.data().autor}
                        </div>
                    </div>
                </article>`

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

                    let postHtml = `<article class="post">
                <div class="post-titulo">
                    <h5>${post.data().titulo}</h5>
                </div>
                <div class="post-calificacion">
                    <a class="post-estrellita-llena" href="*"></a>
                    <a class="post-estrellita-llena" href="*"></a>
                    <a class="post-estrellita-llena" href="*"></a>
                    <a class="post-estrellita-llena" href="*"></a>
                    <a class="post-estrellita-vacia" href="*"></a>
                </div>
                <div class="post-video">
                    <iframe type="text/html" width="500" height="385" src='${post.data().videoLink}'
                        frameborder="0"></iframe>
                    </figure>
                </div>
                <div class="post-descripcion">
                    <p>${post.data().descripcion}</p>
                </div>
                <div class="post-footer">
                    <div class="post-footer-autor">
                        Autor: ${post.data().autor}
                    </div>
                </div>
            </article>`

                    $('#posts').append(
                        postHtml
                    )

                });

            });
    }

}