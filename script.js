const books=[
{title:"看不見光，你自有方向",category:"Perspective",image:"covers/book-01.jpg",description:"A reflective Chinese-language read about finding direction when the way ahead feels unclear."},
{title:"Inspiration",category:"Perspective",image:"covers/book-02.jpg",description:"A thoughtful title selected for readers looking for fresh perspective and everyday inspiration."},
{title:"态度，决定你的亮度",category:"Life & Work",image:"covers/book-03.jpg",description:"A title centred on attitude, outlook and the way perspective can shape everyday life."},
{title:"更新粒線體，根治慢性病",category:"Wellbeing",image:"covers/book-04.jpg",description:"A wellbeing-focused title exploring health, the body and long-term lifestyle considerations."},
{title:"不知道自己以后要做什么的，请举手",category:"Life & Work",image:"covers/book-05.jpg",description:"A title for readers reflecting on future direction, work, purpose and what comes next."},
{title:"吴娟瑜的情绪管理学",category:"Wellbeing",image:"covers/book-06.jpg",description:"A practical wellbeing title focused on understanding and managing emotions in daily life."},
{title:"癌，是另一种爱",category:"Wellbeing",image:"covers/book-07.jpg",description:"A reflective health-related title exploring illness, care and human experience."},
{title:"小习惯，大健康",category:"Wellbeing",image:"covers/book-08.jpg",description:"A practical wellbeing read about how small daily habits can support healthier living."}
];

const grid=document.getElementById("bookGrid"),search=document.getElementById("searchInput"),filters=[...document.querySelectorAll(".filter")],empty=document.getElementById("emptyState"),bookCount=document.getElementById("bookCount");
const fCover=document.getElementById("featuredCover"),fCat=document.getElementById("featuredCategory"),fTitle=document.getElementById("featuredTitle"),fDesc=document.getElementById("featuredDescription"),fCount=document.getElementById("featuredCount");
const dialog=document.getElementById("bookDialog"),dCover=document.getElementById("dialogCover"),dCat=document.getElementById("dialogCategory"),dTitle=document.getElementById("dialogTitle"),dDesc=document.getElementById("dialogDescription");
let active="All",featured=0;
const esc=s=>s.replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));
function render(){
 const q=search.value.trim().toLowerCase();
 const list=books.filter(b=>(active==="All"||b.category===active)&&([b.title,b.category,b.description].join(" ").toLowerCase().includes(q)));
 grid.innerHTML="";
 list.forEach(b=>{const a=document.createElement("article");a.className="book-card";a.innerHTML=`<button type="button" aria-label="View details for ${esc(b.title)}"><div class="book-cover"><img src="${b.image}" alt="Cover of ${esc(b.title)}"></div><p class="category">${b.category.toUpperCase()}</p><h3>${esc(b.title)}</h3><span class="view">View details</span></button>`;a.querySelector("button").onclick=()=>openBook(b);grid.appendChild(a)});
 bookCount.textContent=list.length;empty.hidden=list.length!==0;
}
function showFeature(i){featured=(i+books.length)%books.length;const b=books[featured];fCover.src=b.image;fCover.alt=`Cover of ${b.title}`;fCat.textContent=b.category.toUpperCase();fTitle.textContent=b.title;fDesc.textContent=b.description;fCount.textContent=`${String(featured+1).padStart(2,"0")} / ${String(books.length).padStart(2,"0")}`}
function openBook(b){dCover.src=b.image;dCover.alt=`Cover of ${b.title}`;dCat.textContent=b.category.toUpperCase();dTitle.textContent=b.title;dDesc.textContent=b.description;dialog.showModal()}
filters.forEach(btn=>btn.onclick=()=>{filters.forEach(x=>x.classList.remove("active"));btn.classList.add("active");active=btn.dataset.filter;render()});
search.oninput=render;
document.getElementById("prevFeatured").onclick=()=>showFeature(featured-1);
document.getElementById("nextFeatured").onclick=()=>showFeature(featured+1);
document.getElementById("featuredDetailsBtn").onclick=()=>openBook(books[featured]);
document.getElementById("featuredViewBtn").onclick=()=>openBook(books[featured]);
document.getElementById("dialogClose").onclick=()=>dialog.close();
dialog.onclick=e=>{if(e.target===dialog)dialog.close()};
render();showFeature(0);