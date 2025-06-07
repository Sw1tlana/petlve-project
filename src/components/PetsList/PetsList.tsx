import style from '../../scss/components/_petsList.module.scss';

import {useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn, selectPets } from "../../reduce/auth/selectors";
import { useEffect, useRef } from "react";
import { fetchAddPet, removePet } from "../../reduce/auth/operations";
import { AppDispatch } from "../../reduce/store";
import icons from '../../shared/icons/sprite.svg';

function PetsList() {
  const dispatch = useDispatch<AppDispatch>();
  const pets = useSelector(selectPets);
  const isLoggedIn = useSelector(selectIsLoggedIn);

const hasAdded = useRef(false);

useEffect(() => {
    if (isLoggedIn && pets.length === 0 && !hasAdded.current) {
    hasAdded.current = true;
    const samplePet = {
      title: 'My Pet',
      name: 'Buddy',
      birthday: '2020-01-01T00:00:00.000Z',
      sex: 'male',
      species: 'dog',
    };
    dispatch(fetchAddPet(samplePet));
  }
}, [isLoggedIn, dispatch, pets.length]);

  const API_ROOT = "https://petlve-api.onrender.com";

  const handleDeletePet = (id: string) => {
    dispatch(removePet(id));
  }

  return (
    <div className={style.containerPets}>
      {isLoggedIn && Array.isArray(pets) && pets.length > 0 && (
        <ul className={style.listPets}>
          {pets.map((pet, index) => (
            <li className={style.itemPets} key={pet._id || index}>
              {pet.photo && (
                <img
                  src={pet.photo.startsWith("http") ? pet.photo : `${API_ROOT}${pet.photo}`}
                  alt={pet.title}
                  className={style.noticesImage}
                  width={60}
                />
              )}
              <div className={style.containerTitle}>
                <div className={style.wrapperInfo}>
                  <p className={style.noticesTitle}>{pet.title}</p>
                </div>
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
              <button
                onClick={() => handleDeletePet(pet._id)} 
                className={style.buttonTrash}>
                  <svg width={16} height={16} className={style.iconTrash}>
                    <use xlinkHref={`${icons}#icon-trash`} />
                  </svg>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PetsList;
