const ul = document.querySelector("ul")
const input = document.querySelector("input")
const form = document.querySelector('form')

async function load() {
    const res = await fetch('http://localhost:3000')
    const data = await res.json()

    data.urls.map(({ name, url }) => addElement({ name, url }))
}

async function create({ name, url }) {
    const res = await fetch(`http://localhost:3000/?name=${name}&url=${url}`)
    const result = await res.json()
    
    updateList()
    console.log(result.message)
}

async function remove({ name, url }) {
    const res = await fetch(`http://localhost:3000/?name=${name}&url=${url}&del=1`)
    const result = await res.json()

    updateList()
    console.log(result.message)
}

function updateList() {
    const list = document.querySelector('ul')

    list.innerHTML = '<li>Never forget another url</li>'
    load()
}

function addElement({ name, url }) {
    const li = document.createElement('li')
    const a = document.createElement("a")
    const trash = document.createElement("span")

    a.href = url
    a.innerHTML = name
    a.target = "_blank"

    trash.innerHTML = "x"
    trash.onclick = () => removeElement(trash)

    li.append(a)
    li.append(trash)
    ul.append(li)
}

function removeElement(el) {
    if (confirm('Tem certeza que deseja deletar?')) {
        const name = el.parentNode.firstChild.innerText
        const url = el.parentNode.firstChild.href.slice(0, -1)
        console.log(url)
        remove({ name, url })
    }
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    let { value } = input

    if (!value) 
        return alert('Preencha o campo')

    const [name, url] = value.split(",")

    if (!url) 
        return alert('formate o texto da maneira correta')

    if (!/^http/.test(url)) 
        return alert("Digite a url da maneira correta")

    create({ name, url })

    input.value = ""
})

load()
