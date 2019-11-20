(ns self-managed.states.empty
  (:require [reagent.core :as r]
            [devcards.core :as dc :include-macros true :refer [defcard deftest]]
            [cljs.test :include-macros true :refer [is]]
            ["@testing-library/react" :refer [render cleanup]]
            [self-managed.states.helpers :refer [set-app-db!]]
            [self-managed.views :refer [todo-app]]))

(defcard empty-state
  "*This is how Dayplanner looks when there are no items.*"
  (dc/reagent todo-app)
  (set-app-db! {})
  {:inspect-data true
   :frame true
   :history true})

(deftest empty-state-tests
  (set-app-db! {})
  (let [el (aget (js/document.querySelectorAll "#app") 0)
        tr (render (r/as-element [todo-app]) #js {:container el})]
    (is (.queryAllByText tr #"items left") "Should list items left")
    (is (.queryByText tr "All") "Should show 'All' filter")
    (is (.queryByText tr "Active") "Should show 'Active' filter")
    (is (.queryByText tr "Completed") "Should show 'Completed' filter")
    (is (not (.queryByLabelText tr "Mark all as complete")) "Should not show 'Mark all as complete' input")
    (is (not (.queryByText tr "Clear completed")) "Should not show 'Clear completed' button")
    (cleanup)))