const ConfirmModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full p-6 transform transition-all scale-100">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
          <span className="text-red-600 text-xl font-bold">!</span>
        </div>

        <div className="text-center">
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            Підтвердіть видалення
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            Ви впевнені, що хочете видалити цей предмет? Цю дію неможливо буде скасувати.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-lg transition-colors"
          >
            Скасувати
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
          >
            Видалити
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;