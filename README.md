# 🏥 CAPE - Centre d'Accompagnement pour la Protection de l'Enfance

<div align="center">

![CAPE Logo](https://img.shields.io/badge/CAPE-Protection%20de%20l'Enfance-blue?style=for-the-badge)
![Version](https://img.shields.io/badge/version-1.0.0-green?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-orange?style=for-the-badge)

**Application desktop moderne pour la gestion des cas de protection de l'enfance**

[🌐 Demo Web](https://mehdi2114.github.io/cape-app) | [📥 Download Desktop](https://github.com/mehdi2114/cape-app/releases)

</div>

---

## ✨ Fonctionnalités

### 📝 Gestion des Cas
- ✅ Formulaire complet en **Arabe** avec tous les détails
- ✅ Informations sur l'enfant, parents, et agresseur
- ✅ Types de violence (جسدي، جنسي، نفسي، اجتماعي)
- ✅ Historique médical et substances
- ✅ Stockage local sécurisé

### 📊 Tableau de Bord
- ✅ Statistiques **mensuelles** et **annuelles**
- ✅ Graphiques interactifs (Pie, Bar, Line charts)
- ✅ Répartition par genre (Garçons/Filles)
- ✅ Distribution des types de problèmes
- ✅ Évolution mensuelle

### 📄 Export de Rapports
- ✅ **PDF** - Rapports officiels professionnels
- ✅ **Excel** (.xlsx) - Données exportables
- ✅ **Word** (.docx) - Documents éditables

### 🎨 Design Moderne
- ✅ **Glass Morphism** - Effets de verre translucides
- ✅ **Gradients** - Couleurs vibrantes
- ✅ **Animations** - Transitions fluides
- ✅ **RTL Support** - Support complet de l'arabe
- ✅ **Responsive** - S'adapte à toutes les tailles

### 🔒 Sécurité
- ✅ **100% Offline** - Pas de connexion internet requise
- ✅ **Données locales** - Stockage sécurisé (localStorage/JSON)
- ✅ **Confidentialité** - Aucune donnée envoyée au cloud
- ✅ **Backup** - Système de sauvegarde intégré

---

## 🚀 Installation

### Prérequis
- [Node.js](https://nodejs.org/) (v18 ou supérieur)
- npm ou yarn

### Installation
```bash
# Cloner le repository
git clone https://github.com/mehdi2114/cape-app.git

# Aller dans le dossier
cd cape-app

# Installer les dépendances
npm install
```

---

## 💻 Utilisation

### Mode Web (Browser)
```bash
npm run dev:renderer
```
Ouvrir: **http://localhost:5173**

### Mode Desktop (Electron)
```bash
npm run dev
```

### Build Production
```bash
# Build web
npm run build

# Build desktop (à venir)
npm run build:electron
```

---

## 🏗️ Architecture

```
cape-app/
├── src/
│   ├── main/                    # Electron main process
│   │   ├── main.ts             # Point d'entrée Electron
│   │   └── preload.ts          # Script preload sécurisé
│   ├── renderer/               # React app
│   │   ├── components/         # Composants réutilisables
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Select.tsx
│   │   │   └── ErrorBoundary.tsx
│   │   ├── features/           # Modules fonctionnels
│   │   │   ├── cases/          # Gestion des cas
│   │   │   │   ├── CaseFormArabic.tsx
│   │   │   │   └── CaseList.tsx
│   │   │   └── dashboard/      # Tableau de bord
│   │   │       └── Dashboard.tsx
│   │   ├── services/           # Logique métier
│   │   │   ├── database.ts     # CRUD JSON/localStorage
│   │   │   ├── stats.ts        # Calculs statistiques
│   │   │   └── export.ts       # Export PDF/Excel/Word
│   │   ├── types/              # Types TypeScript
│   │   └── App.tsx             # Composant principal
│   └── shared/                 # Types partagés
├── data/                       # Base de données JSON
└── exports/                    # Rapports générés
```

---

## 🛠️ Technologies

| Technologie | Usage |
|------------|-------|
| **React 18** | Framework UI |
| **TypeScript** | Type safety |
| **Electron 28** | Desktop app |
| **Vite** | Build tool |
| **Tailwind CSS** | Styling |
| **Recharts** | Graphiques |
| **jsPDF** | Export PDF |
| **xlsx** | Export Excel |
| **docx** | Export Word |
| **date-fns** | Manipulation dates |
| **Lucide React** | Icons |

---

## 📸 Screenshots

### Dashboard
![Dashboard](https://via.placeholder.com/800x400/3B82F6/FFFFFF?text=Dashboard+Screenshot)

### Formulaire Arabe
![Form](https://via.placeholder.com/800x400/10B981/FFFFFF?text=Arabic+Form+Screenshot)

### Liste des Cas
![List](https://via.placeholder.com/800x400/8B5CF6/FFFFFF?text=Cases+List+Screenshot)

---

## 🎯 Roadmap

- [x] Formulaire complet en arabe
- [x] Dashboard avec statistiques
- [x] Export PDF/Excel/Word
- [x] Design moderne avec animations
- [ ] Système d'authentification
- [ ] Backup automatique
- [ ] Impression directe
- [ ] Mode sombre
- [ ] Multi-langue (FR/AR)
- [ ] Application mobile

---

## 🤝 Contribution

Les contributions sont les bienvenues! 

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

---

## 📝 License

Ce projet est sous licence **MIT**. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

## 👨‍💻 Auteur

**Mehdi**
- GitHub: [@mehdi2114](https://github.com/mehdi2114)

---

## 🙏 Remerciements

- Développé pour **CAPE** (Centre d'Accompagnement pour la Protection de l'Enfance)
- Merci à tous les contributeurs
- Icons par [Lucide](https://lucide.dev)

---

<div align="center">

**⭐ Si ce projet vous aide, n'oubliez pas de mettre une étoile! ⭐**

Made with ❤️ for Child Protection

</div>
