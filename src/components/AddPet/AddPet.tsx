import { useEffect, useId, useRef, useState } from "react";
import { useForm, Resolver, SubmitHandler } from "react-hook-form";
import Container from "../../shared/components/Container/Container";
import Select, { SingleValue } from "react-select";
import style from "../../scss/components/_addPet.module.scss";
import addPetImg from "../../shared/images/Personal/personal@2x.png";
import icons from "../../shared/icons/sprite.svg";
import { motion } from 'framer-motion';
import { addPetSchema } from "../../shemas/addPetShema";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { AddPetFormData } from "../../reduce/services/authServices";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../reduce/store";
import { fetchAddPet } from "../../reduce/auth/operations";

interface OptionType {
  value: string;
  label: string;
}

type FormData = {
  name: string;
  birthday: string;
  photoUrl?: string;
  uploadPhoto?: File;
  title: string;
  species: string;
  sex: "male" | "female" | "health" | "";
};

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
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [previewPhoto, setPreviewPhoto] = useState<string | null>(null);

  const dispatch: AppDispatch = useDispatch();

  const { register, handleSubmit, setValue, watch, formState: { errors }, reset } = useForm<FormData>({
    resolver: yupResolver(addPetSchema) as Resolver<FormData>,
    defaultValues: {
      name: "",
      birthday: "",
      photoUrl: undefined,
      uploadPhoto: undefined,
      title: "",
      species: "" ,
      sex: "",
     }
  }
  );

  const selectedGender = watch("sex");
  const selectSpecies = watch("species");

  const handleGenderSelect = (gender: "male" | "female" | "health") => {
  setValue("sex", gender, { shouldValidate: true });
};

  const photoUrlId = useId();
  const uploadPhoto = useId();
  const titleId = useId();
  const nameId = useId();
  const dateId = useId();

  const titleValue = watch('title');
  const nameValue = watch('name');
  const birthdayValue = watch('birthday');
  const photoUrlValue = watch('photoUrl');

  const findSelectedOption = (value: string): OptionType | null => {
    return categoryOption.find((option) => option.value === value) || null;
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setValue("uploadPhoto", file, { shouldValidate: true });
      setValue("photoUrl", "", { shouldValidate: false }); 

    const previewUrl = URL.createObjectURL(file);
    setPreviewPhoto(previewUrl);

        if (fileInputRef.current) {
       fileInputRef.current.value = '';
  }
    }
  };

  useEffect(() => {
  if (photoUrlValue?.trim()) {
    setPreviewPhoto(`${photoUrlValue.trim()}?t=${Date.now()}`);
  } else {
    setPreviewPhoto(null);
  }
}, [photoUrlValue]);

  const handleSelectChange = (
    newValue: SingleValue<OptionType>,
  ) => {
    setValue("species", newValue?.value || "", { shouldValidate: true });
  };

  const handleFileUploadClick = () => {
    fileInputRef.current?.click();
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
     if (
      !data.name && 
      !data.birthday && 
      !data.sex && 
      !data.photoUrl && 
      !data.uploadPhoto && 
      !data.species && 
      !data.title) {
    return;
  }

    try {
      const formDataForSubmit: Partial<AddPetFormData> = {};

      if (data.name) formDataForSubmit.name = data.name;
      if (data.title) formDataForSubmit.title = data.title;
      if (data.birthday) formDataForSubmit.birthday = data.birthday;
      if (data.sex) formDataForSubmit.sex = data.sex;
      if(data.species) formDataForSubmit.species = data.species;

      if (data.uploadPhoto instanceof File) {
        formDataForSubmit.uploadPhoto = data.uploadPhoto;
      } else if (data.photoUrl?.trim()) {
        formDataForSubmit.photoUrl = data.photoUrl.trim();
      }

      await dispatch(fetchAddPet(formDataForSubmit as AddPetFormData)).unwrap();
      console.log("Form: ", formDataForSubmit);
        reset(); 
    
    } catch (err) {
    if (err instanceof Error) {
      toast.error('Data could not be added. Please check or try again.');  
  } else {
      toast.error('Unknown error occurred.');
  }
  }
  };

  const { ref: uploadPhotoRef, ...uploadPhotoRest } = register("uploadPhoto");

 const avatarSrc = previewPhoto || null;

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

        <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={style.iconsContainer}>
              <div 
              className={`${style.female} ${selectedGender === "female" ? style.active : ""}`}
              onClick={() => handleGenderSelect("female")}
              >
                <svg className={style.iconFemale} width={20} height={20}>
                  <use xlinkHref={`${icons}#icon-female`} />
                </svg>
              </div>
              <div 
              className={`${style.male} ${selectedGender === "male" ? style.active : ""}`}
              onClick={() => handleGenderSelect("male")}
              >
                <svg className={style.iconMale} width={20} height={20}>
                  <use xlinkHref={`${icons}#icon-male`} />
                </svg>
              </div>
              <div 
              className={`${style.health} ${selectedGender === "health" ? style.active : ""}`}
              onClick={() => handleGenderSelect("health")}
              >
                <svg  className={style.iconHealth} width={22} height={22}>
                  <use xlinkHref={`${icons}#icon-health`}/>
                </svg>
              </div>
            </div>

              {errors.sex && (
                <p style={{ color: "red", fontSize: "12px" }}>
                  {errors.sex.message}
                </p>
              )}

                
          {avatarSrc ? (
            <img
              key={avatarSrc} 
              className={style.userPhoto}
              src={avatarSrc}
              alt="User avatar"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          ) : (
            <div className={style.addPetAvatar}>
              <svg width={26} height={26} className={style.iconPaw}>
                <use xlinkHref={`${icons}#icon-paw`} />
              </svg>
            </div>
          )}

            <div className={style.containerUpload}>
            <div>
              <input
                id={photoUrlId}
                type="url"
                className={`input input--secondary ${style.inputUrl}`}
                placeholder="Enter URL"
                autoComplete="off"
                aria-required="true"
                {...register("photoUrl", {
                  onChange: (e) => {
                    setValue("photoUrl", e.target.value, { shouldValidate: true });
                    setValue("uploadPhoto", undefined, { shouldValidate: false });

                    if (fileInputRef.current) {
                      fileInputRef.current.value = '';
                    }
                  },
                })}
              />
              {errors.photoUrl?.message && 
              (<p className={style.errorMsg}>{String(errors.photoUrl.message)}</p>)}
            </div>

          <div className={style.uploadInput}>
            <input
              id={uploadPhoto}
              type="file"
              {...uploadPhotoRest}
                ref={(e) => {
                uploadPhotoRef(e);
                fileInputRef.current = e;
              }}
              onChange={handleFileChange}
              aria-required="true"
              style={{ display: "none" }} 
            />
              <button type="button" onClick={handleFileUploadClick} 
              className={`input input--secondary ${style.uploadButton}`}>
                <span className={style.spanBtn}>Upload photo</span>
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
              id={titleId}
              type="text"
              className={`input input--secondary 
              ${!errors.name && titleValue ? "validTitle" : ''} ${style.inputText}`}
              placeholder="Title"
              {...register("title")}
              autoComplete="off"
              aria-required="true"
            />
            {errors.title?.message && 
            (<p className={style.errorMsg}>{String(errors.title.message)}</p>)}
          </div>

          <div>
            <input
              id={nameId}
              type="text"
              className={`input input--secondary 
                ${!errors.name && nameValue ? "validName" : ''} ${style.inputText}`}
              placeholder="Pets name"
              {...register("name")}
              autoComplete="off"
              aria-required="true"
            />
            {errors.name?.message && 
            (<p className={style.errorMsg}>{String(errors.name.message)}</p>)}
          </div>

          <div className={style.containerData}>
            <div>
              <input
                id={dateId}
                type="date"
                className={`input input--secondary 
                  ${style.inputData} ${!errors.name && birthdayValue ? "validBirthday" : ''}`}
                placeholder="2022-10-01"
                {...register("birthday")}
                autoComplete="bday"
                aria-required="true"
              />
              {errors.birthday?.message && 
              (<p className={style.errorMsg}>{String(errors.birthday.message)}</p>)}
            </div>

            <div>
              <Select
                id="categoryFilter"
                  value={findSelectedOption(selectSpecies)}
                  onChange={handleSelectChange}
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
                {errors.species && (
                <p style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>
                  {errors.species.message}
                </p>
              )}
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
