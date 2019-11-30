(ns self-managed.views.todo-app-cards.some
  (:require [reagent.core :as r]
            [day8.re-frame.test :refer [run-test-sync]]
            [devcards.core :as dc :refer [defcard deftest]]
            [cljs.test :include-macros true :refer [is]]
            ["@testing-library/react" :refer [render cleanup]]
            [self-managed.cards.helpers :refer [set-app-db! testing-container]]
            [self-managed.views.todo-app :refer [todo-app]]))

(def state-db {:todos {1 {:id 1 :title "first" :done false}
                       2 {:id 2 :title "second" :done false}
                       3 {:id 3 :title "third and done" :done true}}})

(defcard some-state
  "This is how Dayplanner looks when there are some items."
  (dc/reagent todo-app)
  (set-app-db! state-db)
  {:inspect-data true
   :frame true
   :history true})

(deftest some-state-tests
  (run-test-sync
   (set-app-db! state-db)
   (let [tr (render (r/as-element [todo-app]) #js {:container (testing-container)})]
     (is (and (.queryByText tr "first")
              (.queryByText tr "second")
              (.queryByText tr "third and done"))
         "Should show all three elements")
     (is (.queryByLabelText tr "Mark all as complete") "Should show 'Mark all as complete' input")
     (is (.queryByText tr "Clear completed") "Should show 'Clear completed' button")
     (cleanup))))