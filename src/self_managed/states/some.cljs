(ns self-managed.states.some
  (:require [self-managed.states.helpers :refer [set-app-db!]]
            [self-managed.views :refer [todo-app]]
            [devcards.core :as dc :include-macros true :refer [defcard]]))

(defcard some-state
  "This is how Dayplanner looks when there are some items."
  (dc/reagent todo-app)
  (set-app-db! {:todos {1 {:id 1 :title "first" :done false}
                        2 {:id 2 :title "second" :done false}
                        3 {:id 3 :title "third and done" :done true}}})
  {:inspect-data true
   :frame true
   :history true})
