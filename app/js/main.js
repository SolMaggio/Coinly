
$(".btn").on("mouseenter", function(){
    $(".btn").addClass("btnDos");
})
$(".btn").on("mouseleave", function(){
    $(".btn").removeClass("btnDos");
})

$(".btn").on("mousedown", function(){
    $(".btn").addClass("btnTres");
})
$(".btn").on("mouseup", function(){
    $(".btn").removeClass("btnTres");
})


$("#ag_ing").on("click", function(){
    $(".vistas").css("display", "none");
    $(".ingresar").css("display", "block");
})

$("#ag_egr").on("click", function(){
    $(".vistas").css("display", "none");
    $(".egresar").css("display", "block");
})

$(".fa-arrow-left").on("click", function(){
    $(".vistas").css("display", "none");
    $(".inicio").css("display", "block");
    $("[modificador]").removeAttr("modificador");
})

$(".lapizModEg").on("click", function(){
    $(".vistas").css("display", "none");
    $(".modEg").css("display", "block");
})

$(".lapizModIn").on("click", function(){
    $(".vistas").css("display", "none");
    $(".modIn").css("display", "block");
})

$(".fa-user").on("click", function(){
    $(".vistas").css("display", "none");
    $(".personas").css("display", "block");
})

//Ingreso
$("#formIn").on("submit", function(){
    var monto = $("#montoIn").val();

    monto = parseFloat($("#montoIn").val());
    var suma = parseFloat($("#sumaIn").text());
    suma += monto;

    $("#sumaIn").text(suma)
    console.log(suma);
    console.log(monto);

    

    var de = $("#deIn").val();
    var fecha = $("#fechaIn").val();

    localStorage.setItem("sumaIn", suma);
    actualizarBalance()

    let nuevoCardIn = $("<div></div>");
    nuevoCardIn.addClass("card").html(`  
    <div class="s_columna">
        <p class="fecha">${fecha}</p>
        <div class="iconos">    
            <i class="fa-regular fa-pen-to-square lapizModIn"></i>
            <i class="far fa-trash-alt eliminarIn"></i>
        </div>
    </div>
    
    <div class="card_info">
        <div class="hola">
            <i class="fa-solid fa-sack-dollar"></i>
            <div class="p">
                <p class="par_card2">${de}</p>
            </div> 
    </div>
    
    <h2 class="h2"><span class="sub_card">${monto}</span></h2>  
    </div>`)

    $("#agCard").prepend(nuevoCardIn);   
    $("#formIn")[0].reset();

    $(".vistas").css("display","none");
    $(".inicio").css("display", "block");

    ingresarDato();

return false; 

})

//Egreso

$("#forEg").on("submit", function(){
    var montoEg = $("#montoEg").val();


    var monto = parseFloat($("#montoEg").val());
    var sumaEgForm = parseFloat($("#sumaEg").text());
    sumaEgForm += monto;

    $("#sumaEg").text(sumaEgForm)
    console.log(sumaEgForm);
    console.log(monto);



    var notas = $("#notasEg").val();
    var fechaEg = $("#fechaEg").val();

    let nuevoCardEg = $("<div></div>");
    nuevoCardEg.addClass("card")
    nuevoCardEg.addClass("egreso")
    .html(` <div class="s_columna">
        <p class="fecha">${fechaEg}</p>
        <div class="iconos">    
            <i class="ic_egreso fa-regular fa-pen-to-square lapizModEg"></i>
            <i class="ic_egreso far fa-trash-alt eliminarEg"></i>
        </div>
    </div>

    <div class="card_info">
        
        <div class="hola">
            <i class="ic_egreso fa-solid fa-sack-dollar"></i>
            <div class="p">
                <p class="par_card2 blanco">${notas}</p>
            </div>
        </div>
        <h2 class="h2"><span class="sub_card sub_egreso">${montoEg}</span></h2>   
    </div>`)

    $("#agCard").prepend(nuevoCardEg);


    
    $("#forEg")[0].reset();

    $(".vistas").css("display","none");
    $(".inicio").css("display", "block")

    localStorage.setItem("sumaEg", sumaEgForm);
    actualizarBalance()

    ingresarDato()

return false; 
});




//Eliminar

$("#agCard").on("click", ".card .s_columna .iconos .eliminarIn", function(){
    let respuesta = confirm("¿Estás seguro que querés borrar este ingreso?");
    if (respuesta){
        $(this).parent().parent().parent().remove();

        let sumaIn = parseFloat($("#sumaIn").text());
        console.log(sumaIn);
        let montoEste = parseFloat($(this).closest(".card").find(".sub_card").text());

        console.log(montoEste)
        var diferencia = sumaIn - montoEste;
        $("#sumaIn").text(diferencia);
        localStorage.setItem("sumaIn", diferencia);
        actualizarBalance()
        ingresarDato();
    }


});


$("#agCard").on("click", ".card .s_columna .iconos .eliminarEg", function(){
    let respuesta = confirm("¿Estás seguro que querés este egreso?");
    if (respuesta){
        $(this).parent().parent().parent().remove();

        let sumaEg = parseFloat($("#sumaEg").text());
        console.log(sumaEg);
        let montoEste = parseFloat($(this).closest(".card").find(".sub_card").text());
        console.log(montoEste)
        var diferencia = sumaEg - montoEste;
        $("#sumaEg").text(diferencia);
        localStorage.setItem("sumaEg", diferencia);
        actualizarBalance()
        ingresarDato();
    }


});


