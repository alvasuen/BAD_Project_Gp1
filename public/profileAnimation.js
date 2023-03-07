$(".responsive").slick({
  dots: true,
  infinite: false,
  speed: 300,
  slidesToShow: 4,
  slidesToScroll: 4,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
});

// $(".slider").slick({
//   autoplay: true,
//   autoplaySpeed: 2000,
//   speed: 800,
//   dots: true,
//   arrows: true,
//   infinite: true,
//   focusOnSelect: true,
//   infinite: true,
//   speed: 500,
//   slidesToShow: 4,
//   slidesToScroll: 1,
//   touchThreshold: 6,
// });

// $(document).ready(function(){
//     $('.slider').slick({
//       dots: true,
//       arrows: true,
//       autoplay: true,
//       autoplaySpeed: 3000,
//   focusOnSelect: true,
//   infinite: true,
//   speed: 500,
//   slidesToShow: 4,
//   slidesToScroll: 1,
//   touchThreshold: 6
//     });
//   });

//     $('.single-item').slick();
