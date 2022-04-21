const pokeHeader = document.getElementById("pokeHeader")
const pokeBallAnimated = document.getElementById("pokeBallAnimated")
let showPokeBall = false
pokeHeader.disabled = true
const loadPokemon = async (id) => {
  pokeHeader.disabled = true
  showPokeBall = true
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
  if (!response) return

  const data = await response.json()
  paintPokemon(data)
  showPokeBall = false
  return data
}

document.addEventListener("DOMContentLoaded", () => {
  const pokeRandom = getRandomInt(1, 151)
  loadPokemon(pokeRandom)
  loadMiniPokes()
})

const paintPokemon = (pokemon) => {
  if (!pokemon || !showPokeBall) return
  const {
    name,
    sprites: { other, versions },
    abilities,
    base_experience,
    types
  } = pokemon

  const pokemonName = document.getElementById("pokeName")

  const pokemonImg = document.getElementById("pokeImg")
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
  hiddenPokeBall()
  setTimeout(() => {
    loadPokemon(pokeRandom)
    loadMiniPokes()
  }, 1000)
})

const hiddenPokeBall = () => {
  setTimeout(() => {
    pokeBallAnimated.style.display = "none"
    showPokeBall = true
  }, 1200)
}

const pokeGetImages = (number) => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${number}.png`
}

const loadMiniPokes = () => {
  for (let i = 1; i <= 4; i++) {
    const pokes = document.getElementById("poke" + i)
    const randomNumber = getRandomInt(1, 151)
    pokes.src = pokeGetImages(randomNumber)

    pokes.addEventListener("click", () => {
      const getIdSrc = pokes.src.split("/")
      const id = getIdSrc[getIdSrc.length - 1].split(".")[0]
      loadPokemon(id)
    })
  }
}
