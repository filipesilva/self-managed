(ns self-managed.devcards-runner
  (:require [cljsjs.react]        ; devcards needs these cljsjs.react and cljsjs.react.dom to be 
            [cljsjs.react.dom]    ; imported separately for shadow-cljs to add shims.
            [devcards.core :refer [start-devcard-ui!]]
            [self-managed.cards.helpers :refer [setup-db]]
            [self-managed.cards.all-cards])) ; Also load the events and subs for state cards to work.

; Devcards works without an after-load, but shadow-cljs keeps asking for it.
(defn ^:dev/after-load nothing [])

(defn ^:export main []
  ; Add a special class to the body to signal we're in devcards mode.
  ; We want to mostly use the same styles as the app, but need to make some exceptions.
  (js/document.body.classList.add "using-devcards")
  (setup-db)
  ; Start the devcards UI.
  (start-devcard-ui!))
