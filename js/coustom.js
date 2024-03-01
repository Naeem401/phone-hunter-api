const loadPhones = async(getSearchText, isShowMore) => {
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
    console.log(data.data)
}


loadPhones()