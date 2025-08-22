const list = document.getElementById('infi-list');
const main = document.querySelector('main');

let itemCount = 0;
let loading = false;

function addItems(n) {
  for (let i = 0; i < n; i++) {
    const li = document.createElement('li');
    li.textContent = `Item ${++itemCount}`;
    list.appendChild(li);
  }
}

// add initial 10
addItems(10);

// create a sentinel at the end of the list
const sentinel = document.createElement('li');
sentinel.id = 'infi-sentinel';
sentinel.style.listStyle = 'none';
sentinel.style.height = '1px';
sentinel.style.padding = '0';
sentinel.style.margin = '0';
list.appendChild(sentinel);

// detect if <main> is the scroll container; otherwise use viewport
const mainIsScrollable = () => main && main.scrollHeight > main.clientHeight;
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting || loading) return;
      loading = true;
      // add 2 more items
      addItems(2);
      // keep sentinel at the end
      list.appendChild(sentinel);
      // small micro delay to avoid rapid re-trigger
      setTimeout(() => (loading = false), 0);
    });
  },
  {
    root: mainIsScrollable() ? main : null, // null = viewport
    rootMargin: '0px 0px 200px 0px',        // prefetch a bit before bottom
    threshold: 0
  }
);

io.observe(sentinel);
