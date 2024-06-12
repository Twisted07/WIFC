function Button({ children }) {
  return (
    <button className="bg-slate-500 py-[10px] px-[60px] rounded-[10px] text-[18px] text-white">
      {children}
    </button>
  );
}

export default Button;
