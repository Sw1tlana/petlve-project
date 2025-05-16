import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Container from "../../shared/components/Container/Container";
import Select from "react-select";
import style from "../../scss/components/_addPet.module.scss";
import addPetImg from "../../shared/images/Personal/personal@2x.png";
import icons from "../../shared/icons/sprite.svg";
import { motion } from 'framer-motion';

interface OptionType {
  value: string;
  label: string;
}

interface FormValues {
  photoUrl: string;
  uploadPhoto: File;
  breed: string;
  name: string;
  birthdate: string;
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
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm<FormValues>();

  const handleCategoryChange = (selected: OptionType | null) => {
    setSelectedOption(selected);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setValue("uploadPhoto", file, { shouldValidate: true });
    }
  };

  const handleFileUploadClick = () => {
    fileInputRef.current?.click();
  };

  const onSubmit = (data: FormValues) => {
    console.log("Form Data:", data);
    reset();
  };

  return (
    <section>
      <Container>
        <div className={style.wrapper}>
          <div className={style.containerImg}>
            <motion.img
              src={addPetImg}
              alt="Add pet"
              initial={{ x: -100, opacity: 0 }}  
              animate={{ x: 0, opacity: 1 }}      
              transition={{ duration: 2, ease: "easeOut" }}
            />
          </div>
          <div className={style.addPetContainer}>
            <h3 className={style.addPetTitle}>
              Add my pet / <span className={style.subtitleMini}>Personal details</span>
            </h3>

            <div className={style.iconsContainer}>
              <div className={style.female}>
                <svg className={style.iconFemale} width={20} height={20}>
                  <use xlinkHref={`${icons}#icon-female`} />
                </svg>
              </div>
              <div className={style.male}>
                <svg className={style.iconMale} width={20} height={20}>
                  <use xlinkHref={`${icons}#icon-male`} />
                </svg>
              </div>
              <div className={style.health}>
                <svg  className={style.iconHealth} width={22} height={22}>
                  <use xlinkHref={`${icons}#icon-health`}/>
                </svg>
              </div>
            </div>

        <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={style.addPetAvatar}>
            <svg width={26} height={26} className={style.iconPaw}>
              <use xlinkHref={`${icons}#icon-paw`} />
            </svg>
          </div>

          <div className={style.containerUpload}>
          <div>
            <input
              type="url"
              className={`input input--secondary ${style.inputUrl}`}
              placeholder="https://ftp.goit.study/img/pets/5.webp"
              {...register("photoUrl")}
              autoComplete="off"
              aria-required="true"
            />
            {errors.photoUrl?.message && 
            (<p className={style.errorMsg}>{String(errors.photoUrl.message)}</p>)}
          </div>

          <div className={style.uploadInput}>
            <input
              type="file"
              {...register("uploadPhoto")}
              ref={fileInputRef}
              onChange={handleFileChange}
              aria-required="true"
              style={{ display: "none" }} 
            />
              <button type="button" onClick={handleFileUploadClick} 
              className={`input input--secondary ${style.uploadButton}`}>
                <span className={style.spanBtn}>Uploat photo</span>
              </button>
            {errors.uploadPhoto?.message && (
              <p className={style.errorMsg}>{String(errors.uploadPhoto.message)}</p>
            )}
            <svg width={20} height={20} className={style.iconUpload}>
              <use xlinkHref={`${icons}#icon-upload-cloud`} />
            </svg>
          </div>
          </div>

          <div>
            <input
              type="text"
              className={`input input--secondary ${style.inputText}`}
              placeholder="Golden Retriever Puppies"
              {...register("breed")}
              autoComplete="off"
              aria-required="true"
            />
            {errors.breed?.message && 
            (<p className={style.errorMsg}>{String(errors.breed.message)}</p>)}
          </div>

          <div>
            <input
              type="text"
              className={`input input--secondary ${style.inputText}`}
              placeholder="Daisy"
              {...register("name")}
              autoComplete="off"
              aria-required="true"
            />
            {errors.name?.message && 
            (<p className={style.errorMsg}>{String(errors.name.message)}</p>)}
          </div>

          <div className={style.containerData}>
            <div className={style.inputData}>
              <input
                type="date"
                className={`input input--secondary ${style.inputData}`}
                placeholder="2022-10-01"
                {...register("birthdate")}
                autoComplete="bday"
                aria-required="true"
              />
              {errors.birthdate?.message && 
              (<p className={style.errorMsg}>{String(errors.birthdate.message)}</p>)}
            </div>

            <div>
              <Select
                id="categoryFilter"
                value={selectedOption}
                onChange={handleCategoryChange}
                options={categoryOption}
                styles={{
                  control: (base) => ({
                    ...base,
                    height: "51px",
                    width: "144px",
                    border: "1px solid rgba(29, 30, 33, 0.1)",
                    borderRadius: "60px",
                    padding: "0 6px",

                    "@media (min-width: 768px)": {
                      width: "210px",
                    },
                  }),
                  menu: (base) => ({ ...base, zIndex: 999 }),
                  placeholder: (base) => ({
                    ...base,
                    fontSize: "14px",
                  }),
                  indicatorSeparator: () => ({
                    display: "none",
                  }),
                }}
                menuPosition="fixed"
                placeholder="Dog"
              />
            </div>
          </div>
          <div className={style.containerBtn}>
            <button type="button" className={style.btnBack}>Back</button>
          <div className={style.btnSubmit}>
              <button type="submit" className="btn btn--primary">Submit</button>
          </div>
        </div>
        </form>
        </div>
        </div>
      </Container>
    </section>
  );
}

export default AddPet;
