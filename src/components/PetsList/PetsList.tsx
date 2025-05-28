import style from '../../scss/components/_petsList.module.scss';

import {useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn, selectPets } from "../../reduce/auth/selectors";
import { useEffect } from "react";
import { fetchAddPet } from "../../reduce/auth/operations";
import { AppDispatch } from "../../reduce/store";
import { Container } from '@mui/material';
import icons from '../../shared/icons/sprite.svg';
import { AddPetFormData } from '../../reduce/services/authServices';

type SomeType = {
  title?: string;
  birthday?: string;
  sex?: string;
  species?: string;
  uploadPhoto?: File | undefined;
  photoUrl?: string;
};

function PetsList({ data = {}, name = '' }: { data?: SomeType; name?: string }) {
  const dispatch = useDispatch<AppDispatch>();
  const pets = useSelector(selectPets);
  const isLoggedIn = useSelector(selectIsLoggedIn);

useEffect(() => {
  if (pets.length === 0 && isLoggedIn && data) {
    const formDataForSubmit: AddPetFormData = {
      name: name || 'Unnamed',
      title: data.title || 'No title',
      birthday: data.birthday || '2000-01-01',
      sex: data.sex || 'male',
      species: data.species || 'Unknown',
    };

      if (data.uploadPhoto instanceof File) {
        formDataForSubmit.uploadPhoto = data.uploadPhoto;
      } else if (data.photoUrl?.trim()) {
        formDataForSubmit.photoUrl = data.photoUrl.trim();
      }

    console.log("formDataForSubmit", formDataForSubmit);
    dispatch(fetchAddPet(formDataForSubmit));
  }

}, [dispatch, pets, isLoggedIn, name, data]);

type PetType = SomeType & { _id?: string; name?: string };

const getPhotoUrl = (pet: PetType) => {
  if (pet.uploadPhoto instanceof File) {
    return URL.createObjectURL(pet.uploadPhoto);
  }
  return pet.photoUrl || "https://ftp.goit.study/img/pets/1.webp";
};

  return (
    <Container>
      {isLoggedIn && Array.isArray(pets) && pets.length > 0 && (
        <ul className={style.listPets}>
          {pets.map((pet, index) => (
            <li className={style.itemPets} key={pet._id || index}>
              <img
                src={getPhotoUrl(pet)}
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
