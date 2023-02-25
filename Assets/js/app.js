$(document).ready(function(){
    function splash(time) {
        return new Promise(resolve => {
            setTimeout(() => {
                $('#loadingPage').fadeOut()
                resolve()
            }, time)
        });
    }
    splash(3000)

    $('#play-music').on('click', function () {
        console.log('aa')

        var obj = document.createElement('audio')
        obj.src = 'Assets/sound/music.mp3'
        obj.play()

        $('#play-music-title').html('Yeayy Sudah Terputar!!').fadeIn(800)
        $('#play-music-subtitle').html('Musik "I Feel Good - Pink Sweat$" telah terputar, seperti feelingku untuk liburan kita ini :DD').fadeIn(800)

        $('.guitar-img').css('display', 'none')
        $('.cat-img').css('display', 'block').fadeIn(800)

        $(this).addClass('d-none', 500)
        $('#goto-depart').removeClass('d-none', 500).fadeIn(800)
    });

    $('#goto-depart').on('click', function () {
        $('#play-music-section').fadeOut()
        $('#depart-section').removeClass('d-none')
    });

    $('#goto-day1').on('click', function () {
        $('#depart-section').fadeOut(1000, function(){
            $(this).addClass('d-none')
        }).fadeIn(500)
        $('#day1-section').removeClass('d-none')
        $("html, body").animate({ scrollTop: 0 }, "slow")
    });

    $('#goto-day2').on('click', function () {
        $('#day1-section').fadeOut(1000, function(){
            $(this).addClass('d-none')
        }).fadeIn(500)
        $('#day2-section').removeClass('d-none')
        $("html, body").animate({ scrollTop: 0 }, "slow")
    });

    $('#goto-back').on('click', function () {
        $('#day2-section').fadeOut(1000, function(){
            $(this).addClass('d-none')
        }).fadeIn(500)
        $('#back-section').removeClass('d-none')
        $("html, body").animate({ scrollTop: 0 }, "slow")
    });

    $('#goto-finish').on('click', function () {
        $('#back-section').fadeOut(1000, function(){
            $(this).addClass('d-none')
        }).fadeIn(500)
        $('#finish-section').removeClass('d-none')
        $("html, body").animate({ scrollTop: 0 }, "slow")
    });

    $('#btn-finish').on('click', function () {
        $('#finish-section').fadeOut(1000, function(){
            $(this).addClass('d-none')
        }).fadeIn(500)
        $('#hidden-section').removeClass('d-none')
        $("html, body").animate({ scrollTop: 0 }, "slow")
    });

    $('#back-depart').on('click', function () {
        $('#day1-section').fadeOut(1000, function(){
            $(this).addClass('d-none')
        }).fadeIn(500)
        $('#depart-section').removeClass('d-none')
        $("html, body").animate({ scrollTop: 0 }, "slow")
    });

    $('#back-day1').on('click', function () {
        $('#day2-section').fadeOut(1000, function(){
            $(this).addClass('d-none')
        }).fadeIn(500)
        $('#day1-section').removeClass('d-none')
        $("html, body").animate({ scrollTop: 0 }, "slow")
    });

    $('#back-day2').on('click', function () {
        $('#back-section').fadeOut(1000, function(){
            $(this).addClass('d-none')
        }).fadeIn(500)
        $('#day2-section').removeClass('d-none')
        $("html, body").animate({ scrollTop: 0 }, "slow")
    });

    $('#back-back').on('click', function () {
        $('#finish-section').fadeOut(1000, function(){
            $(this).addClass('d-none')
        }).fadeIn(500)
        $('#back-section').removeClass('d-none')
        $("html, body").animate({ scrollTop: 0 }, "slow")
    });

    $(".card-image").popupLightbox();
    $(".img-rounded").popupLightbox();

});