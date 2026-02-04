// script.js - sederhana untuk demo peminjaman buku
const LS_KEY = "smk_library_v1";
const ADMIN_SESSION_KEY = "smk_admin_session";
let state = { books: [], loans: [] };
let isAdminLoggedIn = false;

/* ==================== ADMIN AUTHENTICATION ==================== */

// Check if admin is logged in
function checkAdminSession() {
  const adminSession = localStorage.getItem(ADMIN_SESSION_KEY);
  if (adminSession) {
    isAdminLoggedIn = true;
    updateAdminUI();
  }
}

// Default admin credentials (can be changed in admin panel)
const defaultAdminCreds = {
  username: "admin",
  password: "smk12345",
};

// Get stored admin credentials
function getAdminCreds() {
  const stored = localStorage.getItem("smk_admin_creds");
  if (stored) {
    return JSON.parse(stored);
  }
  return defaultAdminCreds;
}

// Admin Login
function adminLogin(e) {
  e.preventDefault();
  const username = document.getElementById("adminUsername").value;
  const password = document.getElementById("adminPassword").value;
  const adminCreds = getAdminCreds();

  if (username === adminCreds.username && password === adminCreds.password) {
    isAdminLoggedIn = true;
    localStorage.setItem(
      ADMIN_SESSION_KEY,
      JSON.stringify({
        username: username,
        loginTime: new Date().toISOString(),
      }),
    );
    closeAdminLoginModal();
    updateAdminUI();
    showToast("✅ Login admin berhasil!", "success");
  } else {
    showToast("❌ Username atau password salah!", "error");
  }

  document.getElementById("adminLoginForm").reset();
}

// Admin Logout
function logoutAdmin() {
  isAdminLoggedIn = false;
  localStorage.removeItem(ADMIN_SESSION_KEY);
  updateAdminUI();
  showToast("Logout berhasil", "success");
}

// Update admin UI based on login status
function updateAdminUI() {
  const modalLogin = document.getElementById("modalAdminLogin");
  const statusDiv = document.getElementById("adminStatusDiv");
  const statusText = document.getElementById("adminStatusText");
  const adminLoginBtn = document.getElementById("adminLoginBtn");
  const addBookBtn = document.getElementById("addBookBtn");

  if (isAdminLoggedIn) {
    // Hide login form, show status
    modalLogin.querySelector("form").style.display = "none";
    statusDiv.style.display = "block";
    statusText.textContent = "✅ Anda sudah login sebagai Admin";
    adminLoginBtn.textContent = "👤 Admin (Logged In)";
    adminLoginBtn.style.background = "#10b981";
    if (addBookBtn) addBookBtn.style.display = "block";
  } else {
    // Show login form, hide status
    modalLogin.querySelector("form").style.display = "block";
    statusDiv.style.display = "none";
    adminLoginBtn.textContent = "🔐 Admin Login";
    adminLoginBtn.style.background = "";
    if (addBookBtn) addBookBtn.style.display = "none";
  }

  renderBooks();
}

// Modal functions
function openAdminLogin() {
  document.getElementById("modalAdminLogin").classList.add("show");
}

function closeAdminLoginModal() {
  document.getElementById("modalAdminLogin").classList.remove("show");
}

/* ==================== MODERN UI INTERACTIONS ==================== */

