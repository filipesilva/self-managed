(ns app.cards
  ; devcards needs these cljsjs.react and cljsjs.react.dom to be imported separately for 
  ; shadow-cljs to add shims.
  (:require [cljsjs.react]
            [cljsjs.react.dom]
            [devcards.core :as dc :include-macros true]
            [app.components.bmi-calculator]))

(defn ^:export main [] (dc/start-devcard-ui!))