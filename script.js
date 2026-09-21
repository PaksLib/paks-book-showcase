function placeholderCover(number) {
  const n = String(number).padStart(2, "0");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1200" viewBox="0 0 800 1200">
    <rect width="800" height="1200" fill="#e8e1d5"/>
    <rect x="54" y="54" width="692" height="1092" rx="26" fill="#f8f4ec" stroke="#1f2a23" stroke-width="4"/>
    <text x="400" y="160" text-anchor="middle" font-family="Arial,sans-serif" font-size="28" font-weight="700" fill="#315f47">PAKS · TODAY'S SPECIAL</text>
    <line x1="150" y1="225" x2="650" y2="225" stroke="#1f2a23" stroke-width="3"/>
    <text x="400" y="480" text-anchor="middle" font-family="Arial,sans-serif" font-size="44" font-weight="700" fill="#17211b">BOOK ${n}</text>
    <text x="400" y="950" text-anchor="middle" font-family="Arial,sans-serif" font-size="25" fill="#68736d">Replace with your original cover</text>
    <text x="400" y="1010" text-anchor="middle" font-family="Arial,sans-serif" font-size="23" fill="#68736d">Perpustakaan Awam Kota Sentosa</text>
  </svg>`;
  return "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg);
}

const books = [
  {
    title: "看不見光，你自有方向",
    category: "Perspective",
    image: placeholderCover(1),
    description: "A reflective Chinese-language read about finding direction when the way ahead feels unclear."
  },
  {
    title: "Inspiration",
    category: "Perspective",
    image: placeholderCover(2),
    description: "A thoughtful title selected for readers looking for fresh perspective and everyday inspiration."
  },
  {
    title: "态度，决定你的亮度",
    category: "Life & Work",
    image: placeholderCover(3),
    description: "A title centred on attitude, outlook and the way perspective can shape everyday life."
  },
  {
    title: "更新粒線體，根治慢性病",
    category: "Wellbeing",
    image: placeholderCover(4),
    description: "A wellbeing-focused title exploring health, the body and long-term lifestyle considerations."
  },
  {
    title: "不知道自己以后要做什么的，请举手",
    category: "Life & Work",
    image: placeholderCover(5),
    description: "A title for readers reflecting on future direction, work, purpose and what comes next."
  },
  {
    title: "吴娟瑜的情绪管理学",
    category: "Wellbeing",
    image: placeholderCover(6),
    description: "A practical wellbeing title focused on understanding and managing emotions in daily life."
  },
  {
    title: "癌，是另一种爱",
    category: "Wellbeing",
    image: placeholderCover(7),
    description: "A reflective health-related title exploring illness, care and human experience."
  },
  {
    title: "小习惯，大健康",
    category: "Wellbeing",
    image: placeholderCover(8),
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
