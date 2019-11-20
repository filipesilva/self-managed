(ns self-managed.views.todo-app
  (:require [re-frame.core :refer [subscribe]]
            [self-managed.views.views :refer [task-entry task-list footer-controls]]
            [self-managed.cards-helpers :refer [set-app-db!]]
            [devcards.core :as dc :include-macros true :refer [defcard]]))

(defn todo-app
  []
  [:div
   [:section#todoapp
    [task-entry]
    (when (seq @(subscribe [:todos]))
      [task-list])
    [footer-controls]]
   [:footer#info
    [:p "Double-click to edit a todo"]]])


(defcard explore-state
  "This is how Dayplanner looks like. You can explore this state at will."
  (dc/reagent todo-app)
  (set-app-db! {})
  {:inspect-data true
   :frame true
   :history true})