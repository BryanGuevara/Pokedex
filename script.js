const btnFilter = document.querySelector('.iconfilter')

btnFilter.addEventListener('click',()=>{
    const containerFilter = document.querySelector('.container-fliter')

    containerFilter.classList.toggle('active')
})