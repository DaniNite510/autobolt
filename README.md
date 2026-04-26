# AUTOBOLT
## A projektről
>Az Autobolt egy olyan autókereskedés, amely új és használt járművek széles választékát kínálja. Az oldalon a látogatók könnyen böngészhetnek különböző márkák és modellek között, legyen szó megbízható használt autóról vagy a legújabb, modern felszereltségű járművekről. A részletes leírások és átlátható keresési lehetőségek segítik a gyors döntést, miközben a kedvező árak és rugalmas ajánlatok minden vásárló számára vonzóvá teszik a kínálatot. Az Autobolt célja, hogy egyszerűvé és biztonságossá tegye az autóvásárlás folyamatát.

## Fejlesztési környezet
- HTML5
- CSS3
- JavaScript

## Backend 
A backend Node.js alapú, Express keretrendszerrel, és MySQL adatbázissal működik. Feladata kommunikációs hidat létesíteni a frontend (játék + weboldal) és az adatbázis között.
-[Repo](https://github.com/faat1455/autobolt_backend)

## Frontend
A frontend html, natív css és javascript alapú webes alkalmazás. Feladata kommunikációs hidat létesíteni a felhasználó és a backend között.

<img width="1173" height="731" alt="image" src="https://github.com/user-attachments/assets/bdd01133-64b9-4f42-91b3-f4bdf8a8dc3a" />

Design
- [Terv](https://www.figma.com/design/Qh24pMohCtE9X7HuRwwWI7/Untitled?node-id=0-1&t=GNkaKQ2bEdBMwEIU-1)

## Oldalak
**Home.jsx**
Ez az alkalmazás főoldala, ahol a felhasználó kereshet, szűrhet és listában megtekintheti az autókat egy reszponzív rácsos elrendezésben, valamint innen érheti el az autók részleteit.
| Fájlnév | Typus | Leyras |
|:----------------|:----------------:|----------------:|
| useResponsiveStyles.js | JavaScript | Ez a hook a képernyőméret figyelésével segít egyszerűen kezelni a mobil, tablet és desktop nézetekhez tartozó stílusokat. |
| CarFilter.jsx | JSX | Ez a car filter komponens egy egyszerűen használható szűrőfelület, amely lehetővé teszi, hogy kategória, név és ár alapján gyorsan megtalálják a számukra legmegfelelőbb autót. |
| CarCard.jsx | JSX | Tartalom |

## Oldalak
**Contact.html** 
Ez egy reszponzív kapcsolatfelvételi oldal, amely megjeleníti az elérhetőségi adatokat ikonokkal kiegészítve, és asztali nézetben egy dekoratív autóképet is mutat.
| Fájlnév | Typus | Leyras |
|:----------------|:----------------:|----------------:|
| useWindowSize.js | JavaScript | Ez a hook folyamatosan figyeli az ablak szélességét, és mindig visszaadja az aktuális width értéket. |

## Oldalak
**About.html** 
Ez az oldal bemutatja az AutoBolt vállalkozást, rövid leírással és statisztikákkal kiegészítve
| Fájlnév | Typus | Leyras |
|:----------------|:----------------:|----------------:|
| Tartalom | Tartalom | Tartalom |

## Oldalak
**AdminCars.html** 
Ez egy admin felület, amely lehetővé teszi az autók listázását, hozzáadását, szerkesztését és törlését, mobilon kártyás, asztali nézetben pedig táblázatos formában megjelenítve.
| Fájlnév | Typus | Leyras |
|:----------------|:----------------:|----------------:|
| Tartalom | Tartalom | Tartalom |

## Oldalak
**EditCar.html** 
E egy részletes autószerkesztő oldal, ahol egy adott autó adatai és képei betöltődnek, majd mezőnként szerkeszthetők és azonnal menthetők, miközben a képgaléria is kezelhető és frissíthető.
| Fájlnév | Typus | Leyras |
|:----------------|:----------------:|----------------:|
| Tartalom | Tartalom | Tartalom |

## Oldalak
**AddCar.html** 
Ez egy új autó felvételére szolgáló űrlap, amely kezeli az autó összes adatát és a képfeltöltést, majd az elkészült adatot mentésre továbbítja.
| Fájlnév | Typus | Leyras |
|:----------------|:----------------:|----------------:|
| Tartalom | Tartalom | Tartalom |

## Oldalak
**CarDetails.html** 
Ez egy részletes autó adatlap, amely betölti és megjeleníti az adott autó összes információját (képgaléria, műszaki adatok, ár és leírás), valamint támogatja a képek nagyítását és teljes képernyős nézetét is.
| Fájlnév | Typus | Leyras |
|:----------------|:----------------:|----------------:|
| Tartalom | Tartalom | Tartalom |

## Oldalak
**ImagesPage.html** 
| Fájlnév | Typus | Leyras |
|:----------------|:----------------:|----------------:|
| Tartalom | Tartalom | Tartalom |

## Oldalak
**Login.html** 
Ez egy admin bejelentkezési felület, amely email és jelszó alapján hitelesíti a felhasználót, kezeli a hibákat és betöltést, majd sikeres admin login esetén belépteti a rendszert.
| Fájlnév | Typus | Leyras |
|:----------------|:----------------:|----------------:|
| Tartalom | Tartalom | Tartalom |

## Oldalak
**CarForm.html** 
| Fájlnév | Typus | Leyras |
|:----------------|:----------------:|----------------:|
| Tartalom | Tartalom | Tartalom |

