var authorName = document.getElementById('authorName');
var authorDisplay = document.getElementById('authorDisplay');
var body = document.getElementById('body');
var authorData;
var authorCode = '';

const nameDisplay = document.getElementById('name');
const dobDisplay = document.getElementById('dob');
const topWorkDisplay = document.getElementById('topWork');
const genresDisplay = document.getElementById('genres');


var bookName = document.getElementById('bookSearch');
var bookData;

const titleDisplay = document.getElementById('title');
const publicationDisplay = document.getElementById('publicationDate');
const authorDisplay = document.getElementById('author');
const subjectDisplay = document.getElementById('subjects')


async function authorSearch(){
  authorData = {}
  body.className = 'default'
  reset()
  if (authorName.value){
    try{
      await fetch(`https://openlibrary.org/search/authors.json?q=${authorName.value}`)
      .then((data) => data.json())
      .then( (data) =>{
        authorData = data.docs[0];
      })
    }
    catch (err){
      console.error(err);
    }
    if(authorData){
      displayAuthorData();
      setGenreStyling();
    }
    else{
      let notFound = document.createElement('h1')
      notFound.innerHTML = `Sorry, we couldn't find any data for ${authorName.value}`
      nameDisplay.appendChild(notFound)
    }
  }
  else{
    let noName = document.createElement('h1')
    noName.innerHTML = `Please Enter a Name`;
    nameDisplay.appendChild(noName)
  }

  authorName.value = '';
  authorCode = authorData.key;
}

function displayAuthorData(){
  nameDisplay.innerHTML = authorData.name;
  dobDisplay.innerHTML = `Date of Birth: ${authorData.birth_date}`;
  topWorkDisplay.innerHTML = `Top Work: ${authorData.top_work}`;
  
  let genresTitle = document.createElement('h3');
  genresTitle.innerHTML = `Top Genres by ${authorData.name}`;
  let genreList = document.createElement('ul');

  genresDisplay.appendChild(genresTitle);
  genresDisplay.appendChild(genreList);

  for(let i = 0; i < 5; i++){
    let genre = document.createElement('li');
    genre.innerHTML = authorData.top_subjects[i];
    genreList.appendChild(genre);
  }
}

function setGenreStyling(){
  let genres = authorData.top_subjects.toString().toLowerCase()
  if(genres.includes('fantasy')){
    body.className = 'fantasy';
  }
  else if(genres.includes('science fiction')){
    body.className = 'science-fiction';
  }
  else if(genres.includes('horror')){
    body.className = 'horror';
  }
  else if(genres.includes('romance')){
    body.className = 'romance';
  }
  else if(genres.includes('childrens' || `children's fiction`|| 'juvenile')){
    body.className = 'childrens';
  }
  else{
    body.className = 'default';
  }
}

function reset(){
  genresDisplay.innerHTML = '';
  nameDisplay.innerHTML = '';
  dobDisplay.innerHTML = '';
  topWorkDisplay.innerHTML = '';
}

async function searchForBook(){
  try{
    await fetch(`https://openlibrary.org/search.json?q=${bookName.value}&limit=1`)
    .then((data) => data.json())
    .then((data) =>{
      bookData = data.docs[0]
    })
  }
  catch(err){
    console.error(err);
  }
  displayBookData();
}

function displayBookData(){
  titleDisplay.innerHTML = `${bookData.title}`
  publicationDisplay.innerHTML = `${bookData.first_publish_year}`
  authorDisplay.innerHTML = `by ${bookData.author_name}`
  subjectDisplay.innerHTML = `${bookData.subject_facet[0]}`
}