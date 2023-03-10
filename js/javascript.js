const text = document.getElementById('prompt')
const size = document.getElementById('size')
const button = document.getElementById('button')


button.addEventListener('click', async (e) =>{
    e.preventDefault()


    if(text.value ==='' || text.value ===" "){
        alert('please enter text')
    }
    
    await generateImageRequest(text.value, size.value)


})


async function generateImageRequest(prompt, size) {
    try {
      showSpinner();
  
      const response = await fetch('https://imagineai.onrender.com/openai/generateimage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          size,
        }),
      });
  
      if (!response.ok) {
        removeSpinner();
        throw new Error('That image could not be generated');
      }
  
      const data = await response.json();
      // console.log(data);
  
      const imageUrl = data.data;
  
      document.querySelector('#image').src = imageUrl;
  
      removeSpinner();
    } catch (error) {
      document.querySelector('.msg').textContent = error;
    }
  }


  function showSpinner(){
    button.disabled = true
    button.innerText = 'Please Wait...'
  }

  function removeSpinner(){
    button.disabled = false 
    button.innerText = 'Generate Image'
  }