(ns self-managed.cards
  (:require [cljsjs.react]        ; devcards needs these cljsjs.react and cljsjs.react.dom to be 
            [cljsjs.react.dom]    ; imported separately for shadow-cljs to add shims.
            [re-frame.core :refer [dispatch-sync]]
            [devcards.core :refer [start-devcard-ui!]]
            [self-managed.db :refer [persist-data]]
            [self-managed.events] ; Also load the events and subs for state cards to work.
            [self-managed.subs] 
            [self-managed.cards-helpers]
            [self-managed.views.todo-app]
            [self-managed.views.todo-app-states.empty]
            [self-managed.views.todo-app-states.some]))

(defn setup-db []
  ; Disable data persistance on the db layer.
  (reset! persist-data false)
  ; Initialize db.
  (dispatch-sync [:initialise-db]))

; Devcards works without an after-load, but shadow-cljs keeps asking for it.
(defn ^:dev/after-load nothing [])

(defn ^:export main []
  ; Add a special class to the body to signal we're in devcards mode.
  ; We want to mostly use the same styles as the app, but need to make some exceptions.
  (js/document.body.classList.add "using-devcards")
  (setup-db)
  ; Start the devcards UI.
  (start-devcard-ui!))
