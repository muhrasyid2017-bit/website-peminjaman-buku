// script.js - sederhana untuk demo peminjaman buku
const LS_KEY = "smk_library_v1";
let state = { books: [], loans: [] };

function sampleData() {
  return {
    books: [
      {
        id: "b1",
        title: "Pemrograman Web Dasar",
        author: "A. Rahman",
        copies: 4,
        year: 2023,
        isbn: "978-602-123-456-7",
        image:
          "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=200&h=280&fit=crop",
      },
      {
        id: "b2",
        title: "Jaringan Komputer",
        author: "S. Putra",
        copies: 3,
        year: 2022,
        isbn: "978-602-123-456-8",
        image:
          "https://images.unsplash.com/photo-1516321318423-f06f70259b51?w=200&h=280&fit=crop",
      },
      {
        id: "b3",
        title: "Basis Data",
        author: "N. Sari",
        copies: 2,
        year: 2024,
        isbn: "978-602-123-456-9",
        image:
          "https://images.unsplash.com/photo-1507842217343-583f20270319?w=200&h=280&fit=crop",
      },
      {
        id: "b4",
        title: "Dasar Elektronika",
        author: "R. Hadi",
        copies: 5,
        year: 2023,
        isbn: "978-602-123-457-0",
        image:
          "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=200&h=280&fit=crop",
      },
      {
        id: "b5",
        title: "Algoritma & Struktur Data",
        author: "Budi Santoso",
        copies: 3,
        year: 2023,
        isbn: "978-602-123-457-1",
        image:
          "https://images.unsplash.com/photo-1497633762265-25c550f1b939?w=200&h=280&fit=crop",
      },
      {
        id: "b6",
        title: "Sistem Operasi Modern",
        author: "Adi Pranoto",
        copies: 2,
        year: 2024,
        isbn: "978-602-123-457-2",
        image:
          "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=200&h=280&fit=crop",
      },
      {
        id: "b7",
        title: "Keamanan Siber",
        author: "Dewi Kusuma",
        copies: 4,
        year: 2024,
        isbn: "978-602-123-457-3",
        image:
          "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&h=280&fit=crop",
      },
      {
        id: "b8",
        title: "Cloud Computing & AWS",
        author: "Rudi Hermawan",
        copies: 2,
        year: 2023,
        isbn: "978-602-123-457-4",
        image:
          "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=200&h=280&fit=crop",
      },
      {
        id: "b9",
        title: "Mobile App Development Android",
        author: "Siti Nurhaliza",
        copies: 3,
        year: 2024,
        isbn: "978-602-123-457-5",
        image:
          "https://images.unsplash.com/photo-1540575467063-178f50fcff87?w=200&h=280&fit=crop",
      },
      {
        id: "b10",
        title: "UI/UX Design Principles",
        author: "Hendra Wijaya",
        copies: 2,
        year: 2023,
        isbn: "978-602-123-457-6",
        image:
          "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=200&h=280&fit=crop",
      },
      {
        id: "b11",
        title: "Dasar Jaringan Komputer TJKT",
        author: "Budi Irawan",
        copies: 5,
        year: 2024,
        isbn: "978-602-888-001-1",
        image:
          "https://images.unsplash.com/photo-1516321318423-f06f70259b51?w=200&h=280&fit=crop",
      },
      {
        id: "b12",
        title: "Konfigurasi Router dan Switch",
        author: "Hendra Kusuma",
        copies: 4,
        year: 2023,
        isbn: "978-602-888-001-2",
        image:
          "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&h=280&fit=crop",
      },
      {
        id: "b13",
        title: "Protokol TCP/IP dan Model OSI",
        author: "Tri Wulandari",
        copies: 3,
        year: 2024,
        isbn: "978-602-888-001-3",
        image:
          "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=200&h=280&fit=crop",
      },
      {
        id: "b14",
        title: "Kabel dan Media Transmisi Jaringan",
        author: "Andi Setiawan",
        copies: 4,
        year: 2023,
        isbn: "978-602-888-001-4",
        image:
          "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=200&h=280&fit=crop",
      },
      {
        id: "b15",
        title: "Sistem Keamanan Jaringan TJKT",
        author: "Dina Safitri",
        copies: 3,
        year: 2024,
        isbn: "978-602-888-001-5",
        image:
          "https://images.unsplash.com/photo-1540575467063-178f50fcff87?w=200&h=280&fit=crop",
      },
      {
        id: "b16",
        title: "Administrasi Server Linux",
        author: "Rinto Harahap",
        copies: 3,
        year: 2023,
        isbn: "978-602-888-001-6",
        image:
          "https://images.unsplash.com/photo-1507842217343-583f20270319?w=200&h=280&fit=crop",
      },
      {
        id: "b17",
        title: "Telekomunikasi dan Teknologi Wireless",
        author: "Sandi Hermawan",
        copies: 2,
        year: 2024,
        isbn: "978-602-888-001-7",
        image:
          "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=200&h=280&fit=crop",
      },
      {
        id: "b18",
        title: "Troubleshooting Jaringan Komputer",
        author: "Maya Rahmawati",
        copies: 3,
        year: 2023,
        isbn: "978-602-888-001-8",
        image:
          "https://images.unsplash.com/photo-1497633762265-25c550f1b939?w=200&h=280&fit=crop",
      },
      {
        id: "b16",
        title: "Pendidikan Kewarganegaraan (PKN)",
        author: "Dr. Tri Handoko",
        copies: 6,
        year: 2024,
        isbn: "978-602-333-001-1",
        image:
          "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=200&h=280&fit=crop",
      },
      {
        id: "b17",
        title: "Matematika Kelas X",
        author: "Prof. Budi Saptono",
        copies: 8,
        year: 2024,
        isbn: "978-602-333-001-2",
        image:
          "https://images.unsplash.com/photo-1633356122544-f134ef2944f7?w=200&h=280&fit=crop",
      },
      {
        id: "b18",
        title: "Keamanan Jaringan Tingkat Lanjut",
        author: "Rendra Kusuma",
        copies: 4,
        year: 2024,
        isbn: "978-602-333-001-3",
        image:
          "https://images.unsplash.com/photo-1563986768609-2f966infc998?w=200&h=280&fit=crop",
      },
      {
        id: "b19",
        title: "Bahasa Indonesia",
        author: "Dr. Siti Nurjannah",
        copies: 7,
        year: 2024,
        isbn: "978-602-333-001-4",
        image:
          "https://images.unsplash.com/photo-1507842217343-583f20270319?w=200&h=280&fit=crop",
      },
      {
        id: "b20",
        title: "Bahasa Inggris Teknis",
        author: "Michael Thompson",
        copies: 5,
        year: 2024,
        isbn: "978-602-333-001-5",
        image:
          "https://images.unsplash.com/photo-1516321318423-f06f70259b51?w=200&h=280&fit=crop",
      },
      {
        id: "b21",
        title: "Fisika Dasar",
        author: "Prof. Adi Sutrisno",
        copies: 5,
        year: 2023,
        isbn: "978-602-333-001-6",
        image:
          "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=200&h=280&fit=crop",
      },
      {
        id: "b22",
        title: "Kimia Industri",
        author: "Dr. Yuli Raharjo",
        copies: 4,
        year: 2024,
        isbn: "978-602-333-001-7",
        image:
          "https://images.unsplash.com/photo-1497633762265-25c550f1b939?w=200&h=280&fit=crop",
      },
      {
        id: "b23",
        title: "Sejarah Indonesia",
        author: "Dr. Bambang Hermawan",
        copies: 6,
        year: 2023,
        isbn: "978-602-333-001-8",
        image:
          "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=200&h=280&fit=crop",
      },
      {
        id: "b24",
        title: "Linux System Administration",
        author: "Mark Jenkins",
        copies: 3,
        year: 2024,
        isbn: "978-602-333-001-9",
        image:
          "https://images.unsplash.com/photo-1552664730-d307ca884978?w=200&h=280&fit=crop",
      },
      {
        id: "b25",
        title: "Desain Web Responsif",
        author: "Irma Kusuma",
        copies: 4,
        year: 2024,
        isbn: "978-602-333-002-0",
        image:
          "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=200&h=280&fit=crop",
      },
      {
        id: "b26",
        title: "Konfigurasi Cisco Router dan Switch",
        author: "Denny Prasetyo",
        copies: 3,
        year: 2024,
        isbn: "978-602-333-003-0",
        image:
          "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=200&h=280&fit=crop",
      },
      {
        id: "b27",
        title: "Administrasi Sistem Operasi",
        author: "Prof. Sinta Nurmalasari",
        copies: 4,
        year: 2024,
        isbn: "978-602-333-003-1",
        image:
          "https://images.unsplash.com/photo-1552664730-d307ca884978?w=200&h=280&fit=crop",
      },
      {
        id: "b28",
        title: "Ekonomi Dasar",
        author: "Dr. Widodo Cahyo",
        copies: 5,
        year: 2024,
        isbn: "978-602-333-003-2",
        image:
          "https://images.unsplash.com/photo-1633356122544-f134ef2944f7?w=200&h=280&fit=crop",
      },
      {
        id: "b29",
        title: "Sosiologi Masyarakat Modern",
        author: "Dr. Agus Setiawan",
        copies: 4,
        year: 2024,
        isbn: "978-602-333-003-3",
        image:
          "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=200&h=280&fit=crop",
      },
      {
        id: "b30",
        title: "Geografi Indonesia",
        author: "Prof. Bambang Wardiman",
        copies: 5,
        year: 2024,
        isbn: "978-602-333-003-4",
        image:
          "https://images.unsplash.com/photo-1516321318423-f06f70259b51?w=200&h=280&fit=crop",
      },
      {
        id: "b31",
        title: "API Development dengan REST",
        author: "Hendra Wijaya",
        copies: 4,
        year: 2024,
        isbn: "978-602-333-003-5",
        image:
          "https://images.unsplash.com/photo-1633356122544-f134ef2944f7?w=200&h=280&fit=crop",
      },
      {
        id: "b32",
        title: "Pemrograman Mobile dengan Flutter",
        author: "Tri Wulandari",
        copies: 3,
        year: 2024,
        isbn: "978-602-333-003-6",
        image:
          "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=200&h=280&fit=crop",
      },
      {
        id: "b33",
        title: "Pemrograman Backend dengan Node.js",
        author: "Joni Setiawan",
        copies: 3,
        year: 2024,
        isbn: "978-602-333-003-7",
        image:
          "https://images.unsplash.com/photo-1540575467063-178f50fcff87?w=200&h=280&fit=crop",
      },
      {
        id: "b34",
        title: "Version Control dengan Git",
        author: "Mark Jenkins",
        copies: 4,
        year: 2024,
        isbn: "978-602-333-003-8",
        image:
          "https://images.unsplash.com/photo-1516321318423-f06f70259b51?w=200&h=280&fit=crop",
      },
    ],
    loans: [],
  };
}

