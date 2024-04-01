import { IoWifi } from "react-icons/io5"

export const Perks =  ({selected,onChange}) => {
  return (
    <div className="perks">
          <label className="perk">
            <input className="checkbox" type="checkbox" />
            <IoWifi />
            <span>Wifi</span>
          </label>
          <label className="perk">
            <input className="checkbox" type="checkbox" />
            <IoWifi />
            <span>Wifi</span>
          </label>
          <label className="perk">
            <input className="checkbox" type="checkbox" />
            <IoWifi />
            <span>Wifi</span>
          </label>
          <label className="perk">
            <input className="checkbox" type="checkbox" />
            <IoWifi />
            <span>Wifi</span>
          </label>
          <label className="perk">
            <input className="checkbox" type="checkbox" />
            <IoWifi />
            <span>Wifi</span>
          </label>
          <label className="perk">
            <input className="checkbox" type="checkbox" />
            <IoWifi />
            <span>Wifi</span>
          </label>
        </div>
  )
}