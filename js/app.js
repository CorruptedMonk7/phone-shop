const loadPhones = async (text, dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${text}`
  const res = await fetch(url)
  const data = await res.json()
  loadDisplay(data.data, dataLimit)
}
const loadDisplay = (phones, dataLimit) => {
  const getDiv = document.getElementById("phone-container");
  getDiv.innerHTML = ``
  const showAll = document.getElementById('show-all')
  if (dataLimit && phones.length > 10) {
    phones = phones.slice(0, 10)
    showAll.classList.remove('d-none')
  }
  else {
    showAll.classList.add("d-none")
  }
  const none = document.getElementById("no-phone-found")
  if (phones.length == 0) {
    none.classList.remove("d-none")
  }
  else {
    none.classList.add("d-none")
  }
  phones.forEach(phone => {
    const phoneCard = document.createElement('div');
    phoneCard.classList.add('col')
    phoneCard.innerHTML = `
                <div class="card m-2 p-3">
                    <img src="${phone.image}" class="card-img-top" alt="...">
                    <div class="card-body text-center">
                        <h5 class="card-title">${phone.phone_name}</h5>
                        
                            <button onclick="deatails('${phone.slug}')" href="#" class="btn btn-warning text center" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Details</button>

                    </div>
                </div>

    `
    getDiv.appendChild(phoneCard)

  })
  loadingToggle(false)
  console.log(phones)
}
const processSearch = (dataLimit) => {
  const inputText = document.getElementById("search-field");
  const text = inputText.value;
  loadPhones(text, dataLimit)
  console.log(text)
  loadingToggle(true)
}
document.getElementById('search-button').addEventListener("click", function () {
  // const inputText = document.getElementById("search-field");
  // const text = inputText.value;
  // loadPhones(text)
  // console.log(text)
  // loadingToggle(true)
  processSearch(10)
})
document.getElementById("search-field").addEventListener("keypress", function (e) {
  if (e.key == 'Enter') {
    processSearch(10)
  }
})

const loadingToggle = (isLoading) => {
  const load = document.getElementById("loader")
  if (isLoading) {

    load.classList.remove("d-none")
  }
  else {
    load.classList.add("d-none")
  }
}
document.getElementById("btn-show-all").addEventListener("click", function () {
  processSearch();
})
const deatails = async id => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`
  const res = await fetch(url)
  const data = await res.json()
  console.log(data.data)
  const detailTitle = document.getElementById("phoneDetailModalLabel")
  detailTitle.innerText = data.data.name;
  const phoneDetailModal = document.getElementById('detail-body')
  phoneDetailModal.innerHTML = `
  <p>Storage: ${data.data.mainFeatures.storage}, Display: ${data.data.mainFeatures.displaySize}</p>
  `
}