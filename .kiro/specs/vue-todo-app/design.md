# Design Document

## Overview

Aplikacja TODO list będzie zbudowana jako Single Page Application (SPA) w Vue 3 z wykorzystaniem Composition API. Aplikacja będzie składać się z głównego widoku z listą aktywnych zadań oraz sekcji z wykonanymi zadaniami. Stan aplikacji będzie zarządzany przez Pinia store z automatyczną synchronizacją z localStorage. Interfejs użytkownika będzie zbudowany z komponentów Quasar, zapewniając responsywność i profesjonalny wygląd.

## Architecture

### Architektura wysokiego poziomu

```
┌─────────────────────────────────────────┐
│                Vue 3 App                │
├─────────────────────────────────────────┤
│  Components (Quasar)                    │
│  ├── TodoApp.vue (Main Layout)          │
│  ├── TodoInput.vue (Add new tasks)      │
│  ├── TodoList.vue (Active tasks)        │
│  ├── TodoItem.vue (Single task)         │
│  └── CompletedTasks.vue (Done tasks)    │
├─────────────────────────────────────────┤
│  Pinia Store                            │
│  └── useTodoStore.js                    │
├─────────────────────────────────────────┤
│  Utils                                  │
│  ├── localStorage.js                    │
│  └── dateUtils.js                       │
├─────────────────────────────────────────┤
│  Styles                                 │
│  └── variables.scss (Color palette)     │
└─────────────────────────────────────────┘
```

### Struktura folderów

```
src/
├── components/
│   ├── TodoApp.vue
│   ├── TodoInput.vue
│   ├── TodoList.vue
│   ├── TodoItem.vue
│   └── CompletedTasks.vue
├── stores/
│   └── todoStore.js
├── utils/
│   ├── localStorage.js
│   └── dateUtils.js
├── styles/
│   └── variables.scss
├── App.vue
└── main.js
```

## Components and Interfaces

### TodoApp.vue (Main Layout)
- **Odpowiedzialność**: Główny layout aplikacji z nawigacją między sekcjami
- **Props**: Brak
- **Emits**: Brak
- **Kompozycja**: Wykorzystuje Quasar QLayout, QHeader, QPage
- **Stan**: Zarządza aktywną sekcją (active/completed)

### TodoInput.vue (Input Component)
- **Odpowiedzialność**: Formularz do dodawania nowych zadań
- **Props**: Brak
- **Emits**: Brak (komunikuje się bezpośrednio ze store)
- **Kompozycja**: Wykorzystuje Quasar QInput, QBtn
- **Stan lokalny**: Tekst inputa, walidacja

### TodoList.vue (List Component)
- **Odpowiedzialność**: Wyświetlanie listy aktywnych zadań
- **Props**: Brak
- **Emits**: Brak
- **Kompozycja**: Wykorzystuje Quasar QList
- **Computed**: Filtrowane zadania (aktywne + wykonane < 1h)

### TodoItem.vue (Item Component)
- **Odpowiedzialność**: Pojedyncze zadanie z możliwością oznaczenia jako wykonane
- **Props**: 
  - `task` (Object): Obiekt zadania
- **Emits**: Brak (komunikuje się bezpośrednio ze store)
- **Kompozycja**: Wykorzystuje Quasar QItem, QCheckbox
- **Computed**: Klasy CSS dla stanu zadania

### CompletedTasks.vue (Completed Tasks)
- **Odpowiedzialność**: Lista wszystkich wykonanych zadań
- **Props**: Brak
- **Emits**: Brak
- **Kompozycja**: Wykorzystuje Quasar QList, QItem
- **Computed**: Wszystkie wykonane zadania posortowane po dacie

## Data Models

### Task Model
```javascript
interface Task {
  id: string;           // UUID zadania
  text: string;         // Treść zadania
  completed: boolean;   // Status wykonania
  createdAt: Date;      // Data utworzenia
  completedAt: Date | null; // Data wykonania (null jeśli niewykonane)
}
```

### Store State
```javascript
interface TodoState {
  tasks: Task[];        // Wszystkie zadania
  filter: 'active' | 'completed'; // Aktualny filtr widoku
}
```

### Store Getters
```javascript
interface TodoGetters {
  activeTasks: Task[];     // Zadania niewykonane
  completedTasks: Task[];  // Wszystkie wykonane zadania
  visibleActiveTasks: Task[]; // Aktywne + wykonane < 1h
  recentlyCompleted: Task[]; // Wykonane < 1h
}
```

