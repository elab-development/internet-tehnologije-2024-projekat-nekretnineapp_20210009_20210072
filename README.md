# Estate Flow

![Logo](./images/logo.png)

**Estate Flow** je full-stack web aplikacija za rezervaciju i upravljanje nekretninama, razvijena korišćenjem **React** (front-end) i **Laravel** (back-end). Aplikacija je prilagođena za tri tipa korisnika:

- **Kupac (Buyer)** — pretražuje i rezerviše nekretnine  
- **Agent (Agent)** — objavljuje nove nekretnine i upravlja rezervacijama  
- **Administrator (Admin)** — nadgleda sve korisnike, nekretnine i rezervacije  

---

## Tehnološki stack

- **Front-end:** React, React Router, Axios, React Icons, CSS  
- **Back-end:** Laravel 10, Sanctum (token-based autentikacija), Eloquent ORM  
- **Baza podataka:** MySQL  
- **Mape & geokodiranje:** OpenStreetMap Nominatim API  
- **Citati javni web servis:** Dummy JSON Quotes API  
- **Slike koje se mogu rotirati za 360 stepeni:** Momento 360 API 

---

## Arhitektura i komunikacija

1. **React** aplikacija poziva REST API rute koje pruža **Laravel**.  
2. Nakon uspešne prijave (`/api/login`) Laravel Sanctum vraća **token** koji React čuva u `sessionStorage`.  
3. Svaki naredni zahtev sa front-enda (axios) automatski dodaje `Authorization: Bearer <token>`.  
4. Laravel middleware (`auth:sanctum`) štiti privatne rute — samo ulogovani korisnici odgovarajuće uloge mogu pristupiti svojim podacima.  

---

## Glavne funkcionalnosti

- **Registracija / Prijava**  
- **Pregled i pretraga nekretnina**  
- **Detalji nekretnine** (opis, slika, 360° view, lokacija po nazivu)  
- **Mapa sveta** sa markerima nekretnina  
- **Rezervacija** (kupac unosi napomenu i bira način plaćanja)  
- **„Moje rezervacije“** (kupac) i **„Rezervacije primljene“** (agent)  
- **Upravljanje nekretninama** (agent može kreirati, izmeniti i obrisati svoje nekretnine)  
- **Administratorski deo**: lista korisnika, brisanje korisnika (sa svim povezanim nekretninama i rezervacijama)  

---

## Uloge korisnika

| Uloga      | Dozvole                                                                                     |
|:-----------|:--------------------------------------------------------------------------------------------|
| **Buyer**  | Pretraga & filtriranje nekretnina, rezervacija, pregled i brisanje sopstvenih rezervacija.  |
| **Agent**  | Kreiranje, izmena i brisanje sopstvenih nekretnina; pregled i upravljanje rezervacijama za svoje nekretnine (potvrda/odbijanje). |
| **Admin**  | Pregled i brisanje svih korisnika; nadzor nad svim nekretninama i rezervacijama.           |

---

## Opis stranica

### 1. Login (`/login`)
- Unos e-maila i šifre  
- Link **„Forgot your password? Reset it.“** otvara modal za resetovanje lozinke  
- Nakon uspešne prijave — redirekcija na početnu stranicu u zavisnosti od uloge  

### 2. Register (`/register`)
- Forma za kreiranje naloga (ime, e-mail, šifra, uloga)  

### 3. Buyer Home (`/`)
- Hero sekcija sa pozdravom  
- Dugmad: **„Explore Listings“** & **„Explore Locations“**  

### 4. About Us (`/about`)
- Kratka priča o kompaniji  
- Timeline sa ključnim godinama i milestone-ima  

### 5. Our Properties (`/our-properties`)
- Lista svih nekretnina — karta sa markerima + paginacija  
- Pretraga po nazivu i sortiranje po ceni  

### 6. Property Details (`/properties/:id`)
- Naziv, glavni opis, cena, lokacija (grad, država), detaljan opis  
- 360° ugrađeni pregled  
- **Book Now** otvara modal za unos napomene i izbora plaćanja (gotovina/kartica)  

### 7. World Map (`/world-map`)
- Interaktivna mapa sa markerima za svaku nekretninu  
- Pretraga i prikaz broja nekretnina  

### 8. Our Team (`/team`)
- Kartice sa članovima tima: ime, pozicija, kratak opis  

### 9. My Bookings (Buyer) (`/my-bookings-buyer`)
- Grid kartice rezervacija kupca  
- Prikaz svih podataka: datum, kategorija, cena, način plaćanja, agent  
- Moguće brisanje rezervacije  

### 10. My Bookings (Agent) (`/my-bookings-agent`)
- Lista rezervacija primljenih na nekretnine agenta  
- Kartice sa statusom (`Pending`, `Completed`, `Canceled`)  
- Dugmad za potvrdu ili odbijanje rezervacije  

### 11. My Properties (Agent) (`/my-properties`)
- Grid prikaz nekretnina koje je agent kreirao  
- Kartice sa slikom, nazivom, kategorijom, cenom, lokacijom  
- Ikone za izmenu i brisanje nekretnine  
- Modal za kreiranje nove nekretnine (geokodiranje naziva lokacije u lat/long)  

### 12. Admin Home (`/admin-home`)
- Pozdravna hero sekcija za administratora  
- Dugme **„Go to Dashboard“**  

### 13. Dashboard (Admin) (`/dashboard`)
- Tabela svih korisnika (bez admin naloga)  
- Kolone: ID, ime, e-mail, uloga, datum kreiranja  
- Dugme **Delete** briše korisnika i sve njegove poveznice (nekretnine i rezervacije)  

---
⚙️ Instalacija i pokretanje
---------------------------

1. Klonirajte repozitorijum:
```bash
    git clone https://github.com/elab-development/internet-tehnologije-2024-projekat-nekretnineapp_20210009_20210072.git
```
2. Pokrenite backend:
```bash
   cd nekretnine-app
   composer install
   php artisan migrate:fresh --seed
   php artisan serve
```
    
3. Pokrenite frontend:
```bash
   cd nekretnine-front-app
   npm install
   npm start
```
    
4.  Frontend pokrenut na: [http://localhost:3000](http://localhost:3000) Backend API pokrenut na: [http://127.0.0.1:8000/api](http://127.0.0.1:8000/api)