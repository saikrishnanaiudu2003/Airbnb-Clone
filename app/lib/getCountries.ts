import countries from "world-countries";

const countriesFormatted = countries.map((country)=>({
    value:country.cca2,
    label:country.name.common,
    flag:country.flag,
    latLang:country.latlng,
    region:country.region,

}))

export const userCountires = ()=>{
    const getAllCountries = () => countriesFormatted
    const getAllCountryByValue = (value:string)=>{
        return countriesFormatted.find((item)=> item.value === value)
    }

    return{
        getAllCountries,
        getAllCountryByValue
    }
}