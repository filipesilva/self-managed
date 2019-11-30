(ns self-managed.views.todo-app
  (:require [re-frame.core :refer [subscribe]]
            [self-managed.views.views :refer [task-entry task-list footer-controls]]))

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
