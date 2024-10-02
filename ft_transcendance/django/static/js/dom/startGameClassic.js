
import { navigateTo } from "../spa.js";

export function start_Game_Classic(){

      // Selects the element with the ID 'start_Classic'
      const start_Classic_Button = document.getElementById('start_Classic');

      // Check if the element exists
      if (start_Classic_Button) {
          // Add a click event to the button
          start_Classic_Button.addEventListener('click', () => {
              // Call the navigateTo function with the desired URL
              navigateTo('/classic-game', {});
          });
      }

}
