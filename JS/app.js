const loadPhones=async(searchText,dataLimit)=>{
    const url=`https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res=await fetch(url);
    const data=await res.json();
    displayPhones(data.data,dataLimit);
}

const displayPhones=(phones,dataLimit)=>{
    // console.log(allPhone);
    const phoneContainer=document.getElementById('phone_container');
    phoneContainer.innerText='';

    const showAll=document.getElementById('show_all');
    if(dataLimit && phones.length>10){
        phones=phones.slice(0,10);
        showAll.classList.remove('d-none');
    }
    else{
        showAll.classList.add('d-none');
    }
    
    const noPhone=document.getElementById('no_phone_massage');
     if(phones.length===0){
        noPhone.classList.remove('d-none');
    }
    else{
         noPhone.classList.add('d-none');
     }
    phones.forEach(phone => {
        const div=document.createElement('div');
        div.classList.add('col');
        div.innerHTML=`
        <div class="card p-3">
            <img src="${phone.image}" class="card-img-top" alt="..." />
            <div class="card-body">
            <h5 class="card-title my-4">${phone.phone_name}</h5>
            <button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-danger px-4 text-light fw-bold" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button>
            </div>
      </div>
        `;
        phoneContainer.appendChild(div);
    });

    // stop spinner loader 
    toggleSpinner(false);
}

const processSearch=(dataLimit)=>{
    toggleSpinner(true);
    const searchField=document.getElementById('search_field');
    const searchFieldValue=searchField.value;
    console.log(searchFieldValue);
    loadPhones(searchFieldValue,dataLimit);
}

document.getElementById('search_btn').addEventListener('click',function(){
    // start loader 
    processSearch(10);
})

document.getElementById('search_field').addEventListener('keypress',function(e){
    if(e.key==='Enter'){
        processSearch(10);
    }
})

const toggleSpinner=isLoading=>{
    const loaderSection=document.getElementById('loder');
    if(isLoading){
        loaderSection.classList.remove('d-none');
    }
    else{
        loaderSection.classList.add('d-none');
    }
}

document.getElementById('show_all_btn').addEventListener('click',function(){
    processSearch();
});

const loadPhoneDetails=async id=>{
    const url=`https://openapi.programming-hero.com/api/phone/${id}`;
    const res=await fetch(url);
    const data=await res.json();
    displayPhoneDetails(data.data)
}

const displayPhoneDetails=phone=>{
    console.log(phone);
    const modalTitle=document.getElementById('phoneDetailModalLabel');
    modalTitle.innerText=phone.name;
    const phoneDetails=document.getElementById('phone_details');
    phoneDetails.innerHTML=`
        <p>Brand: ${phone.brand}</p>
        <p>Slug: ${phone.slug}</p>
        <p>Release Date: ${phone.releaseDate}</p>
        <p>Display Size: ${phone.mainFeatures?.displaySize.slice(0,46)}</p>
        <p>Memory: ${phone.mainFeatures?.memory.slice(0,46)}</p>
    `;
}

loadPhones('b');
