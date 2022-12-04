async function solution() {
   
    try {
        let url = 'http://localhost:3030/jsonstore/advanced/articles/list';
        let response = await fetch(url);

        if(response.status !== 200) {
            throw new Error('Error didn\'t obtain article list');
        }

        let data = await response.json();

        data.forEach(divInfo => {
           let divElement = document.createElement('article');
           divElement.classList.add('accordion');
           let divHead = document.createElement('div');
           divHead.classList.add('head'); 

           let titleSpan = document.createElement('span');
           titleSpan.textContent = divInfo.title; 
           let moreBtn = document.createElement('button');
           moreBtn.classList.add('button');
           moreBtn.id = divInfo._id;
           moreBtn.textContent = 'More';
           moreBtn.addEventListener('click', showMore);

           let extraDiv = document.createElement('div');
           extraDiv.classList.add('extra');

           divHead.appendChild(titleSpan);
           divHead.appendChild(moreBtn);

           divElement.appendChild(divHead);
           divElement.appendChild(extraDiv);

           let main = document.getElementById('main');
           main.appendChild(divElement);
        });

    } catch(error) {
        console.log(error);
    }
}

async function showMore(e) {
    try {    

     let currentTarget = e.currentTarget; 
     let url = `http://localhost:3030/jsonstore/advanced/articles/details/${currentTarget.id}`;   
     let parentElement = currentTarget.parentElement.parentElement;
     let extraDiv = parentElement.querySelector('div.extra');
     let response = await fetch(url);
    
     if(response.status !== 200) {
        throw new Error('Error didn\'t obtain article list');
     }

     let data = await response.json();

     extraDiv.innerHTML = `<p>${data.content}</p>`;   
     if(currentTarget.textContent === 'More') {
        currentTarget.textContent = 'Less';
        extraDiv.style.display = 'block';  
     } else {
        currentTarget.textContent = 'More';
        extraDiv.style.display = 'none';
     }
    } catch (error) {
        console.log(error);
    }
}
solution();
