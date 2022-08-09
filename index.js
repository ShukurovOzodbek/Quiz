let themes = [
    {
        theme: 'Musics',
        photo: 'https://www.thelawrance.com/wp-content/uploads/music1.jpg'
    },
    {
        theme: 'Games',
        photo: 'https://avatars.mds.yandex.net/i?id=bbc0c1fe44faebf3502584500a613183-4518735-images-thumbs&n=13'
    },
    {
        theme: 'Sports',
        photo: 'https://avatars.mds.yandex.net/i?id=71ed52486777d1af2b13ddb3ca527ac3-7004933-images-thumbs&n=13'
    },
]
reload(themes)
function reload(arr) {
    let cont = document.querySelector('.cont')
    cont.innerHTML = ''
    for (let item of arr) {
        cont.innerHTML += `
        <a href="./quiz/index.html#${item.theme.toLowerCase()}">
            <div class="theme">
                <div class="circle">
                    <div class="cir">
                        <img src="${item.photo}" alt="">
                    </div>
                    <a href="./quiz/index.html#${item.theme.toLowerCase()}">${item.theme}</a>
                </div>
            </div>
        </a>
        `
    }
}
