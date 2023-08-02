var authorName = document.getElementById('authorName');
var authorDisplay = document.getElementById('authorDisplay');
var body = document.getElementById('body');
var authorData;
var authorCode = '';


const nameDisplay = document.getElementById('name');
const dobDisplay = document.getElementById('dob');
const topWorkDisplay = document.getElementById('topWork');
const genresDisplay = document.getElementById('genres');

async function authorSearch(){
  authorData = {}
  body.className = 'default'
  genresDisplay.innerHTML = ''
  if(authorName.value){
    try{
      await fetch(`https://openlibrary.org/search/authors.json?q=${authorName.value}`)
      .then((data) => data.json())
      .then( (data) =>{
        authorData = data.docs[0];
      })
    }
    catch(err){
      console.error(err);
    }
    if(authorData){
      displayAuhtorData();
      setGenreStyling();
    }
    else{
      let notFound = document.createElement('h1')
      notFound.innerHTML = `Sorry, we couldn't find any data for ${authorName.value}`
      authorDisplay.appendChild(notFound)
    }
  }
  else{
    let noName = document.createElement('h1')
    noName.innerHTML = `Please Enter a Name`;
    authorDisplay.appendChild(noName)
  }

  authorName.value = '';
  authorCode = authorData.key;
}

function displayAuhtorData(){
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
    body.className = 'fantasy'
  }
  else if(genres.includes('science fiction')){
    body.className = 'science-fiction'
  }
  else if(genres.includes('horror')){
    body.className = 'horror'
  }
  else if(genres.includes('romance')){
    body.className = 'romance'
  }
  else if(genres.includes('childrens' || `children's fiction`|| 'juvenile')){
    body.className = 'childrens'
  }
  else{
    body.className = 'default'
  }
}
