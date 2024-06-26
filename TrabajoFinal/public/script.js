

//    ---------- Botones del header -----------
document.querySelectorAll('#homeButton, #publicationsButton, #contactButton, #contactButton1, #educatButton, #educatButton1, #educatButton2, #educatButton3').forEach(button => {
    button.addEventListener('click', function() {
        let url;

        switch(button.id) {
            case 'homeButton':
                url = './index.html';
                break;
            case 'publicationsButton':
                url = './publications.html';
                break;
            case 'contactButton':
            case 'contactButton1':
                url = './contact.html';
                break;
            case 'educatButton':
            case 'educatButton1':
            case 'educatButton2':
            case 'educatButton3':
                url = './educat.html';
                break;
            default:
                // Si no se encuentra un ID coincidente, no se hace nada
                break;
        }

        if (url) {
            window.location.href = url;
        }
    });
});

//    ---------- Validación de formulario -----------
if(document.querySelector('#form') !== null){
document.addEventListener("DOMContentLoaded", function() {
    document.querySelector("#form").addEventListener('submit', validarFormulario); 
});
}

function validarFormulario(evento) {
    evento.preventDefault();   
    let formulario = document.querySelector('#form')
    let listaErrores = document.querySelector('#errores')
    listaErrores.innerHTML = "";
    //Nombre
    let nombre = document.querySelector('#nombre').value;
    if(validarRango(nombre.length, 3, 20)) {
      listaErrores.innerHTML += "*Nombre: entre 3 y 20 carácteres."
      return;
    }
    if(!validarString('simple', nombre)){
        listaErrores.innerHTML += "*Nombre: solo letras."
        return;
    }
    //Apellido
    let apellido = document.querySelector('#apellido').value;
    if (validarRango(apellido.length, 3, 20)) {
        listaErrores.innerHTML += "*Apellido: entre 3 y 20 carácteres."
      return;
    }
    if(!validarString('simple', apellido)){
        listaErrores.innerHTML += "*Apellido: solo letras."
        return;
    }
    //E-mail
    let correo = document.querySelector('#correo').value;
    if(!validarString('email', correo)){
        listaErrores.innerHTML += "*Ingrese un email valido."
        return;
    }
    //telefono
    let telefono = document.querySelector('#telefono').value;
    if(validarRango(telefono, 1000000000, 99999999999)){
        listaErrores.innerHTML += "*Ingrese un numero valido (con cod. área)."
        return;
    }
    //provincia
    let provincia = document.querySelector('#provincia').value;
    if (validarRango(provincia.length, 3, 35)) {
        listaErrores.innerHTML += "*Provincia: entre 3 y 35 carácteres."
        return;
    }
    if(!validarString('compuesto', provincia)){
        listaErrores.innerHTML += "*Provincia: solo letras y números."
        return;
    }
    //ciudad
    let ciudad = document.querySelector('#ciudad').value;
    if (validarRango(ciudad.length, 3, 35)) {
        listaErrores.innerHTML += "*Ciudad: entre 3 y 35 carácteres."
        return;
    }  
    if(!validarString('compuesto', ciudad)){
        listaErrores.innerHTML += "*Ciudad: solo letras y números."
        return;
    }

    listaErrores.className = "font-style-normalText-italic success double"
    listaErrores.innerHTML = "¡Gracias por comunicarse con nosotros!"
    
    //Submit
    setTimeout(function(){
        formulario.submit()
    }, 1500);
    
}

function validarRango(valor, min, max){
    if(valor < min || valor > max){
        return true
    }
    return false
}

function validarString(tipoDeString, texto){
    let valido = true;
    switch(tipoDeString){
        case('simple'):
            let palabraSimple = new RegExp('^[A-Z\u00f1\u00d1\u00E0-\u00FC]+$', 'i');
            valido = palabraSimple.test(texto);
            break;
        case('compuesto'):
            let palabraCompuesta = new RegExp('^[A-Z0-9 \u00f1\u00d1\u00E0-\u00FC]+$', 'i');
            valido = palabraCompuesta.test(texto);
            break;
        case('email'):
            let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
            valido = emailRegex.test(texto);
            break;
    }
    return valido;
}


// ----------------- data de publicaciones david ------------------
// dios mio las bases son importante, pero me quedo con react jaja
//todo esto primero lo hice con HTML y luego lo traje aqui para reutilizar los elementos
async function dataPublications() {
    try {
        const response = await fetch("./data/data.json");
        const publications = await response.json();

        console.log(publications);
        
        const publicationsList = document.getElementById('publications-list');
        
        publications.forEach(publication => {
            const li = document.createElement('li');
            li.className = 'publication-card-item';
            
            const img1 = document.createElement('img');
            img1.className = 'publication-img';
            img1.src = publication.img1_src;
            img1.alt = publication.img1_alt;
            
            const divContent = document.createElement('div');
            divContent.className = 'publicacion-content';
            
            const pMascota = document.createElement('p');
            pMascota.className = 'font-style-card';
            pMascota.innerHTML = `Mascota: <strong>${publication.strong_text}</strong>`;
            
            const pDetails = document.createElement('p');
            pDetails.className = 'font-style-normalText date';
            pDetails.textContent = publication.p_text;
            
            const hr = document.createElement('hr');
            
            const divFlex = document.createElement('div');
            divFlex.style.display = 'flex';
            
            const img2 = document.createElement('img');
            img2.className = 'publication-avatar';
            img2.src = publication.img2_src;
            img2.alt = publication.img2_alt;
            
            const divText = document.createElement('div');
            divText.style.marginLeft = '10px';
            
            const span1 = document.createElement('span');
            span1.className = 'font-style-normalText';
            span1.innerHTML = `<strong>${publication.span1_text}</strong>`;
            
            const br = document.createElement('br');
            
            const span2 = document.createElement('span');
            span2.className = 'font-style-normalText-italic';
            span2.textContent = publication.span2_text;
            
            divText.appendChild(span1);
            divText.appendChild(br);
            divText.appendChild(span2);
            
            divFlex.appendChild(img2);
            divFlex.appendChild(divText);
            
            divContent.appendChild(pMascota);
            divContent.appendChild(pDetails);
            divContent.appendChild(hr);
            divContent.appendChild(divFlex);
            
            li.appendChild(img1);
            li.appendChild(divContent);
            
            publicationsList.appendChild(li);
        });
    } catch (error) {
        console.error('Error al consultar el json:', error);
    }
}

document.addEventListener('DOMContentLoaded', dataPublications);