function save() {
  localStorage.setItem(LS_KEY, JSON.stringify(state));
}
function load() {
  const raw = localStorage.getItem(LS_KEY);
  if (raw) {
    state = JSON.parse(raw);
  } else {
    state = sampleData();
    save();
  }
}

// Renders
function renderBooks(filter = "") {
  const container = document.getElementById("bookList");
  container.innerHTML = "";
  const q = filter.trim().toLowerCase();
  state.books.forEach((b) => {
    const title = b.title;
    if (
      q &&
      !(title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q))
    )
      return;
    const div = document.createElement("div");
    div.className = "book";
    div.innerHTML = `
      <div class="cover">
        <img src="${
          b.image || "https://via.placeholder.com/60x100?text=No+Image"
        }" alt="${
          b.title
        }" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2260%22 height=%22100%22%3E%3Crect fill=%22%234f46e5%22 width=%2260%22 height=%22100%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-size=%2212%22 fill=%22white%22 text-anchor=%22middle%22 dy=%22.3em%22%3E📘%3C/text%3E%3C/svg%3E'">
      </div>
      <div>
        <h4>${b.title}</h4>
        <p class="small-muted">${b.author}</p>
        <p class="small-muted">ISBN: ${b.isbn || "-"} | ${b.year || "-"}</p>
        <div class="actions">
          <button class="btn" onclick="openLoanForm('${b.id}')">Pinjam</button>
        </div>
      </div>
      <div class="meta small">Stok: <strong>${availableCopies(
        b.id,
      )}</strong></div>
    `;
    container.appendChild(div);
  });
  if (container.children.length === 0) {
    container.innerHTML = '<div class="empty">Tidak ada buku yang cocok.</div>';
  }
}

