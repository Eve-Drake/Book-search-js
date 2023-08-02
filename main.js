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
  body.style.backgroundColor =  '#F5F5F5'
  body.style.fontFamily = "'Lato', sans-serif;"
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
    body.style.fontFamily = "'Great Vibes', cursive";
    body.style.backgroundColor = '#cacaca';
    body.style.color = '#646060'
  }
  else if(genres.includes('science fiction')){
    body.style.fontFamily = "'Orbitron', sans-serif"
    body.style.backgroundColor = '#363d52';
    body.style.color = '#3769ff'
  }
  else if(genres.includes('horror')){
    body.style.fontFamily = "'Nosifer', cursive"
    body.style.backgroundColor = '#2c2c2c';
    body.style.color = '#fc0e0e'
  }
  else if(genres.includes('romance')){
    body.style.fontFamily = "'Parisienne', cursive"
    body.style.backgroundColor = '#fad1f1';
    body.style.color = '#b8070d'
  }
  else if(genres.includes('childrens' || 'childrens fiction'|| 'juvenile')){
    body.style.fontFamily = "'Schoolbell', cursive"
    body.style.backgroundColor = '#474747k';
    body.style.color = '#f0f0f0'
  }
  else{
    body.style.fontFamily = "'Lato', sans-serif;"
    body.style.backgroundColor = 'white';
    body.style.color = 'black'
  }
}
