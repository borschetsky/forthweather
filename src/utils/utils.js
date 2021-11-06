const generateIconImageLink = (iconName) => {
  if(iconName){
    return "https://openweathermap.org/img/wn/" + iconName + "@2x.png"
  }
}

export {
  generateIconImageLink
}