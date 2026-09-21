const books = [
  {
    title: "看不見光，你自有方向",
    category: "Perspective",
    image: "assets/book-01.svg",
    description: "A reflective Chinese-language read about finding direction when the way ahead feels unclear."
  },
  {
    title: "Inspiration",
    category: "Perspective",
    image: "assets/book-02.svg",
    description: "A thoughtful title selected for readers looking for fresh perspective and everyday inspiration."
  },
  {
    title: "态度，决定你的亮度",
    category: "Life & Work",
    image: "assets/book-03.svg",
    description: "A title centred on attitude, outlook and the way perspective can shape everyday life."
  },
  {
    title: "更新粒線體，根治慢性病",
    category: "Wellbeing",
    image: "assets/book-04.svg",
    description: "A wellbeing-focused title exploring health, the body and long-term lifestyle considerations."
  },
  {
    title: "不知道自己以后要做什么的，请举手",
    category: "Life & Work",
    image: "assets/book-05.svg",
    description: "A title for readers reflecting on future direction, work, purpose and what comes next."
  },
  {
    title: "吴娟瑜的情绪管理学",
    category: "Wellbeing",
    image: "assets/book-06.svg",
    description: "A practical wellbeing title focused on understanding and managing emotions in daily life."
  },
  {
    title: "癌，是另一种爱",
    category: "Wellbeing",
    image: "assets/book-07.svg",
    description: "A reflective health-related title exploring illness, care and human experience."
  },
  {
    title: "小习惯，大健康",
    category: "Wellbeing",
    image: "assets/book-08.svg",
    description: "A practical wellbeing read about how small daily habits can support healthier living."
  }
];

const bookGrid = document.getElementById("bookGrid");
const searchInput = document.getElementById("searchInput");
const filters = [...document.querySelectorAll(".filter")];
const emptyState = document.getElementById("emptyState");
const bookCount = document.getElementById("bookCount");

const featuredCover = document.getElementById("featuredCover");
const featuredCategory = document.getElementById("featuredCategory");
const featuredTitle = document.getElementById("featuredTitle");
const featuredDescription = document.getElementById("featuredDescription");
const featuredCount = document.getElementById("featuredCount");

const dialog = document.getElementById("bookDialog");
const dialogCover = document.getElementById("dialogCover");
const dialogCategory = document.getElementById("dialogCategory");
const dialogTitle = document.getElementById("dialogTitle");
const dialogDescription = document.getElementById("dialogDescription");

let activeFilter = "All";
let featuredIndex = 0;

function renderBooks() {
  const query = searchInput.value.trim().toLowerCase();

  const filtered = books.filter(book => {
    const matchesCategory = activeFilter === "All" || book.category === activeFilter;
    const matchesSearch = book.title.toLowerCase().includes(query) ||
      book.category.toLowerCase().includes(query) ||
      book.description.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  bookGrid.innerHTML = "";
  filtered.forEach(book => {
    const article = document.createElement("article");
    article.className = "book-card";
    article.innerHTML = `
      <button type="button" aria-label="View details for ${escapeHtml(book.title)}">
        <div class="book-cover">
          <img src="${book.image}" alt="Cover of ${escapeHtml(book.title)}">
        </div>
        <p class="category">${book.category.toUpperCase()}</p>
        <h3>${escapeHtml(book.title)}</h3>
        <span class="view">View details</span>
      </button>
    `;
    article.querySelector("button").addEventListener("click", () => openBook(book));
    bookGrid.appendChild(article);
  });

  bookCount.textContent = filtered.length;
  emptyState.hidden = filtered.length !== 0;
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[char]));
}

function showFeatured(index) {
  featuredIndex = (index + books.length) % books.length;
  const book = books[featuredIndex];

  featuredCover.src = book.image;
  featuredCover.alt = `Cover of ${book.title}`;
  featuredCategory.textContent = book.category.toUpperCase();
  featuredTitle.textContent = book.title;
  featuredDescription.textContent = book.description;
  featuredCount.textContent = `${String(featuredIndex + 1).padStart(2, "0")} / ${String(books.length).padStart(2, "0")}`;
}

function openBook(book) {
  dialogCover.src = book.image;
  dialogCover.alt = `Cover of ${book.title}`;
  dialogCategory.textContent = book.category.toUpperCase();
  dialogTitle.textContent = book.title;
  dialogDescription.textContent = book.description;
  dialog.showModal();
}

filters.forEach(button => {
  button.addEventListener("click", () => {
    filters.forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    activeFilter = button.dataset.filter;
    renderBooks();
  });
});

searchInput.addEventListener("input", renderBooks);
document.getElementById("prevFeatured").addEventListener("click", () => showFeatured(featuredIndex - 1));
document.getElementById("nextFeatured").addEventListener("click", () => showFeatured(featuredIndex + 1));
document.getElementById("featuredDetailsBtn").addEventListener("click", () => openBook(books[featuredIndex]));
document.getElementById("dialogClose").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", event => {
  if (event.target === dialog) dialog.close();
});

renderBooks();
showFeatured(0);
