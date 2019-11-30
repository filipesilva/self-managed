(ns self-managed.cards.helpers
  (:require [re-frame.core :refer [reg-event-db dispatch dispatch-sync]]
            [re-frame.db :refer [app-db]]
            [self-managed.db :refer [default-db persist-data]]
            [self-managed.events :refer [check-spec-interceptor]]))

(defn setup-db []
  ; Disable data persistance on the db layer.
  (reset! persist-data false)
  ; Initialize db.
  (dispatch-sync [:initialise-db]))

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

(defn testing-container
  "The container that should be used to render testing-library react components.
  We want to provide our own container so that the devcard render isn't used."
  []
  (let [app-div (js/document.createElement "div")]
    (.setAttribute app-div "id" "testing-lib")
    (js/document.body.appendChild app-div)))