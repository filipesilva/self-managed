(ns self-managed.states.empty
  (:require [self-managed.views :refer [todo-app]]
            [self-managed.states.helpers :refer [set-app-db!]]
            [devcards.core :as dc :include-macros true :refer [defcard]]))

(defcard empty-state
  "This is how Dayplanner looks when there are no items."
  (dc/reagent todo-app)
  (set-app-db! {})
  {:inspect-data true
   :frame true
   :history true})
