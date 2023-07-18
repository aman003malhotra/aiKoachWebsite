document.addEventListener("DOMContentLoaded", function () {
  new Splide("#partner_splide", {
    perPage: 4,
    perMove: 1,
    rewind: !0,
    gap: 5,
    autoplay: !0,
    pauseOnHover: !0,
    breakpoints: {
      640: { perPage: 1 },
      768: { perPage: 2 },
      1024: { perPage: 3 },
    },
  }).mount();
});


document.addEventListener("DOMContentLoaded", function () {
  new Splide("#course_splide", {
    perPage: 1,
    perMove: 1,
    rewind: !0,
    //   gap: 5,
    autoplay: !0,
    pauseOnHover: !0,
    //   breakpoints: {
    //     640: { perPage: 1 },
    //     768: { perPage: 2 },
    //     1024: { perPage: 3 },
    //   },
  }).mount();
});
