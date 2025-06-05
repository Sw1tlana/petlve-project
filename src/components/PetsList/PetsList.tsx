import style from '../../scss/components/_petsList.module.scss';

import {useDispatch, useSelector } from "react-redux";
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
   
    if (pets.length === 0 && isLoggedIn) {
      const samplePet = {
        title: 'My Pet',
        name: 'Buddy',
        birthday: '2020-01-01T00:00:00.000Z',
        sex: 'male',
        species: 'dog',
      };

      dispatch(fetchAddPet(samplePet));
    }
  }, [dispatch, pets, isLoggedIn]);

  const API_ROOT = "https://petlve-api.onrender.com";

  return (
    <Container>
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
                  onError={(e) => {
                  e.currentTarget.src = "https://via.placeholder.com/60x60?text=No+Image";
                }}
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
              <button className={style.buttonTrash}>
                  <svg width={16} height={16} className={style.iconTrash}>
                    <use xlinkHref={`${icons}#icon-trash`} />
                  </svg>
              </button>
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
}

export default PetsList;
