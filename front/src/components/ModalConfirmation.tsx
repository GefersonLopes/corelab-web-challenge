import React from 'react';
import { useDispatch } from 'react-redux';

import { IoMdClose } from 'react-icons/io';

import { RootState } from '../store/rootReducer';
import { useSelector } from 'react-redux';

import { hideModal, reset } from '../features/modal';
import { motion, AnimatePresence } from 'framer-motion';
import { updateCard } from '../services/updateCard';
import { deleteCard } from '../services/deleteCard';
import { deleteCardReducer, updateCardReducer } from '../features/cards';

const ModalConfirmation = () => {
  const dispatch = useDispatch();
  const modalState = useSelector((state: RootState) => state.modal);

  return (
    <AnimatePresence>
      {modalState.show && (
        <>
          <div
            className={`modal fade ${modalState.show ? 'show d-block' : 'd-none'} d-flex align-items-center justify-content-between w-100 h-100`}
            tabIndex={-1}
            role="dialog"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: -50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: 50 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="w-100 h-100 d-flex align-items-center justify-content-center"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header d-flex align-items-center justify-content-between">
                    <h5 className="modal-title">{modalState.content?.title}</h5>
                    <button
                      type="button"
                      className="border-0 bg-white close"
                      onClick={() => dispatch(hideModal())}
                      aria-label="Close"
                    >
                      <IoMdClose
                        size={25}
                        title="Limpar busca"
                        className="mx-2"
                      />
                    </button>
                  </div>
                  <div className="modal-body">
                    <p>{modalState.content?.description}</p>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => dispatch(hideModal())}
                    >
                      Cancelar
                    </button>
                    <button
                      type="button"
                      className={`btn ${modalState.typeModal !== 'save' ? 'btn-danger' : 'btn-primary'}`}
                      onClick={() => {
                        if (
                          modalState.idItem &&
                          modalState.dataSubmit &&
                          modalState.typeModal === 'save'
                        ) {
                          updateCard(modalState.idItem, modalState.dataSubmit);
                          dispatch(
                            updateCardReducer({
                              id: modalState.idItem,
                              ...modalState.dataSubmit,
                            }),
                          );
                        }
                        if (
                          modalState.typeModal === 'delete' &&
                          modalState.idItem
                        ) {
                          deleteCard(modalState.idItem);
                          dispatch(
                            deleteCardReducer({ cardId: modalState.idItem }),
                          );
                        }
                        dispatch(reset());
                        dispatch(hideModal());
                      }}
                    >
                      {modalState.content?.buttonConfirm}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="modal-backdrop fade show custom-backdrop"
          ></motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ModalConfirmation;
