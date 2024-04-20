import { Accommodation } from "./Accommodation";

export const Accommodations = ({ accommodations }) => {
  return (
    <div className="all-accommodations">
      {accommodations &&
        accommodations.map((accommodation) => {
          return (
            <Accommodation
              key={accommodation._id}
              accommodation={accommodation}
            />
          );
        })}
    </div>
  );
};
