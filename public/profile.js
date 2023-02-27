$(".slider").slick({
  autoplay: true,
  autoplaySpeed: 2000,
  speed: 800,
  dots: true,
  arrows: true,
  infinite: true,
  focusOnSelect: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  touchThreshold: 6,
});

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

async function getProfile(id) {
  const res = await fetch("/profile?id=" + id);
  const json = await res.json();
  console.log(json);
}

window.onload = async function () {
  let params = new URL(document.location).searchParams;
  let id = params.get("id");

  await getProfile(id);
};
