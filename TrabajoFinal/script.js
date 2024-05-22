

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

