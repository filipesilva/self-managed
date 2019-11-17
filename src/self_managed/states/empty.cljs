(ns self-managed.states.empty
  (:require
   [re-frame.core :refer [dispatch]]
   [re-frame.db :refer [app-db]]
   [self-managed.views :refer [todo-app]]
   [devcards.core :as dc :include-macros true :refer [defcard]]))

(defcard empty-state
  "This is how Dayplanner looks when there are no items."
  (dc/reagent todo-app)
  (do (dispatch [:set-db {}]) app-db)
  {:inspect-data true
   :frame true
   :history true})