### Store Actions
```javascript
interface TodoActions {
  addTask(text: string): void;
  toggleTask(id: string): void;
  loadFromStorage(): void;
  saveToStorage(): void;
  cleanupOldTasks(): void;
}
```

## Error Handling

### Walidacja danych
- **Puste zadania**: Input nie pozwala na dodanie pustych zadań
- **Nieprawidłowe ID**: Sprawdzanie istnienia zadania przed operacjami
- **localStorage**: Graceful fallback gdy localStorage nie jest dostępny

### Error Boundaries
- **localStorage errors**: Try-catch z fallback do pamięci
- **Date parsing**: Walidacja dat z localStorage
- **Component errors**: Vue error handling dla komponentów

### User Feedback
- **Loading states**: Wykorzystanie Quasar loading indicators
- **Success feedback**: Subtle animations dla akcji użytkownika
- **Error messages**: Quasar notify dla błędów krytycznych

## Testing Strategy

Zgodnie z wymaganiem 9, testy jednostkowe nie będą implementowane na początkowym etapie. Jednak struktura kodu będzie przygotowana do łatwego dodania testów:

### Przygotowanie do testów
- **Separacja logiki**: Store actions oddzielone od komponentów
- **Pure functions**: Utils jako czyste funkcje
- **Dependency injection**: Możliwość mockowania localStorage
- **Component composition**: Małe, testowalne komponenty

### Przyszłe testy (do implementacji później)
- **Unit tests**: Store actions, getters, utils
- **Component tests**: Vue Test Utils + Quasar
- **Integration tests**: E2E z Cypress/Playwright
- **Accessibility tests**: Automated a11y testing

## Responsive Design

### Breakpoints (Quasar)
- **xs**: < 600px (Mobile)
- **sm**: 600px - 1023px (Tablet)
- **md**: 1024px - 1439px (Desktop)
- **lg**: 1440px+ (Large Desktop)

### Layout Adaptations
- **Mobile (xs)**: Single column, full width, touch-friendly
- **Tablet (sm)**: Single column, max-width container
- **Desktop (md+)**: Two-column layout (active | completed)

### Component Responsiveness
- **TodoInput**: Full width na mobile, ograniczona szerokość na desktop
- **TodoList**: Stack layout na mobile, grid na desktop
- **TodoItem**: Touch targets 44px+ na mobile

## Color Palette Implementation

### CSS Custom Properties
```scss
:root {
  --color-slate: #2D2C2A;   // Primary dark
  --color-oat: #EBEBEB;     // Light background
  --color-moss: #7C806F;    // Secondary accent
  --color-clay: #A78C79;    // Warm accent
  --color-stone: #C7C2BC;   // Neutral light
}
```

### Color Usage
- **SLATE (#2D2C2A)**: Główny tekst, nagłówki, aktywne elementy
- **OAT (#EBEBEB)**: Tło aplikacji, karty zadań
- **MOSS (#7C806F)**: Przyciski, linki, akcenty
- **CLAY (#A78C79)**: Hover states, secondary buttons
- **STONE (#C7C2BC)**: Wykonane zadania, disabled states

### Quasar Theme Integration
```javascript
// quasar.config.js
framework: {
  config: {
    brand: {
      primary: '#7C806F',    // MOSS
      secondary: '#A78C79',  // CLAY
      accent: '#2D2C2A',     // SLATE
      dark: '#2D2C2A',       // SLATE
      positive: '#7C806F',   // MOSS
      negative: '#A78C79',   // CLAY
      info: '#C7C2BC',       // STONE
      warning: '#A78C79'     // CLAY
    }
  }
}
```

## Performance Considerations

### Reactivity Optimization
- **Computed properties**: Dla filtrowanych list zadań
- **Shallow refs**: Dla prostych obiektów stanu
- **Watch debouncing**: Dla localStorage sync

### Memory Management
- **Task cleanup**: Automatyczne usuwanie starych zadań
- **Event listeners**: Proper cleanup w onUnmounted
- **Store persistence**: Selective persistence dla dużych list

### Bundle Optimization
- **Tree shaking**: Import tylko używanych komponentów Quasar
- **Code splitting**: Lazy loading dla sekcji completed tasks
- **Asset optimization**: Minimalne ikony i style

## Security Considerations

### Data Validation
- **Input sanitization**: XSS protection dla tekstu zadań
- **Type checking**: Runtime validation dla localStorage data
- **Size limits**: Ograniczenie długości zadań i liczby zadań

### localStorage Security
- **Data encryption**: Opcjonalne szyfrowanie wrażliwych danych
- **Storage quotas**: Handling localStorage limits
- **Cross-tab sync**: Synchronizacja między kartami przeglądarki