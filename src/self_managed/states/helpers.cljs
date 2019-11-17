(ns self-managed.states.helpers
  (:require [re-frame.core :refer [reg-event-db dispatch]]
            [re-frame.db :refer [app-db]]
            [self-managed.db :refer [default-db]]
            [self-managed.events :refer [check-spec-interceptor]]))

; Add an event to set the db to a predefined state.
(reg-event-db
 :set-db
 [check-spec-interceptor]
 (fn [_ [_ new-db]]
   (let [sorted-new-db (assoc new-db :todos (into (sorted-map) (:todos new-db)))]
     (merge default-db sorted-new-db))))

(defn set-app-db!
  [new-db]
  (dispatch [:set-db new-db])
  app-db)