const LogoUploadModal = ({ logo, setLogo, onClose }) => {

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogo(URL.createObjectURL(file));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white w-[420px] rounded-lg p-5 relative">

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute right-4 top-3 text-xl"
        >
          ✕
        </button>

        <h2 className="text-lg font-bold mb-4">Logo</h2>

        {/* LOGO PREVIEW */}
        <div className="flex justify-center mb-5">
          <img
            src={logo}
            alt="Logo"
            className="w-[120px] h-[120px] rounded-full object-cover border"
          />
        </div>

        {/* FILE INPUT */}
        <input type="file" onChange={handleChange} />

        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="bg-primary text-white px-5 py-2 rounded"
          >
            Upload
          </button>
        </div>

      </div>
    </div>
  );
};

export default LogoUploadModal;
