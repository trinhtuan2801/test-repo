//Cau 1
// {
//     let myfunc = async () => {
//         let prm = await new Promise (resolve => {
//             setTimeout(()=>resolve('Promise is da best'), 5000)
//         })
//         console.log(prm)
//     }

//     myfunc()

//     let prm = new Promise (resolve => {
//         setTimeout(()=>resolve('Promise is da best'), 5000)
//     })

//     prm.then(result => console.log(result))
// }

//Cau 2
// {
//     fetch('https://jsonplaceholder.typicode.com/todos/1')
//         .then(response => response.json())
//         .then(json => console.log(json))
// }


//Cau 3
{

}

//Cau 4
// {
//     let getRandNum = () => {
//         return Math.floor(Math.random()*11)
//     }

//     const x = getRandNum();
//     if (x < 0) {
//       console.log('Failed: the number is smaller than 0');
//     } else if (x > 10) {
//       console.log('Failed: the number is bigger than 10');
//     } else {
//       console.log('Passed, bravo');
//     }
// }

//Cau 5
// {
//     let getRandNum = (a, b) => {
//         return Math.floor(Math.random()*(b-a+1)) + a
//     }

//     const x = getRandNum(4, 16);
//     if (x < 4) {
//       console.log('Failed: the number is smaller than 4');
//     } else if (x > 16) {
//       console.log('Failed: the number is bigger than 16');
//     } else {
//       console.log('Passed, bravo');
//     }
// }

//Cau 6
// {
//     let getDistance = (x1, y1, x2, y2) => {
//         return Math.sqrt((x1-x2)**2 + (y1-y2)**2)
//     }

//     const d = getDistance(3, 10, 0, 6)

//     if (d !== 5){
//         console.log('Failed: the calculation is wrong')
//     }
//     else
//     {
//         console.log('Passed, bravo')
//     }
// }

//Cau 7
// {
//     fetch('http://quotes.rest/qod.json')
//         .then(response => response.json())
//         .then(result => {
//             let quote_obj = result.contents.quotes[0]
//             let quote = document.createElement('p')
//             quote.innerText = quote_obj.quote
//             quote.style.fontWeight = "bold"
//             document.body.insertAdjacentElement('beforeend', quote)

//             let author = document.createElement('p')
//             author.innerText = quote_obj.author
//             document.body.insertAdjacentElement('beforeend', author)
//         })
// }


//Cau 8

let fetchData = (url) => {
    return new Promise((resolve, reject) => {
        fetch(url)
        .then(response => response.json()) 
        .then(json => {resolve(json)})
        .catch(err => {reject(err)})
    })
}

let createLiElement = (id, itemname) => {
    let newli = document.createElement('li')
    newli.id = 'itemid' + id
    newli.insertAdjacentText('beforeend', itemname)
    newli.insertAdjacentElement('beforeend', createDeleteButton())
    return newli
}

let createDeleteButton = () => {
    let button = document.createElement('button')
    button.innerText = 'x'
    button.style.marginLeft = '10px'

    button.addEventListener('click', ()=>{
        if (isClickable)
        {
            isClickable = false
            let parent = button.parentElement
            deleteData('https://sheetdb.io/api/v1/qq7zjzeoxqumu', parent.id.substr(6))
            parent.remove()
        }
    })

    return button
}

let uploadData = (url, _data) => {
    fetch(url, {
        method: "POST",
        body: JSON.stringify(_data),
        headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then(response => response.json()) 
        .then(json => {isClickable = true;console.log(json)})
        .catch(err => console.log(err))
}

let deleteData = (url, id) => {
    taken_id.splice(taken_id.indexOf(id), 1)
    url += '/id/' + id
    fetch(url, {
        method: "DELETE",
        headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then(response => response.json()) 
        .then(json => {isClickable = true; console.log(json)})
        .catch(err => console.log(err))
}

{
    var taken_id = []
    var isClickable = true

    let input = document.getElementById('input')
    let button = document.getElementById('addbutton')
    let wishlist = document.getElementById('wishlist')

    button.addEventListener('click', ()=>{
        if (input.value != '' && input.value != null && input.value != undefined && isClickable)
        {
            isClickable = false
            let itemname = input.value
            let id = 0
            do
            {
                id = Math.floor(Math.random()*100)
            } while (taken_id.includes(id.toString()))

            taken_id.push(id.toString())
            uploadData('https://sheetdb.io/api/v1/qq7zjzeoxqumu', {id: id, name: itemname})
            let newli = createLiElement(id, itemname)
            wishlist.insertAdjacentElement('beforeend', newli)

            input.value = ''
        }
    })
    
    fetchData('https://sheetdb.io/api/v1/qq7zjzeoxqumu').then(json =>
    {
        console.log(json)
        for (let item of json)
        {
            taken_id.push(item.id)
            let newli = createLiElement(item.id, item.name)
            wishlist.insertAdjacentElement('beforeend', newli)
        }
    })

}



