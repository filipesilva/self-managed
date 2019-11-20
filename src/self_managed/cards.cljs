(ns self-managed.cards
  (:require [cljsjs.react]        ; devcards needs these cljsjs.react and cljsjs.react.dom to be 
            [cljsjs.react.dom]    ; imported separately for shadow-cljs to add shims.
            [re-frame.core :as rf]
            [self-managed.db :refer [persist-data]]
            [self-managed.events] ; Also load the events and subs for state cards to work.
            [self-managed.subs] 
            [devcards.core :as dc :include-macros true]
            [self-managed.cards-helpers]
            [self-managed.views.todo-app-states.empty]
            [self-managed.views.todo-app-states.some]))

; Add a special class to the body to signal we're in devcards mode.
; We want to mostly use the same styles as the app, but need to make some exceptions.
(js/document.body.classList.add "using-devcards")

; Disable data persistance on the db layer.
(reset! persist-data false)

; Initialize db.
(rf/dispatch-sync [:initialise-db])

; Devcards works without an after-load, but shadow-cljs keeps asking for it.
(defn ^:dev/after-load nothing [])

; Start the devcards UI.
(defn ^:export main [] (dc/start-devcard-ui!))
