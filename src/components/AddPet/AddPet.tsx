import Container from "../../shared/components/Container/Container";
import style from '../../scss/components/_addPet.module.scss';
import addPetImg from '../../shared/images/Personal/personal@2x.png'
import icons from '../../shared/icons/sprite.svg';

import { useForm } from 'react-hook-form';
import Select from "react-select";
import { CSSObjectWithLabel, GroupBase, StylesConfig } from "react-select";
import { useState } from "react";

interface OptionType {
    value: string;
    label: string;
  }

  const categoryOption = [
    { value: "Dog", label: "Dog" },
    { value: "Cat", label: "Cat" },
    { value: "Monkey", label: "Monkey" },
    { value: "Bird", label: "Bird" },
    { value: "Snake", label: "Snake" },
    { value: "Turtle", label: "Turtle" },
    { value: "Lizard", label: "Lizard" },
    { value: "Frog", label: "Frog" },
    { value: "Fish", label: "Fish" },
    { value: "Ants", label: "Ants" },
    { value: "Bees", label: "Bees" },
    { value: "Butterfly", label: "Butterfly" },
  ];

function AddPet() {
    const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);

        const { register, handleSubmit, formState: { errors }, reset } = useForm({
            mode: 'onTouched'
        });

        const handleCategoryChange = (selected: OptionType | null) => {
            setSelectedOption(selected);
        }
    
        const onSubmit = () => {
          reset();
        }

        const customStyles: StylesConfig<OptionType, false, GroupBase<OptionType>> = {
            control: (base: CSSObjectWithLabel, state) => ({
              ...base,
              boxSizing: "border-box",
              height: "44px",

              border: `1px solid ${state.isFocused ? "var(--green-accent-color)" : "rgba(29, 30, 33, 0.1)"}`,
              backgroundColor: "#ffffff",
              borderRadius: "60px",
              padding: "0 6px",
              boxShadow: "0 0 0 rgba(0, 0, 0, 0.2)",
              "&:hover": {
                borderColor: "#E850501A",
              },
            }),
            menu: (base) => ({
              ...base,
              zIndex: 999,
            }),
            indicatorSeparator: (base) => ({
              ...base,
              display: "none",
            }),
            option: (base, { isFocused, isSelected }) => ({
              ...base,
              backgroundColor: isFocused ? "#93939A" : isSelected ? "#93939A" : "#ffffff",
              color: isSelected ? "#ffffff" : "#121417",
              padding: 10,
              cursor: "pointer",
            }),
            placeholder: (base) => ({
              ...base,
              color: "rgba(29, 30, 33, 0.4)",
              fontSize: "12px",
            }),
            dropdownIndicator: (base) => ({
              ...base,
              color: "rgba(29, 30, 33, 0.7)",
              "&:hover": {
                color: "#1D1E21",
                width: "7px",
              },
            }),
          };
        
  return (
    <section>
        <Container>
            <div className={style.wrapper}>
                <div className={style.containerImg}>
                   <img className={style.addImg} src={addPetImg} alt="Add pet"/>
                </div>
                <div className={style.addPetContainer}>
                   <h3 className={style.addPetTitle}>
                   Add my pet / <span>Personal details</span>
                   </h3>
                   <div className={style.iconsContainer}>
                   <svg width={20} height={20} className={style.iconFemale}>
                        <use xlinkHref={`${icons}#icon-female`} />
                      </svg>
                      <svg width={20} height={20} className={style.iconMale}>
                        <use xlinkHref={`${icons}#icon-male`} />
                      </svg>
                      <svg width={20} height={20} className={style.iconHealt}>
                        <use xlinkHref={`${icons}#icon-health`} />
                      </svg>
                   </div>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={style.addPetAvatar}>
                </div>

                <div className={style.containerUrl}>
                     <div>
                        <input
                        // id={namedId}
                        type="url"
                        className="input input--secondary"
                        placeholder="https://ftp.goit.study/img/pets/5.webp"
                        {...register('photoUrl')}
                        autoComplete="name"
                        aria-required="true"
                        />
                       {typeof errors.username?.message === "string" && 
                       <p className={style.errorMsg}>{errors.username.message}</p>}
                    </div>

                    <div>
                    <input 
                        type="file" 
                        className="input input--secondary" 
                        {...register('uploadPhoto')} 
                        aria-required="true"
                        />
                            {typeof errors.uploadPhoto?.message === "string" && 
                            <p className={style.errorMsg}>{errors.uploadPhoto.message}</p>}
                        <svg width={20} height={20} className={style.iconIncrement}>
                           <use xlinkHref={`${icons}#icon-upload-cloud`} />
                      </svg>
                   </div>
                </div>

                   <div>
                        <input
                        // id={namedId}
                        type="text"
                        className="input input--secondary"
                        placeholder="Golden Retriever Puppies"
                        {...register('breed')}
                        autoComplete="name"
                        aria-required="true"
                        />
                       {typeof errors.username?.message === "string" && 
                       <p className={style.errorMsg}>{errors.username.message}</p>}
                   </div>

                   <div>
                        <input
                        // id={namedId}
                        type="text"
                        className="input input--secondary"
                        placeholder="Daisy"
                        {...register('name')}
                        autoComplete="name"
                        aria-required="true"
                        />
                       {typeof errors.username?.message === "string" && 
                       <p className={style.errorMsg}>{errors.username.message}</p>}
                   </div>

                   <div className={style.containerData}>

                   <div>
                   <input
                        type="date"
                        className="input input--secondary"
                        placeholder="2022-10-01"
                        {...register('birthdate')}
                        autoComplete="bday"
                        aria-required="true"
                        />
                            {typeof errors.birthdate?.message === "string" && 
                            <p className={style.errorMsg}>{errors.birthdate.message}</p>}           
                        <svg width={20} height={20} className={style.iconIncrement}>
                           <use xlinkHref={`${icons}#icon-calendar`} />
                      </svg>
                   </div>

                   <div>
                   <Select
                        id="categoryFilter"
                        value={selectedOption} 
                        onChange={handleCategoryChange}
                        options={categoryOption}
                        styles={customStyles}
                        menuPosition="fixed"
                        placeholder="Dog"
                    />
                       {typeof errors.username?.message === "string" && 
                       <p className={style.errorMsg}>{errors.username.message}</p>}
                   </div>

                   </div>
            </form>

        </Container>

    </section>
  )
};

export default AddPet;
