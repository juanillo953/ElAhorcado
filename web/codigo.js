window.onload=iniciar;

function iniciar(){
    palabra ="";
    fallos=0;
    usadas="";
    respuestaCorrecta="";
    cargaDatos();
    document.getElementById("imagen").src="./imagenes/"+fallos+".png";
    document.getElementById("usadas").innerHTML="";
    document.getElementById("validar").value="Comprobar";
    document.getElementById("texto").value="";
    document.getElementById("validar").onclick=compruebaLetra;
}

function inicializa_xhr(){
    if(window.XMLHttpRequest){
        return new XMLHttpRequest();
    }
    else if(window.ActiveXObject){
        return new ActiveXObject("Microsoft.XMLHTTP");
    }
}
function cargaDatos(){
 
    peticion_http = inicializa_xhr();
    if(peticion_http){


        peticion_http.onreadystatechange = procesaDatos;

        peticion_http.open("GET","palabras.txt",true);
        peticion_http.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        peticion_http.send();

    }
}
function procesaDatos(){

    if(peticion_http.readyState==4){

        if(peticion_http.status==200){

            respuestaJSON = peticion_http.responseText;
            var respuesta = JSON.parse(respuestaJSON);
            var txt = "";
            var numeroAL = Math.floor(Math.random() * (99 - 0) + 0);
            console.log(respuesta.length);
            console.log(numeroAL);
            palabra = respuesta[numeroAL].Palabras;
            for(contador=0;contador<palabra.length;contador++){
                palabra = palabra.replace(" ","");
            }
            
            var txt="";
            for(contador=0;contador<palabra.length;contador++){
                txt+="_ ";
            }
            respuestaCorrecta=txt;

            console.log(palabra);
            document.getElementById("palabra").innerHTML = respuestaCorrecta;
        }
    }
}
function compruebaLetra(){
    var letra = document.getElementById("texto").value;
    var cuenta=0;
    var cuenta2=0;
    contador2=0;
    var array = [];
    array = respuestaCorrecta.split("");
    for(contador=0;contador<palabra.length;contador++){

        console.log(letra);
        if(letra == palabra.charAt(contador)){
            array[contador2]=letra;
            cuenta++;
        }
        contador2=contador2+2;
    }
    for(contador=0;contador<usadas.length;contador++){
        
        if(usadas.charAt(contador)==letra){
            console.log(letra);
            cuenta2++;
        }
    }
    if(cuenta2==0){
        usadas+=letra+", ";
    }
    document.getElementById("usadas").innerHTML=usadas;
    if(cuenta==0){
        fallos++;
        agregaFallo();
    }
    respuestaCorrecta = array.join("");
    console.log(respuestaCorrecta);
    document.getElementById("palabra").innerHTML=respuestaCorrecta;
    document.getElementById("texto").value="";
    respuestaCorrectaSinEspacios = respuestaCorrecta;
    for(contador=0;contador<respuestaCorrectaSinEspacios.length;contador++){
        respuestaCorrectaSinEspacios=respuestaCorrectaSinEspacios.replace(" ","");
    }
    
    console.log(respuestaCorrectaSinEspacios);
    console.log("palabra="+palabra);
    if(respuestaCorrectaSinEspacios==palabra){
        document.getElementById("texto").value="Has Ganado";
        document.getElementById("validar").value="Volver a jugar";
        document.getElementById("validar").onclick=iniciar;
    }
}
function agregaFallo(){
    document.getElementById("imagen").src="./imagenes/"+fallos+".png";
    if(fallos==6){
        document.getElementById("validar").value="Volver a jugar";
        document.getElementById("validar").onclick=iniciar;
    }
}

