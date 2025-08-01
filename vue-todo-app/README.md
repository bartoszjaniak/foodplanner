# Vue 3 TODO List App

Prosta aplikacja TODO list zbudowana w Vue 3 z wykorzystaniem Pinia i Quasar.

## ✨ Funkcjonalności

- ➕ **Dodawanie zadań** - łatwe dodawanie nowych zadań z poziomu inputa
- ✅ **Oznaczanie jako wykonane** - kliknij zadanie lub checkbox aby oznaczyć jako wykonane
- 🔄 **Automatyczne sortowanie** - wykonane zadania przenoszą się na dół listy
- ⏰ **Automatyczne ukrywanie** - zadania wykonane starsze niż godzina znikają z głównej listy
- 📋 **Historia wykonanych** - wszystkie wykonane zadania dostępne w osobnej sekcji
- 💾 **Trwałość danych** - automatyczna synchronizacja z localStorage
- 📱 **Responsywność** - działa na wszystkich urządzeniach
- 🎨 **Piękny design** - spójna paleta kolorów i smooth animacje

## 🎨 Paleta kolorów

- **SLATE** (#2D2C2A) - Główny tekst, nagłówki
- **OAT** (#EBEBEB) - Tło aplikacji
- **MOSS** (#7C806F) - Przyciski, akcenty
- **CLAY** (#A78C79) - Hover states, secondary
- **STONE** (#C7C2BC) - Wykonane zadania, disabled

## 🛠️ Technologie

- **Vue 3** - Framework z Composition API
- **Pinia** - Zarządzanie stanem
- **Quasar** - Biblioteka komponentów UI
- **TypeScript** - Typowanie
- **Vite** - Build tool
- **SCSS** - Stylowanie

## 🚀 Uruchomienie

### Instalacja

```bash
npm install
```

### Tryb deweloperski

```bash
npm run dev
```

### Build produkcyjny

```bash
npm run build
```

### Podgląd buildu

```bash
npm run preview
```

## 📁 Struktura projektu

```
src/
├── components/          # Komponenty Vue
│   ├── TodoApp.vue     # Główny layout aplikacji
│   ├── TodoInput.vue   # Input do dodawania zadań
│   ├── TodoList.vue    # Lista aktywnych zadań
│   ├── TodoItem.vue    # Pojedyncze zadanie
│   └── CompletedTasks.vue # Lista wykonanych zadań
├── stores/             # Pinia stores
│   └── todoStore.ts    # Store dla zadań
├── utils/              # Funkcje pomocnicze
│   ├── localStorage.ts # Obsługa localStorage
│   └── dateUtils.ts    # Funkcje do dat
├── types/              # Definicje TypeScript
│   └── index.ts        # Interfejsy
├── styles/             # Style globalne
│   ├── variables.scss  # Zmienne CSS i globalne style
│   └── animations.scss # Animacje
└── App.vue            # Główny komponent
```

## 🎯 Jak używać

1. **Dodawanie zadań**: Wpisz tekst w pole input i naciśnij Enter lub kliknij przycisk +
2. **Oznaczanie jako wykonane**: Kliknij na zadanie lub checkbox
3. **Przeglądanie wykonanych**: Przejdź do zakładki "Wykonane"
4. **Przywracanie zadań**: W sekcji wykonanych kliknij przycisk undo

## 📱 Responsywność

Aplikacja automatycznie dostosowuje się do różnych rozmiarów ekranu:

- **Mobile** (< 600px): Single column, touch-friendly
- **Tablet** (600px - 1023px): Optimized layout
- **Desktop** (1024px+): Full layout with enhanced UX

## 💾 Przechowywanie danych

Wszystkie zadania są automatycznie zapisywane w localStorage przeglądarki. Dane są:

- Automatycznie zapisywane przy każdej zmianie
- Ładowane przy starcie aplikacji
- Walidowane pod kątem poprawności
- Czyszczone z zadań starszych niż 7 dni (opcjonalnie)

## 🔧 Konfiguracja

Aplikacja nie wymaga dodatkowej konfiguracji. Wszystkie ustawienia są wbudowane.

## 🎨 Customizacja

Aby zmienić kolory, edytuj zmienne CSS w `src/styles/variables.scss`:

```scss
:root {
  --color-slate: #2D2C2A;   // Twój kolor
  --color-oat: #EBEBEB;     // Twój kolor
  // ... inne kolory
}
```

## 🚀 Deployment

Aplikacja może być wdrożona na dowolnym serwerze statycznym:

1. Uruchom `npm run build`
2. Upload zawartość folderu `dist/` na serwer
3. Gotowe!

## 📄 Licencja

MIT License - możesz swobodnie używać i modyfikować kod.

---

Stworzone z ❤️ przy użyciu Vue 3, Pinia i Quasar