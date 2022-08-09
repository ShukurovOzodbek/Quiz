let wind = window.location.href.split('#')
let theme = wind[1]
let url = `http://localhost:3001/${theme}`
axios.get(url)
    .then(res => {
        if (res.status === 200 || res.status === 201) {
            localStorage.setItem('questions', JSON.stringify(res.data.length))
            localStorage.setItem('quests', JSON.stringify(res.data))
            reload(res.data)
        }
    })
    .catch(err => console.log(err))

setTimeout(() => {
    document.body.style.background = '#00B5D9'
    document.querySelector('.main_img').style.opacity = '0'
    setTimeout(() => {
        document.querySelector('.main_img').style.display = 'none'
    }, 500);
    let time = document.querySelector('.timer span')
    let min = 2
    let sec = 59
    let inter = setInterval(() => {
        sec = parseInt(sec)
        sec = sec - 1
        time.innerHTML = `0${min}:${sec}`
        if (sec < 10) {
            time.innerHTML = `0${min}:0${sec}`
            if (sec === 0) {
                sec = 59
                time.innerHTML = `0${min}:${sec}`
                min = parseInt(min) - 1
            }
            if (sec === 1 && min === 0) {
                console.log('end');
                clearInterval(inter)
                setTimeout(() => {
                    document.querySelector('.modal').style.top = '38%'
                    document.querySelector('.back').style.display = 'block'
                    let correct_count = JSON.parse(localStorage.getItem('correct_count'))
                    let count = document.querySelector('.count')
                    if (correct_count > 7) {
                        count.innerHTML = `Oh great!!! you have found ${correct_count} correct answers you are the best :).`
                    } else if (correct_count < 7 && correct_count > 4) {
                        count.innerHTML = `Nice! you have found ${correct_count} correct answers you should train more ;).`
                    } else if (correct_count < 4) {
                        count.innerHTML = `Nooo! you have found ${correct_count} correct answers I think if you'll train more you'll win our game ;).`
                    }
                }, 100);
                document.querySelector('.try_again').onclick = () => {
                    document.querySelector('.modal').style.top = '-100%'
                    document.querySelector('.back').style.display = 'none'
                    window.location.reload()
                }
                document.querySelector('.back').onclick = () => {
                    document.querySelector('audio').play()
                }
                localStorage.setItem('id', JSON.stringify(id))
                document.querySelector('.correct').innerHTML = 0
            }
        }
    }, 1000);
}, 3000);

localStorage.setItem('id', JSON.stringify(0))
let answers = document.querySelectorAll('.answer')
let answers2 = document.querySelectorAll('.answer span')
function reload(array) {
    let id = JSON.parse(localStorage.getItem('id')) || 1
    localStorage.setItem('id', JSON.stringify(id))
    if (id === 11) {
        id = 1
        setTimeout(() => {
            document.querySelector('.modal').style.top = '38%'
            document.querySelector('.back').style.display = 'block'
            let correct_count = JSON.parse(localStorage.getItem('correct_count'))
            let count = document.querySelector('.count')
            if (correct_count > 7) {
                count.innerHTML = `Oh great!!! you have found ${correct_count} correct answers you are the best :).`
            } else if (correct_count < 7 && correct_count > 4) {
                count.innerHTML = `Nice! you have found ${correct_count} correct answers you should train more ;).`
            } else if (correct_count < 4) {
                count.innerHTML = `Nooo! you have found ${correct_count} correct answers I think if you'll train more you'll win our game ;).`
            }
        }, 100);
        document.querySelector('.try_again').onclick = () => {
            document.querySelector('.modal').style.top = '-100%'
            document.querySelector('.back').style.display = 'none'
            window.location.reload()
        }
        document.querySelector('.back').onclick = () => {
            document.querySelector('audio').play()
        }
        localStorage.setItem('id', JSON.stringify(id))
        document.querySelector('.correct').innerHTML = 0
    }
    let obj = array.find(item => item.id === id)
    let span = document.querySelector('.question span')
    span.innerHTML = obj.question
    let arr = [obj.correct_answer, ...obj.incorrect_answers]
    let ar = []
    for (var a = arr, i = a.length; i--;) {
        var random = a.splice(Math.floor(Math.random() * (i + 1)), 1)[0];
        ar.push(random)
    }
    answers2[0].innerHTML = ar[0]
    answers2[1].innerHTML = ar[1]
    answers2[2].innerHTML = ar[2]
    answers2[3].innerHTML = ar[3]



    localStorage.setItem('correct_answer', JSON.stringify(obj.correct_answer))
    answers.forEach(answ => {
        answ.classList.remove('true')
        answ.classList.remove('false')
    });
}

let questions = document.querySelector('.question_len')
let len = JSON.parse(localStorage.getItem('questions'))
if (len) {
    questions.innerHTML = len
}
answers.forEach(answer => {
    answer.onclick = (e) => {
        click(answer, answers, e)
    }
});

function click(answer, answers, e) {
    answers.forEach(answ => {
        answ.classList.remove('true')
    });
    let correct_answer = JSON.parse(localStorage.getItem('correct_answer'))
    if (answer.firstChild.nextSibling.innerHTML === correct_answer) {
        if (e.target.parentNode.className === 'answer') {
            e.target.parentNode.classList.add('true')
        } else {
            e.target.classList.add('true')
        }
        setTimeout(() => {
            let id = JSON.parse(localStorage.getItem('id'))
            id = id + 1
            localStorage.setItem('id', JSON.stringify(id))
            let arr = JSON.parse(localStorage.getItem('quests'))
            reload(arr)
        }, 400);
        let correct = document.querySelector('.correct')
        let questions = document.querySelector('.question_len')
        correct.innerHTML++
        localStorage.setItem('correct_count', JSON.stringify(correct.innerHTML))
        let len = JSON.parse(localStorage.getItem('questions'))
        questions.innerHTML = len
    } else {
        if (e.target.parentNode.className === 'answer') {
            e.target.parentNode.classList.add('false')
        } else {
            e.target.classList.add('false')
        }
        answers.forEach(answ => {
            if (answ.firstChild.nextSibling.innerHTML === correct_answer) {
                answ.classList.add('true')
            }
        });
        setTimeout(() => {
            let id = JSON.parse(localStorage.getItem('id'))
            id = id + 1
            localStorage.setItem('id', JSON.stringify(id))
            let arr = JSON.parse(localStorage.getItem('quests'))
            reload(arr)
        }, 400);
    }
}