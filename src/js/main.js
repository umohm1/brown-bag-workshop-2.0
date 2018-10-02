const ACCESS_KEY = "6b500f91d3830ccdabed257d3b3ac7789acb657a9816b1532c97986a048f5b41";
window.onload = function () {
  const hostname = 'https://api.unsplash.com';
  const imgContainer = document.querySelector('.js-images');
  fetch(`${hostname}/search/photos?query=dog&orientation=landscape&per_page=9`, {
    method: 'GET',
    headers: {
      Authorization: `Client-ID ${ACCESS_KEY}`,
    }
  }).then(res => res.json())
    .then(response => {
      const { results } = response;
      const imgGrid = results.map(image => {
        return `<div class="col col-33"><img src="${image.urls.raw}" class="img" alt=""></div>`;
      })
      imgContainer.innerHTML = imgGrid.join('');
    })
    .catch(error => console.error('Error', error));
}