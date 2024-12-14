const repoLink = "https://raw.githubusercontent.com/DayKungZa/reviews/main/";
const textID = "content";
const headerFooterText = `
<div class="button-row" id="games"> |
    <span onclick="selectTopic(this, 'games/kirbyFL')">Kirby Forgotten Land</span> |
    <span onclick="selectTopic(this, 'games/Xenoblade2TGC')">Xenoblade 2 Torna</span> |
    <span onclick="selectTopic(this, 'games/Xenoblade3FR')">Xenoblade 3 Future Redeemed</span> |
    <span onclick="selectTopic(this, 'games/mariowonder')">Super Mario Wonder</span> |
    <span onclick="selectTopic(this, 'games/marioluigi2')">Mario and Luigi 2</span> |
    <span onclick="selectTopic(this, 'games/marioluigi3')">Mario and Luigi 3</span> |
    <span onclick="selectTopic(this, 'games/ittakestwo')">It Takes Two</span> |
    <span onclick="selectTopic(this, 'games/celeste')">Celeste</span> |
    <span onclick="selectTopic(this, 'games/metroidzm')">Metroid Zero Mission</span> |
    <span onclick="selectTopic(this, 'games/metroidp1')">Metroid Prime Remastered</span> |

</div>
<div class="button-row" id="movies"> |
    <span onclick="selectTopic(this, 'movies/bluegiant')">Blue Giant</span> |
    <span onclick="selectTopic(this, 'movies/frieren')">Frieren</span>
    <span onclick="selectTopic(this, 'movies/doraemon2024')">Doraemon 2024</span> |
    <span onclick="selectTopic(this, 'movies/panda4')">Kung Fu Panda 4</span>
    <span onclick="selectTopic(this, 'movies/lahnma')">หลานม่า</span> |
    <span onclick="selectTopic(this, 'movies/whiplash')">Whiplash</span> |
</div>
`;
let clicked = false;

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
  const targetElement = document.getElementById("content");
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
addHeader();