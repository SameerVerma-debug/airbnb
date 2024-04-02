import { IoWifi } from "react-icons/io5"
import { PiTelevisionSimpleDuotone } from "react-icons/pi";
import { RiParkingBoxFill } from "react-icons/ri";
import { FaRadio } from "react-icons/fa6";
import { MdPets } from "react-icons/md";
import { GiCryptEntrance } from "react-icons/gi";

export const Perks =  ({selected,onChange}) => {
  const handleCbChange = (e) => {
    if(e.target.checked){
      onChange([...selected,e.target.name])
    }
    else{
      onChange([...selected.filter(selectedName => selectedName !== e.target.name)]);
    }
  }
  return (
    <div className="perks">
          <label className="perk">
            <input className="checkbox" name="wifi" type="checkbox" onChange={handleCbChange}/>
            <IoWifi />
            <span>Wifi</span>
          </label>
          <label className="perk">
            <input className="checkbox" name="parking" type="checkbox" onChange={handleCbChange}/>
            <RiParkingBoxFill />
            <span>Free Parking Spot</span>
          </label>
          <label className="perk">
            <input className="checkbox" name="tv" type="checkbox" onChange={handleCbChange}/>
            <PiTelevisionSimpleDuotone />
            <span>TV</span>
          </label>
          <label className="perk">
            <input className="checkbox" name="radio" type="checkbox" onChange={handleCbChange}/>
            <FaRadio />
            <span>Radio</span>
          </label>
          <label className="perk">
            <input className="checkbox" name="pets" type="checkbox" onChange={handleCbChange}/>
            <MdPets />
            <span>Pets</span>
          </label>
          <label className="perk">
            <input className="checkbox" name="entrance" type="checkbox" onChange={handleCbChange} />
            <GiCryptEntrance />
            <span>Private entrance</span>
          </label>
        </div>
  )
}