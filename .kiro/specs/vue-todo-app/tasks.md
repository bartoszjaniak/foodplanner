# Implementation Plan

- [x] 1. Konfiguracja projektu i podstawowa struktura



  - Stworzenie projektu Vue 3 z Vite
  - Instalacja i konfiguracja Quasar
  - Instalacja i konfiguracja Pinia
  - Konfiguracja palety kolorów w Quasar theme
  - Stworzenie podstawowej struktury folderów
  - _Requirements: 6.1, 6.2, 7.1, 8.1_


- [ ] 2. Implementacja modeli danych i utilities



  - [ ] 2.1 Stworzenie interfejsów TypeScript dla Task i Store

    - Definicja interfejsu Task z wszystkimi polami
    - Definicja interfejsów dla Store state, getters i actions


    - _Requirements: 7.4, 9.2_

  - [ ] 2.2 Implementacja utilities dla localStorage

    - Funkcje do zapisu i odczytu z localStorage


    - Error handling dla przypadków gdy localStorage nie jest dostępny
    - Funkcje do walidacji danych z localStorage
    - _Requirements: 7.5, 7.6_


  - [x] 2.3 Implementacja utilities dla dat


    - Funkcje do sprawdzania czy zadanie jest starsze niż godzina
    - Funkcje do formatowania dat dla wyświetlania
    - Funkcje do sortowania zadań po dacie
    - _Requirements: 3.1, 3.2, 4.3_


- [ ] 3. Implementacja Pinia store

  - [ ] 3.1 Stworzenie podstawowego store z state

    - Definicja reaktywnego state dla zadań
    - Inicjalizacja pustej listy zadań
    - Konfiguracja store w main.js

    - _Requirements: 7.1, 7.2_

  - [ ] 3.2 Implementacja getters dla filtrowania zadań

    - Getter dla aktywnych zadań (niewykonane)
    - Getter dla wszystkich wykonanych zadań
    - Getter dla widocznych aktywnych zadań (aktywne + wykonane < 1h)

    - Getter dla niedawno wykonanych zadań
    - _Requirements: 3.1, 3.3, 4.1, 4.3_

  - [x] 3.3 Implementacja actions dla zarządzania zadaniami



    - Action do dodawania nowego zadania z walidacją
    - Action do przełączania statusu zadania (completed/active)
    - Action do ładowania danych z localStorage przy starcie
    - Action do zapisywania danych do localStorage
    - _Requirements: 1.1, 1.2, 2.1, 2.4, 7.5, 7.6_

  - [x] 3.4 Integracja automatycznej synchronizacji z localStorage

    - Watch na zmiany w store do automatycznego zapisu
    - Inicjalizacja store z danych z localStorage


    - Cleanup starych zadań przy ładowaniu
    - _Requirements: 7.5, 7.6, 3.2_

- [ ] 4. Implementacja komponentu TodoInput

  - Stworzenie komponentu z Quasar QInput i QBtn

  - Implementacja reaktywnego inputa z v-model
  - Walidacja pustych zadań
  - Integracja z store action do dodawania zadań
  - Czyszczenie inputa po dodaniu zadania
  - Obsługa klawisza Enter
  - _Requirements: 1.1, 1.2, 1.3, 8.2, 8.3_


- [ ] 5. Implementacja komponentu TodoItem

  - [x] 5.1 Stworzenie podstawowego komponentu zadania


    - Komponent z props dla obiektu Task


    - Wyświetlanie tekstu zadania
    - Checkbox do oznaczania jako wykonane
    - Wykorzystanie Quasar QItem i QCheckbox
    - _Requirements: 2.1, 8.1, 8.2_


  - [ ] 5.2 Implementacja stylów dla różnych stanów zadania

    - Style dla aktywnych zadań (normalne kolory)
    - Style dla wykonanych zadań (wyszarzenie, przekreślenie)
    - Wykorzystanie palety kolorów z theme
    - Smooth transitions między stanami

    - _Requirements: 2.2, 6.3, 6.4_

  - [x] 5.3 Integracja z store do zmiany statusu

    - Wywołanie store action przy kliknięciu checkbox
    - Reaktywne aktualizowanie wyglądu na podstawie store state


    - _Requirements: 2.1, 7.2, 7.3_

