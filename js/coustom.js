const loadPhones = async(getSearchText='13', isShowMore) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${getSearchText}`;
    const res = await fetch(url);
    const data = await res.json();
    const phones = data.data;
    displayPhone(phones, isShowMore)
};
const displayPhone = (phones, isShowMore) => {
    const cardArea = document.getElementById('card-area');
    cardArea.textContent = '';
    const showAllBtn = document.getElementById('show-all');
    if(phones.length > 12 && !isShowMore){
        showAllBtn.classList.remove('hidden');
    }
    else{
        showAllBtn.classList.add('hidden');
    }
   if(!isShowMore){
    phones = phones.slice(0,12);
   }
    
    phones.forEach(phone => {
        const phoneCard = document.createElement('div');
        phoneCard.classList = 'border border-gray-300 rounded-lg bg-white flex flex-col justify-center items-center p-6';
        phoneCard.innerHTML = `
        <div class="bg-[#0D6EFD0D] p-12 rounded-lg">
        <img src="${phone.image}" alt="">
    </div>
    <h2 class="text-gray-800 poppins font-bold text-25 leading-38 text-center mt-6">${phone.phone_name}</h2>
    <p class="text-gray-700 poppins text-base font-normal leading-30 text-center mt-5">There are many variations of <br> passages of available, but the <br> majority have suffered</p>
    <h2 class="text-gray-800 poppins font-bold text-25 leading-38 text-center mt-2">$999</h2>
    <button onclick="showDitailHendel('${phone.slug}')" class="py-4 px-10 rounded-lg bg-[#0D6EFD] poppins font-bold text-xl text-[#FFFFFF] mt-4">Show Details</button>`;
    cardArea.appendChild(phoneCard)
    });
    loadingHendel(false)
};
const handelSearch = (isShowMore) => {
    const searchFeld = document.getElementById('search-feld')
    const getSearchText = searchFeld.value;
    loadPhones(getSearchText, isShowMore);
    loadingHendel(true)
    
};

const loadingHendel = (isLoading) => {
    const loading = document.getElementById('loading');
    if(isLoading){
        loading.classList.remove('hidden')
    }
    else{
        loading.classList.add('hidden')
    }
};

const showMoreHendel = () => {
    handelSearch(true)
};

const showDitailHendel = async(id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    const phoneDetails = data.data;
    showPhoneDetails(phoneDetails);
};
const showPhoneDetails = (phone) => {
    console.log(phone)

    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML = `
    <dialog id="my_modal" class="modal modal-bottom sm:modal-middle">
    <div class="modal-box">
      <div class="flex justify-center bg-[#0D6EFD0D] p-12 rounded-lg"><img src="${phone.image}" alt=""></div>
      <h3 class="poppins font-semibold text-3xl leading-9 mt-8 text-[#403F3F]">Iphone 13 Pro Max</h3>
     <p class="poppins font-normal text-base leading-6 tracking-normal text-[#706F6F] mt-5">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
     <h4><span class="poppins font-semibold text-lg leading-tight">Storage :</span> ${phone?.mainFeatures?.storage}</h4>
     <h4><span class="poppins font-semibold text-lg leading-tight>Display Size :</span>${phone?.mainFeatures?.displaySize}</h4>
     <h4><span class="poppins font-semibold text-lg leading-tight>Chipset :</span>${phone?.mainFeatures?.chipSet}</h4>
     <h4><span class="poppins font-semibold text-lg leading-tight>Memory :</span>${phone?.mainFeatures?.memory}</h4>
     <h4><span class="poppins font-semibold text-lg leading-tight>Slug : </span>${phone?.slug}</h4>
     <h4><span class="poppins font-semibold text-lg leading-tight>Release data :</span> ${phone?.releaseDate}</h4>
     <h4><span class="poppins font-semibold text-lg leading-tight>Brand :</span>${phone.brand}</h4>
     <h4><span class="font-bold">GPS :</span>${phone?.others?.GPS}</h4>
      <div class="modal-action">
        <form method="dialog">
          <!-- if there is a button in form, it will close the modal -->
          <button class="btn">Close</button>
        </form>
      </div>
    </div>
  </dialog> `
  my_modal.showModal();
}


loadPhones()