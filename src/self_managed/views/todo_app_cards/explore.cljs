(ns self-managed.views.todo-app-states.empty
  (:require [devcards.core :as dc :refer [defcard]]
            [self-managed.cards-helpers :refer [set-app-db!]]
            [self-managed.views.todo-app :refer [todo-app]]))

(defcard explore-state
  "This is how Dayplanner looks like. You can explore this state at will."
  (dc/reagent todo-app)
  (set-app-db! {})
  {:inspect-data true
   :frame true
   :history true})