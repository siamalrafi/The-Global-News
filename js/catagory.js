const catagoryLoadData = async () => {
    const mianUrl = 'https://openapi.programming-hero.com/api/news/categories'
    try {
        const res = await fetch(mianUrl);
        const data = await res.json();
        displayCatagoryData(data.data.news_category.sort());
    } catch {
        console.log('There are an error . ');
    }
}

const displayCatagoryData = data => {
    const newField = document.getElementById('ul-field');
    data.forEach((catagories) => {
        const li = document.createElement('span');
        li.innerHTML = `
        <span class="btn" onclick="categoriesNews('${catagories.category_id}')">${catagories.category_name} </span>
`;
        newField.appendChild(li);
    });
}


const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none');
    } else {
        loaderSection.classList.add('d-none');
    }
}


const categoriesNews = async (post) => {
    try {
        const url = (`https://openapi.programming-hero.com/api/news/category/${post}`);
        const res = await fetch(url);
        const data = await res.json();
        showCatagories(data.data.sort(function (a, b) {
            return b.total_view - a.total_view;
        }));

    } catch {
        console.log('There are an error');
    }
};


const showCatagories = (detail) => {

    toggleSpinner(true);
    console.log(detail);
    const catagoriesLength = detail.length;
    const number = document.getElementById('numberOfNews')
    number.innerText = catagoriesLength;

    const notFoundMassage = document.getElementById('no-found-massage');
    if (detail.length === 0) {
        notFoundMassage.classList.remove('d-none');
    } else {
        notFoundMassage.classList.add('d-none')
    }
    const newsDetails = document.getElementById('news-details');
    newsDetails.innerHTML = '';
    detail.forEach(details => {
        // console.log(details);
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="row g-0 mt-5">
        <div class="col-md-4">
            <img src="${details.image_url}" class="img-fluid rounded-start" alt="...">
        </div>
         <div class="ps-3 col-md-8">
            <div class="card-body">
                <h5 class="card-title">${details.title}</h5>
                <p class="card-text">${details.details.slice(0, 200) + '.....'}</p>
                <div class="container text-center">
                    <div class="row">
                        <div class="col-sm-4">
                            <img class="img-fluid rounded-circle text-start" height="40px" width="40px"
                                src="${details.author.img}" alt=""><span>${details.author.name ? details.author.name : 'Not found'}</span>
                        </div>
                        <div class="col-sm-2">
                            <i class="fa-sharp fa-solid fa-eye"><span>${details.total_view ? details.total_view : 'No view'}</span></i>
                        </div>
                        <div class="col-sm-4">
                            <i class="fa-solid text-warning fa-star"></i>
                            <i class="fa-solid text-warning fa-star"></i>
                            <i class="fa-solid text-warning fa-star"></i>
                            <i class="fa-solid text-warning fa-star"></i>
                            <i class="fa-solid text-dark fa-star"> ${details.rating.number}</i>
                        </div>
                        <div class="col-sm-2">
                            <i onclick="modalsDetails()" class="fa-solid fs-4 fa-arrow-right" data-bs-toggle="modal" data-bs-target="#detailsModal"> </i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
 `;
        newsDetails.appendChild(div);
        toggleSpinner(false)



        const showModalDetails = document.getElementById('modalBody');
        showModalDetails.innerHTML = `
        <h4>Title ${details.title}</h4>
        <br>
        <h4>Catagory Id ${details.category_id}</h4>
        <h4>Rating ${details.rating.number}</h4>
        <h4>Badge ${details.rating.badge}</h4>
        <h4>Published Date${details.author.published_date}</h4>
`;

    });
}
categoriesNews('08');
catagoryLoadData();

