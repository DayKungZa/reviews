const repoLink = "https://raw.githubusercontent.com/DayKungZa/reviews/main/";
const textID = "content";
let clicked = false;
const headerFooterText = loadHeaderFooter();
addHeader();

async function loadHeaderFooter() {
  try {
    const response = await fetch('topics.json');
    if (!response.ok) throw new Error(`Failed to fetch topics.json: ${response.statusText}`);
    
    const data = await response.json();

    let headerFooterHTML = '';

    // Add Games Section
    headerFooterHTML += `<div class="button-row" id="games"> |`;
    data.games.forEach(game => {
      headerFooterHTML += `<span onclick="selectTopic(this, '${game.link}')">${game.name}</span> |`;
    });
    headerFooterHTML += `</div>`;

    // Add Movies Section
    headerFooterHTML += `<div class="button-row" id="movies"> |`;
    data.movies.forEach(movie => {
      headerFooterHTML += `<span onclick="selectTopic(this, '${movie.link}')">${movie.name}</span> |`;
    });
    headerFooterHTML += `</div>`;
    return headerFooterHTML;
  } catch (error) {
      console.error('Error loading headerFooter:', error);
      return `<div>error fetching topics.json</div>`;
  }
}


async function loadMarkdown(reviewLink) {
  try {
      const response = await fetch(`${repoLink}${reviewLink}.md`);
      if (!response.ok) throw new Error(`Failed to fetch README.md: ${response.statusText}`);
      
      const markdown = await response.text();
      const readmeText = marked.parse ? marked.parse(markdown) : marked(markdown);
      
      document.getElementById(textID).innerHTML = `
        <img src="${reviewLink}.png" class="review-image"></img>
        ${readmeText}
      `;
  } catch (error) {
      console.error(error);
      document.getElementById(textID).innerText = "Failed to load content.";
  }
}

function scrollToTopic(topicId) {
  const topic = document.getElementById(topicId);
  if (topic) {
    topic.scrollIntoView({ behavior: "smooth" });
  } else {
    console.error(`Element with id '${topicId}' not found.`);
  }
}

function selectTopic(span, reviewLink) {
  if (!clicked){
    addFooter();
    clicked = true;
  }
  // Remove 'active' class from all spans
  document.querySelectorAll('.button-row span').forEach(el => el.classList.remove('active'));
  span.classList.add('active');
  loadMarkdown(reviewLink);
  const targetElement = document.getElementById("text-container");
  if (targetElement) {
    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function addHeader() {
  const header = document.getElementsByClassName("headerFooter")[0];
  header.innerHTML = headerFooterText;
}
function addFooter() {
  const footer = document.getElementsByClassName("headerFooter")[1];
  footer.innerHTML = headerFooterText;
}