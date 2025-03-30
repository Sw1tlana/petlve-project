import { useState } from 'react';
import style from '../../scss/components/_notices.module.scss';
import Container from '../../shared/components/Container/Container';
import SearchField from '../../components/SearchField/SearchFild';
import icons from '../../shared/icons/sprite.svg';

import Select, {  SingleValue, StylesConfig, ControlProps } from "react-select";
import RadioButton from '../RadioButton/RadioButton';

interface OptionType {
    value: string;
    label: string;
  };

  const typeOption: OptionType[] = [
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

  const genderOption: OptionType[] = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "multiple", label: "Multiple" },
    { value: "unknown", label: "Unknown"}
  ];

  const categoryOption: OptionType[] = [
    { value: "found", label: "Found" },
    { value: "sell", label: "Sell" },
    { value: "free", label: "Free" },
    { value: "lost", label: "Lost"}
  ];

  const customStyles: StylesConfig<OptionType, false> = {
    control: (base, state: ControlProps<OptionType, false>) => ({
      ...base,
      width: "100%",
      padding: "6px",
      margin: 0,
      borderRadius: "30px",
      border: "none",
      boxShadow: state.isFocused ? "none" : base.boxShadow,

    }),
    menu: (base) => ({ 
      ...base, 
      zIndex: 999 
    }),
    placeholder: (base) => ({
      ...base,
      fontSize: "14px",
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
  };

function Notices() {
const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);

const handleCategoryChange = (selected: SingleValue<OptionType>) => {
    setSelectedOption(selected);
  };

  return (
    <section>
        <Container>
              <h2 className={style.titleNotices}>Find your favorite pet</h2>
                <div className={style.containerForm}>
                <form className={style.form}>
                  <div className={style.conteinerSearchSelect}>
                <SearchField className={`${style.searchField}`} />
                    <div className={style.containerSelect}>
                        <Select
                        // id="categoryFilter"
                        value={selectedOption}
                        onChange={handleCategoryChange}
                        options={categoryOption}
                        styles={customStyles} 
                        className={style.categorySelect}                  
                        menuPosition="fixed"
                        placeholder="Category"
                    />
                    <Select
                        // id="categoryFilter"
                        value={selectedOption}
                        onChange={handleCategoryChange}
                        options={genderOption}
                        styles={customStyles}
                        className={style.genderSelect}                      
                        menuPosition="fixed"
                        placeholder="By gander"
                    />
                </div>
                </div>
                
                <div className={style.containerTypeLocation}>
                <div className={style.inputType}>
                <Select
                        // id="typeFilter"
                        value={selectedOption}
                        onChange={handleCategoryChange}
                        options={typeOption}
                        styles={customStyles}                
                        menuPosition="fixed"
                        placeholder="By type"
                    />
                  </div>

                <div className={style.inputSearch}>
                    <input
                        type="text"
                        name='query'
                        placeholder='Location'
                        className={`input input--secondary ${style.locationSearch}`}
                        />
                        <svg className={style.iconSearch} width={12} height={12}>
                            <use xlinkHref={`${icons}#icon-search`}/>
                        </svg>
                    </div>
                  </div>
              </form>
              <div className={style.border}></div>
            <div className={style.containerRadioButton}>
              <RadioButton/>
            </div>
            </div>

        </Container>
    </section>
  )
};

export default Notices;

