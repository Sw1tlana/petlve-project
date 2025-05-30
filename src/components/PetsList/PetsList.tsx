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

  return (
    <Container>
      {isLoggedIn && Array.isArray(pets) && pets.length > 0 && (
        <ul className={style.listPets}>
          {pets.map((pet, index) => (
            <li className={style.itemPets} key={pet._id || index}>
              <img
                src={pet.photo}
                alt={pet.title}
                className={style.noticesImage}
                width={30}
              />
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
              <svg width={40} height={40} className={style.iconUser}>
                <use xlinkHref={`${icons}#icon-trash`} />
              </svg>
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
}

export default PetsList;
