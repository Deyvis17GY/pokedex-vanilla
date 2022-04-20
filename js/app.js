const pokeHeader = document.getElementById("pokeHeader")
const pokeBallAnimated = document.getElementById("pokeBallAnimated")
let showPokeBall = false
pokeHeader.disabled = true
const loadPokemon = async (id) => {
  pokeHeader.disabled = true
  hiddenPokeBall()
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
  if (!response || !showPokeBall) return
  const data = await response.json()
  paintPokemon(data)
  return data
}

document.addEventListener("DOMContentLoaded", () => {
  const pokeRandom = getRandomInt(1, 151)
  loadPokemon(pokeRandom)
})

const paintPokemon = (pokemon) => {
  if (!pokemon) return
  const {
    name,
    sprites: { other, versions },
    abilities,
    base_experience,
    types
  } = pokemon

  const pokemonName = document.querySelector(".cardTitle__title")

  const pokemonImg = document.querySelector(".cardImage__img")
  const pokeOrder = document.getElementById("pokeOrder")
  const pokeLevel = document.getElementById("pokeLevel")
  const pokeType = document.getElementById("pokeType")
  const pokeAbility = document.getElementById("pokeAbility")
  const pokeHeight = document.getElementById("pokeHeight")
  const pokeWeight = document.getElementById("pokeWeight")
  const pokeIcon = document.getElementById("pokeIcon")
  const iconAnimated =
    versions?.["generation-v"]?.["black-white"]?.animated.back_default

  pokemonName.textContent = name
  pokemonImg.src = other.dream_world.front_default
  pokeOrder.textContent = transformOrder(pokemon.order)
  pokeLevel.textContent = base_experience
  pokeType.textContent = types.map((type) => type.type.name).join(", ")
  pokeAbility.textContent = abilities
    .map((ability) => ability.ability.name)
    .join(", ")
  pokeHeight.textContent = pokemon.height / 10 + "m"
  pokeWeight.textContent = pokemon.weight / 10 + "kg"
  pokeIcon.src = iconAnimated
  pokeHeader.classList.remove("isDisabled")
}

const transformOrder = (order) => {
  if (!order) return "No order"
  if (order <= 10) {
    return "00" + order
  } else {
    return "0" + order
  }
}

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min
}

pokeHeader.addEventListener("click", () => {
  pokeBallAnimated.style.display = "flex"
  pokeHeader.classList.add("isDisabled")
  const pokeRandom = getRandomInt(1, 151)
  loadPokemon(pokeRandom)
})

const hiddenPokeBall = () => {
  console.debug("hiddenPokeBall", showPokeBall)
  setTimeout(() => {
    pokeBallAnimated.style.display = "none"
  }, 1000)
  showPokeBall = true
}
