const panier = [];

// ===== MESSAGE =====
function afficherMessage(text) {
  const m = document.getElementById("message-panier");
  if (!m) return;

  m.textContent = text;
  m.style.display = "block";

  setTimeout(() => {
    m.style.display = "none";
  }, 2000);
}

// ===== AJOUT PRODUIT =====
function ajouterProduit(nom, prix) {
  const p = panier.find(x => x.nom === nom);

  if (p) {
    p.quantite++;
  } else {
    panier.push({ nom, prix, quantite: 1 });
  }

  afficherPanier();
  afficherMessage(nom + " ajouté");
}

// ===== QUANTITE =====
function augmenterQuantite(i) {
  panier[i].quantite++;
  afficherPanier();
}

function diminuerQuantite(i) {
  panier[i].quantite--;

  if (panier[i].quantite <= 0) {
    panier.splice(i, 1);
  }

  afficherPanier();
}

// ===== SUPPRIMER =====
function supprimerProduit(i) {
  panier.splice(i, 1);
  afficherPanier();
}

// ===== AFFICHER PANIER =====
function afficherPanier() {
  const list = document.getElementById("panier-list");
  const totalBox = document.getElementById("panier-total");
  const countBox = document.getElementById("panier-count");
  const emptyBox = document.getElementById("panier-vide");

  if (!list) return;

  list.innerHTML = "";
  let total = 0;
  let count = 0;

  panier.forEach((p, i) => {
    total += p.prix * p.quantite;
    count += p.quantite;

    list.innerHTML += `
      <div class="panier-item">
        <h4>${p.nom}</h4>
        <p>${p.prix} € x ${p.quantite}</p>
        <button onclick="diminuerQuantite(${i})">-</button>
        <button onclick="augmenterQuantite(${i})">+</button>
        <button onclick="supprimerProduit(${i})">Supprimer</button>
      </div>
    `;
  });

  if (totalBox) totalBox.textContent = total.toFixed(2);
  if (countBox) countBox.textContent = count;

  if (emptyBox) {
    emptyBox.style.display = panier.length === 0 ? "block" : "none";
  }
}

function viderPanier() {
  panier.length = 0;
  afficherPanier();
  afficherMessage("Panier vidé");
}

// ===== LOGIN REAL LOCALSTORAGE =====
function getAdminPassword() {
  return localStorage.getItem("adminPassword") || "1234";
}

function loginAdmin() {
  const u = document.getElementById("username").value;
  const p = document.getElementById("password").value;

  if (u === "admin" && p === getAdminPassword()) {
    localStorage.setItem("adminLogged", "yes");
    window.location.href = "dashboard.html";
  } else {
    alert("Nom d'utilisateur ou mot de passe incorrect");
  }
}

function logoutAdmin() {
  localStorage.removeItem("adminLogged");
}

function requireAdmin() {
  if (localStorage.getItem("adminLogged") !== "yes") {
    window.location.href = "login.html";
  }
}

// ===== SHOW PASSWORD =====
function togglePassword() {
  const pass = document.getElementById("password");
  pass.type = pass.type === "password" ? "text" : "password";
}

// ===== CHANGER MOT DE PASSE =====
function changePassword() {
  const oldPass = document.getElementById("old-password").value;
  const newPass = document.getElementById("new-password").value;

  if (oldPass !== getAdminPassword()) {
    alert("Ancien mot de passe incorrect");
    return;
  }

  if (newPass.length < 4) {
    alert("Le nouveau mot de passe doit contenir au moins 4 caractères");
    return;
  }

  localStorage.setItem("adminPassword", newPass);
  alert("Mot de passe changé avec succès");

  document.getElementById("old-password").value = "";
  document.getElementById("new-password").value = "";
}

// ===== ANIMATION CHANGE PASSWORD =====
function toggleChangePassword() {
  const box = document.getElementById("change-password-box");
  box.classList.toggle("show");
}

// ===== INIT =====
afficherPanier();