<template>
    <header id="Question">Question: Unlimited Games or no Games and unlimited bacon</header>
    <div id="multiple_choice_buttons">
      <button v-for="n in amount" :key="n">{{`Button ${n}`}}</button>
    </div>
    <button>Submit</button>
  </template>
  
  <script>
  export default {
    data() {
      return {
        amount: 2 // Set the desired number of buttons here
      };
    }
  };
  </script>