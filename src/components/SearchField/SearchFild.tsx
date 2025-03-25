import style from '../../scss/components/_searchFild.module.scss';
import icons from '../../shared/icons/sprite.svg';
import '../../scss/components/btn/types/_secondary.scss';

import toast from 'react-hot-toast';

function SearchFild() {

    const handleSearchQuery = (query: string) => {
        console.log("Search query is:", query);
    };

    const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault(); 
        const form = evt.target as HTMLFormElement;
        const queryInput = form.elements.namedItem("query") as HTMLInputElement;

        if(queryInput.value !== '') {
            handleSearchQuery(queryInput.value)
        } else {
           toast.error('Please enter a search query!'); 
        }
        form.reset();
    }

  return (
    <div className={style.containerSerchFild}>
        <form className={style.formSearch} onSubmit={handleSubmit}>
            <div className={style.inputSearch}>
            <input
                type="text"
                name='query'
                className="input input--secondary"
                />
                <svg className={style.iconSearch} width={12} height={12}>
                    <use xlinkHref={`${icons}#icon-search`}/>
                </svg>
            </div>
        </form>

    </div>
  )
};

export default SearchFild;
