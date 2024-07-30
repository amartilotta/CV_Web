// ------------------ MENÚ ------------------------

let menu_visible = false;
let menu = document.querySelector("nav");
let links = document.querySelectorAll("nav a");

function showHideMenu() {
    if (!menu_visible) { // Si está oculto
        // Calcular la altura del contenido del menú
        let contentHeight = menu.scrollHeight; // La altura total del contenido del menú
        menu.style.maxHeight = contentHeight + "px"; // Ajustar max-height dinámicamente
        menu.classList.add("visible");
        menu_visible = true;

        // Animar la aparición de los enlaces
        links.forEach((link, index) => {
            setTimeout(() => {
                link.style.opacity = 1; // Hacer visibles los enlaces uno a uno
            }, index * 100); // Ajustar el retraso entre cada enlace
        });
    } else {
        menu.style.maxHeight = "0"; // Ocultar el menú
        menu.classList.remove("visible");
        menu_visible = false;

        // Ocultar los enlaces al cerrar el menú
        links.forEach(link => {
            link.style.opacity = 0;
        });
    }
}

// Ocultar el menú una vez que selecciono una opción
links.forEach(link => {
    link.addEventListener("click", function() {
        // Solo cerrar el menú si está abierto
        if (menu_visible) {
            menu.style.maxHeight = "0";
            menu.classList.remove("visible");
            menu_visible = false;

            // Ocultar los enlaces al cerrar el menú
            links.forEach(link => {
                link.style.opacity = 0;
            });
        }
    });
});

// ------------------ MENÚ ------------------------

// ------------------ HABILIDADES ------------------------


//Creo las barritas de una barra particular identificada por su id
function createBar(id_bar){
    for(i=0;i<=16;i++){
        let div = document.createElement("div");
        div.className = "e";
        id_bar.appendChild(div);
    }
}

//selecciono todas las barras generales para luego manipularlas
let python = document.getElementById("python");
createBar(python);
let javascript = document.getElementById("javascript");
createBar(javascript);
let java = document.getElementById("java");
createBar(java);
let git = document.getElementById("git");
createBar(git);
let sql = document.getElementById("sql");
createBar(sql);
let mongodb = document.getElementById("mongodb");
createBar(mongodb);
let redis = document.getElementById("redis");
createBar(redis);
let postman = document.getElementById("postman");
createBar(postman);


// Guardado de la cantidad de barras que se pintaran por cada habilidad
// Para eso utilizo un arreglo, cada posiciòn pertenece a un elemento
// comienzan en -1 porque no tiene ninguna pintada al iniciarse
let counters = [-1,-1,-1,-1,-1,-1,-1,-1];
// Variable utilziada de flag que indicara si la animacion fue ejecutada
let loaded = false;

//función que aplica las animaciones de la habilidades
function skillsEffect(){
    var skills = document.getElementById("habilidades");
    var skills_distance = window.innerHeight - skills.getBoundingClientRect().top;
    if(skills_distance>=300 && loaded==false){
        loaded = true;
        const intervalPython = setInterval(function(){
            paintbar(python, 16, 0, intervalPython);
        },100);
        const intervalJavascript = setInterval(function(){
            paintbar(javascript, 10, 2, intervalJavascript);
        },100);
        const intervalJava = setInterval(function(){
            paintbar(java, 3, 1, intervalJava);
        },100);
        const intervalGit = setInterval(function(){
            paintbar(git, 14, 3, intervalGit);
        },100);
        const intervalSql = setInterval(function(){
            paintbar(sql, 13, 4, intervalSql);
        },100);
        const intervalMongodb = setInterval(function(){
            paintbar(mongodb, 13, 5, intervalMongodb);
        },100);
        const intervalRedis = setInterval(function(){
            paintbar(redis, 8, 6, intervalRedis);
        },100);
        const intervalPostman = setInterval(function(){
            paintbar(postman, 13, 7, intervalPostman);
        },100);
 
    }
}

// LLenado de una parra particular con la cantidad dada
function paintbar(id_bar, cantidad, index, interval){
    counters[index]++;
    x = counters[index];
    if(x < cantidad){
        let elements = id_bar.getElementsByClassName("e");
        elements[x].style.backgroundColor = "#0d3385";
    }else{
        clearInterval(interval)
    }
}

// Detectación del scrolling del mouse para aplicar la animación de la barra
window.onscroll = function(){
    skillsEffect();
}

// ------------------ HABILIDADES ------------------------


// ------------------ IDIOMA ------------------------

document.addEventListener("DOMContentLoaded", function() {
    const languageSwitcher = document.getElementById('languageSwitcher');
    const elementsToTranslate = document.querySelectorAll('[data-i18n]');

    // Cargar el idioma por defecto desde el almacenamiento local
    const savedLanguage = localStorage.getItem('language') || 'en';
    languageSwitcher.value = savedLanguage;
    loadLanguage(savedLanguage);

    // Cambiar idioma al seleccionar una opción
    languageSwitcher.addEventListener('change', function() {
        const selectedLanguage = languageSwitcher.value;
        localStorage.setItem('language', selectedLanguage); // Guardar la preferencia
        loadLanguage(selectedLanguage);
    });

    function loadLanguage(language) {
        fetch(`/languages/${language}.json`)
            .then(response => response.json())
            .then(translations => {
                elementsToTranslate.forEach(element => {
                    const key = element.getAttribute('data-i18n');
                    if (translations[key]) {
                        element.textContent = translations[key];
                    }
                });
            })
            .catch(error => console.error('Error loading language:', error));
    }
});
// ------------------ IDIOMA ------------------------