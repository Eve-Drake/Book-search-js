var authorName = document.getElementById('authorName')
var authorDisplay = document.getElementById('authorDisplay')
var authorData = {}
var authorCode = ''

const nameDisplay = document.getElementById('name')
const dobDisplay = document.getElementById('dob')
const topWorkDisplay = document.getElementById('topWork')
const genresDisplay = document.getElementById('genres')

async function authorSearch(){
  try{
    await fetch(`https://openlibrary.org/search/authors.json?q=${authorName.value}`)
    .then((data) => data.json())
    .then( (data) =>{
      authorData = data.docs[0]
    })
  }
  catch(err){
    console.error(err)
  }
  if(authorData){
    displayAuhtorData()
  }

}

function displayAuhtorData(){
  nameDisplay.innerHTML = authorData.name
  dobDisplay.innerHTML = authorData.birth_date
  topWorkDisplay.innerHTML = authorData.top_work
}