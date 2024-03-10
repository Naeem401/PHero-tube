let sortByView = false;
let selectetCatagory = 1000;
const sortByViewBtn = document.getElementById('sort-by-view');
sortByViewBtn.addEventListener('click', () =>{
    sortByView = true;
    lodingCetagoryData(selectetCatagory, sortByView)
})
const lodingCetagoryDatabtn = async() => {
    const url = `https://openapi.programming-hero.com/api/videos/categories`;
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data.data)
    const cetgory = data.data;
   
    desplayCetagoryBtn(cetgory)
};

const desplayCetagoryBtn = (datas) => {
    const cetagoryBtn = document.getElementById('cetagoryBtn');
    
   datas.forEach(data => {
    const creatCatagoryBtn = document.createElement('button');
    creatCatagoryBtn.classList = `cetgory-btn btn font-medium text-[18px] text-[#252525]`;
    creatCatagoryBtn.innerHTML = `${data.category}`
    creatCatagoryBtn.addEventListener('click', () => {
        hendelCetagory(data.category_id);
        const allBtns = document.querySelectorAll('.cetgory-btn');
        for(btn of allBtns){
            btn.classList.remove('bg-red-600');
            
        }
        creatCatagoryBtn.classList.add('bg-red-600');
       

    })
    cetagoryBtn.appendChild(creatCatagoryBtn)
   });
};
const lodingCetagoryData = async(selectetCatagory, sortByView) => {
    const url = `https://openapi.programming-hero.com/api/videos/category/${selectetCatagory}`;
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data.data)
    const cetgory = data.data
    const errorMes = document.getElementById('error-mess');
    if(sortByView){
        cetgory.sort((a,b) => {
            const totalViewfrist = a.others?.views;
            const totalViewSecent = b.others?.views;
            const totalViewfristNumber = parseFloat(totalViewfrist.replace("k", "")) || 0;
            const totalViewSecentNumber = parseFloat(totalViewSecent.replace("k", "")) || 0;
            return totalViewSecentNumber - totalViewfristNumber;
        })
    }
    if(cetgory.length === 0){
        errorMes.classList.remove('hidden')
    }
    else{
        errorMes.classList.add('hidden')
    }
    desplayData(cetgory)
};
const desplayData = (datas) => {
    const cardArea = document.getElementById('card-area')
    cardArea.textContent =''
datas.forEach(data => {
   const card = document.createElement('div');
   card.innerHTML =`
   <div ><img class="h-40 w-72" src="${data.thumbnail}" alt=""></div>
   
                <div class="flex items-start gap-3 mt-5">
                    <img class="w-10 h-10 rounded-full" src="${data.authors[0].profile_picture}" alt="">
                    <div">
                    <div class="flex><h2 class="font-bold text-base text-black">
                    ${data.title}
                </h2>
                ${data.authors[0].verified? `<div><img src="img/fi_10629607.png" alt=""></div>`: ``
                        }
                
                    </div>
                        
                        <p>${data.authors[0].profile_name}</p>
                        <p>${data.others.views} views</p>
                    </div>
                </div>
   `;
cardArea.appendChild(card)
})
}
const hendelCetagory = (selectetCatagory)=>{
    lodingCetagoryData(selectetCatagory, sortByView)
}

lodingCetagoryDatabtn();
lodingCetagoryData(selectetCatagory ,sortByView)