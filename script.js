$(document).ready(function() {
    $(".container").hide();
    var val_def = $("#input-username").val();
    var title = $(".container").find("h1").html();
    var roomSpeakers = $(".container").find("#roomSpeakers").html();
    var roomDate = $(".container").find(".roomDate").html();
    if (roomDate.length < 5) {
        roomDate = "Не запланировано";
    }
    var countdown = $(".container").find(".countdown").html();
    var dateTZ = $(".container").find(".dateTZ").html();
    var polit = $(".container").find(".text-grey").html();
    var phoneHtml; var emailHtml;
    var butInner;
    
    if ($("#input-userphone").length && $("#input-userphone").hasClass('iti__tel-input')) {
        phoneHtml = "block";
    } else phoneHtml = "none";
    
    if ($("#input-useremail").length && $("#input-useremail").parents(".input-group").hasClass('hidden')) {
        emailHtml = "none";
    } else emailHtml = "block";
    
    if (window.location.href.indexOf("PP_diagnostic_new") > -1) butInner = "Войти";
    else butInner = "Войти на семинар";

    html = '<div class="bizon" style="background: url(https://uk-tools.ru/bizon/bg.jpg);"> <div class="bizon_main"> <div class="bizon_lf"> <div class="bizon_img"><img src="https://uk-tools.ru/bizon/img.png" alt=""></div> </div> <div class="bizon_rg"> <div class="bizon_form"> <p class="bizon_t1">'+title+'</p> <div class="bizon_it"> <p class="bizon_it_t1">Ведущие вебинара</p> <p class="bizon_it_t2">'+roomSpeakers+'</p> </div> <div class="bizon_it"> <p class="bizon_it_t1">Дата проведения</p> <div class="bizon_it_line"> <p class="bizon_it_t2">'+roomDate+'</p> <p class="bizon_it_t3">'+dateTZ+'</p> <p class="bizon_it_t3">'+countdown+'</p> </div> </div> <div class="bizon_form_box"> <div class="bizon_form_box_list bizon_form_box_list_col"> <div class="bizon_form_box_item name_inp"> <p class="bizon_form_t1">Введите ваше имя</p> <div class="bizon_input"><input type="text" name="name" class="name_inp" placeholder="Имя" required=""></div> </div> <div class="bizon_form_box_item email_inp" style="display: '+emailHtml+';"> <p class="bizon_form_t1">Введите ваш Email</p> <div class="bizon_input"><input type="text" name="email" class="email_inp" placeholder="E-mail" required=""></div> </div> <div class="bizon_form_box_item phone_inp" style="display: '+phoneHtml+';"> <p class="bizon_form_t1">Введите ваш телефон</p> <div class="bizon_input"><input type="tel" name="phone" class="phone_inp" placeholder="+01XXXXXXXXX" pattern="^\\+01[0-9]{9,}$" title="Введите номер в формате +01XXXXXXXXX" required=""></div> </div> <div class="bizon_form_box_item"> <button class="btns">'+butInner+'</button> </div> </div> <div class="polits"> <p class="text-grey">'+polit+'</p> </div> </div> </div> </div> </div> </div>';
    
    $('.container').before(html);
    $(".bglayer").remove();

    if ($(".input-group.group:not(.hidden)").length > 1) {
        $(".bizon_form_box_list").removeClass("bizon_form_box_list_col")
    }
    if ($(".input-group.group:not(.hidden) #input-useremail").length > 0) {
        $(".email_inp").show();
    }
    if ($(".input-group.group:not(.hidden) #input-userphone").length > 0) {
        $(".phone_inp").show();
    }
    
    $(document).on('input', ".name_inp input", function() {
        var name = $(this).val();
        $("#input-username").val(name);
    });
    
    $(document).on('input', ".email_inp input", function() {
        var email = $(this).val();
        $("#input-useremail").val(email);
    });
    
    // $(document).on('input', ".phone_inp input", function() {
    //     var phone = $(this).val();
    //     if (phone.startsWith('+01')) {
    //         if (/^\+01[0-9]{9,}$/.test(phone)) {
    //             $("#input-userphone").val(phone);
    //         }
    //     } else {

    //         $("#input-userphone").val(phone);
    //     }
    // });

    $(document).on('click', ".btns", function() {
    var phone = $('.phone_inp input').val();
    var cleanPhone = phone.replace(/[^\d+]/g, '');
    
    console.log('Введенный номер:', phone);
    console.log('Очищенный номер:', cleanPhone);
    console.log('Длина номера:', cleanPhone.length);
    console.log('Начинается с +01:', cleanPhone.startsWith('+01'));
    

    if (cleanPhone.startsWith('+01') && cleanPhone.length === 12) {
        console.log('Номер валиден');
        var bitrixPhone = '+1' + cleanPhone.substring(3);
        console.log('Номер для Bitrix:', bitrixPhone);
        $("#input-userphone").val(cleanPhone);
    } else { 
        $(".bizon_form").append('<div class="alert alert-danger autherror">Пожалуйста, введите номер в формате +01XXXXXXXXX (12 символов)</div>');
    }
    
    if ($(".alert-danger").text().length > 3) {
        $(".bizon_form").append('<div class="alert alert-danger autherror">'+$(".alert-danger").html()+'</div>')
    }
    
    });
});
