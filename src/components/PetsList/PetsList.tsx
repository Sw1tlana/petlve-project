// import style from '../../scss/components/_petsList.module.scss';

import { useDispatch, useSelector } from "react-redux";
import { selectPets } from "../../reduce/auth/selectors";
import { useEffect } from "react";
import { fetchAddPet } from "../../reduce/auth/operations";
import { AppDispatch } from "../../reduce/store";

function PetsList() {
    const dispatch = useDispatch<AppDispatch>();
    const pets = useSelector(selectPets);

useEffect(() => {
  const petToAdd = pets[0]; 
  if (petToAdd) {
    const formData = {
      name: petToAdd.name || "Unnamed",
      title: petToAdd.title || "No title",
      birthday: petToAdd.birthday || "2000-01-01",
      sex: (petToAdd.sex as "male" | "female" | "health") || "male",
      species: petToAdd.species || "Dog",
      photoUrl: petToAdd.photoUrl || "",
      };
    dispatch(fetchAddPet(formData));
  }
}, [dispatch, pets]);

  return (
    <ul>

    </ul>
  )
};

export default PetsList;
