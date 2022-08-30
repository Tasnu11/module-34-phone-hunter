const loadPhone = async (searchText,dataLimit)=>{
    const url=`https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res =await fetch(url);
    const data = await res.json();
    displayPhone(data.data, dataLimit );
}
 const displayPhone =(phones,dataLimit) =>{
    const phonesContainer = document.getElementById('phone-container');
    phonesContainer.innerHTML='';

    // display 10 phones
    const showAll =document.getElementById('show-all');
    if(dataLimit && phones.length >10){
        phones=phones.slice(0,10);
        showAll.classList.remove('d-none')
    }
    else{
        showAll.classList.add('d-none')
    }
    
    // display no phone found
    const noPhone=document.getElementById('no-found-massage');
    if(phones.length === 0){
        noPhone.classList.remove('d-none');
    }
    else{
        noPhone.classList.add('d-none')
    }

    // display all phone
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML =`
        <div class="card p-4">
        <img src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body ">
            <h5 class="card-title">${phone.phone_name}</h5>
            <p class="card-text">This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit longer.</p>
                <button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal"> Show Details </button>

                
        </div>
        </div>


        `;
        phonesContainer.appendChild(phoneDiv)
    });
    // stop spinner loader
    toggleSpinner(false);
 }

 const processSearch =(dataLimit) =>{
    toggleSpinner(true);
    const searchField =document.getElementById('search-field');
    const searchText =searchField .value ;
    loadPhone(searchText,dataLimit);

 }

//  search button handler
 document.getElementById('btn-search').addEventListener('click',function(){
    // spinner start
    processSearch(10);
 })

// srch input field enter click handler

document.getElementById('search-field').addEventListener('keypress',function(e){
   
    if(e.key === 'Enter'){
         processSearch(10);
    }
});



 const toggleSpinner = isLoading =>{
    const loaderSection =document.getElementById('loader');
    if(isLoading){
        loaderSection.classList.remove('d-none')
    }
    else{
        loaderSection.classList.add('d-none');
    }
 }


//  not the best solution to load show all
 document.getElementById('btn-show-all').addEventListener('click',function(){
 processSearch();
 })

 const loadPhoneDetails = async id =>{
    const url =`https://openapi.programming-hero.com/api/phone/${id}`
    const res =await fetch(url)
    const data = await res.json()
    displayPhoneDetails(data.data)
 }

 const displayPhoneDetails = (phone) =>{
    console.log(phone);
    const modalTitle =document.getElementById('phoneDetailModalLabel');
    modalTitle.innerText =phone.name;

    const phoneDetail = document.getElementById('phone-detail');
    phoneDetail.innerHTML=`
    <p>Release date:${phone.releaseDate ? phone.releaseDate : 'no releaseDate found'}</p>
    <p>Others: ${phone.others ? phone.others.Bluetooth : 'no bluetooth information found'}</p>
    <p>Storage: ${phone.mainFeatures ? phone.mainFeatures.storage : 'no storage information found'}</p>
    `

 }
loadPhone('apple');