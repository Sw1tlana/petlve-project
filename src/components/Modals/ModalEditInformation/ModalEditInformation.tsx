import style from '../../../scss/components/_modalEditInformation.module.scss';
import { useForm, SubmitHandler, Resolver } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AppDispatch } from '../../../reduce/store';
import { useDispatch, useSelector } from 'react-redux';
import { useId, useRef } from 'react';
import { editInformationSchema } from '../../../shemas/editInformationShema';
import { userCurrentEdit } from '../../../reduce/auth/operations';
import { selectUser } from '../../../reduce/auth/selectors';
import { User } from '../../../reduce/auth/slice';

type formData = {
  name: string | null | undefined;
  email: string | null | undefined;
  phone: string | null | undefined;
  photoUrl: string | null | undefined;
  uploadPhoto: File | null | undefined;
};

function ModalEditInformation() {
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector(selectUser) as User | null;

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const nameId = useId();
  const emailId = useId();
  const phoneId = useId();
  const photoUrl = useId();
  const uploadPhoto = useId();

  const { register, handleSubmit, setValue, watch, formState: { errors }, reset } = useForm<formData>({
    resolver: yupResolver(editInformationSchema) as Resolver<formData>,
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      photoUrl: '',
      uploadPhoto: null,
    },
    mode: 'onTouched',
  });

  const phoneValue = watch('phone');
  const nameValue = watch('name');
  const emailValue = watch('email');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setValue("uploadPhoto", file, { shouldValidate: true });
    }
  };

  const onSubmit: SubmitHandler<formData> = async (data) =>{
    if (!data.name && !data.email && !data.phone && !data.photoUrl && !data.uploadPhoto) {
      return;
    };

    try {
      const { name, email, phone, photoUrl, uploadPhoto } = data;

      const formDataForSubmit = {
        name: name ?? '',
        email: email ?? '',
        phone: phone ?? '',
        photoUrl: photoUrl ?? '',
        uploadPhoto: uploadPhoto ?? new File([], "empty"),
      };

      await dispatch(userCurrentEdit(formDataForSubmit)).unwrap();
      reset();
    } catch (err) {
      console.error('Помилка редагування:', err);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const { ref: uploadPhotoRef, ...uploadPhotoRest } = register("uploadPhoto");

  return (
    <section className={style.sectionInformation}>
      <h2 className={style.titleInformation}>Edit information</h2>
      <div className={style.avatar}>
        {user?.avatar ? (
          <img src={user.avatar} alt="User avatar" className={style.userPhoto} />
        ) : (
          <svg width={44} height={44} className={style.iconAvatar}>
            <use xlinkHref="#icon-avatar" />
          </svg>
        )}
      </div>

      <form className={style.formContainer} onSubmit={handleSubmit(onSubmit)}>
        <div className={style.containerUpload}>
          <div>
            <input
              id={photoUrl}
              type="url"
              className="input input--secondary"
              placeholder="https://ftp.goit.study/img/pets/5.webp"
              {...register("photoUrl")}
              autoComplete="off"
              aria-required="true"
            />
            {errors.photoUrl?.message && (
              <p className={style.errorMsg}>{String(errors.photoUrl.message)}</p>
            )}
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
            <button
              onClick={handleButtonClick}
              type="button"
              className="input input--secondary"
            >
              <span className={style.spanBtn}>Upload photo</span>
            </button>
            {errors.uploadPhoto?.message && (
              <p className={style.errorMsg}>{String(errors.uploadPhoto.message)}</p>
            )}
            <svg width={20} height={20} className={style.iconUpload}>
              <use xlinkHref="#icon-upload-cloud" />
            </svg>
          </div>
        </div>

        <div className={style.iconContainerAuth}>
          <input
            id={nameId}
            type="text"
            className={`input input--secondary ${!errors.name && nameValue ? "validName" : ''}`}
            placeholder="Name"
            {...register('name')}
            autoComplete="name"
            aria-required="true"
          />
          {errors.name?.message && (
            <p className={style.errorMsg}>{errors.name.message}</p>
          )}
        </div>

        <div className={style.iconContainerAuth}>
          <input
            id={emailId}
            type="email"
            className={`input input--secondary ${!errors.email && emailValue ? "validEmail" : ''}`}
            placeholder="Email"
            {...register('email')}
            autoComplete="email"
            aria-required="true"
          />
          {errors.email?.message && (
            <p className={style.errorMsg}>{errors.email.message}</p>
          )}
        </div>

        <div className={style.iconContainerAuth}>
          <input
            id={phoneId}
            className={`input input--secondary ${!errors.phone && phoneValue ? "validPhone" : ''}`}
            placeholder="+380 65 669 12 24"
            {...register('phone')}
            autoComplete="phone"
            aria-required="true"
          />
          {errors.phone?.message && (
            <p className={style.errorMsg}>{errors.phone.message}</p>
          )}
        </div>

        <button className="btn btn--primary" type="submit">
          Go to profile
        </button>
      </form>
    </section>
  );
}

export default ModalEditInformation;
