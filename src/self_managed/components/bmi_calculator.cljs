(ns self-managed.components.bmi-calculator
  (:require
   [reagent.core :as r]
   [devcards.core :as dc :include-macros true :refer [defcard deftest]]
   [cljs.test :refer-macros [testing is]]))

(def bmi-data (r/atom {:height 180 :weight 80}))

(defn calc-bmi [bmi-data]
  (let [{:keys [height weight bmi] :as data} bmi-data
        h (/ height 100)]
    (if (nil? bmi)
      (assoc data :bmi (/ weight (* h h)))
      (assoc data :weight (* bmi h h)))))

(defn slider [bmi-data param value min max]
  [:input {:type "range" :value value :min min :max max
           :style {:width "100%"}
           :on-change (fn [e]
                        (swap! bmi-data assoc param (.. e -target -value))
                        (when (not= param :bmi)
                          (swap! bmi-data assoc :bmi nil)))}])

(defn bmi-component [bmi-data]
  (let [{:keys [weight height bmi]} (calc-bmi @bmi-data)
        [color diagnose] (cond
                           (< bmi 18.5) ["orange" "underweight"]
                           (< bmi 25) ["inherit" "normal"]
                           (< bmi 30) ["orange" "overweight"]
                           :else ["red" "obese"])]
    [:div
     [:h3 "BMI calculator"]
     [:div
      "Height: " (int height) "cm"
      [slider bmi-data :height height 100 220]]
     [:div
      "Weight: " (int weight) "kg"
      [slider bmi-data :weight weight 30 150]]
     [:div
      "BMI: " (int bmi) " "
      [:span {:style {:color color}} diagnose]
      [slider bmi-data :bmi bmi 10 50]]]))

(defcard bmi-calculator
  "*Code taken from the Reagent readme.*"
  (dc/reagent bmi-component)
  bmi-data
  {:inspect-data true
   :frame true
   :history true})

(deftest cljs-test-integration
  "## Here are some example tests"
  (testing "testing context 1"
    (is (= (+ 1 0 0 0) 1) "This should work")))