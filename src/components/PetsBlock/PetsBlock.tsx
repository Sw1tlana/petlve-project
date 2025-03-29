import style from '../../scss/components/_petsBlock.module.scss';
import AddPetBtn from '../AddPetBtn/AddPetBtn';

function PetsBlock() {
  return (
    <div>
        <div className={style.containerAddPetsBtn}>
            <h3 className={style.titleAddPet}>My pets</h3>
            <AddPetBtn/>
        </div>

    </div>
  )
};

export default PetsBlock;