function availableCopies(bookId) {
  const book = state.books.find((b) => b.id === bookId);
  const borrowed = state.loans.filter(
    (l) => l.bookId === bookId && !l.returned,
  ).length;
  return (book?.copies || 0) - borrowed;
}

// Loans
function getDaysRemaining(dueDate) {
  const due = new Date(dueDate);
  const today = new Date();
  const diffMs = due - today;
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  return diffDays;
}

function getDeadlineClass(dueDate, returned) {
  if (returned) return "";
  const days = getDaysRemaining(dueDate);
  if (days < 0) return "overdue";
  if (days <= 3) return "warning";
  return "";
}

function renderLoans() {
  const tbody = document.getElementById("loansBody");
  tbody.innerHTML = "";
  state.loans
    .slice()
    .reverse()
    .forEach((loan) => {
      const tr = document.createElement("tr");
      const daysRemaining = getDaysRemaining(loan.dueDate || new Date());
      const deadlineClass = getDeadlineClass(loan.dueDate, loan.returned);
      const daysText =
        daysRemaining < 0
          ? `${Math.abs(daysRemaining)} hari terlambat`
          : `${daysRemaining} hari`;
      tr.innerHTML = `
      <td>${loan.name}</td>
      <td>${loan.bookTitle}</td>
      <td>${loan.date}</td>
      <td><span class="deadline ${deadlineClass}">${
        loan.dueDate || "-"
      }</span><br><small style="color: #9aa4b2;">${daysText}</small></td>
      <td>${
        loan.returned
          ? '<span class="status return">Kembali</span>'
          : '<span class="status loan">Dipinjam</span>'
      }</td>
      <td>${
        loan.returned
          ? '<button class="btn secondary" disabled>--</button>'
          : '<button class="btn" onclick="returnBook(\'${loan.id}\')">Kembalikan</button>'
      }</td>
    `;
      tbody.appendChild(tr);
    });
  if (tbody.children.length === 0) {
    tbody.innerHTML =
      '<tr><td colspan="6"><div class="empty">Belum ada peminjaman.</div></td></tr>';
  }
}

