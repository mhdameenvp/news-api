const apiKey = "1f1564cf70eb47f3be4db49a69cb381a";
const blockContainer = document.getElementById("block-container");
// const searchButton=document.getElementById('search-button')
const searchField=document.getElementById('search-input')
const searchButton=document.getElementById('search-button')

searchButton.addEventListener('click',async ()=>{
  let query = searchField.value.trim()
  if(query !==""){
    try{
      const articles =await fetchNewsQuery(query)
      displayBlogs(articles)

    }catch(error){
      console.log(error,"data search error")

    }
  }
})

// searchButton.addEventListener('click',()=>{
//   const searchInput=document.getElementById('search-input').value 
//   console.log('search',searchInput);
//   fetchRandomNews()
// })
async function fetchNewsQuery(query){
  try {
    const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=11&apiKey=${apiKey}`;
    const response = await fetch(apiUrl);
    const data = await response.json(); // Await JSON parsing
    console.log(data);
    return data.articles;
  } catch (error) {
    console.error("Error in fetching", error);
    return [];
  }

}


async function fetchRandomNews() {
  try {
    const apiUrl = `https://newsapi.org/v2/everything?domains=wsj.com&pageSize=11&apiKey=${apiKey}`;
    const response = await fetch(apiUrl);
    const data = await response.json(); // Await JSON parsing
    console.log(data);
    return data.articles;
  } catch (error) {
    console.error("Error in fetching", error);
    return [];
  }
}

function displayBlogs(articles) {
  blockContainer.innerHTML = ""; // Clear previous content
  articles.forEach((article) => {
    const blogCard = document.createElement('div');
    blogCard.classList.add('blog-card');

    const img = document.createElement('img');
    img.src = article.urlToImage;
    img.alt = article.title;
    img.style.maxWidth = "100%"; // Set maximum width
    img.style.height = "auto"; // Maintain aspect ratio
    img.style.objectFit = "cover"; // Ensure the image fills the space without distortion

    const title = document.createElement('h2');
    title.textContent = article.title;

    const description = document.createElement('p');
    description.textContent = article.description;

    blogCard.appendChild(img);
    blogCard.appendChild(title);
    blogCard.appendChild(description);
    blogCard.addEventListener('click', () => {
        window.open(article.url, '_blank');
    });
    

    blockContainer.appendChild(blogCard); // Append the blog card itself
  });
}

(async () => {
  try {
    const articles = await fetchRandomNews();
    displayBlogs(articles);
  } catch (error) {
    console.error('Error in fetching random news', error);
  }
})();

