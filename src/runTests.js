

document.addEventListener('DOMContentLoaded', () => {
    // Watch for a problem being selected from the select input. Look up selected solution and 
    // display it in the code container.
    let all_tests_button = document.querySelector('#all-tests-button');
    // let clickMeBtn = document.querySelector('#clickMeBtn');
  
    // Watch for clicks on the 'run mocha tests' button and run them when clicked.
    all_tests_button.onclick = () => {
      mocha.run();
      console.log('hit')
      all_tests_button.disabled = true;
      all_tests_button.innerHTML = "Refresh page to run Mocha tests again.";
    };

    // clickMeBtn.onclick = () => {
    //     // alert('click event');
    //     console.log('hit')
    //     all_tests_button.disabled = true;
    //     all_tests_button.innerHTML = "Refresh page to run Mocha tests again.";
    //   };

    // $(function(){
    //     $('#all-tests-button2').on('click', function(){
    //        alert('click event');
    //        mocha.run();
    //     });
    // });
  }, false );
  