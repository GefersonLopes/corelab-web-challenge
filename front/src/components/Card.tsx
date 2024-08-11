import { useEffect } from 'react';

import { ICard } from '../types/Card';

import { MdErrorOutline, MdOutlineEdit } from 'react-icons/md';
import { IoMdClose } from 'react-icons/io';
import { MdStarRate } from 'react-icons/md';
import { MdOutlineStarRate } from 'react-icons/md';
import { IoMdCheckmark } from 'react-icons/io';

import '../styles/card.scss';
import '../styles/colors.scss';

import Paint from './Paint';

import { RootState } from '../store/rootReducer';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setId, setModalData } from '../features/modal';

import { dataDelete, dataSave } from '../utils/textDefaultModal';
import { ICardMaker } from '../types/CardMaker';
import { createCard } from '../middlewares/cardMaker';

import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Tooltip from './Tooltip';
import { updateCard } from '../services/updateCard';
import { updateCardReducer } from '../features/cards';

const Card = (data: ICard) => {
  const dispatch = useDispatch();
  const modalState = useSelector((state: RootState) => state.modal);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ICardMaker>({
    resolver: yupResolver(createCard),
    defaultValues: {
      title: data.title || '',
      description: data.description || '',
    },
  });

  useEffect(() => {
    reset({
      title: data.title || '',
      description: data.description || '',
    });
  }, [data, reset]);

  const onSubmit = (formData: ICardMaker) => {
    handleContentModal('save', formData);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  const handleContentModal = (type: string, dataSubmit?: ICardMaker) => {
    dispatch(
      setModalData({
        typeModal: type,
        idItem: data.id,
        content: type === 'save' ? dataSave : dataDelete,
        dataSubmit: {
          ...data,
          ...dataSubmit,
        },
      }),
    );
  };

  const setFavorite = () => {
    updateCard(data.id, {
      isFavorite: !data.isFavorite,
    });
  };

  const errorMessage = errors?.description?.message || errors?.title?.message;

  return (
    <li
      className={`bg-custom-color-${data?.color || 'white'} cardItem d-flex flex-column align-items-center mx-4 my-5 position-relative`}
    >
      <form onKeyDown={handleKeyDown} className="w-100 h-100">
        <header className="w-100 px-4 py-3 d-flex align-items-center justify-content-between border-bottom border-2">
          <input
            type="text"
            disabled={modalState.idItem !== data.id}
            {...register('title')}
          />
          {data.isFavorite ? (
            <MdStarRate
              fill="#FFCC00"
              size={30}
              className="cursor-pointer"
              onClick={() => {
                setFavorite();
                dispatch(
                  updateCardReducer({
                    ...data,
                    isFavorite: !data.isFavorite,
                  }),
                );
              }}
            />
          ) : (
            <MdOutlineStarRate
              fill="#979797"
              size={30}
              className="cursor-pointer"
              onClick={() => {
                setFavorite();
                dispatch(
                  updateCardReducer({
                    ...data,
                    isFavorite: !data.isFavorite,
                  }),
                );
              }}
            />
          )}
        </header>
        <textarea
          id="descriptionCard"
          disabled={modalState.idItem !== data.id}
          {...register('description')}
        ></textarea>
        <div className="position-relative">
          <div
            className="d-flex flex-column position-absolute"
            style={{
              right: '8px',
              bottom: '-2rem',
            }}
          >
            {errorMessage && (
              <Tooltip text={errorMessage}>
                <MdErrorOutline size={24} color="red" />
              </Tooltip>
            )}
          </div>
        </div>
      </form>
      <footer className="w-100 px-4 d-flex align-items-center justify-content-between pt-1">
        <div>
          {modalState.idItem === data.id ? (
            <IoMdCheckmark
              size={30}
              className="mx-1 buttonIcon"
              title="Salvar"
              onClick={() => handleSubmit(onSubmit)()}
            />
          ) : (
            <MdOutlineEdit
              size={30}
              className="mx-1 buttonIcon"
              title="Editar"
              onClick={() => {
                if (modalState.typeModal === 'edit') {
                  return toast.error(
                    'Deve salvar o item anterior antes de editar outro!',
                  );
                }
                dispatch(setId(data.id));
              }}
            />
          )}
          <Paint />
        </div>
        <IoMdClose
          size={30}
          className="buttonIcon"
          title="Excluir"
          onClick={() => handleContentModal('delete', data)}
        />
      </footer>
    </li>
  );
};

export default Card;
