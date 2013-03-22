var datosFoto;
 var sistemaArcivos;
 var archivo;
 var carpeta;

 var onDeviceReady = function() { 
 $('#tomarFoto').click(function(){
 navigator.camera.getPicture( cameraSuccess, error, { quality: 40, destinationType: Camera.DestinationType.FILE_URI} ); 
 });
 }

 function cameraSuccess(img){
 datosFoto = img; //Guardamos la uri de la foto
 window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, error); 
 }
 function gotFS(fileSystem) {
 sistemaArchivos = fileSystem; //Guardamos referencia al sistema de archivos
 //Cogemos la imagen recien capturada por la cámara
 fileSystem.root.getFile('/data/data/es.intelectiva.parejas/.Pic.jpg', {create: false}, onFileEntrySuccess,error);
 }
 function onFileEntrySuccess(fileEntry){
 archivo = fileEntry; //Guardamos la foto en la variable global archivo 
 carpeta = sistemaArchivos.root.getDirectory('miCarpeta',{create:true, exclusive:false}, carpetaCreada, error); 
 } 
 function carpetaCreada(directory){ 
 //Una vez obtenida la carpeta, copiamos el archivo dentro
 archivo.copyTo(directory,"foto.jpg", copiaCompletada, error);

 }
 function copiaCompletada(r){
 $('body').append('<img src="file:///mnt/sdcard/miCarpeta/foto.jpg" />');
 }

 function error(){
 alert('Se ha producido un error');
 }