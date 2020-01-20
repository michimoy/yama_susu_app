$(function () {

  // フロートヘッダーメニュー
  var targetHeight = $('.js-float-menu-target').height();

  $(window).on('scroll', function() {
    $('.js-float-menu').toggleClass('float-active', $(this).scrollTop() > targetHeight);
  });

  // SPメニュー
  $('.js-toggle-sp-menu').on('click', function () {
    $(this).toggleClass('active');
    $('.js-toggle-sp-menu-target').toggleClass('active');
  });

  $('.c-nav-menu__item__link').on('click', function () {
    $('.js-toggle-sp-menu').toggleClass('active');
    $('.js-toggle-sp-menu-target').toggleClass('active');
  });

  //画像スライダー
  var currentItemNum = 1;
  var $slideContainer = $('.c-slider__container');
  var slideItemNum = $('.c-slider__container__item').length;
  var slideItemWidth = $('.c-slider__container__item').innerWidth();
  var slideContainerWidth = slideItemWidth * slideItemNum;
  var DURATION = 500;

  $slideContainer.attr('style','width:' + slideContainerWidth + 'px');

  $('.slider-next').on('click',function(){
    if(currentItemNum < slideItemNum){
      $slideContainer.animate({left: '-='+slideItemWidth+'px'},DURATION);
      currentItemNum++;
    }
  });

  $('.slider-prev').on('click',function(){
    if(currentItemNum > 1){
      $slideContainer.animate({left: '+='+slideItemWidth+'px'},DURATION);
      currentItemNum--;
    }
  });
});
