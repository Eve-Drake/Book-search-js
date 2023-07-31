var authorName = document.getElementById('authorName')
var authorDisplay = document.getElementById('authorDisplay')
var authorData = {}
var authorCode = ''

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
  if(authorData !== {}){
    displayAuhtorData()
  }

}

function displayAuhtorData(){
  let authorInfoBlock = document.createElement('div')
  authorInfoBlock.className = 'author-infomation'
  

  let author = document.createElement('h2');
  author.innerHTML = authorData.name

  let authorDOB = document.createElement('h4')
  authorDOB.innerHTML = authorData.birth_date;

  let topWork = document.createElement('h5')
  topWork.innerHTML = authorData.top_work

  authorInfoBlock.appendChild(author)
  authorInfoBlock.appendChild(authorDOB)
  authorInfoBlock.appendChild(topWork)
  authorDisplay.appendChild(authorInfoBlock)

  //let topSubjectsList  =document.createElement('ul')
}