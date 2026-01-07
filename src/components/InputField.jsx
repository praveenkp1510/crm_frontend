export default function InputField({ label, type, name, placeholder, formik }) {
  const hasError = formik.touched[name] && formik.errors[name];

  return (
    <div className="w-full">
      <label className="block mb-2 text-sm font-medium text-gray-200">
        {label}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        {...formik.getFieldProps(name)}
        className={`
          w-full px-4 py-3.5 rounded-[10px] text-white outline-none border transition-all
          ${hasError ? 'border-red-500' : 'border-white/10 focus:border-[#8EDCE6]/50'}
          bg-[#0C2E45] placeholder:text-gray-500
        `}
      />
      {hasError && (
        <p className="text-red-400 text-xs mt-1.5 ml-1">{formik.errors[name]}</p>
      )}
    </div>
  );
}