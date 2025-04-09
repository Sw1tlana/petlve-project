import { useEffect, useState } from 'react';
import style from '../../scss/components/_notices.module.scss';
import Container from '../../shared/components/Container/Container';
import SearchField from '../../components/SearchField/SearchFild';
import icons from '../../shared/icons/sprite.svg';

import Select, {  SingleValue, StylesConfig, ControlProps } from "react-select";
import RadioButton from '../RadioButton/RadioButton';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../reduce/store';
import { selectIsLoggedINotices, selectItemsNotices } from '../../reduce/notices/selectors';
import { fetchNotices } from '../../reduce/notices/operations';
import Loader from '../../shared/components/Loader.tsx/Loader';

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

const dispatch = useDispatch<AppDispatch>();
const loading = useSelector(selectIsLoggedINotices);
const notices = useSelector(selectItemsNotices);

interface Notices {
  _id: string;
  species: string;
  category: string;
  price: number;
  title: string;
  name: string;
  birthday: string;
  comment: string;
  sex: string;
  location: string;
  imgURL: string;
  createdAt: string;
  updatedAt: string;
  user: string;
  popularity: number;
};

useEffect(() => {
  dispatch(fetchNotices());
}, [dispatch]);

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
          {loading && <Loader/>}
          {!loading && Array.isArray(notices) && notices.length > 0 && (
        <ul className={style.noticesList}>
          {notices.map((noticeItem: Notices, index: number) => (
            <li className={style.noticesItem} key={`${noticeItem._id}-${index}`}>
                    <img
                        src={noticeItem.imgURL}
                        alt={noticeItem.title}
                        className={style.noticesImage}
                        width={300}
                      />
              <div className={style.containerTitle}>
                <p className={style.noticesTitle}>{noticeItem.title}</p>
                <p className={style.noticesPopular}>{noticeItem.popularity}</p>
                    <svg 
                        width={16} 
                        height={16} 
                        className={style.iconStar}>
                        <use xlinkHref={`${icons}#icon-star`} />
                    </svg>
              </div>
              <div className={style.containerInfo}>
                <p className={style.description}>
                  <span className={style.spanDescription}>Name</span> 
                  {noticeItem.name}
                </p>
                <p className={style.description}>
                  <span className={style.spanDescription}>Birthday</span> 
                  {noticeItem.birthday}
                </p>
                <p className={style.description}>
                  <span className={style.spanDescription}>Sex</span> 
                  {noticeItem.sex}
                </p>
                <p className={style.description}>
                  <span className={style.spanDescription}>Species</span> 
                  {noticeItem.species}
                </p>
                <p className={style.description}>
                  <span className={style.spanDescription}>Category</span> 
                  {noticeItem.category}
                </p>
              </div>
              <p className={style.comment}>{noticeItem.comment}</p>
              <p className={style.price}>${noticeItem.price}</p>

              <div className={style.containerButton}>
                <button className="btn btn--primary" type='button'>Learn more</button>
                <button 
                 type='button'
                 className={style.buttonHeart}>
                <svg 
                    width={14} 
                    height={14} 
                    className={style.iconHeart}>
                    <use xlinkHref={`${icons}#icon-heart`} />
                </svg>
                </button>
              </div>
            </li>
          ))}
  </ul>
)}

            

        </Container>
    </section>
  )
};

export default Notices;