$(".fa-xmark").on("click", function(){
    let respuesta = confirm ("¿Estás seguro que querés borrar todos los datos?");
    if (respuesta) {
        $("#agCard").children().remove();

        
        $("#sumaIn").text("0");
        $("#sumaEg").text('0');
        localStorage.clear();
        localStorage.setItem("sumaIn", "0");
        localStorage.setItem("sumaEg", "0");
        actualizarBalance()
    }
});



$("#agCard").on("click", ".card .s_columna .iconos .lapizModIn", function(){

    
    $(".inicio").css("display", "none");
    $(".modIn").css("display", "block")
    
    let monto = $(this).parent().parent().next().children("h2").children("span").text();
    let date = $(this).parent().prev(".fecha").text();
    let de = $(this).parent().parent().next().children("div").children(".p").children(".par_card2").text();



    $("#montoModIn").val(monto);
    $("#deModIn").val(de);
    $("#fechaModIn").val(date);

    let sumaIn = parseFloat($("#sumaIn").text());
    sumaIn -= parseFloat(monto);
    $("#sumaIn").text(sumaIn);

    

    $(this).parent().parent().parent().attr("data-modificando", "este");
    localStorage.setItem("sumaIn", sumaIn)
    actualizarBalance()
    
})

$("#forModIn").on("submit", function(){


    let montoMod = $("#montoModIn").val();
    
    let de =  $("#deModIn").val()

    let fecha = $("#fechaModIn").val()

$('[data-modificando]').children(".card_info").children("h2").children("span").text(montoMod);
$('[data-modificando]').children(".card_info").children("div").children(".p").children("p").text(de);
$('[data-modificando]').children(".s_columna").children("p").text(fecha);

$('[data-modificando]').removeAttr('data-modificando');

$("#forModIn")[0].reset();

let sumaIn = parseFloat($("#sumaIn").text())
sumaIn += parseFloat(montoMod);
$("#sumaIn").text(sumaIn);




$(".vistas").css("display", "none");
$(".inicio").css("display", "block");

localStorage.setItem("sumaIn", sumaIn);
actualizarBalance()

ingresarDato();

return false;


});


$("#agCard").on("click", ".card .s_columna .iconos .lapizModEg", function(){
    $(".inicio").css("display", "none");
    $(".modEg").css("display", "block")
    
    let monto = $(this).parent().parent().next().children("h2").children("span").text();
    let fecha = $(this).parent().prev(".fecha").text();
    let notas =$(this).parent().parent().next().children("div").children(".p").children(".blanco").text();


    $("#montoModEg").val(monto);
    $("#fechaModEg").val(fecha);
    $("#notasModEg").val(notas);

    let sumaEg = parseFloat($("#sumaEg").text());
    sumaEg -= parseFloat(monto);
    $("#sumaEg").text(sumaEg);

    $(this).parent().parent().parent().attr("data-modificando", "este");
    localStorage.setItem("sumaEg", sumaEg);
    actualizarBalance()
    
});

$("#forModEg").on("submit", function(){
    let monto = $("#montoModEg").val();
    monto = parseFloat(monto);
    let fecha =  $("#fechaModEg").val()
    let notas = $("#notasModEg").val()

$('[data-modificando]').children(".card_info").children("h2").children("span").text(monto);
$('[data-modificando]').children(".card_info").children("div").children(".p").children("p").text(notas);
$('[data-modificando]').children(".s_columna").children("p").text(fecha);

$('[data-modificando]').removeAttr('data-modificando');

let sumaEg = parseFloat($("#sumaEg").text())
sumaEg += parseFloat(monto);
$("#sumaEg").text(sumaEg);

$("#forModEg")[0].reset();

$(".vistas").css("display", "none");
$(".inicio").css("display", "block")

ingresarDato()
localStorage.setItem("sumaEg", sumaEg);
actualizarBalance()

return false;

})





function ingresarDato(){
    let ingresos = $("#agCard").html();

    localStorage.setItem("ingresar", ingresos);
}

$(function(){
    let guardados = localStorage.getItem("ingresar");

    if (guardados != null){
        $("#agCard").html(guardados);

    }
})



$(document).ready(function() {
    let ingresosGuardados = parseFloat(localStorage.getItem("sumaIn"))|| 0;
    console.log(ingresosGuardados)
    if(ingresosGuardados!== null){
        $("#sumaIn").text(ingresosGuardados);
    }
})

$(document).ready(function() {
    let egresosGuardados = parseFloat(localStorage.getItem("sumaEg")) || 0;
    console.log(egresosGuardados)
    if(egresosGuardados!== null){
        $("#sumaEg").text(egresosGuardados);
    }
})

function actualizarBalance() {
    
    let sumaIn = parseFloat(localStorage.getItem("sumaIn")) || 0;
    console.log(sumaIn)
    let sumaEg = parseFloat(localStorage.getItem("sumaEg")) || 0;
    console.log(sumaEg);
    console.log(sumaIn);
    let balance = sumaIn - sumaEg;
    $("#titulo_principal").text(balance);
    console.log(balance)

    localStorage.setItem("Balance", balance);

}

$(document).ready(function() {
    let balance = localStorage.getItem("Balance");
    if(balance!== null){
        $("#titulo_principal").text(balance);
    }
})


