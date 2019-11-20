(ns self-managed.views.todo-app-states.empty
  (:require [reagent.core :as r]
            [devcards.core :as dc :refer [defcard deftest]]
            [cljs.test :include-macros true :refer [is]]
            ["@testing-library/react" :refer [render cleanup]]
            [self-managed.cards-helpers :refer [set-app-db! testing-container]]
            [self-managed.views.todo-app :refer [todo-app]]))

(defcard empty-state
  "*This is how Dayplanner looks when there are no items.*"
  (dc/reagent todo-app)
  (set-app-db! {})
  {:inspect-data true
   :frame true
   :history true})

(deftest empty-state-tests
  (let [tr (render (r/as-element [todo-app]) #js {:container testing-container})]
    (set-app-db! {})
    (is (.queryAllByText tr #"items left") "Should list items left")
    (is (.queryByText tr "All") "Should show 'All' filter")
    (is (.queryByText tr "Active") "Should show 'Active' filter")
    (is (.queryByText tr "Completed") "Should show 'Completed' filter")
    (is (not (.queryByLabelText tr "Mark all as complete")) "Should not show 'Mark all as complete' input")
    (is (not (.queryByText tr "Clear completed")) "Should not show 'Clear completed' button")
    (cleanup)))