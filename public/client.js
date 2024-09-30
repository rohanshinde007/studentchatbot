
// var wrapper = document.getElementById("chat-container");

// wrapper.addEventListener("scroll", function (event) {
//     checkForNewDiv();
// });

// var checkForNewDiv = function () {
//     var lastDiv = document.querySelector("#scroll-content > div:last-child");
//     var lastDivOffset = lastDiv.offsetTop + lastDiv.clientHeight;
//     var pageOffset = wrapper.scrollTop + wrapper.clientHeight;

//     //NOTE THAT PROPERTIES NAME ALSO CHANGED A BIT, FOR EXAMPLE:
//     // pageYOffset -> scrollTop   and    innerHeight -> clientHeight

//     if (pageOffset > lastDivOffset - 10) {
//         var newDiv = document.createElement("div");
//         newDiv.innerHTML = "my awesome new div";
//         document.getElementById("scroll-content").appendChild(newDiv);
//         checkForNewDiv();
//     }
// };

// checkForNewDiv();





document.getElementById('chat-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const userInput = document.getElementById('user-input').value;
    document.getElementById('user-input').value = '';
    
    appendMessage('user', userInput);
    
    const response = await fetch('/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: userInput }),
    });
    
    const data = await response.json();
    appendMessage('bot', data.reply);
  });
  
  function appendMessage(sender, text) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);
    messageDiv.textContent = text;
    
    document.getElementById('messages').appendChild(messageDiv);
    document.getElementById('chatbox').scrollTop = document.getElementById('chatbox').scrollHeight;
  }
  