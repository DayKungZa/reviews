const repoLink = "https://raw.githubusercontent.com/DayKungZa/reviews/main/";
const textID = "content";

console.log(typeof marked);

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
  // Remove 'active' class from all spans
  document.querySelectorAll('.button-row span').forEach(el => el.classList.remove('active'));
  span.classList.add('active');
  loadMarkdown(reviewLink);
}