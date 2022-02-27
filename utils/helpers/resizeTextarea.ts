const resizeTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  e.target.style.height = "5px";
  e.target.style.height = e.target.scrollHeight + "px";
};

export default resizeTextarea;
