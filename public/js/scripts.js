const submitForm = () => {
  let formData = {
    title: $("#title").val(),
    image: $("#image").val(),
    link: $("#link").val(),
    description: $("#description").val()
  };

  // Send POST request to server
  $.post('/api/cards', formData)
    .done(function (response) {
      console.log("Card created:", response.data);
      alert("Card posted!");
      location.reload();
    })
    .fail(function (error) {
      console.error("Error creating card:", error.responseJSON.message);
      // Optionally, you can display an error message to the user
    });
};

const addCard = (item) => {
  let cardHtml =
    '<div class="col s4 center-align">' +
    '<div class="card medium">' +
    '<div class="card-image waves-effect waves-block waves-light">' +
    `<img class="activator" src="${item.image}">` +
    '</div>' +
    '<div class="card-content">' +
    `<span class="card-title activator grey-text text-darken-4">${item.title}<i class="material-icons right">more_vert</i></span>` +
    `<p><a href="#">${item.link}</a></p>` +
    '</div>' +
    '<div class="card-reveal">' +
    `<span class="card-title grey-text text-darken-4">${item.title}<i class="material-icons right">close</i></span>` +
    `<p class="card-text">${item.description}</p>` +
    '</div>' +
    '</div>' +
    '</div>';

  $("#card-section").append(cardHtml);
};

$(document).ready(function () {
  let socket = io();

  // Listen for 'number' event sent from the server
  socket.on('number', function (data) {
    console.log('Received number:', data.number);
  });
  $(".materialboxed").materialbox();
  $("#cardForm").submit(function (event) {
    event.preventDefault(); // Prevent the default form submission
    submitForm();
  });
  $(".modal").modal();

  // Load existing cards when the page is ready
  getProjects();
});

const getProjects = () => {
  $.get('/api/cards', function (response) {
    if (response.statusCode === 200) {
      response.data.forEach(function (item) {
        addCard(item);
      });
    }
  });
};
