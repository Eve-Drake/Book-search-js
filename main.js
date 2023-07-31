var authorName = document.getElementById('authorName')
var authorData

function authorSearch(){
  try{
    fetch(`https://openlibrary.org/search/authors.json?q=${authorName.value}`)
    .then((data) => data.json())
    .then( (data) =>{
      authorData = data.docs[0]
    })
  }
  catch(err){
    console.error(err)
  }
  console.log(authorData)
}