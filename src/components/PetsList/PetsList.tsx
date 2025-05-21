import style from '../../scss/components/_petsList.module.scss';

import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn, selectPets } from "../../reduce/auth/selectors";
import { useEffect } from "react";
import { fetchAddPet } from "../../reduce/auth/operations";
import { AppDispatch } from "../../reduce/store";
import { Container } from '@mui/material';
import icons from '../../shared/icons/sprite.svg';

function PetsList() {
    const dispatch = useDispatch<AppDispatch>();
    const pets = useSelector(selectPets);
    const isLoggedIn = useSelector(selectIsLoggedIn);

useEffect(() => {
  if (pets.length === 0) {
    const petToAdd = {
      name: "Unnamed",
      title: "No title",
      birthday: "2000-01-01",
      sex: "male",
      species: "Dog",
      photoUrl: "",
      uploadPhoto: undefined as unknown as File
    };
    dispatch(fetchAddPet(petToAdd));
  }
}, [dispatch, pets, isLoggedIn]);

  return (
    <Container>
     {isLoggedIn && Array.isArray(pets) && pets.length > 0 && (
        <ul className={style.listPets}>
          {pets.map((pet, index) => (
            <li className={style.itemPets} key={pet._id || index}>

              <img
                src={pet.photoUrl || "https://ftp.goit.study/img/pets/1.webp"}
                alt={pet.title}
                className={style.noticesImage}
                width={90}
              />
              <div className={style.wrapperInfo}>
                <p className={style.noticesTitle}>{pet.title}</p>
            
              <div className={style.containerInfo}>
                <p className={style.description}>
                  <span className={style.spanDescription}>Name</span>
                  {pet.name}
                </p>
                <p className={style.description}>
                  <span className={style.spanDescription}>Birthday</span>
                  {pet.birthday?.split('T')[0]}
                </p>
                <p className={style.description}>
                  <span className={style.spanDescription}>Sex</span>
                  {pet.sex}
                </p>
                <p className={style.description}>
                  <span className={style.spanDescription}>Species</span>
                  {pet.species}
                </p>
             </div>
            </div>
            <button className={style.buttonHeart } type='button'>
              <svg width={10} height={10} className={style.iconHeart}>
                <use xlinkHref={`${icons}#icon-trash`} />
              </svg>
            </button>
            </li>
          ))}
      </ul>
     )}
    </Container>
  )
};

export default PetsList;
