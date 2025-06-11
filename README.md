# 📦 Scraper Centris.ca — Extraction immobilière + Format Instagram

Ce projet est un scraper avancé pour [Centris.ca](https://www.centris.ca), conçu pour collecter des informations détaillées sur les propriétés, incluant les photos, données financières, courtiers, et générer un format optimisé pour des publications Instagram.

---

## ✨ Fonctionnalités principales

- 📍 Extraction de : adresse, prix, description, chambres, salles de bain, etc.
- 📸 Téléchargement et redimensionnement automatique des 5 premières photos (format 4:5 pour Instagram)
- 💼 Courtiers listés avec nom, agence, et photo
- 💰 Détails financiers optionnels (taxes, évaluations)
- 🔎 **Filtrage ciblé par nom de courtier immobilier** (même sans lien public sur Centris)
- 🔐 Bypass des protections anti-bot avec : Playwright, User-Agent randomisé, mouvements simulés, proxy rotatif

---

## 🔧 Installation

```bash
git clone https://github.com/votre-utilisateur/centris-scraper.git
cd centris-scraper
cp .env.example .env
npm install
```

Modifie le fichier `.env` avec les URLs, proxy, options et nom du courtier souhaité.

---

## 🚀 Lancer le scraper

```bash
npm start
```

Les résultats seront sauvegardés dans `data/output.json` et les images formatées dans `data/images/`.

---

## ⚙️ Configuration via `.env`

```ini
START_URLS=https://www.centris.ca/en/properties~for-sale
MAX_ITEMS=50
USE_PROXY=true
PROXY_URLS=http://login:pass@ip1:port,http://login:pass@ip2:port
SHOW_FINANCIAL_DETAILS=true
SHOW_PHOTOS=true
SHOW_LISTING_BROKERS=true
AGENT_NAME=Brian Petitpas
```

> 💡 Centris n'offre pas d'URL publique pour afficher les propriétés d'un courtier. Le filtre `AGENT_NAME` permet de **sélectionner uniquement les propriétés associées au nom du courtier** dans les données extraites.

---

## 📁 Structure du projet

```
centris-scraper/
├── src/
│   ├── main.js            # Scraper principal
│   ├── extractors.js      # Extraction conditionnelle
│   └── format.js          # Format pour Instagram + sharp
├── data/                  # Sorties JSON + images 1080x1350
├── .env.example           # Exemple de configuration
├── package.json           # Scripts et dépendances
└── README.md
```

---

## 🧠 Idéal pour :

- Créateurs de contenu immobilier
- Automatisation de visuels pour Instagram / Reels
- Analyse concurrentielle ou de marché
- Prospection ciblée par courtier immobilier

---

## 🔒 Légalité

Les données accessibles publiquement peuvent être extraites à des fins légitimes. Assurez-vous de respecter la réglementation sur les données personnelles (ex : RGPD). Évitez de scraper les courriels ou numéros privés sans consentement.

---

## 📬 Support

Tu veux ajouter des exports CSV, une interface visuelle, ou automatiser la publication ? Ouvre une issue ou contacte-moi directement.

---

Bonne extraction 🏡✨
