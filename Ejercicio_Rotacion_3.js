// Crear la ESCENA
var scene = new THREE.Scene();


function cubo(x, y, z, color, material, alambre) {

    // CREAR UN CUBO    
    var cubeGeometry = new THREE.BoxGeometry(x, y, z);

    var cubeMaterial
    switch (material) {
        case 'Basic':
            cubeMaterial = new THREE.MeshBasicMaterial({
                color: color,
                wireframe: alambre
            });
            break;
        case 'Standard':
            cubeMaterial = new THREE.MeshStandardMaterial({
                color: color,
                wireframe: alambre
            });
            break;
        case 'Physical':
            cubeMaterial = new THREE.MeshPhysicalMaterial({
                color: color,
                wireframe: alambre
            });
            break;
        case 'Phong':
            cubeMaterial = new THREE.MeshPhongMaterial({
                color: color,
                wireframe: alambre
            });
            break;
        case 'Lambert':
            cubeMaterial = new THREE.MeshLambertMaterial({
                color: color,
                wireframe: alambre
            });
            break;
    }
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);



    //Añadir el cubo a la escena

    scene.add(cube);
    return cube;
}

function init() {


    // Crear la camara

    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);


    // crear un render y establecer el tamaño

    var renderer = new THREE.WebGLRenderer();

    renderer.setClearColor(new THREE.Color(0x000000));

    renderer.setSize(window.innerWidth, window.innerHeight);



    // Mostrar los ejes    
    var axes = new THREE.AxesHelper(20);

    scene.add(axes);

   //SE PIDEN LOS DATOS AL USUARIO

    //Lado Ingresado
    lado = prompt("Valor del lado: ")
    if(lado != null){
       alert("Su valor del lado es: " + lado);
    }   
    else if(lado < 0) {
    alert("Escriba un valor valido por favor");//se valida que sea valido
    }

    //Angulo Ingresado 
    angulo = prompt("Angulo en grados:"); 
    angulo_rad = (angulo)*((2*Math.PI)/(360)); //Conversión de grados a radianes.
     if(angulo != null){
       alert("Su angulo es: " + angulo);
    }   
    else {
    alert("Escriba un angulo por favor");//se valida que haya escrito algun valor
    }


    cuboA = [];  //Arreglo para almacenar los cubos
    colorA = [0xF30C0C, 0xBEF30C, 0x32a840]; //Para diferenciar los colores
    delta = lado/2;
    hipo = Math.sqrt(Math.pow(delta,2) + Math.pow(delta,2)); //formula de hipotenusa pitágoras
    delta2 = (Math.cos((Math.PI/4)-angulo))*hipo; //Correccion de acuerdo con la varible 'angulo'

    //Se crean los 3 cubos de mismo tamaño en el origen
    for (var i = 0; i < 3; i++) {
        cuboA.push(cubo(lado, lado, lado, colorA[i], 'Physical', false));
    }


    /*Se transladan en los ejes X y Z para que no se ubiquen en el origen, 
en este caso se hace que el primer cubo se alinee con el eje X y Z*/
    for (var i = 0; i < 3; i++) {
        cuboA[i].translateX(delta2);
        cuboA[i].translateY(delta); 
        cuboA[i].translateZ(delta2);
    }
     
    //Se esacalan y transladan los cubos 2 y 3 de acuerdo a la escala
    for (var i=0; i < 3; i++){
     if( i==1 || i==2){
       escala = 1/(2*i);
       unidades = (lado/2)+(lado/4)+(((lado/2 + lado/4)/2))*(i-1);
       cuboA[i].scale.set(escala, escala, escala);
       cuboA[i].translateY(unidades);
      }  
    }
  
   //ROTACIÓN EN EL EJE Y cubos 1 y 3.
    for (var i=0; i < 3; i++){
     if( i==0 || i==2){
       cuboA[i].rotateY(angulo);
      }  
    }
      
   
    //Luz (requerida para el material MeshLambertMaterial)
    // Luz proveniente de un punto en el espacio, semejante al sol.
    light = new THREE.PointLight(0xFFFF00);

    //  Localización de la luz. (x, y, z).
    light.position.set(5*lado, 5*lado, 10*lado);//Se ajusta al tamaño de los cubos
    scene.add(light);


    // POSICION DE LA CAMARA
    //La camara se acomoda para ver la escena lo más parecido al ejercicio planteado.
    camera.position.set(2*lado, 4*lado, 4*lado);//se ajusta al tamaño de los cubos

    camera.lookAt(scene.position);



    // agregue la salida del renderizador al elemento html
    document.getElementById("webgl-output").appendChild(renderer.domElement);



    // renderizar la escena

    renderer.render(scene, camera);
}