// Toast Notification System
function showToast(message, type = "success") {
  const toast = document.createElement("div");
  toast.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === "success" ? "#10b981" : "#ef4444"};
    color: white;
    padding: 12px 20px;
    border-radius: 8px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
    font-weight: 600;
    font-size: 0.95rem;
    animation: slideInUp 0.3s ease-out;
    z-index: 1000;
  `;
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = "fadeOut 0.3s ease-in forwards";
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Ripple Effect for Buttons
function addRippleEffect(event) {
  const button = event.currentTarget;
  const ripple = document.createElement("span");
  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;

  ripple.style.cssText = `
    position: absolute;
    width: ${size}px;
    height: ${size}px;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 50%;
    left: ${x}px;
    top: ${y}px;
    animation: ripple 0.6s ease-out;
    pointer-events: none;
  `;

  button.style.position = "relative";
  button.appendChild(ripple);
  setTimeout(() => ripple.remove(), 600);
}

// Add ripple to all buttons
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("click", addRippleEffect);
  });
});

// Ripple Animation
const style = document.createElement("style");
style.textContent = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  @keyframes fadeOut {
    to {
      opacity: 0;
      transform: translateY(-20px);
    }
  }
`;
document.head.appendChild(style);

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
          "https://images.unsplash.com/photo-1633356122544-f134ef2944f7?w=280&h=220&fit=crop",
        description:
          "Panduan lengkap mempelajari HTML, CSS, dan JavaScript untuk pemula. Buku ini mencakup konsep dasar web development, cara membuat website responsif, dan best practices dalam coding.",
      },
      {
        id: "b2",
        title: "Jaringan Komputer",
        author: "S. Putra",
        copies: 3,
        year: 2022,
        isbn: "978-602-123-456-8",
        image:
          "https://images.unsplash.com/photo-1516321318423-f06f70259b51?w=280&h=220&fit=crop",
        description:
          "Mempelajari arsitektur jaringan, protokol komunikasi, dan topologi jaringan. Penjelasan detail tentang OSI model, TCP/IP, dan implementasi jaringan modern.",
      },
      {
        id: "b3",
        title: "Basis Data",
        author: "N. Sari",
        copies: 2,
        year: 2024,
        isbn: "978-602-123-456-9",
        image:
          "https://images.unsplash.com/photo-1507842217343-583f20270319?w=280&h=220&fit=crop",
        description:
          "Pelajari SQL, relational database, dan query optimization. Buku ini membahas normalisasi data, indexing, dan manajemen database yang efisien.",
      },
      {
        id: "b4",
        title: "Dasar Elektronika",
        author: "R. Hadi",
        copies: 5,
        year: 2023,
        isbn: "978-602-123-457-0",
        image:
          "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=280&h=220&fit=crop",
        description:
          "Memahami komponen elektronika, resistor, kapasitor, dan transistor. Materi praktek perakitan elektronik dasar dan troubleshooting.",
      },
      {
        id: "b5",
        title: "Algoritma & Struktur Data",
        author: "Budi Santoso",
        copies: 3,
        year: 2023,
        isbn: "978-602-123-457-1",
        image:
          "https://images.unsplash.com/photo-1497633762265-25c550f1b939?w=280&h=220&fit=crop",
        description:
          "Pelajari algoritma sorting, searching, dan struktur data seperti array, linked list, tree, dan graph. Analisis kompleksitas dan optimasi kode.",
      },
      {
        id: "b6",
        title: "Sistem Operasi Modern",
        author: "Adi Pranoto",
        copies: 2,
        year: 2024,
        isbn: "978-602-123-457-2",
        image:
          "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=280&h=220&fit=crop",
        description:
          "Memahami cara kerja sistem operasi, proses, thread, memory management, dan file system. Studi kasus Windows, Linux, dan macOS.",
      },
      {
        id: "b7",
        title: "Keamanan Siber",
        author: "Dewi Kusuma",
        copies: 4,
        year: 2024,
        isbn: "978-602-123-457-3",
        image:
          "https://images.unsplash.com/photo-1563986768609-2f966infc998?w=280&h=220&fit=crop",
        description:
          "Pengenalan cybersecurity, enkripsi, autentikasi, dan penetration testing. Cara mengidentifikasi dan mencegah serangan cyber modern.",
      },
      {
        id: "b8",
        title: "Cloud Computing & AWS",
        author: "Rudi Hermawan",
        copies: 2,
        year: 2023,
        isbn: "978-602-123-457-4",
        image:
          "https://images.unsplash.com/photo-1540575467063-178f50fcff87?w=280&h=220&fit=crop",
        description:
          "Panduan cloud computing dan AWS. Belajar EC2, S3, RDS, Lambda, dan deployment aplikasi di cloud dengan praktik langsung.",
      },
      {
        id: "b9",
        title: "Mobile App Development Android",
        author: "Siti Nurhaliza",
        copies: 3,
        year: 2024,
        isbn: "978-602-123-457-5",
        image:
          "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=280&h=220&fit=crop",
        description:
          "Develop aplikasi Android dari pemula hingga advanced. Materi Java/Kotlin, Android Studio, UI design, dan integration dengan API backend.",
      },
      {
        id: "b10",
        title: "UI/UX Design Principles",
        author: "Hendra Wijaya",
        copies: 2,
        year: 2023,
        isbn: "978-602-123-457-6",
        image:
          "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=280&h=220&fit=crop",
        description:
          "Prinsip design, user research, wireframing, dan prototyping. Belajar design thinking, accessibility, dan create user experience yang menyenangkan.",
      },
      {
        id: "b11",
        title: "Python Programming Advanced",
        author: "Lukman Hakim",
        copies: 5,
        year: 2024,
        isbn: "978-602-123-457-7",
        image:
          "https://images.unsplash.com/photo-1553055865-36e40c6980c9?w=280&h=220&fit=crop",
        description:
          "Menguasai Python untuk data science, machine learning, dan automation. Materi OOP, decorators, generators, dan library populer seperti NumPy, Pandas.",
      },
      {
        id: "b12",
        title: "JavaScript Framework React",
        author: "Irma Soliha",
        copies: 3,
        year: 2024,
        isbn: "978-602-123-457-8",
        image:
          "https://images.unsplash.com/photo-1633356122544-f134ef2944f7?w=280&h=220&fit=crop",
        description:
          "Build modern web applications dengan React. Pelajari JSX, hooks, state management, dan best practices untuk production-ready applications.",
      },
      {
        id: "b13",
        title: "Pemrograman Java Enterprise",
        author: "Joni Setiawan",
        copies: 2,
        year: 2023,
        isbn: "978-602-123-457-9",
        image:
          "https://images.unsplash.com/photo-1516321318423-f06f70259b51?w=280&h=220&fit=crop",
        description:
          "Develop aplikasi enterprise dengan Java. Spring Framework, Hibernate, REST API, dan microservices architecture untuk sistem berskala besar.",
      },
      {
        id: "b14",
        title: "DevOps & Docker",
        author: "Dina Putri",
        copies: 4,
        year: 2024,
        isbn: "978-602-123-458-0",
        image:
          "https://images.unsplash.com/photo-1552664730-d307ca884978?w=280&h=220&fit=crop",
        description:
          "Panduan containerization dengan Docker dan orchestration dengan Kubernetes. CI/CD pipeline, deployment automation, dan monitoring.",
      },
      {
        id: "b15",
        title: "Machine Learning & AI",
        author: "Raka Wijaya",
        copies: 3,
        year: 2024,
        isbn: "978-602-123-458-1",
        image:
          "https://images.unsplash.com/photo-1527522883525-cdfc6d654cb9?w=280&h=220&fit=crop",
        description:
          "Dasar machine learning, deep learning, dan artificial intelligence. TensorFlow, Keras, NLP, computer vision dengan Python.",
      },
      {
        id: "b16",
        title: "Data Science with SQL & Python",
        author: "Mega Kusuma",
        copies: 2,
        year: 2023,
        isbn: "978-602-123-458-2",
        image:
          "https://images.unsplash.com/photo-1527522883525-cdfc6d654cb9?w=280&h=220&fit=crop",
        description:
          "Analisis data dengan SQL dan Python. Data mining, visualization dengan Matplotlib, Seaborn, dan business intelligence.",
      },
      {
        id: "b17",
        title: "Teknik Troubleshooting IT",
        author: "Bambang Sutrisno",
        copies: 6,
        year: 2023,
        isbn: "978-602-123-458-3",
        image:
          "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=280&h=220&fit=crop",
        description:
          "Teknik diagnosa dan troubleshooting masalah hardware dan software. Hardware repair, driver management, dan system optimization.",
      },
      {
        id: "b18",
        title: "Teknologi Blockchain",
        author: "Cahya Ardi",
        copies: 2,
        year: 2024,
        isbn: "978-602-123-458-4",
        image:
          "https://images.unsplash.com/photo-1639762681033-6461efb0aba6?w=280&h=220&fit=crop",
        description:
          "Memahami blockchain technology, cryptocurrency, smart contracts, dan aplikasi Web3. Bitcoin, Ethereum, dan DeFi.",
      },
      {
        id: "b19",
        title: "Graphic Design Fundamentals",
        author: "Lisa Permana",
        copies: 3,
        year: 2024,
        isbn: "978-602-123-458-5",
        image:
          "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=280&h=220&fit=crop",
        description:
          "Dasar desain grafis, color theory, typography, dan layout design. Adobe Creative Suite, Figma, dan design principles.",
      },
      {
        id: "b20",
        title: "Kompetisi Pemrograman",
        author: "Sugi Hartono",
        copies: 4,
        year: 2023,
        isbn: "978-602-123-458-6",
        image:
          "https://images.unsplash.com/photo-1526374965328-7f5ae4e8cf11?w=280&h=220&fit=crop",
        description:
          "Persiapan kompetisi programming dan olimpiade informatika. Algoritma kompetitif, problem solving, dan teknik optimasi.",
      },
      {
        id: "b21",
        title: "Web Security & Penetration Testing",
        author: "Eka Prasetyo",
        copies: 2,
        year: 2024,
        isbn: "978-602-123-458-7",
        image:
          "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=280&h=220&fit=crop",
        description:
          "Keamanan web application dan penetration testing. OWASP Top 10, vulnerability scanning, exploit techniques.",
      },
      {
        id: "b22",
        title: "Game Development Unity",
        author: "Bento Prayitno",
        copies: 2,
        year: 2024,
        isbn: "978-602-123-458-8",
        image:
          "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=280&h=220&fit=crop",
        description:
          "Develop game dengan Unity Engine. C# programming, physics engine, game design patterns, dan asset management.",
      },
      {
        id: "b23",
        title: "Pendidikan Kewarganegaraan (PKN)",
        author: "Dr. Tri Handoko",
        copies: 6,
        year: 2024,
        isbn: "978-602-333-001-1",
        image:
          "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=280&h=220&fit=crop",
        description:
          "Pelajari hak dan kewajiban sebagai warga negara, sistem pemerintahan, dan nilai-nilai pancasila. Materi demokrasi, konstitusi, dan partisipasi masyarakat.",
      },
      {
        id: "b24",
        title: "Matematika Kelas X",
        author: "Prof. Budi Saptono",
        copies: 8,
        year: 2024,
        isbn: "978-602-333-001-2",
        image:
          "https://images.unsplash.com/photo-1633356122544-f134ef2944f7?w=280&h=220&fit=crop",
        description:
          "Aljabar, geometri, trigonometri, dan fungsi. Soal-soal latihan lengkap dengan solusi, teori, dan aplikasi praktis dalam kehidupan sehari-hari.",
      },
      {
        id: "b25",
        title: "Keamanan Jaringan Tingkat Lanjut",
        author: "Rendra Kusuma",
        copies: 4,
        year: 2024,
        isbn: "978-602-333-001-3",
        image:
          "https://images.unsplash.com/photo-1563986768609-2f966infc998?w=280&h=220&fit=crop",
        description:
          "Firewall, intrusion detection, encryption, VPN, dan secure network design. Implementasi keamanan jaringan modern dan best practices.",
      },
      {
        id: "b26",
        title: "Bahasa Indonesia",
        author: "Dr. Siti Nurjannah",
        copies: 7,
        year: 2024,
        isbn: "978-602-333-001-4",
        image:
          "https://images.unsplash.com/photo-1507842217343-583f20270319?w=280&h=220&fit=crop",
        description:
          "Tata bahasa, puisi, prosa, dan sastra Indonesia. Analisis teks, penulisan karya tulis, dan apresiasi seni bahasa Indonesia.",
      },
      {
        id: "b27",
        title: "Bahasa Inggris Teknis",
        author: "Michael Thompson",
        copies: 5,
        year: 2024,
        isbn: "978-602-333-001-5",
        image:
          "https://images.unsplash.com/photo-1516321318423-f06f70259b51?w=280&h=220&fit=crop",
        description:
          "Vocabulary teknis, komunikasi profesional, dan technical writing. Persiapan sertifikasi bahasa Inggris untuk bidang teknologi.",
      },
      {
        id: "b28",
        title: "Fisika Dasar",
        author: "Prof. Adi Sutrisno",
        copies: 5,
        year: 2023,
        isbn: "978-602-333-001-6",
        image:
          "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=280&h=220&fit=crop",
        description:
          "Mekanika, termodynamika, optik, dan elektromagnetik. Eksperimen, teori, dan penerapan fisika dalam teknologi modern.",
      },
      {
        id: "b29",
        title: "Kimia Industri",
        author: "Dr. Yuli Raharjo",
        copies: 4,
        year: 2024,
        isbn: "978-602-333-001-7",
        image:
          "https://images.unsplash.com/photo-1497633762265-25c550f1b939?w=280&h=220&fit=crop",
        description:
          "Struktur atom, ikatan kimia, reaksi, dan proses industri. Keamanan kimia, pengendalian mutu, dan sustainable chemistry.",
      },
      {
        id: "b30",
        title: "Sejarah Indonesia",
        author: "Dr. Bambang Hermawan",
        copies: 6,
        year: 2023,
        isbn: "978-602-333-001-8",
        image:
          "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=280&h=220&fit=crop",
        description:
          "Sejarah kerajaan, kolonialisme, perjuangan kemerdekaan, dan pembangunan bangsa. Analisis peristiwa bersejarah dan pembelajaran dari masa lalu.",
      },
      {
        id: "b31",
        title: "Linux System Administration",
        author: "Mark Jenkins",
        copies: 3,
        year: 2024,
        isbn: "978-602-333-001-9",
        image:
          "https://images.unsplash.com/photo-1552664730-d307ca884978?w=280&h=220&fit=crop",
        description:
          "Instalasi, konfigurasi, dan manajemen sistem operasi Linux. User management, file system, backup, dan troubleshooting.",
      },
      {
        id: "b32",
        title: "Desain Web Responsif",
        author: "Irma Kusuma",
        copies: 4,
        year: 2024,
        isbn: "978-602-333-002-0",
        image:
          "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=280&h=220&fit=crop",
        description:
          "Mobile-first design, CSS Grid, Flexbox, dan media queries. Praktik membuat website yang responsif untuk semua perangkat.",
      },
      {
        id: "b33",
        title: "Manajemen Basis Data",
        author: "Prof. Ady Wirawan",
        copies: 4,
        year: 2024,
        isbn: "978-602-333-002-1",
        image:
          "https://images.unsplash.com/photo-1507842217343-583f20270319?w=280&h=220&fit=crop",
        description:
          "Database design, normalisasi, backup & recovery, dan performance tuning. Implementasi MySQL, PostgreSQL, dan MongoDB.",
      },
      {
        id: "b34",
        title: "Konfigurasi Server Web Apache",
        author: "Hendra Wijaya",
        copies: 3,
        year: 2024,
        isbn: "978-602-333-002-2",
        image:
          "https://images.unsplash.com/photo-1540575467063-178f50fcff87?w=280&h=220&fit=crop",
        description:
          "Instalasi dan konfigurasi Apache, SSL/TLS, virtual hosts. Security hardening, load balancing, dan web server optimization.",
      },
      {
        id: "b35",
        title: "Network Protocol dan Subnetting",
        author: "Tri Wulandari",
        copies: 5,
        year: 2024,
        isbn: "978-602-333-002-3",
        image:
          "https://images.unsplash.com/photo-1516321318423-f06f70259b51?w=280&h=220&fit=crop",
        description:
          "TCP/IP, IP addressing, subnetting, VLAN, dan routing. Perhitungan subnetting dan perencanaan jaringan yang efisien.",
      },
      {
        id: "b36",
        title: "Sistem Operasi Windows Server",
        author: "Joni Setiawan",
        copies: 3,
        year: 2024,
        isbn: "978-602-333-002-4",
        image:
          "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=280&h=220&fit=crop",
        description:
          "Active Directory, group policy, user management, dan domain controller. Konfigurasi dan administrasi Windows Server 2019/2022.",
      },
      {
        id: "b37",
        title: "Teknik Presentasi Profesional",
        author: "Dr. Cahya Ardi",
        copies: 4,
        year: 2024,
        isbn: "978-602-333-002-5",
        image:
          "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=280&h=220&fit=crop",
        description:
          "Public speaking, visual design, storytelling, dan audience engagement. Tips dan trik presentasi yang efektif dan memorable.",
      },
      {
        id: "b38",
        title: "Wireless Network & Wi-Fi Security",
        author: "Dina Putri",
        copies: 4,
        year: 2024,
        isbn: "978-602-333-002-6",
        image:
          "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=280&h=220&fit=crop",
        description:
          "Konfigurasi Wi-Fi, WPA2/WPA3 security, wireless troubleshooting. Optimasi signal, roaming, dan wireless security best practices.",
      },
      {
        id: "b39",
        title: "Seni dan Budaya Indonesia",
        author: "Dr. Sinta Nurmalasari",
        copies: 5,
        year: 2024,
        isbn: "978-602-333-002-7",
        image:
          "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=280&h=220&fit=crop",
        description:
          "Wayang, batik, tari, musik tradisional, dan arsitektur. Apresiasi dan pelestarian budaya lokal Indonesia.",
      },
      {
        id: "b40",
        title: "Penjaminan Mutu Jaringan",
        author: "Raka Wijaya",
        copies: 3,
        year: 2024,
        isbn: "978-602-333-002-8",
        image:
          "https://images.unsplash.com/photo-1516321318423-f06f70259b51?w=280&h=220&fit=crop",
        description:
          "QoS, bandwidth management, monitoring dan troubleshooting. Peningkatan performa jaringan dan service level agreement.",
      },
      {
        id: "b41",
        title: "Etika dan Profesionalisme IT",
        author: "Prof. Mega Kusuma",
        copies: 4,
        year: 2024,
        isbn: "978-602-333-002-9",
        image:
          "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=280&h=220&fit=crop",
        description:
          "Etika dalam penggunaan teknologi, privasi data, dan tanggung jawab profesional. Code of conduct dan keselamatan informasi.",
      },
      {
        id: "b42",
        title: "Konfigurasi Cisco Router dan Switch",
        author: "Denny Prasetyo",
        copies: 3,
        year: 2024,
        isbn: "978-602-333-003-0",
        image:
          "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=280&h=220&fit=crop",
        description:
          "Konfigurasi perangkat Cisco, switching, routing, dan OSPF. Troubleshooting jaringan menggunakan Cisco IOS command line.",
      },
      {
        id: "b43",
        title: "Administrasi Sistem Operasi",
        author: "Prof. Sinta Nurmalasari",
        copies: 4,
        year: 2024,
        isbn: "978-602-333-003-1",
        image:
          "https://images.unsplash.com/photo-1552664730-d307ca884978?w=280&h=220&fit=crop",
        description:
          "Administrasi Linux dan Windows, user management, permission control, dan system monitoring untuk jaringan enterprise.",
      },
      {
        id: "b44",
        title: "Ekonomi Dasar",
        author: "Dr. Widodo Cahyo",
        copies: 5,
        year: 2024,
        isbn: "978-602-333-003-2",
        image:
          "https://images.unsplash.com/photo-1633356122544-f134ef2944f7?w=280&h=220&fit=crop",
        description:
          "Konsep ekonomi, produksi, konsumsi, dan distribusi. Sistem ekonomi, pasar, dan aktivitas perekonomian Indonesia.",
      },
      {
        id: "b45",
        title: "Sosiologi Masyarakat Modern",
        author: "Dr. Agus Setiawan",
        copies: 4,
        year: 2024,
        isbn: "978-602-333-003-3",
        image:
          "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=280&h=220&fit=crop",
        description:
          "Struktur sosial, interaksi sosial, dan perubahan sosial di masyarakat modern. Analisis fenomena sosial kontemporer.",
      },
      {
        id: "b46",
        title: "Geografi Indonesia",
        author: "Prof. Bambang Wardiman",
        copies: 5,
        year: 2024,
        isbn: "978-602-333-003-4",
        image:
          "https://images.unsplash.com/photo-1516321318423-f06f70259b51?w=280&h=220&fit=crop",
        description:
          "Letak geografis, iklim, flora fauna, dan kondisi penduduk Indonesia. Potensi sumber daya alam dan geografi fisik.",
      },
      {
        id: "b47",
        title: "API Development dengan REST",
        author: "Hendra Wijaya",
        copies: 4,
        year: 2024,
        isbn: "978-602-333-003-5",
        image:
          "https://images.unsplash.com/photo-1633356122544-f134ef2944f7?w=280&h=220&fit=crop",
        description:
          "Desain REST API, HTTP methods, authentication, dan API testing. Best practices dalam development API yang scalable.",
      },
      {
        id: "b48",
        title: "Pemrograman Mobile dengan Flutter",
        author: "Tri Wulandari",
        copies: 3,
        year: 2024,
        isbn: "978-602-333-003-6",
        image:
          "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=280&h=220&fit=crop",
        description:
          "Flutter framework untuk iOS dan Android, widget, state management, dan deployment aplikasi mobile.",
      },
      {
        id: "b49",
        title: "Pemrograman Backend dengan Node.js",
        author: "Joni Setiawan",
        copies: 3,
        year: 2024,
        isbn: "978-602-333-003-7",
        image:
          "https://images.unsplash.com/photo-1540575467063-178f50fcff87?w=280&h=220&fit=crop",
        description:
          "Node.js, Express.js, asynchronous programming, dan middleware. Database integration dan API development dengan Node.js.",
      },
      {
        id: "b50",
        title: "Version Control dengan Git",
        author: "Mark Jenkins",
        copies: 4,
        year: 2024,
        isbn: "978-602-333-003-8",
        image:
          "https://images.unsplash.com/photo-1516321318423-f06f70259b51?w=280&h=220&fit=crop",
        description:
          "Git fundamentals, branching, merging, dan collaboration. Github, Gitlab, dan workflow development team.",
      },
      {
        id: "b51",
        title: "Cloud Services dan Deployment",
        author: "Raka Wijaya",
        copies: 3,
        year: 2024,
        isbn: "978-602-333-003-9",
        image:
          "https://images.unsplash.com/photo-1552664730-d307ca884978?w=280&h=220&fit=crop",
        description:
          "Cloud deployment di AWS, Google Cloud, dan Azure. Containerization, CI/CD, dan infrastructure as code.",
      },
      {
        id: "b52",
        title: "Teknik Kompilasi dan Interpreter",
        author: "Prof. Bambang Sutrisno",
        copies: 2,
        year: 2024,
        isbn: "978-602-333-004-0",
        image:
          "https://images.unsplash.com/photo-1507842217343-583f20270319?w=280&h=220&fit=crop",
        description:
          "Konsep compiler dan interpreter, lexical analysis, syntax analysis, dan code generation.",
      },
      {
        id: "b53",
        title: "Sistem Embedded dan IoT",
        author: "Dr. Cahya Ardi",
        copies: 3,
        year: 2024,
        isbn: "978-602-333-004-1",
        image:
          "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=280&h=220&fit=crop",
        description:
          "Embedded systems, microcontroller, sensor, dan Internet of Things. Aplikasi IoT dan smart devices.",
      },
      {
        id: "b54",
        title: "Jaringan Cellular 4G dan 5G",
        author: "Dina Putri",
        copies: 3,
        year: 2024,
        isbn: "978-602-333-004-2",
        image:
          "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=280&h=220&fit=crop",
        description:
          "Arsitektur jaringan mobile, 4G LTE, 5G technology, dan handover mechanism dalam cellular network.",
      },
      {
        id: "b55",
        title: "Penjaminan Keamanan Data",
        author: "Prof. Mega Kusuma",
        copies: 3,
        year: 2024,
        isbn: "978-602-333-004-3",
        image:
          "https://images.unsplash.com/photo-1563986768609-2f966infc998?w=280&h=220&fit=crop",
        description:
          "Enkripsi, hashing, digital signature, dan infrastruktur kunci publik. Keamanan database dan backup strategi.",
      },
      {
        id: "b56",
        title: "Forensik Digital dan Investigasi",
        author: "Eka Prasetyo",
        copies: 2,
        year: 2024,
        isbn: "978-602-333-004-4",
        image:
          "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=280&h=220&fit=crop",
        description:
          "Digital forensics, evidence collection, incident response, dan legal compliance dalam investigasi cyber crime.",
      },
      {
        id: "b57",
        title: "Business Intelligence dan Analytics",
        author: "Irma Kusuma",
        copies: 3,
        year: 2024,
        isbn: "978-602-333-004-5",
        image:
          "https://images.unsplash.com/photo-1633356122544-f134ef2944f7?w=280&h=220&fit=crop",
        description:
          "Data warehouse, OLAP, reporting tools, dan data visualization. Business analytics dan decision making berbasis data.",
      },
      {
        id: "b58",
        title: "Pengembangan Kurikulum Teknologi",
        author: "Dr. Siti Nurjannah",
        copies: 2,
        year: 2024,
        isbn: "978-602-333-004-6",
        image:
          "https://images.unsplash.com/photo-1516321318423-f06f70259b51?w=280&h=220&fit=crop",
        description:
          "Metodologi pengajaran teknologi, kurikulum 2013, silabus, dan RPP untuk SMK program keahlian komputer dan jaringan.",
      },
      {
        id: "b59",
        title: "Manajemen Proyek IT",
        author: "Prof. Adi Sutrisno",
        copies: 3,
        year: 2024,
        isbn: "978-602-333-004-7",
        image:
          "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=280&h=220&fit=crop",
        description:
          "Project management methodology, Agile, Scrum, dan Kanban. Planning, scheduling, dan resource management.",
      },
      {
        id: "b60",
        title: "Industri 4.0 dan Transformasi Digital",
        author: "Dr. Yuli Raharjo",
        copies: 3,
        year: 2024,
        isbn: "978-602-333-004-8",
        image:
          "https://images.unsplash.com/photo-1552664730-d307ca884978?w=280&h=220&fit=crop",
        description:
          "Konsep Industry 4.0, Big Data, IoT, dan AI dalam manufaktur. Digital transformation dan smart factory.",
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
          b.image || "https://via.placeholder.com/280x220?text=No+Image"
        }" alt="${
          b.title
        }" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22280%22 height=%22220%22%3E%3Cdefs%3E%3ClinearGradient id=%22grad%22%3E%3Cstop offset=%220%25%22 style=%22stop-color:%236366f1;stop-opacity:1%22 /%3E%3Cstop offset=%22100%25%22 style=%22stop-color:%230ea5e9;stop-opacity:1%22 /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width=%22280%22 height=%22220%22 fill=%22url(%23grad)%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-size=%2248%22 fill=%22white%22 text-anchor=%22middle%22 dy=%22.3em%22%3E📚%3C/text%3E%3C/svg%3E'">
        <div class="book-badge">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="24" height="24">
            <circle cx="25" cy="25" r="24" fill="white" opacity="0.1"/>
            <path d="M18 12c-1.1 0-2 .9-2 2v22c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V14c0-1.1-.9-2-2-2H18zm11 17h-8v-2h8v2zm2-5h-10v-2h10v2zm0-4h-10v-2h10v2z" fill="white"/>
            <circle cx="25" cy="15" r="2.5" fill="white"/>
          </svg>
        </div>
      </div>
      <div class="book-content">
        <h4>${b.title}</h4>
        <p class="small-muted">${b.author}</p>
        <p class="small-muted">ISBN: ${b.isbn || "-"} | ${b.year || "-"}</p>
        <div style="margin-top: auto;">
          <div class="meta small" style="margin-bottom: 0.8rem;">Stok: <strong>${availableCopies(
            b.id,
          )}</strong></div>
          <div class="actions">
            <button class="btn" onclick="openLoanForm('${b.id}')">Pinjam</button>
            ${
              isAdminLoggedIn
                ? `<button class="btn secondary" onclick="openEditBookForm('${b.id}')">Edit</button>
            <button class="btn secondary" onclick="deleteBook('${b.id}')" style="color: #ef4444;">Hapus</button>`
                : ""
            }
          </div>
        </div>
      </div>
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
      <td class="loan-name"><strong>${loan.name}</strong></td>
      <td class="loan-book">${loan.bookTitle}</td>
      <td class="loan-date">${loan.date}</td>
      <td class="loan-deadline">
        <span class="deadline ${deadlineClass}">${loan.dueDate || "-"}</span>
        <div style="font-size: 0.8rem; color: #9aa4b2; margin-top: 0.2rem;">${daysText}</div>
      </td>
      <td class="loan-status">${
        loan.returned
          ? '<span class="status return">✓ Kembali</span>'
          : '<span class="status loan">📚 Dipinjam</span>'
      }</td>
      <td class="loan-action">${
        loan.returned
          ? '<button class="btn secondary" disabled style="opacity: 0.5;">--</button>'
          : '<button class="btn" onclick="returnBook(\'${loan.id}\')">Kembalikan</button>'
      }</td>
    `;
      tbody.appendChild(tr);
    });
  if (tbody.children.length === 0) {
    tbody.innerHTML =
      '<tr><td colspan="6"><div class="empty" style="text-align: center; padding: 2rem; color: #6b7280;">📭 Belum ada riwayat peminjaman</div></td></tr>';
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
  showToast(
    `✓ Peminjaman "${book.title}" untuk ${name} berhasil dibuat!`,
    "success",
  );
}

function returnBook(loanId) {
  const loan = state.loans.find((l) => l.id === loanId);
  if (!loan) return;
  loan.returned = true;
  save();
  renderLoans();
  renderBooks(document.getElementById("search").value);
  showToast(`✓ Buku "${loan.bookTitle}" telah dikembalikan!`, "success");
}

function searchBooks() {
  const q = document.getElementById("search").value;
  renderBooks(q);
}

// Init
function init() {
  checkAdminSession();
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
  document
    .getElementById("editBookForm")
    .addEventListener("submit", updateBook);
  document
    .getElementById("closeEditBookModal")
    .addEventListener("click", closeEditBookModal);

  // Admin login listeners
  document
    .getElementById("adminLoginForm")
    .addEventListener("submit", adminLogin);
  document
    .getElementById("closeAdminLoginModal")
    .addEventListener("click", closeAdminLoginModal);

  // Close modals when clicking outside
  document.getElementById("modal").addEventListener("click", (e) => {
    if (e.target === e.currentTarget) closeModal();
  });
  document.getElementById("modalBook").addEventListener("click", (e) => {
    if (e.target === e.currentTarget) closeBookModal();
  });
  document.getElementById("modalEditBook").addEventListener("click", (e) => {
    if (e.target === e.currentTarget) closeEditBookModal();
  });
  document.getElementById("modalAdminLogin").addEventListener("click", (e) => {
    if (e.target === e.currentTarget) closeAdminLoginModal();
  });
}

function openAddBookForm() {
  if (!isAdminLoggedIn) {
    showToast(
      "❌ Hanya admin yang dapat menambah buku. Silakan login terlebih dahulu.",
      "error",
    );
    openAdminLogin();
    return;
  }
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
  const description =
    document.getElementById("bookDescription")?.value.trim() || "";

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
    description,
    image:
      image ||
      "https://via.placeholder.com/200x280?text=" + encodeURIComponent(title),
  };

  state.books.push(newBook);
  save();
  renderBooks(document.getElementById("search").value);
  closeBookModal();
  document.getElementById("bookForm").reset();
  showToast(
    `✓ Buku "${title}" berhasil ditambahkan ke perpustakaan!`,
    "success",
  );
  alert("Buku berhasil ditambahkan!");
}

function openEditBookForm(bookId) {
  if (!isAdminLoggedIn) {
    showToast(
      "❌ Hanya admin yang dapat mengedit buku. Silakan login terlebih dahulu.",
      "error",
    );
    openAdminLogin();
    return;
  }

  const book = state.books.find((b) => b.id === bookId);
  if (!book) return;

  document.getElementById("editBookId").value = book.id;
  document.getElementById("editBookTitle").value = book.title;
  document.getElementById("editBookAuthor").value = book.author;
  document.getElementById("editBookCopies").value = book.copies;
  document.getElementById("editBookYear").value =
    book.year || new Date().getFullYear();
  document.getElementById("editBookISBN").value = book.isbn || "";
  document.getElementById("editBookImage").value = book.image || "";

  document.getElementById("modalEditBook").classList.add("show");
}

function closeEditBookModal() {
  document.getElementById("modalEditBook").classList.remove("show");
}

function updateBook(e) {
  e.preventDefault();
  const id = document.getElementById("editBookId").value;
  const title = document.getElementById("editBookTitle").value.trim();
  const author = document.getElementById("editBookAuthor").value.trim();
  const copies = parseInt(document.getElementById("editBookCopies").value) || 1;
  const year =
    parseInt(document.getElementById("editBookYear").value) ||
    new Date().getFullYear();
  const isbn = document.getElementById("editBookISBN").value.trim();
  const image = document.getElementById("editBookImage").value.trim();
  const description =
    document.getElementById("editBookDescription")?.value.trim() || "";

  if (!title || !author) {
    alert("Judul dan penulis harus diisi");
    return;
  }

  const book = state.books.find((b) => b.id === id);
  if (book) {
    book.title = title;
    book.author = author;
    book.copies = copies;
    book.year = year;
    book.isbn = isbn;
    book.description = description;
    book.image =
      image ||
      "https://via.placeholder.com/200x280?text=" + encodeURIComponent(title);
    save();
    renderBooks(document.getElementById("search").value);
    closeEditBookModal();
    alert("Buku berhasil diperbarui!");
  }
}

function deleteBook(bookId) {
  if (!isAdminLoggedIn) {
    showToast(
      "❌ Hanya admin yang dapat menghapus buku. Silakan login terlebih dahulu.",
      "error",
    );
    openAdminLogin();
    return;
  }

  if (confirm("Yakin ingin menghapus buku ini?")) {
    state.books = state.books.filter((b) => b.id !== bookId);
    // Hapus juga peminjaman yang terkait
    state.loans = state.loans.filter((l) => l.bookId !== bookId);
    save();
    renderBooks(document.getElementById("search").value);
    renderLoans();
    alert("Buku berhasil dihapus!");
  }
}

window.onload = init;
