# 🚗 AUTOBOLT

## A projektről
> Az Autobolt egy olyan autókereskedés, amely új és használt járművek széles választékát kínálja. Az oldalon a látogatók könnyen böngészhetnek különböző márkák és modellek között, legyen szó megbízható használt autóról vagy a legújabb, modern felszereltségű járművekről. A részletes leírások és átlátható keresési lehetőségek segítik a gyors döntést, miközben a kedvező árak és rugalmas ajánlatok minden vásárló számára vonzóvá teszik a kínálatot. Az Autobolt célja, hogy egyszerűvé és biztonságossá tegye az autóvásárlás folyamatát.

---

## 📋 Tartalomjegyzék

- [Fejlesztési környezet](#fejlesztési-környezet)
- [Backend](#backend)
- [Frontend](#frontend)
- [Oldalak](#oldalak)
- [Használt eszközök](#használt-eszközök)

---

## Fejlesztési környezet

![CSS3](https://img.shields.io/badge/CSS3-1572b6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-f7df1e?style=flat-square&logo=javascript&logoColor=black)
![React](https://img.shields.io/badge/React-61dafb?style=flat-square&logo=react&logoColor=black)

---

## Backend

A backend Node.js alapú, Express keretrendszerrel, és MySQL adatbázissal működik. Feladata kommunikációs hidat létesíteni a frontend és az adatbázis között.

- **GitHub repo:** [github.com/faat1455/autobolt_backend](https://github.com/faat1455/autobolt_backend)

---

## Frontend

A frontend React alapú webes alkalmazás. Feladata kommunikációs hidat létesíteni a felhasználó és a backend között.

<img width="1173" height="731" alt="image" src="https://github.com/user-attachments/assets/bdd01133-64b9-4f42-91b3-f4bdf8a8dc3a" />

<br/>

> 🎨 [Figma terv](https://www.figma.com/design/Qh24pMohCtE9X7HuRwwWI7/Untitled?node-id=0-1&t=GNkaKQ2bEdBMwEIU-1)

---

## Oldalak

### 🏠 Home.jsx
Ez az alkalmazás főoldala, ahol a felhasználó kereshet, szűrhet és listában megtekintheti az autókat egy reszponzív rácsos elrendezésben, valamint innen érheti el az autók részleteit.

| Fájlnév | Típus | Leírás |
|:----------------|:----------------:|:----------------|
| useResponsiveStyles.js | ![JS](https://img.shields.io/badge/JavaScript-f7df1e?style=flat-square&logo=javascript&logoColor=black) | Ez a hook a képernyőméret figyelésével segít egyszerűen kezelni a mobil, tablet és desktop nézetekhez tartozó stílusokat. |
| CarFilter.jsx | ![JSX](https://img.shields.io/badge/JSX-61dafb?style=flat-square&logo=react&logoColor=black) | Ez a car filter komponens egy egyszerűen használható szűrőfelület, amely lehetővé teszi, hogy kategória, név és ár alapján gyorsan megtalálják a számukra legmegfelelőbb autót. |
| CarCard.jsx | ![JSX](https://img.shields.io/badge/JSX-61dafb?style=flat-square&logo=react&logoColor=black) | Autó kártya komponens. |

---

### 📞 Contact.jsx
Ez egy reszponzív kapcsolatfelvételi oldal, amely megjeleníti az elérhetőségi adatokat ikonokkal kiegészítve, és asztali nézetben egy dekoratív autóképet is mutat.

| Fájlnév | Típus | Leírás |
|:----------------|:----------------:|:----------------|
| useWindowSize.js | ![JS](https://img.shields.io/badge/JavaScript-f7df1e?style=flat-square&logo=javascript&logoColor=black) | Ez a hook folyamatosan figyeli az ablak szélességét, és mindig visszaadja az aktuális width értéket. |

---

### ℹ️ About.jsx
Ez az oldal bemutatja az AutoBolt vállalkozást, rövid leírással és statisztikákkal kiegészítve.

| Fájlnév | Típus | Leírás |
|:----------------|:----------------:|:----------------|
| useWindowSize.js | ![JS](https://img.shields.io/badge/JavaScript-f7df1e?style=flat-square&logo=javascript&logoColor=black) | Ez a hook folyamatosan figyeli az ablak szélességét, és mindig visszaadja az aktuális width értéket. |

---

### 🛠️ AdminCars.jsx
Ez egy admin felület, amely lehetővé teszi az autók listázását, hozzáadását, szerkesztését és törlését, mobilon kártyás, asztali nézetben pedig táblázatos formában megjelenítve.

| Fájlnév | Típus | Leírás |
|:----------------|:----------------:|:----------------|
| useWindowSize.js | ![JS](https://img.shields.io/badge/JavaScript-f7df1e?style=flat-square&logo=javascript&logoColor=black) | Ez a hook folyamatosan figyeli az ablak szélességét, és mindig visszaadja az aktuális width értéket. |

---

### ✏️ EditCar.jsx
Ez egy részletes autószerkesztő oldal, ahol egy adott autó adatai és képei betöltődnek, majd mezőnként szerkeszthetők és azonnal menthetők, miközben a képgaléria is kezelhető és frissíthető.

| Fájlnév | Típus | Leírás |
|:----------------|:----------------:|:----------------|
| useResponsiveStyles.js | ![JS](https://img.shields.io/badge/JavaScript-f7df1e?style=flat-square&logo=javascript&logoColor=black) | Ez a hook a képernyőméret figyelésével segít egyszerűen kezelni a mobil, tablet és desktop nézetekhez tartozó stílusokat. |
| EditableRow.jsx | ![JSX](https://img.shields.io/badge/JSX-61dafb?style=flat-square&logo=react&logoColor=black) | Ez egy adatmezőt jelenít meg, és lehetővé teszi annak helyben történő szerkesztését (input, select vagy textarea segítségével), majd mentését vagy visszavonását. |
| ImageGallery.jsx | ![JSX](https://img.shields.io/badge/JSX-61dafb?style=flat-square&logo=react&logoColor=black) | Ez egy képfeltöltő és kezelő komponens, amely lehetővé teszi maximum 4 kép feltöltését, előnézetét, törlését és a fő kép kijelölését. |
| api.js | ![JS](https://img.shields.io/badge/JavaScript-f7df1e?style=flat-square&logo=javascript&logoColor=black) | Ez egy központi API modul, ami az alkalmazás backendjével való kommunikációt kezeli. |

---

### ➕ AddCar.jsx
Ez egy új autó felvételére szolgáló űrlap, amely kezeli az autó összes adatát és a képfeltöltést, majd az elkészült adatot mentésre továbbítja.

| Fájlnév | Típus | Leírás |
|:----------------|:----------------:|:----------------|
| useResponsiveStyles.js | ![JS](https://img.shields.io/badge/JavaScript-f7df1e?style=flat-square&logo=javascript&logoColor=black) | Ez a hook a képernyőméret figyelésével segít egyszerűen kezelni a mobil, tablet és desktop nézetekhez tartozó stílusokat. |
| api.js | ![JS](https://img.shields.io/badge/JavaScript-f7df1e?style=flat-square&logo=javascript&logoColor=black) | Ez egy központi API modul, ami az alkalmazás backendjével való kommunikációt kezeli. |

---

### 🚗 CarDetails.jsx
Ez egy részletes autó adatlap, amely betölti és megjeleníti az adott autó összes információját (képgaléria, műszaki adatok, ár és leírás), valamint támogatja a képek nagyítását és teljes képernyős nézetét is.

| Fájlnév | Típus | Leírás |
|:----------------|:----------------:|:----------------|
| useWindowSize.js | ![JS](https://img.shields.io/badge/JavaScript-f7df1e?style=flat-square&logo=javascript&logoColor=black) | Ez a hook folyamatosan figyeli az ablak szélességét, és mindig visszaadja az aktuális width értéket. |
| api.js | ![JS](https://img.shields.io/badge/JavaScript-f7df1e?style=flat-square&logo=javascript&logoColor=black) | Ez egy központi API modul, ami az alkalmazás backendjével való kommunikációt kezeli. |

---

### 🖼️ ImagesPage.jsx

| Fájlnév | Típus | Leírás |
|:----------------|:----------------:|:----------------|
| api.js | ![JS](https://img.shields.io/badge/JavaScript-f7df1e?style=flat-square&logo=javascript&logoColor=black) | Ez egy központi API modul, ami az alkalmazás backendjével való kommunikációt kezeli. |

---

### 🔐 Login.jsx
Ez egy admin bejelentkezési felület, amely email és jelszó alapján hitelesíti a felhasználót, kezeli a hibákat és betöltést, majd sikeres admin login esetén belépteti a rendszert.

| Fájlnév | Típus | Leírás |
|:----------------|:----------------:|:----------------|
| api.js | ![JS](https://img.shields.io/badge/JavaScript-f7df1e?style=flat-square&logo=javascript&logoColor=black) | Ez egy központi API modul, ami az alkalmazás backendjével való kommunikációt kezeli. |

---

## Használt eszközök

- **[VS Code](https://code.visualstudio.com/)**
- **[NPM](https://www.npmjs.com/)**
- **[Postman](https://www.postman.com/)**
- **[DrawSQL](https://drawsql.app/)**
- **[W3Schools](https://www.w3schools.com/)**
- **[ChatGPT](https://chatgpt.com/)**
- **[Claude](https://claude.ai/)**
- **[Gemini](https://gemini.google.com/)**
- **[GitHub](https://github.com/)**
- **[PhpMyAdmin](https://www.phpmyadmin.net/)**
