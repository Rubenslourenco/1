function populateUFs() {
    const ufSelect = document.querySelector("Select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() )
    .then( states => {

        for(const state of states) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    })
}


populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
    
    citySelect.innerHTML ="<option value> Selecione a cidade </option>"
    citySelect.disabled = false
    
    fetch(url)
    .then( res => res.json() )
    .then( cities => {
        
        for(const city of cities) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }
        citySelect.disabled = false
    })
}



document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)



    //itens de coleta

const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect){
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector(input[name=items])

let selectedItems = []

function handleSelectedItem(event) {
    const itemLi = event.target

    //adicionar e remover um classe em javascript
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    console.log('ITEM ID', itemId)

    //verificar se existem items selecionado, se sim 
    //pegar os items selecionados

    const alreadySelected = selectedItems.findIndex( item => {
        const itemfound = item === itemId // isso  e true ou false
        return itemfoun
    })

    // se ja estiver selecionado, tirar da seleção
    if (alreadySelected >= 0) {
        //tirar da selação
        const filteredItems = selectedItems.filter(utem =>  {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })
        
        selectedItems = filteredItems
    }else {
        //se não tiver selicione
        //adicione a seleção
        selectedItems.push(itemId)

    }
        console.log('selectedItems: ' ,selectedItems)

        //atualizar no campo escondido com os items selicionado
        collectedItems.value = selectedItems


}