function openLoanForm(bookId) {
  const modal = document.getElementById("modal");
  modal.classList.add("show");
  const select = document.getElementById("loanBook");
  select.innerHTML = "";
  state.books.forEach((b) => {
    const opt = document.createElement("option");
    opt.value = b.id;
    opt.textContent = `${b.title} — Stok: ${availableCopies(b.id)}`;
    select.appendChild(opt);
  });
  if (bookId) select.value = bookId;
  const today = new Date().toISOString().split("T")[0];
  const dateInput = document.getElementById("loanDate");
  if (!dateInput.value) dateInput.value = today;
}

function closeModal() {
  document.getElementById("modal").classList.remove("show");
}

function addLoan(e) {
  e.preventDefault();
  const bookId = document.getElementById("loanBook").value;
  const name = document.getElementById("loanName").value.trim();
  const date =
    document.getElementById("loanDate").value ||
    new Date().toLocaleDateString();
  const durationDays =
    parseInt(document.getElementById("loanDuration").value) || 7;
  if (!name) {
    alert("Nama peminjam harus diisi");
    return;
  }
  if (availableCopies(bookId) <= 0) {
    alert("Buku tidak tersedia");
    return;
  }
  const book = state.books.find((b) => b.id === bookId);
  const today = new Date();
  const dueDate = new Date(
    today.getTime() + durationDays * 24 * 60 * 60 * 1000,
  );
  const loan = {
    id: "l" + Date.now(),
    bookId,
    bookTitle: book.title,
    name,
    date,
    dueDate: dueDate.toISOString().split("T")[0],
    returned: false,
  };
  state.loans.push(loan);
  save();
  renderLoans();
  renderBooks(document.getElementById("search").value);
  closeModal();
  document.getElementById("loanForm").reset();
}

function returnBook(loanId) {
  const loan = state.loans.find((l) => l.id === loanId);
  if (!loan) return;
  loan.returned = true;
  save();
  renderLoans();
  renderBooks(document.getElementById("search").value);
}

function searchBooks() {
  const q = document.getElementById("search").value;
  renderBooks(q);
}

// Init
function init() {
  load();
  renderBooks();
  renderLoans();
  document.getElementById("search").addEventListener("input", searchBooks);
  document.getElementById("loanForm").addEventListener("submit", addLoan);
  document.getElementById("closeModal").addEventListener("click", closeModal);
  document.getElementById("bookForm").addEventListener("submit", addBook);
  document
    .getElementById("closeBookModal")
    .addEventListener("click", closeBookModal);
}

function openAddBookForm() {
  document.getElementById("modalBook").classList.add("show");
}

function closeBookModal() {
  document.getElementById("modalBook").classList.remove("show");
}

function addBook(e) {
  e.preventDefault();
  const title = document.getElementById("bookTitle").value.trim();
  const author = document.getElementById("bookAuthor").value.trim();
  const copies = parseInt(document.getElementById("bookCopies").value) || 1;
  const image = document.getElementById("bookImage").value.trim();
  const year =
    parseInt(document.getElementById("bookYear")?.value) ||
    new Date().getFullYear();
  const isbn = document.getElementById("bookISBN")?.value.trim() || "";

  if (!title || !author) {
    alert("Judul dan penulis harus diisi");
    return;
  }

  const newBook = {
    id: "b" + Date.now(),
    title,
    author,
    copies,
    year,
    isbn,
    image:
      image ||
      "https://via.placeholder.com/200x280?text=" + encodeURIComponent(title),
  };

  state.books.push(newBook);
  save();
  renderBooks(document.getElementById("search").value);
  closeBookModal();
  document.getElementById("bookForm").reset();
  alert("Buku berhasil ditambahkan!");
}

window.onload = init;
