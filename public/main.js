// const swiper = new Swiper('.swiper', {
//     // Optional parameters
//     direction: 'horizontal',
//     loop: true,
  
//     // If we need pagination
//     pagination: {
//       el: '.swiper-pagination',
//     },
  
//     // Navigation arrows
//     navigation: {
//       nextEl: '.swiper-button-next',
//       prevEl: '.swiper-button-prev',
//     },
  
//     // And if we need scrollbar
//     scrollbar: {
//       el: '.swiper-scrollbar',
//     },
//     slidesPerView:3,
//     breakpoints: {
//       640: {
//         slidesPerView: 2,
//         spaceBetween: 20,
//       },
//       768: {
//         slidesPerView: 4,
//         spaceBetween: 40,
//       },
//       1024: {
//         slidesPerView: 5,
//         spaceBetween: 5,
//       },
//     },
//   });

  // new Splide( '.splide' ).mount();
  document.addEventListener( 'DOMContentLoaded', function() {
    var splide = new Splide( '#partner_splide',{
      perPage: 4,
      perMove: 1,
      rewind: true,
      gap:5,
      autoplay:true,
      pauseOnHover:true,
      breakpoints: {
        640: {
          perPage: 1,
        },
        768:{
          perPage:2,
        },
        1024: {
          perPage:3,
        }
      }
    } );
    splide.mount();
  } );

 