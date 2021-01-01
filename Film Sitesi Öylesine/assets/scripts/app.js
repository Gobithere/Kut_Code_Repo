const addMovieModal = document.getElementById("add-modal");

const startAddMovieButton = document.querySelector("header button");

const backdropelement = document.getElementById("backdrop");
const filmCıkarButonu = document.getElementsByClassName("styled");
const deletemodal = document.getElementById("delete-modal");

const backDropCancelButton = document
  .getElementsByClassName("modal__actions")
  .item(0).firstElementChild;

const addMovieUserInput = backDropCancelButton.nextElementSibling;
const movieUserInputDataList = addMovieModal.querySelectorAll("input");

const tooglebackdrop = () => {
  backdropelement.classList.toggle("visible");
};

const toogleMovieModal = () => {
  tooglebackdrop();
  addMovieModal.classList.toggle("visible");
 };

// Clear input values when backdrop or clicking cancel button
const clearInputValue = () => {
  movieUserInputDataList.forEach((Element) => {
    Element.style.borderColor = "";
    Element.setAttribute("placeholder", "");
    Element.value = "";
  });
};

const cancelmovieadd = () => {
  addMovieModal.classList.remove("visible");
  tooglebackdrop();
  clearInputValue();
  
};
const backdropClickHandler = () => {
  //toogleMovieModal();
  clearInputValue();
  tooglebackdrop();
  addMovieModal.classList.remove("visible");
  deletemodal.classList.remove("visible");
};

let id = 0;
const renderMovieInputtoDom = (Title, imageurl, rating) => {
  const renderingMovieList = document.createElement("li", { id: `${id}` });
  renderingMovieList.id = id;
  renderingMovieList.innerHTML = `
<div class="movie-element" >
  <img class="movie-element__image" src="${imageurl}" alt= "${Title}">
<div class="movie-element__info">
  <h2>${Title}</h2>
  <p>${rating}/5 Stars</p>
  <button id=${id} class='styled' onclick="filmçıkar(this)">Filmi Çıkar</button>
</div>
</div>
 `;

  const rootlist = document.getElementById("movie-list");
  rootlist.append(renderingMovieList);
  id++;
};

// Eklenen filmleri DOM'dan çıkarma

const filmçıkarSekmeIptal = () => {
  backdropelement.classList.remove("visible")
  deletemodal.classList.remove("visible");
};

const filmçıkar = (element) => {
  backdropelement.classList.add("visible");
  deletemodal.classList.add("visible");
  const onayButonu = document.getElementById("onaybutonu");
  onayButonu.addEventListener("click", () => {
    element.parentNode.parentNode.parentNode.remove();
    deletemodal.classList.remove("visible");
    backdropelement.classList.remove("visible")
    
  });
  
};

//movie data array

var moviedb = [];

const fetchUserMovieInput = () => {
  const movieTitle = movieUserInputDataList[0].value;
  const movieImageUrl = movieUserInputDataList[1].value;
  const movieRating = movieUserInputDataList[2].value;

  if (movieTitle.trim() === "") {
    movieUserInputDataList[0].style.borderColor = "red";
    movieUserInputDataList[0].setAttribute(
      "placeholder",
      "Please Enter a Movie Title"
    );
  }
  if (movieImageUrl.trim() === "") {
    movieUserInputDataList[1].style.borderColor = "red";
    movieUserInputDataList[1].setAttribute(
      "placeholder",
      "Please Enter a Movie-Image URL"
    );
  }
  if (movieRating.trim() === "" || +movieRating < 1 || +movieRating > 5) {
    movieUserInputDataList[2].style.borderColor = "red";
    movieUserInputDataList[2].setAttribute(
      "placeholder",
      "Please Rate Movie Between 1-5"
    );
  }

  const newMovieData = {
    movieTitle: movieTitle,
    movieURL: movieImageUrl,
    movieRating: movieRating,
  };

  if (
    movieTitle.trim() === "" ||
    movieImageUrl.trim() === "" ||
    movieRating.trim() === "" ||
    +movieRating < 1 ||
    +movieRating > 5
  ) {
    return;
  } else moviedb.push(newMovieData);

  if (moviedb.length !== 0) {
    const entrytext = document.getElementById("entry-text");

    entrytext.style.display = "none";
  }

  clearInputValue();
  toogleMovieModal();
  renderMovieInputtoDom(movieTitle, movieImageUrl, movieRating);
};

startAddMovieButton.addEventListener("click", toogleMovieModal);
backdropelement.addEventListener("click", backdropClickHandler);
backDropCancelButton.addEventListener("click", cancelmovieadd);
addMovieUserInput.addEventListener("click", fetchUserMovieInput);