- [ ] 6. Implementacja komponentu TodoList

  - [x] 6.1 Stworzenie komponentu listy aktywnych zadań


    - Komponent wykorzystujący Quasar QList
    - Pobieranie zadań z store getter (visibleActiveTasks)
    - Renderowanie TodoItem dla każdego zadania

    - _Requirements: 3.1, 8.3_



  - [ ] 6.2 Implementacja automatycznego sortowania zadań

    - Aktywne zadania na górze
    - Wykonane zadania (< 1h) na dole listy
    - Sortowanie wykonanych po czasie wykonania

    - _Requirements: 2.3, 3.1_

  - [ ] 6.3 Implementacja responsywnego layoutu
    - Adaptacja do różnych rozmiarów ekranu
    - Touch-friendly na urządzeniach mobilnych
    - _Requirements: 5.1, 5.2, 5.3_


- [ ] 7. Implementacja komponentu CompletedTasks

  - [x] 7.1 Stworzenie komponentu dla wykonanych zadań


    - Komponent wykorzystujący Quasar QList


    - Pobieranie wszystkich wykonanych zadań z store
    - Wyświetlanie daty i czasu wykonania
    - _Requirements: 4.1, 4.2, 4.3_

  - [x] 7.2 Implementacja sortowania i formatowania dat

    - Sortowanie od najnowszych do najstarszych
    - Czytelne formatowanie dat (np. "2 godziny temu")
    - Wykorzystanie utilities do formatowania dat
    - _Requirements: 4.3_

- [x] 8. Implementacja głównego komponentu TodoApp



  - [ ] 8.1 Stworzenie layoutu aplikacji

    - Wykorzystanie Quasar QLayout, QHeader, QPage


    - Nawigacja między sekcjami (Active/Completed)
    - Responsywny layout z breakpoints


    - _Requirements: 5.1, 5.2, 5.3, 8.1_

  - [ ] 8.2 Integracja wszystkich komponentów

    - Umieszczenie TodoInput w headerze
    - Warunkowe wyświetlanie TodoList lub CompletedTasks

    - Zarządzanie aktywną sekcją w local state
    - _Requirements: 8.2_

  - [ ] 8.3 Implementacja nawigacji między sekcjami
    - Przyciski/taby do przełączania widoków
    - Wskaźnik liczby zadań w każdej sekcji

    - Smooth transitions między widokami
    - _Requirements: 4.1_

- [ ] 9. Stylowanie i responsywność

  - [ ] 9.1 Implementacja globalnych stylów

    - Konfiguracja CSS custom properties dla palety kolorów
    - Globalne style dla typografii i spacing
    - Integracja z Quasar theme variables
    - _Requirements: 6.1, 6.2_

  - [ ] 9.2 Implementacja responsywnych stylów

    - Media queries dla różnych breakpoints
    - Adaptacja layoutu dla mobile/tablet/desktop
    - Touch-friendly elementy na urządzeniach mobilnych
    - _Requirements: 5.1, 5.2, 5.3, 5.4_

  - [ ] 9.3 Finalne dopracowanie UI/UX
    - Smooth animations i transitions
    - Hover states i focus indicators
    - Consistent spacing i typography
    - Accessibility improvements (ARIA labels, keyboard navigation)
    - _Requirements: 6.2, 8.2_

- [ ] 10. Integracja i finalne testy

  - [ ] 10.1 Testowanie funkcjonalności w przeglądarce

    - Dodawanie i oznaczanie zadań jako wykonane
    - Automatyczne przenoszenie wykonanych zadań
    - Ukrywanie zadań starszych niż godzina
    - Synchronizacja z localStorage
    - _Requirements: 1.1, 1.2, 2.1, 2.2, 2.3, 3.1, 7.5, 7.6_

  - [ ] 10.2 Testowanie responsywności

    - Testowanie na różnych rozmiarach ekranu
    - Testowanie orientacji portrait/landscape
    - Testowanie touch interactions na mobile
    - _Requirements: 5.1, 5.2, 5.3, 5.4_

  - [ ] 10.3 Optymalizacja wydajności
    - Sprawdzenie bundle size
    - Optymalizacja re-renderów komponentów
    - Testowanie z dużą liczbą zadań
    - _Requirements: 7.3_
