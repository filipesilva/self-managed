(ns self-managed.cards-test-runner
  {:dev/always true}
  (:require [shadow.test.env :as env]
            [cljs.test :as ct]
            [shadow.test :as st]
            ["jsdom-global" :as jsdom-global]
            ; Import the cards ns to get all the tests.
            [self-managed.cards :refer [setup-db]]))

; ct/report and run-tests copied from shadow.node.test
; Just importing them doesn't work.
(defmethod ct/report [::ct/default :end-run-tests] [m]
  (if (ct/successful? m)
    (js/process.exit 0)
    (js/process.exit 1)))

(defn run-tests []
  (-> (env/get-test-data)
      (env/reset-test-data!))
  (st/run-all-tests))

(defn main []
  ; Set jsdom to mock a dom environment.
  (jsdom-global)
  (setup-db)
  ; Run the tests
  (run-tests))